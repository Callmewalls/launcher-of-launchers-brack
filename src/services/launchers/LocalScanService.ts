import LauncherAccount from '@entities/LauncherAccount.model';
import launcherConfigRepository from '@repositories/LauncherConfigRepository';
import { gamePersistenceService } from '@services/gameLibrary/GamePersistenceService';
import userGameRepository from '@repositories/UserGameRepository';
import { launcherRegistry } from './LauncherServiceRegistry';
import { Logger } from '@utils/logger';
import type { LauncherType } from '@shared/types/launcher.types';

export interface LocalScanLauncherResult {
  launcherType: LauncherType;
  count: number;
  persistedAdded: number;
  persistedUpdated: number;
  games: Array<{ launcherId: string; title: string; installPath?: string; isInstalled: boolean }>;
}

export interface LocalScanSummary {
  total: number;
  results: LocalScanLauncherResult[];
}

/**
 * Scans the local filesystem / registry for installed games and persists the
 * results to game_catalog + user_games using GamePersistenceService.
 *
 * Responsibility: local-install discovery only.  Auth and config are handled
 * by dedicated services.
 */
export class LocalScanService {
  /**
   * Scans one or all launchers that support install-state detection.
   * When launcherType is omitted every capable launcher is scanned.
   */
  async scanLocalInstalledGames(
    userId: string,
    launcherType?: LauncherType,
  ): Promise<LocalScanSummary> {
    const targetLaunchers = launcherType
      ? [launcherType]
      : launcherRegistry
          .getSupportedTypes()
          .filter((t) => launcherRegistry.get(t).getCapabilities().canFetchInstallState);

    const results: LocalScanLauncherResult[] = [];

    for (const targetType of targetLaunchers) {
      if (!launcherRegistry.isSupported(targetType)) {
        throw new Error(`Unsupported launcher type: ${targetType}`);
      }

      const service = launcherRegistry.get(targetType);
      if (!service.getCapabilities().canFetchInstallState) continue;

      const launcherConfig = await launcherConfigRepository.findByUserAndLauncher(userId, targetType);
      const installBasePath = launcherConfig?.installBasePath ?? undefined;
      const executablePattern = launcherConfig?.executablePattern ?? undefined;

      const localAccount = await this.ensureLocalScanAccount(userId, targetType);

      try {
        const scannedGames = await service.fetchInstalledGames(installBasePath);

        const persisted = await gamePersistenceService.persistGames(
          userId,
          localAccount.id,
          targetType,
          scannedGames,
          { executablePattern },
        );

        // Authoritative cleanup: games of this launcher that are no longer
        // found on disk (no valid .exe) must be marked as uninstalled.
        // This runs even when scannedGames is empty (all uninstalled).
        const scannedIds = scannedGames.map((g) => g.launcherId);
        const uninstalled = await userGameRepository.markUninstalledExcept(userId, targetType, scannedIds);
        if (uninstalled > 0) {
          Logger.log(`[LocalScanService] ${targetType}: marked ${uninstalled} previously-installed game(s) as uninstalled`);
        }

        results.push({
          launcherType: targetType,
          count: scannedGames.length,
          persistedAdded: persisted.added,
          persistedUpdated: persisted.updated,
          games: scannedGames.map((g) => ({
            launcherId:  g.launcherId,
            title:       g.title,
            installPath: g.installPath,
            isInstalled: g.isInstalled ?? true,
          })),
        });
      } catch (error) {
        Logger.warn(`[LocalScanService] Local scan failed for ${targetType}`, error);
        results.push({ launcherType: targetType, count: 0, persistedAdded: 0, persistedUpdated: 0, games: [] });
      }
    }

    return {
      total: results.reduce((sum, r) => sum + r.count, 0),
      results,
    };
  }

  /**
   * Returns the best linked account to attribute local-scan results to.
   * Falls back to a synthetic "Local <launcherType>" account when none is linked.
   */
  private async ensureLocalScanAccount(
    userId: string,
    launcherType: LauncherType,
  ): Promise<LauncherAccount> {
    const linked = await LauncherAccount.findOne({
      where: { userId, launcherType, isLinked: true },
      order: [['linkedAt', 'DESC']],
    });
    if (linked) return linked;

    const localName = `Local ${launcherType}`;
    const existing = await LauncherAccount.findOne({
      where: { userId, launcherType, accountName: localName },
    });
    if (existing) return existing;

    return LauncherAccount.create({
      userId,
      launcherType,
      accountName: localName,
      platformUserId: `local:${launcherType}:${userId}`,
      isLinked: false,
      linkedAt: null,
    });
  }
}

export const localScanService = new LocalScanService();
