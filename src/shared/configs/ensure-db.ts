import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import { EnvConfig } from './env.config';

// Carga variables de entorno
dotenv.config();

export async function ensureDatabaseExists(): Promise<void> {
  // SQLite creates the file automatically on first connect — no manual creation needed
  if (process.env.DB_DIALECT === 'sqlite') {
    console.log('[ensure-db] SQLite mode — skipping database creation step');
    return;
  }

  const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = EnvConfig;

  if (!DB_NAME || !DB_USER) {
    throw new Error('Missing required DB environment variables');
  }

  const connection = await mysql.createConnection({
    host: DB_HOST,
    port: DB_PORT ? Number(DB_PORT) : 3306,
    user: DB_USER,
    password: DB_PASSWORD,
  });
  await connection.query(
    `CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
  );
  await connection.end();
  console.log(`[ensure-db] Base de datos '${DB_NAME}' verificada/creada con usuario '${DB_USER}'`);
}

if (require.main === module) {
  // Solo ejecuta la creación de la BBDD al invocarse directamente.
  ensureDatabaseExists().catch((err) => {
    console.error('[ensure-db] Error:', err);
    process.exit(1);
  });
}