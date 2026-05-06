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
  public description?: string;
  public releaseDate?: Date;
  public genres?: object;
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
      type: DataTypes.ENUM('steam', 'epic', 'gog', 'uplay', 'origin', 'battlenet', 'other'),
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
    description: {
      type: DataTypes.TEXT,
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
    ],
  }
);

/**
 * Association alias used in all Sequelize includes of the GameCatalog relation.
 * Import this constant instead of using the string literal 'GameCatalog' directly.
 */
export const GAME_CATALOG_ASSOC = 'GameCatalog' as const;

export default GameCatalog;

