import LauncherAccount from '@entities/LauncherAccount.model';
import { syncAccountUseCase } from './application/sync/use-cases/SyncAccountUseCase';
import { syncUserUseCase } from './application/sync/use-cases/SyncUserUseCase';
import type { SyncResult } from './application/sync/contracts/SyncResult';
import type { UserSyncSummary } from './application/sync/contracts/UserSyncSummary';

export class SyncService {
  async syncUser(userId: string): Promise<UserSyncSummary> {
    return syncUserUseCase.execute(userId);
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
    return syncAccountUseCase.execute(account);
  }
}

export const syncService = new SyncService();

