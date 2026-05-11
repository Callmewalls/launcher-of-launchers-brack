import { DataTypes, Model } from 'sequelize';
import sequelize from '@config/database.config';
import type { LauncherType } from '@shared/types/launcher.types';

/**
 * Global deduplicated game catalog.
 * One row per unique game per launcher — shared across ALL users.
 * User-specific data (playtime, isInstalled, installPath) lives in UserGame.
 */
export class GameCatalog extends Model {
  public id!: string;
  public launcher!: LauncherType;
  public launcherId!: string;
  public title!: string;
  public coverUrl?: string;
  public gridImageUrl?: string;
  public backgroundImageUrl?: string;
  public description?: string;
  public detailedDescription?: string;
  public aboutTheGame?: string;
  public releaseDate?: Date;
  public genres?: object;
  public categories?: object;
  public screenshots?: object;
  public movies?: object;
  public developers?: object;
  public publishers?: object;
  public platforms?: object;
  public metacriticScore?: number;
  public metacriticUrl?: string;
  public website?: string;
  public supportedLanguages?: string;
  public requiredAge?: number;
  public isFree?: boolean;
  /** Null means store details have never been fetched for this game. */
  public detailsFetchedAt?: Date | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

GameCatalog.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    launcher: {
      type: DataTypes.ENUM('steam', 'epic', 'gog', 'uplay', 'origin', 'battlenet', 'xbox', 'other'),
      allowNull: false,
    },
    launcherId: {
      type: DataTypes.STRING(64),
      allowNull: false,
      comment: 'External game ID from the launcher (e.g., Steam AppID)',
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    coverUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gridImageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Absolute local path to Steam librarycache grid portrait (library_600x900.jpg|png).',
    },
    backgroundImageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    detailedDescription: {
      type: DataTypes.TEXT('long'),
      allowNull: true,
    },
    aboutTheGame: {
      type: DataTypes.TEXT('long'),
      allowNull: true,
    },
    releaseDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    genres: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    categories: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    screenshots: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    movies: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    developers: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    publishers: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    platforms: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    metacriticScore: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    metacriticUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    supportedLanguages: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    requiredAge: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    isFree: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    detailsFetchedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      comment: 'Timestamp of last successful store-details fetch. NULL = never fetched.',
    },
  },
  {
    sequelize,
    tableName: 'game_catalog',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['launcher', 'launcher_id'],
        name: 'uk_game_catalog_launcher_id',
      },
      {
        fields: ['title'],
        name: 'idx_game_catalog_title',
      },
      {
        fields: ['details_fetched_at'],
        name: 'idx_game_catalog_details_fetched_at',
      },
    ],
  }
);

/**
 * Association alias used in all Sequelize includes of the GameCatalog relation.
 * Import this constant instead of using the string literal 'GameCatalog' directly.
 */
export const GAME_CATALOG_ASSOC = 'GameCatalog' as const;

export default GameCatalog;

