import { DataTypes, Model } from 'sequelize';
import sequelize from '@config/database.config';
import User from './User.model';

export class LauncherAccount extends Model {
  public id!: string;
  public userId!: string;
  public launcherType!: string;
  public accountName!: string;
  public platformUserId?: string;   // SteamID64, Epic account ID, GOG user ID, etc.
  public credentials?: string;
  public accessToken?: string;
  public refreshToken?: string;
  public tokenExpiresAt?: Date;
  public isLinked!: boolean;
  public linkedAt!: Date;
  public lastSyncAt?: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

LauncherAccount.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    launcherType: {
      type: DataTypes.ENUM('steam', 'epic', 'gog', 'uplay', 'origin', 'battlenet', 'xbox', 'other'),
      allowNull: false,
    },
    accountName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    platformUserId: {
      type: DataTypes.STRING(64),
      allowNull: true,
      comment: 'Platform-specific user ID (SteamID64, Epic account ID, etc.)',
    },
    credentials: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Encrypted credentials',
    },
    accessToken: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Encrypted access token',
    },
    refreshToken: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Encrypted refresh token',
    },
    tokenExpiresAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    isLinked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    linkedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    lastSyncAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'launcher_accounts',
    timestamps: true,
    underscored: true,
  }
);

LauncherAccount.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });

export default LauncherAccount;
