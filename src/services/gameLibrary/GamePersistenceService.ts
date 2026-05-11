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

    Logger.log(`[GamePersistenceService] Persisting ${games.length} game(s) for launcher ${launcherType} (user: ${userId})`);
    const withGrid = games.filter((g) => !!g.gridImagePath).length;
    Logger.log(`[GamePersistenceService] Grid image payload present for ${withGrid}/${games.length} game(s)`);

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

    // Dispatch catalog + ownership upserts sequentially to avoid SQLITE_BUSY
    // errors with many concurrent writers. This is slower but reliable for
    // local desktop usage where game counts are moderate.
    const sequentialResults: Array<'added' | 'updated' | { error: unknown }> = [];
    for (const game of games) {
      try {
        Logger.log(
          `[GamePersistenceService] Persisting game candidate: launcherId=${game.launcherId} title=${game.title} hasGrid=${game.gridImagePath ? 'yes' : 'no'}`,
        );
        const catalogEntry = await gameCatalogRepository.upsertByLauncherId(
          launcherType,
          game.launcherId,
          {
            title: game.title,
            coverUrl: game.coverUrl,
            gridImageUrl: game.gridImagePath,
            description: game.description,
          },
        );

        const existingInstalled = existingInstallMap.get(catalogEntry.id);
        const isNew = existingInstalled === undefined;

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

        sequentialResults.push(isNew ? 'added' : 'updated');
      } catch (err) {
        sequentialResults.push({ error: err });
        result.errors++;
        Logger.error('[GamePersistenceService] Failed to persist game', err);
      }
    }

    for (const r of sequentialResults) {
      if (r === 'added') result.added++;
      else if (r === 'updated') result.updated++;
      // errors already counted above
    }

    return result;
  }
}

export const gamePersistenceService = new GamePersistenceService();
