import axios from 'axios';
import {
  Configuration,
  IPlayerServiceApi,
  ISteamAppsApi,
  ISteamNewsApi,
  ISteamUserApi,
} from '@/connectors/steam-api';
import { EnvConfig } from '@config/env.config';
import { Logger } from '@utils/logger';
import {
  SteamApp,
  SteamAppDetails,
  SteamNewsItem,
  SteamOpenIdPayload,
  SteamOwnedGame,
  SteamPlayerSummary,
} from '@shared/types/steam.types';

const STEAM_ID_REGEX = /^\d{17}$/;
const STEAM_OPEN_ID_IDENTIFIER_REGEX = /\/openid\/id\/(\d{17})$/;

export class SteamWebApiService {
  private static readonly STEAM_COMMUNITY_IMAGE_BASE_URL = 'https://media.steampowered.com/steamcommunity/public/images/apps';

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

  /**
   * Fetches basic app details (name, short_description, header_image, genres)
   * from the Steam Store API.  Not part of the official Web API — no key
   * required, but rate-limited (~200 req / 5 min per IP).
   * Returns null when the appId is invalid, unlisted, or the request fails.
   */
  async getAppDetails(appId: number): Promise<SteamAppDetails | null> {
    const details = await this.getAppDetailsBatch([appId]);
    return details.get(appId) ?? null;
  }

  async getAppDetailsBatch(appIds: number[]): Promise<Map<number, SteamAppDetails>> {
    const uniqueIds = Array.from(new Set(appIds.filter((id) => Number.isInteger(id) && id > 0)));
    if (uniqueIds.length === 0) {
      return new Map();
    }

    const detailsById = new Map<number, SteamAppDetails>();

    // Steam Store appdetails doesn't support true batch requests.
    // We fetch individually with concurrency control (max 5 in parallel)
    // to avoid 429 rate limits while staying performant.
    const MAX_CONCURRENT = 5;
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    Logger.log(`[SteamWebApiService] Fetching appdetails for ${uniqueIds.length} apps (concurrency: ${MAX_CONCURRENT})`);

    for (let i = 0; i < uniqueIds.length; i += MAX_CONCURRENT) {
      const batchIds = uniqueIds.slice(i, i + MAX_CONCURRENT);

      // Execute this batch of requests in parallel
      const results = await Promise.allSettled(
        batchIds.map((appId) => this.getAppDetailsWithRetry(appId)),
      );

      // Collect successful responses
      for (let j = 0; j < results.length; j++) {
        const result = results[j];
        if (result.status === 'fulfilled') {
          const fulfilledResult = result as PromiseFulfilledResult<SteamAppDetails | null>;
          if (fulfilledResult.value) {
            detailsById.set(batchIds[j], fulfilledResult.value);
          }
        }
      }

      // If not the last batch, add delay to spread requests
      if (i + MAX_CONCURRENT < uniqueIds.length) {
        await delay(500);
      }
    }

    Logger.log(`[SteamWebApiService] Appdetails fetch complete: ${detailsById.size}/${uniqueIds.length} apps enriched`);
    return detailsById;
  }

  private async getAppDetailsWithRetry(appId: number, retries = 2): Promise<SteamAppDetails | null> {
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const url = `${EnvConfig.STEAM_STORE_BASE_URL}/api/appdetails`;
        const response = await axios.get<Record<string, { success: boolean; data?: SteamAppDetails }>>(url, {
          params: { appids: appId },
          timeout: EnvConfig.STEAM_API_TIMEOUT_MS,
          headers: { 'User-Agent': EnvConfig.STEAM_USER_AGENT },
        });

        const entry = response.data?.[String(appId)];
        if (entry?.success && entry.data) {
          return entry.data;
        }
        return null;
      } catch (err) {
        const isRateLimit = (err as any)?.response?.status === 429;
        if (isRateLimit && attempt < retries) {
          // Exponential backoff: 1s, 2s, 4s
          const delayMs = Math.pow(2, attempt) * 1000;
          Logger.warn(`[SteamWebApiService] Rate limited (429) for appid=${appId}, retrying in ${delayMs}ms (attempt ${attempt + 1}/${retries})`);
          await new Promise(resolve => setTimeout(resolve, delayMs));
          continue;
        }
        if (attempt === retries) {
          Logger.warn(`[SteamWebApiService] Failed to fetch appdetails for appid=${appId} after ${retries + 1} attempts`, err);
        }
        return null;
      }
    }
    return null;
  }

  getBestLibraryCoverUrl(appId: number, logoHash?: string, iconHash?: string): string | undefined {
    return this.getCommunityLibraryImageUrl(appId, logoHash) ?? this.getCommunityLibraryImageUrl(appId, iconHash);
  }

  private getCommunityLibraryImageUrl(appId: number, hash?: string): string | undefined {
    if (!hash) {
      return undefined;
    }

    return `${SteamWebApiService.STEAM_COMMUNITY_IMAGE_BASE_URL}/${appId}/${hash}.jpg`;
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