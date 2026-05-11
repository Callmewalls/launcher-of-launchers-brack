import { AuthSessionService } from '@services/auth/AuthSessionService';
import { launcherRegistry } from '@services/launchers/core/LauncherServiceRegistry';
import { appendQuery, isAllowedReturnUrl } from '@utils/url.helper';
import { upsertLinkedAccountAndSync } from '../support/LauncherAccountLinkSync';
import type { OAuth2CallbackResult } from '../contracts/OAuth2CallbackResult';
import type { SteamCallbackResult } from '../contracts/SteamCallbackResult';
import type { LauncherType } from '@shared/types/launcher.types';
import type { ILauncherService } from '@services/launchers/base/ILauncherService';
import type { LauncherLinkStatePayload } from '@services/auth/AuthSessionService';

export class LauncherAuthFlowUseCases {
  private readonly authSessionService = new AuthSessionService();

  private resolveConfiguredLauncher(launcherType: LauncherType): ILauncherService {
    if (!launcherRegistry.isSupported(launcherType)) {
      throw new Error(`${launcherType} launcher service is not registered`);
    }

    const service = launcherRegistry.get(launcherType);
    if (!service.isConfigured()) {
      throw new Error(`${launcherType} is not configured on backend`);
    }

    return service;
  }

  private resolveReturnUrl(returnUrl: unknown): string | undefined {
    return typeof returnUrl === 'string' && isAllowedReturnUrl(returnUrl) ? returnUrl : undefined;
  }

  private getErrorMessage(error: unknown, fallback: string, normalizePlus = false): string {
    const message = error instanceof Error ? error.message : fallback;
    return normalizePlus ? message.replace(/\+/g, ' ').trim() : message;
  }

  private async handleOAuth2CallbackWithState(
    code: string,
    parsedState: LauncherLinkStatePayload,
  ): Promise<OAuth2CallbackResult> {
    const launcherType = parsedState.launcherType as LauncherType;
    const returnUrl = this.resolveReturnUrl(parsedState.returnUrl);

    try {
      const service = launcherRegistry.get(launcherType);
      const tokens = await service.exchangeCode(code);

      await upsertLinkedAccountAndSync(parsedState.userId, launcherType, tokens);

      return {
        success: true,
        message: `${launcherType} account linked and synchronized`,
        redirectUrl: returnUrl
          ? appendQuery(returnUrl, { linked: '1', launcher: launcherType })
          : undefined,
      };
    } catch (error: unknown) {
      const errorMessage = this.getErrorMessage(error, `${launcherType} linking failed`);
      return {
        success: false,
        error: errorMessage,
        redirectUrl: returnUrl
          ? appendQuery(returnUrl, { linked: '0', launcher: launcherType, error: errorMessage })
          : undefined,
      };
    }
  }

  getSteamAuthUrl(userId: string, returnUrl?: string): string {
    const steamService = this.resolveConfiguredLauncher('steam');
    const safeReturnUrl = this.resolveReturnUrl(returnUrl);
    const state = this.authSessionService.signSteamLinkState(userId, safeReturnUrl);
    return steamService.buildAuthUrl(state);
  }

  async handleSteamCallback(state: string, rawQueryString: string): Promise<SteamCallbackResult> {
    const parsedState = this.authSessionService.verifySteamLinkState(state);
    if (!parsedState) {
      return { success: false, error: 'Invalid or expired state token' };
    }

    const returnUrl = this.resolveReturnUrl(parsedState.returnUrl);

    try {
      const steamService = launcherRegistry.get('steam');
      const tokens = await steamService.exchangeCode(rawQueryString);

      await upsertLinkedAccountAndSync(parsedState.userId, 'steam', tokens);

      return {
        success: true,
        message: 'Steam account linked and synchronized',
        redirectUrl: returnUrl ? appendQuery(returnUrl, { steamLinked: '1' }) : undefined,
      };
    } catch (error: unknown) {
      const normalizedError = this.getErrorMessage(error, 'Steam linking failed', true);
      return {
        success: false,
        error: normalizedError,
        redirectUrl: returnUrl
          ? appendQuery(returnUrl, { steamLinked: '0', error: normalizedError })
          : undefined,
      };
    }
  }

  getOAuth2AuthUrl(userId: string, launcherType: LauncherType, returnUrl?: string): string {
    const service = this.resolveConfiguredLauncher(launcherType);
    const safeReturnUrl = this.resolveReturnUrl(returnUrl);
    const state = this.authSessionService.signLauncherLinkState(userId, launcherType, safeReturnUrl);
    return service.buildAuthUrl(state);
  }

  async handleOAuth2Callback(code: string, state: string): Promise<OAuth2CallbackResult> {
    const parsedState = this.authSessionService.verifyLauncherLinkState(state);
    if (!parsedState) {
      return { success: false, error: 'Invalid or expired state token' };
    }

    return this.handleOAuth2CallbackWithState(code, parsedState);
  }

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

    return this.handleOAuth2CallbackWithState(code, parsedState);
  }
}

export const launcherAuthFlowUseCases = new LauncherAuthFlowUseCases();