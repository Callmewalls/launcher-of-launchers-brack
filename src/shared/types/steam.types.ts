export interface SteamPlayerSummary {
  steamid: string;
  personaname: string;
  profileurl?: string;
  avatar?: string;
  avatarmedium?: string;
  avatarfull?: string;
  personastate?: number;
  realname?: string;
  primaryclanid?: string;
  timecreated?: number;
  loccountrycode?: string;
}

export interface SteamOwnedGame {
  appid: number;
  name?: string;
  playtime_forever?: number;
  img_icon_url?: string;
  img_logo_url?: string;
  has_community_visible_stats?: boolean;
  playtime_windows_forever?: number;
  playtime_mac_forever?: number;
  playtime_linux_forever?: number;
  rtime_last_played?: number;
}

export interface SteamApp {
  appid: number;
  name: string;
}

export interface SteamNewsItem {
  gid: string;
  title: string;
  url: string;
  is_external_url: boolean;
  author: string;
  contents: string;
  feedlabel: string;
  date: number;
  feedname: string;
  feed_type: number;
  appid: number;
}

export interface SteamOpenIdPayload {
  [key: string]: string | undefined;
  'openid.claimed_id'?: string;
  'openid.error'?: string;
  'openid.identity'?: string;
  'openid.mode'?: string;
  'openid.ns'?: string;
  'openid.op_endpoint'?: string;
  'openid.return_to'?: string;
  'openid.response_nonce'?: string;
  'openid.sig'?: string;
  'openid.signed'?: string;
}
