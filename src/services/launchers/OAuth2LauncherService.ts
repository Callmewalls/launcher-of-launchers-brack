import axios from 'axios';
import { ILauncherService } from './ILauncherService';
import { Logger } from '@utils/logger';
import type { LauncherType, LauncherTokens, ILauncherGame, LauncherCapabilities } from '@shared/types/launcher.types';
import type LauncherAccount from '@entities/LauncherAccount.model';

export interface OAuth2Config {
  launcherType: LauncherType;
  clientId: string;
  clientSecret: string;
  authUrl: string;
  tokenUrl: string;
  redirectUri: string;
  scopes: string[];
  /**
   * How to send client credentials in the token request.
   * 'body'  — client_id + client_secret as form fields (most providers, default)
   * 'basic' — Authorization: Basic base64(clientId:clientSecret) header (Epic, Battle.net)
   */
  tokenAuthMethod?: 'body' | 'basic';
}

export interface OAuth2TokenResponse {
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
  token_type?: string;
  /** Epic / Battle.net */
  account_id?: string;
  /** OIDC standard subject claim */
  sub?: string;
  /** Epic display name */
  display_name?: string;
}

/**
 * Base class for OAuth2-based launcher integrations.
 * Subclasses must override `fetchOwnedGames` and `fetchRecentlyPlayed`.
 * `exchangeCode` and `refreshTokens` follow the standard OAuth2 flow and can
 * be further overridden when a provider needs additional post-auth calls.
 */
export abstract class OAuth2LauncherService implements ILauncherService {
  readonly launcherType: LauncherType;

  constructor(protected readonly config: OAuth2Config) {
    this.launcherType = config.launcherType;
  }

  isConfigured(): boolean {
    return Boolean(this.config.clientId && this.config.clientSecret && this.config.redirectUri);
  }

  getCapabilities(): LauncherCapabilities {
    return {
      canAuthenticate: true,
      canFetchOwnedGames: true,
      canFetchRecentlyPlayed: false,
      canFetchPlaytime: false,
      canFetchInstallState: false,
      canLaunchViaProtocol: false,  // requires the client to already be running; override to true in subclasses if needed
    };
  }

  buildAuthUrl(state?: string): string {
    const url = new URL(this.config.authUrl);
    url.searchParams.set('client_id', this.config.clientId);
    url.searchParams.set('response_type', 'code');
    url.searchParams.set('redirect_uri', this.config.redirectUri);
    url.searchParams.set('scope', this.config.scopes.join(' '));
    if (state) url.searchParams.set('state', state);
    return url.toString();
  }

  async exchangeCode(code: string): Promise<LauncherTokens> {
    const { headers, params } = this.buildTokenRequestParams({ grant_type: 'authorization_code', code });
    const response = await axios.post<OAuth2TokenResponse>(this.config.tokenUrl, params.toString(), { headers });
    return this.mapTokenResponse(response.data);
  }

  async refreshTokens(account: LauncherAccount): Promise<LauncherTokens | null> {
    if (!account.refreshToken) return null;

    try {
      const { headers, params } = this.buildTokenRequestParams({
        grant_type: 'refresh_token',
        refresh_token: account.refreshToken,
      });
      const response = await axios.post<OAuth2TokenResponse>(this.config.tokenUrl, params.toString(), { headers });
      return this.mapTokenResponse(response.data);
    } catch (err) {
      Logger.warn(`[${this.launcherType}] refreshTokens failed`, err);
      return null;
    }
  }

  protected mapTokenResponse(data: OAuth2TokenResponse): LauncherTokens {
    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      tokenExpiresAt: data.expires_in ? new Date(Date.now() + data.expires_in * 1000) : undefined,
      platformUserId: data.account_id ?? data.sub ?? '',
      accountName: data.display_name ?? data.account_id ?? data.sub ?? '',
    };
  }

  private buildTokenRequestParams(extra: Record<string, string>): {
    params: URLSearchParams;
    headers: Record<string, string>;
  } {
    const useBasic = this.config.tokenAuthMethod === 'basic';
    const params = new URLSearchParams({ redirect_uri: this.config.redirectUri, ...extra });

    if (!useBasic) {
      params.set('client_id', this.config.clientId);
      params.set('client_secret', this.config.clientSecret);
    }

    const headers: Record<string, string> = { 'Content-Type': 'application/x-www-form-urlencoded' };
    if (useBasic) {
      const credentials = Buffer.from(`${this.config.clientId}:${this.config.clientSecret}`).toString('base64');
      headers['Authorization'] = `Basic ${credentials}`;
    }

    return { params, headers };
  }

  abstract fetchOwnedGames(account: LauncherAccount): Promise<ILauncherGame[]>;
  abstract fetchRecentlyPlayed(account: LauncherAccount, count?: number): Promise<ILauncherGame[]>;

  /** Default: no local scanner implemented for this launcher. Override in subclasses. */
  async fetchInstalledGames(_installBasePath?: string): Promise<ILauncherGame[]> {
    return [];
  }
}
