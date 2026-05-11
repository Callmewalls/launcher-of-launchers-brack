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
  gridImageUrl?: string;
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

export interface SteamAppDetails {
  type?: string;
  name: string;
  steam_appid?: number;
  required_age?: number | string;
  is_free?: boolean;
  detailed_description?: string;
  about_the_game?: string;
  short_description: string;
  supported_languages?: string;
  header_image?: string;
  capsule_image?: string;
  capsule_imagev5?: string;
  website?: string | null;
  developers?: string[];
  publishers?: string[];
  platforms?: { windows?: boolean; mac?: boolean; linux?: boolean };
  metacritic?: { score: number; url: string };
  categories?: Array<{ id: number; description: string }>;
  genres?: Array<{ id: string; description: string }>;
  screenshots?: Array<{ id: number; path_thumbnail: string; path_full: string }>;
  movies?: Array<{
    id: number;
    name: string;
    thumbnail: string;
    webm?: { 480: string; max: string };
    mp4?: { 480: string; max: string };
    highlight?: boolean;
  }>;
  release_date?: { coming_soon: boolean; date: string };
  background?: string;
  background_raw?: string;
  content_descriptors?: { ids: number[]; notes?: string | null };
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
