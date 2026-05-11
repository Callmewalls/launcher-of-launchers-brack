import dotenv from 'dotenv';

dotenv.config();

const toBool = (value: string | undefined, fallback = false): boolean => {
  if (value == null) return fallback;
  const normalized = value.trim().toLowerCase();
  return normalized === '1' || normalized === 'true' || normalized === 'yes' || normalized === 'on';
};

export const EnvConfig = {
  // Database
  DB_DIALECT: process.env.DB_DIALECT || 'mysql',
  SQLITE_PATH: process.env.SQLITE_PATH || './dev.sqlite',
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: parseInt(process.env.DB_PORT || '3306'),
  DB_NAME: process.env.DB_NAME || 'launcher_of_launchers',
  DB_USER: process.env.DB_USER || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  DB_SYNC_ALTER: toBool(process.env.DB_SYNC_ALTER, false),

  // Server
  PORT: parseInt(process.env.PORT || '3000'),
  NODE_ENV: process.env.NODE_ENV || 'development',
  IS_DEV: process.env.NODE_ENV === 'development',

  // JWT
  JWT_SECRET: process.env.JWT_SECRET || 'your-super-secret-key',
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || '24h',

  // APIs
  STEAM_API_BASE_URL: process.env.STEAM_API_BASE_URL || 'https://api.steampowered.com',
  STEAM_API_KEY: process.env.STEAM_API_KEY || '',
  STEAM_API_TIMEOUT_MS: parseInt(process.env.STEAM_API_TIMEOUT_MS || '10000'),
  STEAM_COMMUNITY_BASE_URL: process.env.STEAM_COMMUNITY_BASE_URL || 'https://steamcommunity.com',
  STEAM_OPENID_URL: process.env.STEAM_OPENID_URL || 'https://steamcommunity.com/openid/login',
  STEAM_OPENID_REALM: process.env.STEAM_OPENID_REALM || '',
  STEAM_OPENID_RETURN_URL: process.env.STEAM_OPENID_RETURN_URL || '',
  STEAM_DEFAULT_LANGUAGE: process.env.STEAM_DEFAULT_LANGUAGE || 'spanish',
  STEAM_STORE_BASE_URL: process.env.STEAM_STORE_BASE_URL || 'https://store.steampowered.com',
  STEAM_USER_AGENT: process.env.STEAM_USER_AGENT || 'launcher-of-launchers/1.0',
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',

  // Epic Games Store
  EPIC_CLIENT_ID: process.env.EPIC_CLIENT_ID || '',
  EPIC_CLIENT_SECRET: process.env.EPIC_CLIENT_SECRET || '',
  EPIC_REDIRECT_URI: process.env.EPIC_REDIRECT_URI || '',

  // GOG
  GOG_CLIENT_ID: process.env.GOG_CLIENT_ID || '',
  GOG_CLIENT_SECRET: process.env.GOG_CLIENT_SECRET || '',
  GOG_REDIRECT_URI: process.env.GOG_REDIRECT_URI || '',

  // Ubisoft Connect
  UBISOFT_CLIENT_ID: process.env.UBISOFT_CLIENT_ID || '',
  UBISOFT_CLIENT_SECRET: process.env.UBISOFT_CLIENT_SECRET || '',
  UBISOFT_REDIRECT_URI: process.env.UBISOFT_REDIRECT_URI || '',

  // EA App / Origin
  EA_CLIENT_ID: process.env.EA_CLIENT_ID || '',
  EA_CLIENT_SECRET: process.env.EA_CLIENT_SECRET || '',
  EA_REDIRECT_URI: process.env.EA_REDIRECT_URI || '',

  // Battle.net
  BATTLENET_CLIENT_ID: process.env.BATTLENET_CLIENT_ID || '',
  BATTLENET_CLIENT_SECRET: process.env.BATTLENET_CLIENT_SECRET || '',
  BATTLENET_REDIRECT_URI: process.env.BATTLENET_REDIRECT_URI || '',
  BATTLENET_REGION: process.env.BATTLENET_REGION || 'eu',

  // Local install path overrides (optional — scanner uses well-known defaults if unset)
  STEAM_INSTALL_PATH: process.env.STEAM_INSTALL_PATH || undefined,
  EPIC_MANIFESTS_PATH: process.env.EPIC_MANIFESTS_PATH || undefined,
  XBOX_INSTALL_PATH: process.env.XBOX_INSTALL_PATH || undefined,
};
