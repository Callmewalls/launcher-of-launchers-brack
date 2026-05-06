import type { LauncherType } from './launcher.types';

export type { LauncherType };

export interface IGameCatalog {
  id: string;
  launcher: LauncherType;
  launcherId: string;
  title: string;
  coverUrl?: string;
  description?: string;
  releaseDate?: Date;
  genres?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserGame {
  id: string;
  userId: string;
  gameCatalogId: string;
  launcherAccountId: string;
  playtimeMinutes: number;
  isInstalled: boolean;
  installPath?: string;
  lastPlayedAt?: Date;
  syncedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
