import axios from 'axios';
import { OAuth2LauncherService, OAuth2TokenResponse } from '../base/OAuth2LauncherService';
import { LocalGameScanner } from '../core/LocalGameScanner';
import { EnvConfig } from '@config/env.config';
import { Logger } from '@utils/logger';
import type { LauncherTokens, ILauncherGame, LauncherCapabilities } from '@shared/types/launcher.types';
import type LauncherAccount from '@entities/LauncherAccount.model';

interface EaIdentityResponse {
  pid?: {
    pidId?: string;
    personaId?: string;
    displayName?: string;
  };
}

interface EaEntitlement {
  entitlementId?: string;
  entitlementType?: string;
  offerId?: string;
  offerPath?: string;
  offerType?: string;
  productId?: string;
}

interface EaEntitlementsResponse {
  entitlements?: EaEntitlement[];
}

/**
 * EA App / Origin integration.
 * Auth: OAuth2 via https://accounts.ea.com/connect
 * Identity: GET https://gateway.ea.com/proxy/identity/pids/me  (Bearer token)
 * Library: GET https://api1.origin.com/ecommerce2/consolidatedentitlements/{personaId}
 *
 * Limit: playtime and install state are not exposed remotely by EA.
 */
export class OriginLauncherService extends OAuth2LauncherService {
  constructor() {
    super({
      launcherType: 'origin',
      clientId: EnvConfig.EA_CLIENT_ID,
      clientSecret: EnvConfig.EA_CLIENT_SECRET,
      authUrl: 'https://accounts.ea.com/connect/auth',
      tokenUrl: 'https://accounts.ea.com/connect/token',
      redirectUri: EnvConfig.EA_REDIRECT_URI,
      scopes: ['openid', 'offline', 'basic.identity', 'basic.entitlements'],
    });
  }

  /**
   * After standard OAuth2 exchange, fetch the EA personaId and display name
   * from the identity endpoint so we can call the entitlements API later.
   */
  override async exchangeCode(code: string): Promise<LauncherTokens> {
    const tokens = await super.exchangeCode(code);
    return this.enrichWithIdentity(tokens);
  }

  override async refreshTokens(account: LauncherAccount): Promise<LauncherTokens | null> {
    const tokens = await super.refreshTokens(account);
    if (!tokens) return null;
    return this.enrichWithIdentity(tokens);
  }

  async fetchOwnedGames(account: LauncherAccount): Promise<ILauncherGame[]> {
    if (!account.accessToken || !account.platformUserId) {
      Logger.warn('[OriginLauncherService] Missing accessToken or personaId');
      return [];
    }

    const response = await axios.get<EaEntitlementsResponse>(
      `https://api1.origin.com/ecommerce2/consolidatedentitlements/${account.platformUserId}`,
      {
        headers: {
          AuthToken: account.accessToken,
          Accept: 'application/vnd.origin.v3+json; x-cache/false',
        },
        params: { machine_hash: '0' },
      },
    );

    const entitlements = response.data.entitlements ?? [];
    return entitlements
      .filter((e) => e.offerType === 'basegame' || e.entitlementType === 'DEFAULT')
      .map((e) => ({
        launcherId: e.offerId ?? e.entitlementId ?? '',
        title: e.offerPath?.split('/')?.pop() ?? e.offerId ?? 'Unknown EA Game',
        coverUrl: undefined,
        playtimeMinutes: 0,
        isInstalled: false,
      }));
  }

  async fetchRecentlyPlayed(_account: LauncherAccount, _count?: number): Promise<ILauncherGame[]> {
    // EA App does not expose recently-played or playtime via a public remote API.
    return [];
  }

  override getCapabilities(): LauncherCapabilities {
    return {
      ...super.getCapabilities(),
      canFetchInstallState: true,
    };
  }

  override async fetchInstalledGames(installBasePath?: string): Promise<ILauncherGame[]> {
    return LocalGameScanner.scanEA(installBasePath);
  }

  private async enrichWithIdentity(tokens: LauncherTokens): Promise<LauncherTokens> {
    try {
      const resp = await axios.get<EaIdentityResponse>('https://gateway.ea.com/proxy/identity/pids/me', {
        headers: { Authorization: `Bearer ${tokens.accessToken}` },
      });
      const pid = resp.data.pid;
      return {
        ...tokens,
        platformUserId: pid?.personaId ?? pid?.pidId ?? tokens.platformUserId,
        accountName: pid?.displayName ?? tokens.accountName,
      };
    } catch (err) {
      Logger.warn('[OriginLauncherService] Could not fetch EA identity, using token data', err);
      return tokens;
    }
  }
}
