import { app, BrowserWindow, shell } from 'electron';
import path from 'path';
import fs from 'fs';

const PORT = 3000;
let mainWindow: BrowserWindow | null = null;

// ── File logger (written to userData so it's accessible after install) ──────
let logStream: fs.WriteStream | null = null;

function initLogger(): void {
  const logDir = app.getPath('userData');
  const logPath = path.join(logDir, 'launcher.log');
  logStream = fs.createWriteStream(logPath, { flags: 'a' });
  const stamp = () => new Date().toISOString();
  const orig = { log: console.log, error: console.error, warn: console.warn };
  console.log   = (...a) => { orig.log(...a);   logStream?.write(`[${stamp()}] INFO  ${a.join(' ')}\n`); };
  console.error = (...a) => { orig.error(...a); logStream?.write(`[${stamp()}] ERROR ${a.join(' ')}\n`); };
  console.warn  = (...a) => { orig.warn(...a);  logStream?.write(`[${stamp()}] WARN  ${a.join(' ')}\n`); };
}

function setupEnvironment(): void {
  process.env.NODE_ENV    = 'production';
  process.env.DB_DIALECT  = 'sqlite';
  process.env.SQLITE_PATH = path.join(app.getPath('userData'), 'database.sqlite');

  const base = `http://localhost:${PORT}`;

  // ── Developer credentials — fill these before building the installer ───────
  // Steam: register at https://steamcommunity.com/dev/apikey (any domain, e.g. localhost)
  process.env.STEAM_API_KEY          = 'EB9B2C5A51A65DF09B29445954EDBDF7';

  // Epic Games: register at https://dev.epicgames.com/portal → create product → OAuth2 client
  process.env.EPIC_CLIENT_ID         = 'YOUR_EPIC_CLIENT_ID';
  process.env.EPIC_CLIENT_SECRET     = 'YOUR_EPIC_CLIENT_SECRET';

  // GOG: register at https://www.gog.com/indie → Partners → API
  process.env.GOG_CLIENT_ID          = 'YOUR_GOG_CLIENT_ID';
  process.env.GOG_CLIENT_SECRET      = 'YOUR_GOG_CLIENT_SECRET';

  // Ubisoft Connect: register at https://developer.ubisoft.com
  process.env.UBISOFT_CLIENT_ID      = 'YOUR_UBISOFT_CLIENT_ID';
  process.env.UBISOFT_CLIENT_SECRET  = 'YOUR_UBISOFT_CLIENT_SECRET';

  // EA App / Origin: register at https://developers.ea.com
  process.env.EA_CLIENT_ID           = 'YOUR_EA_CLIENT_ID';
  process.env.EA_CLIENT_SECRET       = 'YOUR_EA_CLIENT_SECRET';

  // Battle.net: register at https://develop.battle.net/access/clients
  process.env.BATTLENET_CLIENT_ID    = 'YOUR_BATTLENET_CLIENT_ID';
  process.env.BATTLENET_CLIENT_SECRET = 'YOUR_BATTLENET_CLIENT_SECRET';

  // JWT signing secret — change this to any long random string
  process.env.JWT_SECRET             = 'pZKztbuGKKx3QUq1DTwoI1HO3o5NJsMYOlBbh8i0Djl';
  // ──────────────────────────────────────────────────────────────────────────

  // Steam OpenID — fixed to localhost, no user action required
  process.env.STEAM_OPENID_REALM      = base;
  process.env.STEAM_OPENID_RETURN_URL = `${base}/api/launchers/steam/callback`;

  // OAuth2 redirect URIs — all point to the local Express server
  process.env.EPIC_REDIRECT_URI       = `${base}/api/launchers/epic/callback`;
  process.env.GOG_REDIRECT_URI        = `${base}/api/launchers/gog/callback`;
  process.env.UBISOFT_REDIRECT_URI    = `${base}/api/launchers/uplay/callback`;
  process.env.EA_REDIRECT_URI         = `${base}/api/launchers/origin/callback`;
  process.env.BATTLENET_REDIRECT_URI  = `${base}/api/launchers/battlenet/callback`;
}

async function startBackend(): Promise<void> {
  setupEnvironment();
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { startServer } = require('../app');
  await startServer();
}

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
    title: 'Launcher of Launchers',
    show: false,
  });

  // Open OAuth/external URLs in the system browser instead of inside the app window.
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (!url.startsWith(`http://localhost:${PORT}`)) {
      shell.openExternal(url);
    }
    return { action: 'deny' };
  });

  mainWindow.webContents.on('will-navigate', (event, url) => {
    if (!url.startsWith(`http://localhost:${PORT}`)) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });

  mainWindow.loadURL(`http://localhost:${PORT}`);

  mainWindow.once('ready-to-show', () => {
    mainWindow?.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(async () => {
  initLogger();
  console.log('[Electron] App ready, starting backend...');
  try {
    await startBackend();
    console.log('[Electron] Backend started, opening window...');
    createWindow();
  } catch (err) {
    console.error('[Electron] Failed to start backend:', err);
    app.quit();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-quit', async (event) => {
  event.preventDefault();
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { stopServer } = require('../app');
    await stopServer();
  } catch { /* already stopped */ }
  logStream?.end(() => app.exit(0));
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
