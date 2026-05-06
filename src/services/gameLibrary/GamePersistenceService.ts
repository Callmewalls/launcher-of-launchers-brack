import UserGame from '@entities/UserGame.model';
import gameCatalogRepository from '@repositories/GameRepository';
import userGameRepository from '@repositories/UserGameRepository';
import { computeExecutablePath } from '@shared/utils/game.helper';
import { Logger } from '@utils/logger';
import type { LauncherType, ILauncherGame } from '@shared/types/launcher.types';

export interface PersistGamesOptions {
  executablePattern?: string;
  /**
   * When true, `isInstalled` is NOT overwritten for records that already exist
   * in the DB (no reliable local-scan data was available for this sync run).
   * New records are always inserted with `isInstalled: false`.
   */
  skipInstallStateUpdate?: boolean;
}

export interface PersistGamesResult {
  added: number;
  updated: number;
  errors: number;
}

/**
 * Centralises the game upsert pipeline shared by SyncService (API sync) and
 * LocalScanService (filesystem scan).
 *
 * Pipeline per call:
 *  1. ONE batch SELECT to pre-load existing ownership catalog IDs for the account.
 *  2. Concurrent game_catalog upserts + user_games upserts via Promise.allSettled.
 *
 * This replaces the old N×3 sequential DB calls with 1 + 2N concurrent calls.
 */
export class GamePersistenceService {
  async persistGames(
    userId: string,
    launcherAccountId: string,
    launcherType: LauncherType,
    games: ILauncherGame[],
    options: PersistGamesOptions = {},
  ): Promise<PersistGamesResult> {
    const result: PersistGamesResult = { added: 0, updated: 0, errors: 0 };
    if (games.length === 0) return result;

    const { executablePattern, skipInstallStateUpdate } = options;

    // Batch pre-load: one SELECT for all existing ownerships for this user.
    // We intentionally do NOT filter by launcherAccountId so that rows created
    // by a synthetic "Local <launcher>" account are found when the real linked
    // account syncs for the first time (the unique key is now (user, game) only).
    const existingRows = await UserGame.findAll({
      where: { userId },
      attributes: ['gameCatalogId', 'isInstalled'],
    });
    // Map gameCatalogId → current isInstalled so we can preserve it when the
    // caller has no reliable local-scan data (skipInstallStateUpdate: true).
    const existingInstallMap = new Map<string, boolean>(
      existingRows.map((r) => [r.gameCatalogId, r.isInstalled]),
    );

    // Dispatch catalog + ownership upserts concurrently
    const settlements = await Promise.allSettled(
      games.map(async (game) => {
        const catalogEntry = await gameCatalogRepository.upsertByLauncherId(
          launcherType,
          game.launcherId,
          { title: game.title, coverUrl: game.coverUrl },
        );

        const existingInstalled = existingInstallMap.get(catalogEntry.id);
        const isNew = existingInstalled === undefined;

        // When there is no reliable local-scan data, preserve the existing
        // isInstalled value so a failed or unavailable scan does not flip
        // installed games back to false.  New records always start as false.
        const resolvedIsInstalled =
          skipInstallStateUpdate && !isNew
            ? existingInstalled!
            : (game.isInstalled ?? false);

        await userGameRepository.upsertOwnership(
          userId,
          catalogEntry.id,
          launcherAccountId,
          {
            playtimeMinutes: game.playtimeMinutes ?? 0,
            isInstalled: resolvedIsInstalled,
            installPath: game.installPath,
            executablePath: game.executablePath ?? computeExecutablePath(
              game.installPath,
              game.title,
              executablePattern,
            ),
            lastPlayedAt: game.lastPlayedAt,
            syncedAt: new Date(),
          },
        );

        return isNew ? ('added' as const) : ('updated' as const);
      }),
    );

    for (const settlement of settlements) {
      if (settlement.status === 'fulfilled') {
        if (settlement.value === 'added') result.added++;
        else result.updated++;
      } else {
        result.errors++;
        Logger.error('[GamePersistenceService] Failed to persist game', settlement.reason);
      }
    }

    return result;
  }
}

export const gamePersistenceService = new GamePersistenceService();
