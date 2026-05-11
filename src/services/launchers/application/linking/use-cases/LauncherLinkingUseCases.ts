import LauncherAccount from '@entities/LauncherAccount.model';
import { launcherRegistry } from '@services/launchers/core/LauncherServiceRegistry';
import { syncService } from '@services/sync/SyncService';
import {
  buildOAuthLinkingRequiredMessage,
  requiresInteractiveOAuthLinking,
} from '../support/LauncherLinkingRules';
import type { LauncherType } from '@shared/types/launcher.types';
import type { LauncherCapabilitiesSummary } from '../contracts/LauncherCapabilitiesSummary';
import type { LauncherSyncResult } from '../contracts/LauncherSyncResult';

/**
 * Application-level use cases for launcher linking/account management.
 * This keeps orchestration logic out of facade classes.
 */
export class LauncherLinkingUseCases {
  private findAccountByUserAndId(
    userId: string,
    accountId: string,
    linkedOnly = false,
  ): Promise<LauncherAccount | null> {
    return LauncherAccount.findOne({
      where: {
        id: accountId,
        userId,
        ...(linkedOnly ? { isLinked: true } : {}),
      },
    });
  }

  async getLinkedAccounts(userId: string): Promise<LauncherAccount[]> {
    return LauncherAccount.findAll({
      where: { userId, isLinked: true },
      order: [['linkedAt', 'DESC']],
    });
  }

  getLauncherCapabilities(): LauncherCapabilitiesSummary[] {
    return launcherRegistry.getSupportedTypes().map((launcherType) => {
      const service = launcherRegistry.get(launcherType);
      return {
        launcherType,
        configured: service.isConfigured(),
        capabilities: service.getCapabilities(),
      };
    });
  }

  async linkLauncher(
    userId: string,
    launcherType: LauncherType,
    accountName: string,
    platformUserId?: string,
  ): Promise<LauncherAccount> {
    if (requiresInteractiveOAuthLinking(launcherType)) {
      throw new Error(buildOAuthLinkingRequiredMessage(launcherType));
    }

    const existing = await LauncherAccount.findOne({ where: { userId, launcherType } });

    if (existing) {
      await existing.update({
        accountName,
        platformUserId: platformUserId ?? existing.platformUserId,
        isLinked: true,
        linkedAt: new Date(),
      });
      return existing;
    }

    return LauncherAccount.create({
      userId,
      launcherType,
      accountName,
      platformUserId,
      isLinked: true,
      linkedAt: new Date(),
    });
  }

  async unlinkLauncher(userId: string, accountId: string): Promise<boolean> {
    const account = await this.findAccountByUserAndId(userId, accountId);
    if (!account) return false;

    await account.update({ isLinked: false, linkedAt: null, lastSyncAt: null });
    return true;
  }

  async syncLauncher(
    userId: string,
    accountId: string,
  ): Promise<LauncherSyncResult | null> {
    const account = await this.findAccountByUserAndId(userId, accountId, true);
    if (!account) return null;

    const result = await syncService.syncAccount(account);
    return { count: result.added + result.updated, errors: result.errors };
  }

  async syncAll(userId: string): Promise<Awaited<ReturnType<typeof syncService.syncUser>>> {
    return syncService.syncUser(userId);
  }
}