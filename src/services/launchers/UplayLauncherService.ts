import { OAuth2LauncherService } from './OAuth2LauncherService';
import { LocalGameScanner } from './LocalGameScanner';
import { EnvConfig } from '@config/env.config';
import type { ILauncherGame, LauncherCapabilities } from '@shared/types/launcher.types';
import type LauncherAccount from '@entities/LauncherAccount.model';

/**
 * Ubisoft Connect (formerly Uplay) integration.
 * Auth: OAuth2 — https://connect.ubisoft.com/authorize
 * Token: https://public-ubiservices.ubi.com/v3/oauth/token
 *
 * Hard limit: Ubisoft's API is not publicly documented; the game library
 * endpoint is internal and obtained only via reverse engineering.
 * This service correctly handles OAuth2 auth and token storage, but
 * fetchOwnedGames returns empty until a stable library endpoint is available.
 */
export class UplayLauncherService extends OAuth2LauncherService {
  constructor() {
    super({
      launcherType: 'uplay',
      clientId: EnvConfig.UBISOFT_CLIENT_ID,
      clientSecret: EnvConfig.UBISOFT_CLIENT_SECRET,
      authUrl: 'https://connect.ubisoft.com/authorize',
      tokenUrl: 'https://public-ubiservices.ubi.com/v3/oauth/token',
      redirectUri: EnvConfig.UBISOFT_REDIRECT_URI,
      scopes: ['openid', 'offline_access'],
    });
  }

  override getCapabilities(): LauncherCapabilities {
    return {
      ...super.getCapabilities(),
      canFetchOwnedGames: false,
      canFetchInstallState: true,
    };
  }

  async fetchOwnedGames(_account: LauncherAccount): Promise<ILauncherGame[]> {
    return [];
  }

  async fetchRecentlyPlayed(_account: LauncherAccount, _count?: number): Promise<ILauncherGame[]> {
    return [];
  }

  override async fetchInstalledGames(installBasePath?: string): Promise<ILauncherGame[]> {
    return LocalGameScanner.scanUplay(installBasePath);
  }
}
