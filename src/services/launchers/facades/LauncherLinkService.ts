import LauncherAccount from '@entities/LauncherAccount.model';
import LauncherConfig from '@entities/LauncherConfig.model';
import { LauncherConfigData } from '@repositories/LauncherConfigRepository';
import {
  LauncherAuthService,
  type SteamCallbackResult,
  type OAuth2CallbackResult,
} from './LauncherAuthService';
import { scanLocalInstalledGamesUseCase } from '../application/local-scan/use-cases/ScanLocalInstalledGamesUseCase';
import type { LocalScanSummary } from '../application/local-scan/contracts/LocalScanSummary';
import { LauncherConfigService } from './LauncherConfigService';
import { LauncherLinkingUseCases } from '../application/linking/use-cases/LauncherLinkingUseCases';
import type { LauncherCapabilitiesSummary } from '../application/linking/contracts/LauncherCapabilitiesSummary';
import type { LauncherType } from '@shared/types/launcher.types';

/**
 * Facade: composes LauncherAuthService + ScanLocalInstalledGamesUseCase + LauncherConfigService
 * and adds the core account-management operations (link / unlink / sync).
 *
 * The controller always injects this class so no external API changes are needed.
 */
export class LauncherLinkService {
  private readonly authService = new LauncherAuthService();
  private readonly linkingUseCases = new LauncherLinkingUseCases();
  private readonly configService = new LauncherConfigService();

  // -- Account queries ------------------------------------------------------

  async getLinkedAccounts(userId: string): Promise<LauncherAccount[]> {
    return this.linkingUseCases.getLinkedAccounts(userId);
  }

  getLauncherCapabilities(): LauncherCapabilitiesSummary[] {
    return this.linkingUseCases.getLauncherCapabilities();
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
    platformUserId?: string,
  ): Promise<LauncherAccount> {
    return this.linkingUseCases.linkLauncher(userId, launcherType, accountName, platformUserId);
  }

  async unlinkLauncher(userId: string, accountId: string): Promise<boolean> {
    return this.linkingUseCases.unlinkLauncher(userId, accountId);
  }

  async syncLauncher(
    userId: string,
    accountId: string,
  ): Promise<{ count: number; errors: number } | null> {
    return this.linkingUseCases.syncLauncher(userId, accountId);
  }

  async syncAll(userId: string): Promise<Awaited<ReturnType<LauncherLinkingUseCases['syncAll']>>> {
    return this.linkingUseCases.syncAll(userId);
  }

  // ── Local scan ───────────────────────────────────────────────────────────

  async scanLocalInstalledGames(
    userId: string,
    launcherType?: LauncherType,
  ): Promise<LocalScanSummary> {
    return scanLocalInstalledGamesUseCase.execute(userId, launcherType);
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
