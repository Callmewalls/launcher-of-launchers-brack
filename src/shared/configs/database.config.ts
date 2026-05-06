import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const isSQLite = process.env.DB_DIALECT === 'sqlite';

const sequelize = isSQLite
  ? new Sequelize({
      dialect: 'sqlite',
      storage: process.env.SQLITE_PATH || './dev.sqlite',
      logging: false,
    })
  : new Sequelize(
      process.env.DB_NAME || 'launcher_of_launchers',
      process.env.DB_USER || 'root',
      process.env.DB_PASSWORD || 'root',
      {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '3306'),
        dialect: 'mysql',
        logging: process.env.NODE_ENV === 'development' ? console.log : false,
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
      }
    );

export default sequelize;
