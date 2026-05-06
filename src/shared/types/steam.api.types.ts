export interface SteamGame {
  appid: number;
  name?: string;
  playtime_forever?: number;
  img_icon_url?: string;
  img_logo_url?: string;
  playtime_windows_forever?: number;
  playtime_mac_forever?: number;
  playtime_linux_forever?: number;
  rtime_last_played?: number;
}

export interface SteamPlayer {
  steamid: string;
  personaname: string;
  profileurl?: string;
  avatar?: string;
  avatarmedium?: string;
  avatarfull?: string;
  personastate?: number;
  realname?: string;
  loccountrycode?: string;
}

export interface SteamGamesResponse {
  success: boolean;
  data?: SteamGame[];
  error?: string;
  message?: string;
}

export interface SteamPlayerResponse {
  success: boolean;
  data?: SteamPlayer;
  error?: string;
}

export interface SteamErrorResponse {
  success: false;
  error: string;
}