import LauncherAccount from '@entities/LauncherAccount.model';
import type { LauncherType } from '@shared/types/launcher.types';

/**
 * Resolves the best account row to attribute local scan results to.
 * When no linked account exists, a stable synthetic local account is created.
 */
export class LocalScanAccountResolver {
  async resolve(userId: string, launcherType: LauncherType): Promise<LauncherAccount> {
    const linked = await LauncherAccount.findOne({
      where: { userId, launcherType, isLinked: true },
      order: [['linkedAt', 'DESC']],
    });
    if (linked) {
      return linked;
    }

    const localName = `Local ${launcherType}`;
    const existing = await LauncherAccount.findOne({
      where: { userId, launcherType, accountName: localName },
    });
    if (existing) {
      return existing;
    }

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

export const localScanAccountResolver = new LocalScanAccountResolver();