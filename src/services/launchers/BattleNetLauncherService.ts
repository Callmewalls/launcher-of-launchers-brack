import axios from 'axios';
import { OAuth2LauncherService } from './OAuth2LauncherService';
import { LocalGameScanner } from './LocalGameScanner';
import { EnvConfig } from '@config/env.config';
import { Logger } from '@utils/logger';
import type { LauncherTokens, ILauncherGame, LauncherCapabilities } from '@shared/types/launcher.types';
import type LauncherAccount from '@entities/LauncherAccount.model';

interface BattleNetUserInfo {
  id?: number;
  battletag?: string;
  sub?: string;
}

/**
 * Battle.net integration.
 * Auth: OAuth2 via Blizzard developer portal (Basic auth for token requests).
 * User info: GET https://{region}.battle.net/oauth/userinfo  → BattleTag + account ID.
 *
 * Hard limit: Blizzard does NOT expose a single owned-games endpoint.
 * Each title (WoW, Diablo, SC2...) has its own profile API that requires
 * a product-scoped permission (sc2.profile, wow.profile, etc.) beyond the
 * default openid scope. fetchOwnedGames returns empty until scope expansion.
 */
export class BattleNetLauncherService extends OAuth2LauncherService {
  private readonly region: string;

  constructor() {
    const region = EnvConfig.BATTLENET_REGION;
    super({
      launcherType: 'battlenet',
      clientId: EnvConfig.BATTLENET_CLIENT_ID,
      clientSecret: EnvConfig.BATTLENET_CLIENT_SECRET,
      authUrl: `https://${region}.battle.net/oauth/authorize`,
      tokenUrl: `https://${region}.battle.net/oauth/token`,
      redirectUri: EnvConfig.BATTLENET_REDIRECT_URI,
      scopes: ['openid'],
      tokenAuthMethod: 'basic',
    });
    this.region = region;
  }

  override getCapabilities(): LauncherCapabilities {
    return {
      ...super.getCapabilities(),
      canFetchOwnedGames: false,
      canFetchInstallState: true,
    };
  }

  /**
   * After standard OAuth2 exchange, fetch the BattleTag from userinfo
   * and use the numeric account ID as platformUserId.
   */
  override async exchangeCode(code: string): Promise<LauncherTokens> {
    const tokens = await super.exchangeCode(code);
    return this.enrichWithUserInfo(tokens);
  }

  override async refreshTokens(account: LauncherAccount): Promise<LauncherTokens | null> {
    const tokens = await super.refreshTokens(account);
    if (!tokens) return null;
    return this.enrichWithUserInfo(tokens);
  }

  async fetchOwnedGames(_account: LauncherAccount): Promise<ILauncherGame[]> {
    // Battle.net does not have a single owned-games endpoint.
    // Product-specific APIs (sc2.profile, wow.profile, d4 API) require additional
    // scopes not included in the default openid configuration.
    return [];
  }

  async fetchRecentlyPlayed(_account: LauncherAccount, _count?: number): Promise<ILauncherGame[]> {
    return [];
  }

  override async fetchInstalledGames(installBasePath?: string): Promise<ILauncherGame[]> {
    return LocalGameScanner.scanBattleNet(installBasePath);
  }

  private async enrichWithUserInfo(tokens: LauncherTokens): Promise<LauncherTokens> {
    try {
      const resp = await axios.get<BattleNetUserInfo>(
        `https://${this.region}.battle.net/oauth/userinfo`,
        { headers: { Authorization: `Bearer ${tokens.accessToken}` } },
      );
      return {
        ...tokens,
        platformUserId: String(resp.data.id ?? resp.data.sub ?? tokens.platformUserId),
        accountName: resp.data.battletag ?? tokens.accountName,
      };
    } catch (err) {
      Logger.warn('[BattleNetLauncherService] Could not fetch user info', err);
      return tokens;
    }
  }
}
