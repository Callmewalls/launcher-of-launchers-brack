import { launcherAuthFlowUseCases } from '../application/auth/use-cases/LauncherAuthFlowUseCases';
import type { OAuth2CallbackResult } from '../application/auth/contracts/OAuth2CallbackResult';
import type { SteamCallbackResult } from '../application/auth/contracts/SteamCallbackResult';
import type { LauncherType } from '@shared/types/launcher.types';

export type { SteamCallbackResult } from '../application/auth/contracts/SteamCallbackResult';
export type { OAuth2CallbackResult } from '../application/auth/contracts/OAuth2CallbackResult';

/**
 * Handles all OAuth2 / OpenID Connect launcher auth flows.
 * Responsibility: build auth URLs, exchange codes, persist the linked account,
 * and trigger an initial sync.  Does NOT manage config or local scanning.
 */
export class LauncherAuthService {
  getSteamAuthUrl(userId: string, returnUrl?: string): string {
    return launcherAuthFlowUseCases.getSteamAuthUrl(userId, returnUrl);
  }

  async handleSteamCallback(
    state: string,
    rawQueryString: string,
  ): Promise<SteamCallbackResult> {
    return launcherAuthFlowUseCases.handleSteamCallback(state, rawQueryString);
  }

  getOAuth2AuthUrl(userId: string, launcherType: LauncherType, returnUrl?: string): string {
    return launcherAuthFlowUseCases.getOAuth2AuthUrl(userId, launcherType, returnUrl);
  }

  async handleOAuth2Callback(
    code: string,
    state: string,
  ): Promise<OAuth2CallbackResult> {
    return launcherAuthFlowUseCases.handleOAuth2Callback(code, state);
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
    return launcherAuthFlowUseCases.handleOAuth2CallbackForLauncher(launcherType, code, state);
  }
}

export const launcherAuthService = new LauncherAuthService();
