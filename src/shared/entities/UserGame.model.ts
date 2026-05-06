import { DataTypes, Model } from 'sequelize';
import sequelize from '@config/database.config';
import User from './User.model';
import GameCatalog from './Game.model';
import LauncherAccount from './LauncherAccount.model';

/**
 * Junction table: a user's ownership/installation state of a game in a specific launcher account.
 * This is the hot table — it scales to millions of rows. Keep it lean.
 * All game metadata is in game_catalog (join when needed).
 */
export class UserGame extends Model {
  public id!: string;
  public userId!: string;
  public gameCatalogId!: string;
  public launcherAccountId!: string;
  public playtimeMinutes!: number;
  public isInstalled!: boolean;
  public executablePath?: string;
  public installPath?: string;
  public lastPlayedAt?: Date;
  public syncedAt!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserGame.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: User, key: 'id' },
      onDelete: 'CASCADE',
    },
    gameCatalogId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: GameCatalog, key: 'id' },
      onDelete: 'CASCADE',
    },
    launcherAccountId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: LauncherAccount, key: 'id' },
      onDelete: 'CASCADE',
    },
    playtimeMinutes: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    isInstalled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    executablePath: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Computed full path to the game executable. Derived from LauncherConfig.executablePattern at sync time.',
    },
    installPath: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastPlayedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    syncedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'user_games',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        // One ownership row per game per user — launcher_account_id records
        // *which* account last synced the game but is NOT part of the key.
        // This prevents duplicates when a game was first seen via a synthetic
        // "Local <launcher>" account and later re-synced via the real linked account.
        fields: ['user_id', 'game_catalog_id'],
        name: 'uk_user_game_ownership',
      },
      {
        fields: ['user_id'],
        name: 'idx_user_games_user',
      },
      {
        fields: ['user_id', 'is_installed'],
        name: 'idx_user_games_installed',
      },
      {
        fields: ['launcher_account_id'],
        name: 'idx_user_games_launcher_account',
      },
      // Composite index used by GamePersistenceService to batch-load existing
      // ownership rows for a whole account in a single query
      {
        fields: ['user_id', 'launcher_account_id'],
        name: 'idx_user_games_user_account',
      },
    ],
  }
);

UserGame.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
UserGame.belongsTo(GameCatalog, { foreignKey: 'gameCatalogId', as: 'GameCatalog', onDelete: 'CASCADE' });
UserGame.belongsTo(LauncherAccount, { foreignKey: 'launcherAccountId', onDelete: 'CASCADE' });

User.hasMany(UserGame, { foreignKey: 'userId' });
GameCatalog.hasMany(UserGame, { foreignKey: 'gameCatalogId', as: 'UserGames' });
LauncherAccount.hasMany(UserGame, { foreignKey: 'launcherAccountId' });

export default UserGame;
