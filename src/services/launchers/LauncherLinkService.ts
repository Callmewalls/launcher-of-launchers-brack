import LauncherAccount from '@entities/LauncherAccount.model';
import LauncherConfig from '@entities/LauncherConfig.model';
import { LauncherConfigData } from '@repositories/LauncherConfigRepository';
import { launcherRegistry } from './LauncherServiceRegistry';
import { syncService } from '@services/sync/SyncService';
import {
  LauncherAuthService,
  type SteamCallbackResult,
  type OAuth2CallbackResult,
} from './LauncherAuthService';
import { LocalScanService, type LocalScanSummary } from './LocalScanService';
import { LauncherConfigService } from './LauncherConfigService';
import type { LauncherType, LauncherCapabilities } from '@shared/types/launcher.types';

interface LauncherCapabilitiesSummary {
  launcherType: LauncherType;
  configured: boolean;
  capabilities: LauncherCapabilities;
}

/**
 * Facade: composes LauncherAuthService + LocalScanService + LauncherConfigService
 * and adds the core account-management operations (link / unlink / sync).
 *
 * The controller always injects this class so no external API changes are needed.
 */
export class LauncherLinkService {
  private readonly authService    = new LauncherAuthService();
  private readonly scanService    = new LocalScanService();
  private readonly configService  = new LauncherConfigService();

  // -- Account queries ------------------------------------------------------

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

  // -- Steam auth -----------------------------------------------------------

  getSteamAuthUrl(userId: string, returnUrl?: string): string {
    return this.authService.getSteamAuthUrl(userId, returnUrl);
  }

  async handleSteamCallback(
    state: string,
    rawQueryString: string,
  ): Promise<SteamCallbackResult> {
    return this.authService.handleSteamCallback(state, rawQueryString);
  }

  // -- Generic OAuth2 -------------------------------------------------------

  getOAuth2AuthUrl(userId: string, launcherType: LauncherType, returnUrl?: string): string {
    return this.authService.getOAuth2AuthUrl(userId, launcherType, returnUrl);
  }

  async handleOAuth2Callback(code: string, state: string): Promise<OAuth2CallbackResult> {
    return this.authService.handleOAuth2Callback(code, state);
  }

  async handleOAuth2CallbackForLauncher(
    launcherType: LauncherType,
    code: string,
    state: string,
  ): Promise<OAuth2CallbackResult> {
    return this.authService.handleOAuth2CallbackForLauncher(launcherType, code, state);
  }

  // -- Account management ---------------------------------------------------

  async linkLauncher(
    userId: string,
    launcherType: LauncherType,
    accountName: string,
  ): Promise<LauncherAccount> {
    if (launcherRegistry.isSupported(launcherType)) {
      const service = launcherRegistry.get(launcherType);
      const capabilities = service.getCapabilities();
      if (capabilities.canAuthenticate && service.isConfigured() && capabilities.canFetchOwnedGames) {
        throw new Error(
          `${launcherType} requires OAuth/OpenID linking. Use GET /api/launchers/${launcherType}/auth-url first.`,
        );
      }
    }

    const existing = await LauncherAccount.findOne({ where: { userId, launcherType } });

    if (existing) {
      await existing.update({ accountName, isLinked: true, linkedAt: new Date() });
      return existing;
    }

    return LauncherAccount.create({
      userId,
      launcherType,
      accountName,
      isLinked: true,
      linkedAt: new Date(),
    });
  }

  async unlinkLauncher(userId: string, accountId: string): Promise<boolean> {
    const account = await LauncherAccount.findOne({ where: { id: accountId, userId } });
    if (!account) return false;

    await account.update({ isLinked: false, linkedAt: null, lastSyncAt: null });
    return true;
  }

  async syncLauncher(
    userId: string,
    accountId: string,
  ): Promise<{ count: number; errors: number } | null> {
    const account = await LauncherAccount.findOne({
      where: { id: accountId, userId, isLinked: true },
    });
    if (!account) return null;

    const result = await syncService.syncAccount(account);
    return { count: result.added + result.updated, errors: result.errors };
  }

  async syncAll(userId: string): Promise<Awaited<ReturnType<typeof syncService.syncUser>>> {
    return syncService.syncUser(userId);
  }

  // ── Local scan ───────────────────────────────────────────────────────────

  async scanLocalInstalledGames(
    userId: string,
    launcherType?: LauncherType,
  ): Promise<LocalScanSummary> {
    return this.scanService.scanLocalInstalledGames(userId, launcherType);
  }

  // ── Config ───────────────────────────────────────────────────────────────

  async getLauncherConfig(
    userId: string,
    launcherType: LauncherType,
  ): Promise<LauncherConfig | null> {
    return this.configService.get(userId, launcherType);
  }

  async getAllLauncherConfigs(userId: string): Promise<LauncherConfig[]> {
    return this.configService.getAll(userId);
  }

  async upsertLauncherConfig(
    userId: string,
    launcherType: LauncherType,
    data: LauncherConfigData,
  ): Promise<LauncherConfig> {
    return this.configService.upsert(userId, launcherType, data);
  }
}
