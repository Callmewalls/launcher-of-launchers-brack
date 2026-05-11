import LauncherAccount from '@entities/LauncherAccount.model';
import { Logger } from '@utils/logger';
import { syncAccountUseCase } from './SyncAccountUseCase';
import type { LauncherType } from '@shared/types/launcher.types';
import type { SyncResult } from '../contracts/SyncResult';
import type { UserSyncSummary } from '../contracts/UserSyncSummary';

export class SyncUserUseCase {
  async execute(userId: string): Promise<UserSyncSummary> {
    const start = Date.now();
    const accounts = await LauncherAccount.findAll({ where: { userId, isLinked: true } });

    const settlements = await Promise.allSettled(
      accounts.map((account) => syncAccountUseCase.execute(account)),
    );

    const results: SyncResult[] = settlements.map((settlement, index) => {
      if (settlement.status === 'fulfilled') return settlement.value;
      Logger.error(`[SyncService] Account sync failed for account ${accounts[index].id}`, settlement.reason);
      return {
        launcherType: accounts[index].launcherType as LauncherType,
        accountId: accounts[index].id,
        added: 0,
        updated: 0,
        errors: 1,
      };
    });

    const summary: UserSyncSummary = {
      userId,
      results,
      totalAdded: results.reduce((sum, result) => sum + result.added, 0),
      totalUpdated: results.reduce((sum, result) => sum + result.updated, 0),
      durationMs: Date.now() - start,
    };

    Logger.log(
      `[SyncService] User ${userId} sync complete — ` +
      `added: ${summary.totalAdded}, updated: ${summary.totalUpdated}, ` +
      `time: ${summary.durationMs}ms`,
    );

    return summary;
  }
}

export const syncUserUseCase = new SyncUserUseCase();