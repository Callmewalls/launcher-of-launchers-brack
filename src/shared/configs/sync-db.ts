import sequelize from "./database.config";
import dotenv from 'dotenv';
import { EnvConfig } from './env.config';
import '../entities/User.model';
import '../entities/Game.model';
import '../entities/LauncherAccount.model';
import '../entities/UserGame.model';

dotenv.config();

interface SyncDatabaseOptions {
  closeConnection?: boolean;
}

export async function syncDatabase(options?: SyncDatabaseOptions): Promise<void> {
  const shouldCloseConnection = options?.closeConnection ?? false;

  try {
    console.log('[sync-db] Conectando a DB...');
    await sequelize.authenticate();
    console.log('[sync-db] Conexión OK');

    console.log('[sync-db] Sincronizando modelos...');
    if (EnvConfig.DB_SYNC_ALTER) {
      console.log('[sync-db] Modo alter activado (DB_SYNC_ALTER=true)');
      await sequelize.sync({ alter: true });
    } else {
      console.log('[sync-db] Modo seguro (sin ALTER). Para ALTER, usar DB_SYNC_ALTER=true');
      await sequelize.sync();
    }
    console.log('[sync-db] Tablas sincronizadas con éxito');

    console.log('[sync-db] Modelos que existen:');
    console.log(Object.keys(sequelize.models).map(model => `[sync-db] - ${model}`).join('\n'));
  } catch (error) {
    console.error('[sync-db] Error', error);
    process.exit(1);
  } finally {
    if (shouldCloseConnection) {
      await sequelize.close();
      console.log('[sync-db] Conexión cerrada');
    }
  }
}

if (require.main === module) {
  syncDatabase({ closeConnection: true });
}