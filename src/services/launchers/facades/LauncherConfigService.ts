import LauncherAccount from '@entities/LauncherAccount.model';
import launcherConfigRepository, { LauncherConfigData } from '@repositories/LauncherConfigRepository';
import LauncherConfig from '@entities/LauncherConfig.model';
import type { LauncherType } from '@shared/types/launcher.types';

/**
 * Handles per-user launcher configuration (install path + executable pattern).
 * Pure repository delegate — no side effects beyond DB reads and writes.
 */
export class LauncherConfigService {
  async get(userId: string, launcherType: LauncherType): Promise<LauncherConfig | null> {
    return launcherConfigRepository.findByUserAndLauncher(userId, launcherType);
  }

  async getAll(userId: string): Promise<LauncherConfig[]> {
    return launcherConfigRepository.findAllByUser(userId);
  }

  async upsert(
    userId: string,
    launcherType: LauncherType,
    data: LauncherConfigData,
  ): Promise<LauncherConfig> {
    return launcherConfigRepository.upsert(userId, launcherType, data);
  }
}

export const launcherConfigService = new LauncherConfigService();
