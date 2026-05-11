import launcherConfigRepository from '@repositories/LauncherConfigRepository';
import userGameRepository from '@repositories/UserGameRepository';
import { gamePersistenceService } from '@services/gameLibrary/GamePersistenceService';
import { launcherRegistry } from '@services/launchers/core/LauncherServiceRegistry';
import { Logger } from '@utils/logger';
import { localScanAccountResolver } from '../support/LocalScanAccountResolver';
import type { LocalScanLauncherResult } from '../contracts/LocalScanLauncherResult';
import type { LocalScanSummary } from '../contracts/LocalScanSummary';
import type { LauncherType } from '@shared/types/launcher.types';

export class ScanLocalInstalledGamesUseCase {
  async execute(userId: string, launcherType?: LauncherType): Promise<LocalScanSummary> {
    const targetLaunchers = launcherType
      ? [launcherType]
      : launcherRegistry
          .getSupportedTypes()
          .filter((type) => launcherRegistry.get(type).getCapabilities().canFetchInstallState);

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

      const localAccount = await localScanAccountResolver.resolve(userId, targetType);

      try {
        const scannedGames = await service.fetchInstalledGames(installBasePath);

        const persisted = await gamePersistenceService.persistGames(
          userId,
          localAccount.id,
          targetType,
          scannedGames,
          { executablePattern },
        );

        const scannedIds = scannedGames.map((game) => game.launcherId);
        const uninstalled = await userGameRepository.markUninstalledExcept(userId, targetType, scannedIds);
        if (uninstalled > 0) {
          Logger.log(`[ScanLocalInstalledGamesUseCase] ${targetType}: marked ${uninstalled} previously-installed game(s) as uninstalled`);
        }

        results.push({
          launcherType: targetType,
          count: scannedGames.length,
          persistedAdded: persisted.added,
          persistedUpdated: persisted.updated,
          games: scannedGames.map((game) => ({
            launcherId: game.launcherId,
            title: game.title,
            installPath: game.installPath,
            isInstalled: game.isInstalled ?? true,
          })),
        });
      } catch (error) {
        Logger.warn(`[ScanLocalInstalledGamesUseCase] Local scan failed for ${targetType}`, error);
        results.push({ launcherType: targetType, count: 0, persistedAdded: 0, persistedUpdated: 0, games: [] });
      }
    }

    return {
      total: results.reduce((sum, result) => sum + result.count, 0),
      results,
    };
  }
}

export const scanLocalInstalledGamesUseCase = new ScanLocalInstalledGamesUseCase();