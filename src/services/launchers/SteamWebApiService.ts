import {
  Configuration,
  IPlayerServiceApi,
  ISteamAppsApi,
  ISteamNewsApi,
  ISteamUserApi,
} from '@/connectors/steam-api';
import { EnvConfig } from '@config/env.config';
import {
  SteamApp,
  SteamNewsItem,
  SteamOpenIdPayload,
  SteamOwnedGame,
  SteamPlayerSummary,
} from '@shared/types/steam.types';

const STEAM_ID_REGEX = /^\d{17}$/;
const STEAM_OPEN_ID_IDENTIFIER_REGEX = /\/openid\/id\/(\d{17})$/;

export class SteamWebApiService {
  private readonly appsApi: ISteamAppsApi;
  private readonly playerApi: IPlayerServiceApi;
  private readonly newsApi: ISteamNewsApi;
  private readonly userApi: ISteamUserApi;

  constructor() {
    const configuration = new Configuration({
      apiKey: EnvConfig.STEAM_API_KEY,
      basePath: EnvConfig.STEAM_API_BASE_URL,
      baseOptions: {
        timeout: EnvConfig.STEAM_API_TIMEOUT_MS,
        headers: {
          'User-Agent': EnvConfig.STEAM_USER_AGENT,
        },
      },
    });

    this.appsApi = new ISteamAppsApi(configuration);
    this.playerApi = new IPlayerServiceApi(configuration);
    this.newsApi = new ISteamNewsApi(configuration);
    this.userApi = new ISteamUserApi(configuration);
  }

  isConfigured(): boolean {
    return Boolean(EnvConfig.STEAM_API_KEY);
  }

  buildOpenIdRedirectUrl(state?: string): string {
    if (!EnvConfig.STEAM_OPENID_REALM || !EnvConfig.STEAM_OPENID_RETURN_URL) {
      throw new Error('Steam OpenID is not fully configured. Set STEAM_OPENID_REALM and STEAM_OPENID_RETURN_URL.');
    }

    const url = new URL(EnvConfig.STEAM_OPENID_URL);
    url.searchParams.set('openid.ns', 'http://specs.openid.net/auth/2.0');
    url.searchParams.set('openid.mode', 'checkid_setup');
    url.searchParams.set('openid.claimed_id', 'http://specs.openid.net/auth/2.0/identifier_select');
    url.searchParams.set('openid.identity', 'http://specs.openid.net/auth/2.0/identifier_select');
    url.searchParams.set('openid.realm', EnvConfig.STEAM_OPENID_REALM);
    url.searchParams.set('openid.return_to', this.buildReturnUrl(state));

    return url.toString();
  }

  extractSteamIdFromClaimedId(claimedId: string): string {
    const match = claimedId.match(STEAM_OPEN_ID_IDENTIFIER_REGEX);
    if (!match) {
      throw new Error('Invalid Steam claimed identifier');
    }

    return match[1];
  }

  extractSteamIdFromOpenIdPayload(payload: SteamOpenIdPayload): string {
    const claimedId = payload['openid.claimed_id'] || payload['openid.identity'];
    if (!claimedId) {
      throw new Error('Steam OpenID payload does not include a claimed identifier');
    }

    return this.extractSteamIdFromClaimedId(claimedId);
  }

  async resolveVanityUrl(vanityUrl: string): Promise<string | null> {
    this.ensureConfigured();

    const response = await this.userApi.iSteamUserResolveVanityURLV1Get({
      vanityurl: vanityUrl,
      format: 'json',
    });

    const data = this.getResponseBody<{ response?: { success?: number; steamid?: string } }>(response);
    return data.response?.success === 1 ? data.response.steamid ?? null : null;
  }

  async getPlayerSummary(steamId: string): Promise<SteamPlayerSummary | null> {
    this.ensureConfigured();
    this.assertSteamId(steamId);

    const response = await this.userApi.iSteamUserGetPlayerSummariesV2Get({
      steamids: steamId,
      format: 'json',
    });

    const data = this.getResponseBody<{ response?: { players?: SteamPlayerSummary[] } }>(response);
    return data.response?.players?.[0] ?? null;
  }

  async getOwnedGames(steamId: string, includeAppInfo = true): Promise<SteamOwnedGame[]> {
    this.ensureConfigured();
    this.assertSteamId(steamId);

    const response = await this.playerApi.iPlayerServiceGetOwnedGamesV1Get({
      steamid: this.asGeneratedSteamId(steamId),
      includeAppinfo: includeAppInfo,
      includePlayedFreeGames: true,
      includeFreeSub: true,
      skipUnvettedApps: false,
      includeExtendedAppinfo: true,
      language: EnvConfig.STEAM_DEFAULT_LANGUAGE,
      format: 'json',
    });

    const data = this.getResponseBody<{ response?: { games?: SteamOwnedGame[] } }>(response);
    return data.response?.games ?? [];
  }

  async getRecentlyPlayedGames(steamId: string, count = 10): Promise<SteamOwnedGame[]> {
    this.ensureConfigured();
    this.assertSteamId(steamId);

    const response = await this.playerApi.iPlayerServiceGetRecentlyPlayedGamesV1Get({
      steamid: this.asGeneratedSteamId(steamId),
      count,
      format: 'json',
    });

    const data = this.getResponseBody<{ response?: { games?: SteamOwnedGame[] } }>(response);
    return data.response?.games ?? [];
  }

  async getAppList(): Promise<SteamApp[]> {
    this.ensureConfigured();

    const response = await this.appsApi.iSteamAppsGetAppListV2Get({
      format: 'json',
    });

    const data = this.getResponseBody<{ applist?: { apps?: SteamApp[] } }>(response);
    return data.applist?.apps ?? [];
  }

  async getNewsForApp(appId: number, count = 3): Promise<SteamNewsItem[]> {
    this.ensureConfigured();

    const response = await this.newsApi.iSteamNewsGetNewsForAppV2Get({
      appid: appId,
      count,
      maxlength: 500,
      feeds: 'steam_community_announcements',
      format: 'json',
    });

    const data = this.getResponseBody<{ appnews?: { newsitems?: SteamNewsItem[] } }>(response);
    return data.appnews?.newsitems ?? [];
  }

  getStoreCapsuleUrl(appId: number): string {
    return `${EnvConfig.STEAM_STORE_BASE_URL}/apps/${appId}/header.jpg`;
  }

  getCommunityProfileUrl(steamId: string): string {
    this.assertSteamId(steamId);
    return `${EnvConfig.STEAM_COMMUNITY_BASE_URL}/profiles/${steamId}`;
  }

  private ensureConfigured(): void {
    if (!this.isConfigured()) {
      throw new Error('Steam API key is not configured. Set STEAM_API_KEY in the backend environment.');
    }
  }

  private assertSteamId(steamId: string): void {
    if (!STEAM_ID_REGEX.test(steamId)) {
      throw new Error('Invalid SteamID64 value');
    }
  }

  private buildReturnUrl(state?: string): string {
    const returnUrl = new URL(EnvConfig.STEAM_OPENID_RETURN_URL);
    if (state) {
      returnUrl.searchParams.set('state', state);
    }

    return returnUrl.toString();
  }

  private getResponseBody<T>(response: { data?: unknown }): T {
    return (response.data ?? {}) as T;
  }

  private asGeneratedSteamId(steamId: string): number {
    // The generated OpenAPI client typed some SteamID64 params as number, but SteamID64 exceeds JS safe integers.
    // We keep the original string value and pass it through for query serialization without numeric coercion.
    return steamId as unknown as number;
  }
}

export const steamWebApiService = new SteamWebApiService();