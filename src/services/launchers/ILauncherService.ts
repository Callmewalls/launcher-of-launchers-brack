import type { LauncherType, LauncherTokens, ILauncherGame, LauncherCapabilities } from '@shared/types/launcher.types';
import type LauncherAccount from '@entities/LauncherAccount.model';

export interface ILauncherService {
  readonly launcherType: LauncherType;

  /** True if the launcher has all required environment variables set */
  isConfigured(): boolean;

  /** Runtime capabilities exposed to frontend and sync orchestration */
  getCapabilities(): LauncherCapabilities;

  // ── Auth ────────────────────────────────────────────────────────────────────

  /**
   * Returns the URL the user must visit to authenticate.
   * Steam → OpenID 2.0 URL
   * Others → OAuth2 authorization URL
   */
  buildAuthUrl(state?: string): string;

  /**
   * Called after the user completes auth.
   * For Steam: receives the OpenID query params (stringified as `code`).
   * For OAuth2 launchers: receives the authorization code.
   * Returns tokens + platform user identity to persist in launcher_accounts.
   */
  exchangeCode(code: string): Promise<LauncherTokens>;

  /**
   * Refreshes an expired access token using the stored refresh token.
   * Returns null if refresh is not supported or refresh token is missing.
   */
  refreshTokens(account: LauncherAccount): Promise<LauncherTokens | null>;

  // ── Library ─────────────────────────────────────────────────────────────────

  /** Fetches the full owned game list for this account */
  fetchOwnedGames(account: LauncherAccount): Promise<ILauncherGame[]>;

  /** Fetches recently played games (up to `count`) */
  fetchRecentlyPlayed(account: LauncherAccount, count?: number): Promise<ILauncherGame[]>;

  /**
   * Scans the local filesystem / registry for installed games without
   * requiring a network call or account tokens.
   * Returns an empty array on non-Windows platforms or when the launcher
   * is not installed on this machine.
   *
   * @param installBasePath Optional override for the launcher's root install
   * directory (taken from LauncherConfig when the user has configured it).
   */
  fetchInstalledGames(installBasePath?: string): Promise<ILauncherGame[]>;
}
