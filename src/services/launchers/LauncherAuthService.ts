import LauncherAccount from '@entities/LauncherAccount.model';
import { AuthSessionService } from '@services/auth/AuthSessionService';
import { syncService } from '@services/sync/SyncService';
import { launcherRegistry } from './LauncherServiceRegistry';
import { appendQuery, isHttpUrl } from '@utils/url.helper';
import type { LauncherType } from '@shared/types/launcher.types';

export interface SteamCallbackResult {
  success: boolean;
  redirectUrl?: string;
  message?: string;
  error?: string;
}

export interface OAuth2CallbackResult {
  success: boolean;
  redirectUrl?: string;
  message?: string;
  error?: string;
}

/**
 * Handles all OAuth2 / OpenID Connect launcher auth flows.
 * Responsibility: build auth URLs, exchange codes, persist the linked account,
 * and trigger an initial sync.  Does NOT manage config or local scanning.
 */
export class LauncherAuthService {
  private readonly authSessionService = new AuthSessionService();

  // ── Steam OpenID ──────────────────────────────────────────────────────────

  getSteamAuthUrl(userId: string, returnUrl?: string): string {
    if (!launcherRegistry.isSupported('steam')) {
      throw new Error('Steam launcher service is not registered');
    }

    const steamService = launcherRegistry.get('steam');
    if (!steamService.isConfigured()) {
      throw new Error('Steam is not configured on backend');
    }

    const safeReturnUrl = returnUrl && isHttpUrl(returnUrl) ? returnUrl : undefined;
    const state = this.authSessionService.signSteamLinkState(userId, safeReturnUrl);
    return steamService.buildAuthUrl(state);
  }

  async handleSteamCallback(
    state: string,
    rawQueryString: string,
  ): Promise<SteamCallbackResult> {
    const parsedState = this.authSessionService.verifySteamLinkState(state);
    if (!parsedState) {
      return { success: false, error: 'Invalid or expired state token' };
    }

    const returnUrl =
      typeof parsedState.returnUrl === 'string' && isHttpUrl(parsedState.returnUrl)
        ? parsedState.returnUrl
        : undefined;

    try {
      const steamService = launcherRegistry.get('steam');
      const tokens = await steamService.exchangeCode(rawQueryString);

      const existing = await LauncherAccount.findOne({
        where: { userId: parsedState.userId, launcherType: 'steam' },
      });

      if (existing) {
        await existing.update({
          accountName:    tokens.accountName,
          platformUserId: tokens.platformUserId,
          accessToken:    tokens.accessToken,
          refreshToken:   tokens.refreshToken,
          tokenExpiresAt: tokens.tokenExpiresAt,
          isLinked:       true,
          linkedAt:       new Date(),
        });
        await syncService.syncAccount(existing);
      } else {
        const account = await LauncherAccount.create({
          userId:         parsedState.userId,
          launcherType:   'steam',
          accountName:    tokens.accountName,
          platformUserId: tokens.platformUserId,
          accessToken:    tokens.accessToken,
          refreshToken:   tokens.refreshToken,
          tokenExpiresAt: tokens.tokenExpiresAt,
          isLinked:       true,
          linkedAt:       new Date(),
        });
        await syncService.syncAccount(account);
      }

      return {
        success: true,
        message: 'Steam account linked and synchronized',
        redirectUrl: returnUrl ? appendQuery(returnUrl, { steamLinked: '1' }) : undefined,
      };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Steam linking failed';
      const normalizedError = errorMessage.replace(/\+/g, ' ').trim();
      return {
        success: false,
        error: normalizedError,
        redirectUrl: returnUrl
          ? appendQuery(returnUrl, { steamLinked: '0', error: normalizedError })
          : undefined,
      };
    }
  }

  // ── Generic OAuth2 ────────────────────────────────────────────────────────

  getOAuth2AuthUrl(userId: string, launcherType: LauncherType, returnUrl?: string): string {
    if (!launcherRegistry.isSupported(launcherType)) {
      throw new Error(`${launcherType} launcher service is not registered`);
    }

    const service = launcherRegistry.get(launcherType);
    if (!service.isConfigured()) {
      throw new Error(`${launcherType} is not configured on backend`);
    }

    const safeReturnUrl = returnUrl && isHttpUrl(returnUrl) ? returnUrl : undefined;
    const state = this.authSessionService.signLauncherLinkState(userId, launcherType, safeReturnUrl);
    return service.buildAuthUrl(state);
  }

  async handleOAuth2Callback(
    code: string,
    state: string,
  ): Promise<OAuth2CallbackResult> {
    const parsedState = this.authSessionService.verifyLauncherLinkState(state);
    if (!parsedState) {
      return { success: false, error: 'Invalid or expired state token' };
    }

    const launcherType = parsedState.launcherType as LauncherType;
    const returnUrl =
      typeof parsedState.returnUrl === 'string' && isHttpUrl(parsedState.returnUrl)
        ? parsedState.returnUrl
        : undefined;

    try {
      const service = launcherRegistry.get(launcherType);
      const tokens = await service.exchangeCode(code);

      const existing = await LauncherAccount.findOne({
        where: { userId: parsedState.userId, launcherType },
      });

      if (existing) {
        await existing.update({
          accountName:    tokens.accountName,
          platformUserId: tokens.platformUserId,
          accessToken:    tokens.accessToken,
          refreshToken:   tokens.refreshToken,
          tokenExpiresAt: tokens.tokenExpiresAt,
          isLinked:       true,
          linkedAt:       new Date(),
        });
        await syncService.syncAccount(existing);
      } else {
        const account = await LauncherAccount.create({
          userId:         parsedState.userId,
          launcherType,
          accountName:    tokens.accountName,
          platformUserId: tokens.platformUserId,
          accessToken:    tokens.accessToken,
          refreshToken:   tokens.refreshToken,
          tokenExpiresAt: tokens.tokenExpiresAt,
          isLinked:       true,
          linkedAt:       new Date(),
        });
        await syncService.syncAccount(account);
      }

      return {
        success: true,
        message: `${launcherType} account linked and synchronized`,
        redirectUrl: returnUrl
          ? appendQuery(returnUrl, { linked: '1', launcher: launcherType })
          : undefined,
      };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : `${launcherType} linking failed`;
      return {
        success: false,
        error: errorMessage,
        redirectUrl: returnUrl
          ? appendQuery(returnUrl, { linked: '0', launcher: launcherType, error: errorMessage })
          : undefined,
      };
    }
  }

  /**
   * Validates the launcher type embedded in the state token before delegating
   * to the generic OAuth2 callback handler.
   */
  async handleOAuth2CallbackForLauncher(
    launcherType: LauncherType,
    code: string,
    state: string,
  ): Promise<OAuth2CallbackResult> {
    const parsedState = this.authSessionService.verifyLauncherLinkState(state);
    if (!parsedState) {
      return { success: false, error: 'Invalid or expired state token' };
    }

    if (parsedState.launcherType !== launcherType) {
      return {
        success: false,
        error: `Launcher mismatch in state. Expected ${launcherType}, got ${parsedState.launcherType}`,
      };
    }

    return this.handleOAuth2Callback(code, state);
  }
}

export const launcherAuthService = new LauncherAuthService();
