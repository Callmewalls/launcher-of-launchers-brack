import { DataTypes, Model } from 'sequelize';
import sequelize from '@config/database.config';
import User from './User.model';

/**
 * Per-user configuration for a launcher's local install.
 * Stores the custom install root path and an optional executable path pattern
 * so the sync engine can compute `executablePath` without an API call.
 *
 * Patterns support two placeholders:
 *   {installPath} — replaced with the game's installPath at sync time
 *   {gameName}    — replaced with the game title (sanitised for filesystem use)
 *
 * Example pattern: {installPath}\bin\{gameName}.exe
 */
export class LauncherConfig extends Model {
  public id!: string;
  public userId!: string;
  public launcherType!: string;
  /** Overrides the scanner's hardcoded base path, e.g. "D:\\GOG Games" */
  public installBasePath?: string;
  /** Template for the game executable, e.g. "{installPath}\\{gameName}.exe" */
  public executablePattern?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

LauncherConfig.init(
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
    launcherType: {
      type: DataTypes.ENUM('steam', 'epic', 'gog', 'uplay', 'origin', 'battlenet', 'other'),
      allowNull: false,
    },
    installBasePath: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Custom root path for this launcher\'s game installations',
    },
    executablePattern: {
      type: DataTypes.STRING(512),
      allowNull: true,
      comment: 'Template for game executable path. Supports {installPath} and {gameName} placeholders.',
    },
  },
  {
    sequelize,
    tableName: 'launcher_configs',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['user_id', 'launcher_type'],
        name: 'uq_launcher_configs_user_type',
      },
    ],
  },
);

LauncherConfig.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });

export default LauncherConfig;
