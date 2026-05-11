import launcherConfigRepository from '@repositories/LauncherConfigRepository';
import userGameRepository from '@repositories/UserGameRepository';
import LauncherAccount from '@entities/LauncherAccount.model';
import { gamePersistenceService } from '@services/gameLibrary/GamePersistenceService';
import { launcherRegistry } from '@services/launchers/core/LauncherServiceRegistry';
import { Logger } from '@utils/logger';
import { mergeOwnedAndInstalledGames } from '../support/SyncGameMerge';
import type { SyncResult } from '../contracts/SyncResult';
import type { ILauncherGame, LauncherType } from '@shared/types/launcher.types';

interface LauncherFetchResult {
  ownedGames: ILauncherGame[];
  installedGames: ILauncherGame[];
  localScanSucceeded: boolean;
}

export class SyncAccountUseCase {
  async execute(account: LauncherAccount): Promise<SyncResult> {
    const launcherType = account.launcherType as LauncherType;
    const result: SyncResult = {
      launcherType,
      accountId: account.id,
      added: 0,
      updated: 0,
      errors: 0,
    };

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

    const {
      ownedGames,
      installedGames,
      localScanSucceeded,
    } = await this.fetchOwnedAndInstalledGames(account, installBasePath, result);

    const games = mergeOwnedAndInstalledGames(ownedGames, installedGames);

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

    const persisted = await gamePersistenceService.persistGames(
      account.userId,
      account.id,
      launcherType,
      games,
      {
        executablePattern,
        skipInstallStateUpdate: !localScanSucceeded,
      },
    );

    result.added += persisted.added;
    result.updated += persisted.updated;
    result.errors += persisted.errors;

    if (localScanSucceeded && ownedGames.length === 0) {
      const scannedIds = installedGames.map((game) => game.launcherId);
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

  private async fetchOwnedAndInstalledGames(
    account: LauncherAccount,
    installBasePath: string | undefined,
    result: SyncResult,
  ): Promise<LauncherFetchResult> {
    const launcherType = account.launcherType as LauncherType;
    const service = launcherRegistry.get(launcherType);
    const capabilities = service.getCapabilities();

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
            .then((games) => {
              localScanSucceeded = true;
              return games;
            })
            .catch((err) => {
              Logger.warn(`[SyncService] Local scan failed for ${launcherType}`, err);
              return [] as ILauncherGame[];
            })
        : Promise.resolve([] as ILauncherGame[]),
    ]);

    return {
      ownedGames,
      installedGames,
      localScanSucceeded,
    };
  }
}

export const syncAccountUseCase = new SyncAccountUseCase();