import { LauncherLinkService } from '@services/launchers/facades/LauncherLinkService';
import { Logger } from '@utils/logger';

/**
 * Purpose: bootstrap launcher discovery for a user right after installation/login.
 * This enables a first local scan/sync flow without waiting for explicit user action.
 */
export class LauncherOnboardingService {
  private readonly launcherLinkService = new LauncherLinkService();

  async bootstrapUserLaunchers(userId: string): Promise<void> {
    try {
      await this.launcherLinkService.scanLocalInstalledGames(userId);
      Logger.log(`[LauncherOnboardingService] Initial local scan completed for user ${userId}`);
    } catch (error) {
      Logger.warn(`[LauncherOnboardingService] Initial local scan failed for user ${userId}`, error);
    }

    try {
      await this.launcherLinkService.syncAll(userId);
      Logger.log(`[LauncherOnboardingService] Initial sync completed for user ${userId}`);
    } catch (error) {
      Logger.warn(`[LauncherOnboardingService] Initial sync failed for user ${userId}`, error);
    }
  }

  bootstrapUserLaunchersInBackground(userId: string): void {
    void this.bootstrapUserLaunchers(userId);
  }
}

export const launcherOnboardingService = new LauncherOnboardingService();
