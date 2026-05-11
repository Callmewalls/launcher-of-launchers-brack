import { ILauncherService } from '../base/ILauncherService';
import { SteamWebApiService } from './SteamWebApiService';
import { LocalGameScanner } from '../core/LocalGameScanner';
import { EnvConfig } from '@config/env.config';
import { Logger } from '@utils/logger';
import type { LauncherType, LauncherTokens, ILauncherGame, LauncherCapabilities } from '@shared/types/launcher.types';
import type { SteamOpenIdPayload } from '@shared/types/steam.types';
import type LauncherAccount from '@entities/LauncherAccount.model';

/**
 * Steam integration via OpenID 2.0 (auth) + Steam Web API (library).
 * Auth model: no per-user OAuth tokens — Steam uses a global API key on the server
 * side and identifies users by their SteamID64.
 */
export class SteamLauncherService implements ILauncherService {
  readonly launcherType: LauncherType = 'steam';

  private readonly api: SteamWebApiService;

  constructor() {
    this.api = new SteamWebApiService();
  }

  isConfigured(): boolean {
    return this.api.isConfigured();
  }

  getCapabilities(): LauncherCapabilities {
    return {
      canAuthenticate: true,
      canFetchOwnedGames: true,
      canFetchRecentlyPlayed: true,
      canFetchPlaytime: true,
      canFetchInstallState: true,
      canLaunchViaProtocol: true,  // steam:// opens Steam and launches the game even if the client is closed
    };
  }

  // ── Auth ──────────────────────────────────────────────────────────────────

  /**
   * Returns the Steam OpenID 2.0 redirect URL.
   * The `state` param is forwarded in the return_to URL to survive the redirect.
   */
  buildAuthUrl(state?: string): string {
    return this.api.buildOpenIdRedirectUrl(state);
  }

  /**
   * Verifies the OpenID 2.0 callback.
   * `code` is the raw query string from the Steam callback (URLSearchParams serialized).
   * Returns LauncherTokens — for Steam there are no rotating tokens, only the SteamID64.
   */
  async exchangeCode(code: string): Promise<LauncherTokens> {
    const params = Object.fromEntries(new URLSearchParams(code)) as SteamOpenIdPayload;
    const mode = params['openid.mode'];

    if (mode === 'error') {
      const openIdError = params['openid.error'] ?? 'Steam OpenID returned an unspecified error';
      throw new Error(`Steam OpenID error: ${openIdError}`);
    }

    if (mode !== 'id_res') {
      throw new Error(`Unexpected Steam OpenID mode: ${mode ?? 'missing'}`);
    }

    const steamId = this.api.extractSteamIdFromOpenIdPayload(params);

    const player = await this.api.getPlayerSummary(steamId);
    const accountName = player?.personaname ?? steamId;

    return {
      accessToken: '',         // Steam does not issue per-user tokens
      refreshToken: undefined,
      tokenExpiresAt: undefined,
      platformUserId: steamId,
      accountName,
    };
  }

  /**
   * Steam does not use OAuth refresh tokens — always returns null.
   */
  refreshTokens(_account: LauncherAccount): Promise<LauncherTokens | null> {
    return Promise.resolve(null);
  }

  // ── Library ───────────────────────────────────────────────────────────────

  async fetchOwnedGames(account: LauncherAccount): Promise<ILauncherGame[]> {
    const steamId = this.resolveSteamId(account);
    if (!steamId) return [];

    const games = await this.api.getOwnedGames(steamId, true);
    Logger.log(`[SteamLauncherService] Owned games fetched from API: ${games.length} for SteamID ${steamId}`);

    // Resolve Steam root once — used to look up librarycache for every game.
    const steamRoot = await LocalGameScanner.resolveSteamRoot(EnvConfig.STEAM_INSTALL_PATH);
    if (!steamRoot) {
      Logger.warn('[SteamLauncherService] Steam root not resolved. gridImagePath lookup will be skipped.');
    } else {
      Logger.log(`[SteamLauncherService] Steam root resolved for grid lookup: ${steamRoot}`);
    }

    const mapped = await Promise.all(
      games.map(async (g) => {
        const appIdStr = String(g.appid);
        const gridImagePath = steamRoot
          ? await LocalGameScanner.findSteamGridImage(steamRoot, appIdStr)
          : undefined;

        return {
          launcherId: appIdStr,
          title: g.name ?? `App ${g.appid}`,
          coverUrl: this.api.getBestLibraryCoverUrl(g.appid, g.img_logo_url, g.img_icon_url),
          playtimeMinutes: g.playtime_forever ?? 0,
          isInstalled: false,          // Steam API does not expose install state remotely
          lastPlayedAt: g.rtime_last_played ? new Date(g.rtime_last_played * 1000) : undefined,
          gridImagePath,
        };
      }),
    );

    const withGrid = mapped.filter((g) => !!g.gridImagePath).length;
    Logger.log(`[SteamLauncherService] Grid images resolved: ${withGrid}/${mapped.length}`);

    return mapped;
  }

  async fetchRecentlyPlayed(account: LauncherAccount, count = 10): Promise<ILauncherGame[]> {
    const steamId = this.resolveSteamId(account);
    if (!steamId) return [];

    const games = await this.api.getRecentlyPlayedGames(steamId, count);

    return games.map((g) => ({
      launcherId: String(g.appid),
      title: g.name ?? `App ${g.appid}`,
      coverUrl: this.api.getBestLibraryCoverUrl(g.appid, g.img_logo_url, g.img_icon_url),
      playtimeMinutes: g.playtime_forever ?? 0,
      isInstalled: false,
      lastPlayedAt: g.rtime_last_played ? new Date(g.rtime_last_played * 1000) : undefined,
    }));
  }

  async fetchInstalledGames(installBasePath?: string): Promise<ILauncherGame[]> {
    return LocalGameScanner.scanSteam(installBasePath ?? EnvConfig.STEAM_INSTALL_PATH);
  }

  // ── Helpers ───────────────────────────────────────────────────────────────

  private resolveSteamId(account: LauncherAccount): string | null {
    if (!account.platformUserId) {
      Logger.warn(`[SteamLauncherService] Account ${account.id} has no platformUserId (SteamID64)`);
      return null;
    }
    return account.platformUserId;
  }
}
