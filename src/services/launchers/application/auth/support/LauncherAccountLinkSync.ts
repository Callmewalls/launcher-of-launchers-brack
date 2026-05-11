import LauncherAccount from '@entities/LauncherAccount.model';
import { syncService } from '@services/sync/SyncService';
import type { LauncherTokens, LauncherType } from '@shared/types/launcher.types';

export async function upsertLinkedAccountAndSync(
  userId: string,
  launcherType: LauncherType,
  tokens: LauncherTokens,
): Promise<void> {
  const linkedAt = new Date();
  const linkedAccountData = {
    accountName: tokens.accountName,
    platformUserId: tokens.platformUserId,
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    tokenExpiresAt: tokens.tokenExpiresAt,
    isLinked: true,
    linkedAt,
  };

  const existing = await LauncherAccount.findOne({
    where: { userId, launcherType },
  });

  if (existing) {
    await existing.update(linkedAccountData);
    await syncService.syncAccount(existing);
    return;
  }

  const account = await LauncherAccount.create({
    userId,
    launcherType,
    ...linkedAccountData,
  });

  await syncService.syncAccount(account);
}