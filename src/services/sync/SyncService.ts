import { launcherRegistry } from '@services/launchers/LauncherServiceRegistry';
import launcherConfigRepository from '@repositories/LauncherConfigRepository';
import { gamePersistenceService } from '@services/gameLibrary/GamePersistenceService';
import userGameRepository from '@repositories/UserGameRepository';
import LauncherAccount from '@entities/LauncherAccount.model';
import { Logger } from '@utils/logger';
import type { LauncherType, ILauncherGame } from '@shared/types/launcher.types';

interface SyncResult {
  launcherType: LauncherType;
  accountId: string;
  added: number;
  updated: number;
  errors: number;
}

interface UserSyncSummary {
  userId: string;
  results: SyncResult[];
  totalAdded: number;
  totalUpdated: number;
  durationMs: number;
}

export class SyncService {
  /**
   * Syncs all linked launcher accounts for a given user.
   * Accounts are synced concurrently — independent launchers do not block each other.
   */
  async syncUser(userId: string): Promise<UserSyncSummary> {
    const start = Date.now();
    const accounts = await LauncherAccount.findAll({ where: { userId, isLinked: true } });

    // All accounts run concurrently; failures are isolated via allSettled
    const settlements = await Promise.allSettled(
      accounts.map((account) => this.syncAccount(account)),
    );

    const results: SyncResult[] = settlements.map((s, i) => {
      if (s.status === 'fulfilled') return s.value;
      Logger.error(`[SyncService] Account sync failed for account ${accounts[i].id}`, s.reason);
      return {
        launcherType: accounts[i].launcherType as LauncherType,
        accountId: accounts[i].id,
        added: 0,
        updated: 0,
        errors: 1,
      };
    });

    const summary: UserSyncSummary = {
      userId,
      results,
      totalAdded: results.reduce((sum, r) => sum + r.added, 0),
      totalUpdated: results.reduce((sum, r) => sum + r.updated, 0),
      durationMs: Date.now() - start,
    };

    Logger.log(
      `[SyncService] User ${userId} sync complete — ` +
      `added: ${summary.totalAdded}, updated: ${summary.totalUpdated}, ` +
      `time: ${summary.durationMs}ms`,
    );

    return summary;
  }

  /**
   * Syncs a single launcher account.
   * 1. Fetches owned games from the launcher API.
   * 2. Fetches installed games from the local filesystem / registry.
   * 3. Merges both sets (API takes priority, local enriches isInstalled).
   * 4. Delegates persistence to GamePersistenceService.
   * 5. Updates lastSyncAt on the launcher account.
   */
  async syncAccount(account: LauncherAccount): Promise<SyncResult> {
    const launcherType = account.launcherType as LauncherType;
    const result: SyncResult = { launcherType, accountId: account.id, added: 0, updated: 0, errors: 0 };

    if (!launcherRegistry.isSupported(launcherType)) {
      Logger.warn(`[SyncService] No service registered for launcher: ${launcherType}`);
      return result;
    }

    const service = launcherRegistry.get(launcherType);
    const capabilities = service.getCapabilities();

    if (!service.isConfigured()) {
      if (!capabilities.canFetchInstallState) {
        Logger.warn(`[SyncService] Launcher ${launcherType} is not configured and has no local scanner, skipping`);
        return result;
      }
      Logger.log(`[SyncService] Launcher ${launcherType} is not configured — running local-scan-only mode`);
    }

    if (!capabilities.canFetchOwnedGames && !capabilities.canFetchInstallState) {
      Logger.log(`[SyncService] Launcher ${launcherType} supports neither owned-games nor install-state sync, skipping`);
      return result;
    }

    Logger.log(`[SyncService] Syncing ${launcherType} account ${account.id} (user: ${account.userId})`);

    const launcherConfig = await launcherConfigRepository.findByUserAndLauncher(
      account.userId,
      launcherType,
    );
    const installBasePath = launcherConfig?.installBasePath ?? undefined;
    const executablePattern = launcherConfig?.executablePattern ?? undefined;

    // ── Fetch API + local concurrently ───────────────────────────────────────
    let localScanSucceeded = false;
    const [ownedGames, installedGames] = await Promise.all([
      capabilities.canFetchOwnedGames
        ? service.fetchOwnedGames(account).catch((err) => {
            Logger.error(`[SyncService] API fetch failed for ${launcherType} account ${account.id}`, err);
            result.errors++;
            return [] as ILauncherGame[];
          })
        : Promise.resolve([] as ILauncherGame[]),
      capabilities.canFetchInstallState
        ? service.fetchInstalledGames(installBasePath)
            .then((games) => { localScanSucceeded = true; return games; })
            .catch((err) => {
            Logger.warn(`[SyncService] Local scan failed for ${launcherType}`, err);
            return [] as ILauncherGame[];
          })
        : Promise.resolve([] as ILauncherGame[]),
    ]);

    // ── Merge: API games take priority; local scan enriches isInstalled ───────
    const gameMap = new Map<string, ILauncherGame>();
    for (const game of ownedGames) gameMap.set(game.launcherId, game);
    for (const installed of installedGames) {
      const existing = gameMap.get(installed.launcherId);
      gameMap.set(
        installed.launcherId,
        existing
          ? {
              ...existing,
              isInstalled: true,
              installPath: installed.installPath ?? existing.installPath,
              // Prefer executablePath from the local scan (e.g. GOG LAUNCHCOMMAND)
              // over whatever the API returned (usually undefined).
              executablePath: installed.executablePath ?? existing.executablePath,
            }
          : installed,
      );
    }

    const games = [...gameMap.values()];

    if (games.length === 0) {
      Logger.log(
        `[SyncService] ${launcherType}: no games found ` +
        `(API: ${ownedGames.length}, local: ${installedGames.length})`,
      );
      await account.update({ lastSyncAt: new Date() });
      return result;
    }

    Logger.log(
      `[SyncService] ${launcherType}: ` +
      `${ownedGames.length} from API + ${installedGames.length} from local scan = ${games.length} unique`,
    );

    // ── Persist ──────────────────────────────────────────────────────────────
    const persisted = await gamePersistenceService.persistGames(
      account.userId,
      account.id,
      launcherType,
      games,
      {
        executablePattern,
        // Preserve existing isInstalled values when we have no reliable local
        // scan data (launcher doesn't support it or the scan threw an error).
        skipInstallStateUpdate: !localScanSucceeded,
      },
    );

    result.added += persisted.added;
    result.updated += persisted.updated;
    result.errors += persisted.errors;

    // When the local scan succeeded and there were NO owned-games from the API
    // (no link, API failed, or launcher doesn't expose owned-games), the local
    // scan IS the sole source of truth for install state.
    // Mark any previously-installed game of this launcher that the scan no
    // longer finds as uninstalled (e.g. game was uninstalled since last sync).
    if (localScanSucceeded && ownedGames.length === 0) {
      const scannedIds = installedGames.map((g) => g.launcherId);
      const uninstalled = await userGameRepository.markUninstalledExcept(account.userId, launcherType, scannedIds);
      if (uninstalled > 0) {
        Logger.log(`[SyncService] ${launcherType}: marked ${uninstalled} previously-installed game(s) as uninstalled`);
      }
    }

    await account.update({ lastSyncAt: new Date() });

    Logger.log(
      `[SyncService] ${launcherType} sync done — ` +
      `added: ${result.added}, updated: ${result.updated}, errors: ${result.errors}`,
    );

    return result;
  }
}

export const syncService = new SyncService();

