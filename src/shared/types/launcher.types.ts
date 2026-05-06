// Single source of truth for launcher type — import from here everywhere
export type LauncherType = 'steam' | 'epic' | 'gog' | 'uplay' | 'origin' | 'battlenet' | 'other';

export interface ILauncherAccount {
  id: string;
  userId: string;
  launcherType: LauncherType;
  accountName: string;
  platformUserId?: string; // SteamID64, Epic account ID, etc.
  credentials?: string;    // encrypted
  accessToken?: string;    // encrypted
  refreshToken?: string;   // encrypted
  tokenExpiresAt?: Date;
  isLinked: boolean;
  linkedAt?: Date;
  lastSyncAt?: Date;
}

// Tokens returned after auth exchange (OAuth2 or OpenID)
export interface LauncherTokens {
  accessToken: string;
  refreshToken?: string;
  tokenExpiresAt?: Date;
  platformUserId: string;
  accountName: string;
}

// Shape of a game as returned by any launcher API (before normalization)
export interface ILauncherGame {
  launcherId: string;
  title: string;
  coverUrl?: string;
  playtimeMinutes?: number;
  isInstalled: boolean;
  installPath?: string;
  /** Known executable path (e.g. extracted directly from a launcher's registry entry). */
  executablePath?: string;
  lastPlayedAt?: Date;
}

export interface LauncherCapabilities {
  canAuthenticate: boolean;
  canFetchOwnedGames: boolean;
  canFetchRecentlyPlayed: boolean;
  canFetchPlaytime: boolean;
  canFetchInstallState: boolean;
  /**
   * True when the launcher's OS protocol handler reliably starts the game
   * (and the launcher client itself) without user intervention.
   * Steam and Epic register their handlers at install time and will open the
   * client automatically.  GOG, Uplay, Origin and Battle.net require the
   * client to already be running — so we prefer direct exe for those.
   */
  canLaunchViaProtocol: boolean;
}
