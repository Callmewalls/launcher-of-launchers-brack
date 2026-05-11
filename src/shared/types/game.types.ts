import type { LauncherType } from './launcher.types';

export type { LauncherType };

export interface IGameCatalog {
  id: string;
  launcher: LauncherType;
  launcherId: string;
  title: string;
  coverUrl?: string;
  /** Absolute local path to the Steam grid portrait image (library_600x900.jpg|png). */
  gridImageUrl?: string;
  backgroundImageUrl?: string;
  description?: string;
  detailedDescription?: string;
  aboutTheGame?: string;
  releaseDate?: Date;
  genres?: string[];
  categories?: Array<{ id: number; description: string }>;
  screenshots?: Array<{ id: number; path_thumbnail: string; path_full: string }>;
  movies?: object[];
  developers?: string[];
  publishers?: string[];
  platforms?: { windows?: boolean; mac?: boolean; linux?: boolean };
  metacriticScore?: number;
  metacriticUrl?: string;
  website?: string;
  supportedLanguages?: string;
  requiredAge?: number;
  isFree?: boolean;
  /** Timestamp of the last successful store-details fetch. Null = never fetched. */
  detailsFetchedAt?: Date | null;
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
