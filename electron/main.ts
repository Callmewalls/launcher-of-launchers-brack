import { app, BrowserWindow, ipcMain, protocol, shell } from 'electron';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

// Load .env early so credentials are read before setupEnvironment() runs
dotenv.config();

const DESKTOP_PROTOCOL = 'launcher-of-launchers';

protocol.registerSchemesAsPrivileged([
  {
    scheme: 'appimg',
    privileges: {
      standard: true,
      secure: true,
      supportFetchAPI: true,
      corsEnabled: true,
      stream: true,
    },
  },
]);

const PORT = 3000;
let mainWindow: BrowserWindow | null = null;
const isPostInstallBootstrapMode = process.argv.includes('--post-install-bootstrap');
let requestedExitCode = 0;

const singleInstanceLock = app.requestSingleInstanceLock();

if (!singleInstanceLock) {
  app.quit();
}

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
  console.log(`[Electron] Logger initialized at ${logPath}`);
}

function truncateForLog(value: string, maxLength = 700): string {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength)}... [truncated ${value.length - maxLength} chars]`;
}

async function getResponsePreview(response: Response): Promise<string> {
  try {
    const text = await response.clone().text();
    return truncateForLog(text);
  } catch {
    return '<unable to read response body>';
  }
}


function setupEnvironment(): void {
  process.env.NODE_ENV    = 'production';
  process.env.DB_DIALECT  = 'sqlite';
  process.env.SQLITE_PATH = path.join(app.getPath('userData'), 'database.sqlite');

  const base = `http://localhost:${PORT}`;

  // ── Developer credentials — fill these before building the installer ───────
  // Respect values loaded from .env; only use placeholders as fallback if truly empty.
  // This allows commenting out unwanted launchers in .env (they'll stay empty in production).
  // Steam: register at https://steamcommunity.com/dev/apikey (any domain, e.g. localhost)
  process.env.STEAM_API_KEY          = process.env.STEAM_API_KEY || 'EB9B2C5A51A65DF09B29445954EDBDF7';

  // Epic Games: register at https://dev.epicgames.com/portal → create product → OAuth2 client
  process.env.EPIC_CLIENT_ID         = process.env.EPIC_CLIENT_ID || '';
  process.env.EPIC_CLIENT_SECRET     = process.env.EPIC_CLIENT_SECRET || '';

  // GOG: register at https://www.gog.com/indie → Partners → API
  process.env.GOG_CLIENT_ID          = process.env.GOG_CLIENT_ID || '';
  process.env.GOG_CLIENT_SECRET      = process.env.GOG_CLIENT_SECRET || '';

  // Ubisoft Connect: register at https://developer.ubisoft.com
  process.env.UBISOFT_CLIENT_ID      = process.env.UBISOFT_CLIENT_ID || '';
  process.env.UBISOFT_CLIENT_SECRET  = process.env.UBISOFT_CLIENT_SECRET || '';

  // EA App / Origin: register at https://developers.ea.com
  process.env.EA_CLIENT_ID           = process.env.EA_CLIENT_ID || '';
  process.env.EA_CLIENT_SECRET       = process.env.EA_CLIENT_SECRET || '';

  // Battle.net: register at https://develop.battle.net/access/clients
  process.env.BATTLENET_CLIENT_ID    = process.env.BATTLENET_CLIENT_ID || '';
  process.env.BATTLENET_CLIENT_SECRET = process.env.BATTLENET_CLIENT_SECRET || '';

  // JWT signing secret — change this to any long random string
  process.env.JWT_SECRET             = process.env.JWT_SECRET || 'pZKztbuGKKx3QUq1DTwoI1HO3o5NJsMYOlBbh8i0Djl';
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

function registerLocalImageProtocol(): void {
  protocol.registerFileProtocol('appimg', (request, callback) => {
    try {
      const encoded = request.url.replace(/^appimg:\/\//, '');
      let filePath = decodeURIComponent(encoded);

      // Normalize windows drive-letter URLs that may arrive as /C:/...
      if (process.platform === 'win32' && /^\/[A-Za-z]:\//.test(filePath)) {
        filePath = filePath.slice(1);
      }

      if (!path.isAbsolute(filePath) || !fs.existsSync(filePath)) {
        callback({ error: -6 }); // FILE_NOT_FOUND
        return;
      }

      callback({ path: filePath });
    } catch {
      callback({ error: -2 }); // FAILED
    }
  });
}

function registerDesktopProtocol(): void {
  if (process.defaultApp && process.argv.length >= 2) {
    app.setAsDefaultProtocolClient(DESKTOP_PROTOCOL, process.execPath, [path.resolve(process.argv[1])]);
    return;
  }

  app.setAsDefaultProtocolClient(DESKTOP_PROTOCOL);
}

function extractProtocolUrl(argv: string[]): string | null {
  return argv.find((value) => value.startsWith(`${DESKTOP_PROTOCOL}://`)) ?? null;
}

function mapProtocolUrlToAppUrl(protocolUrl: string): string | null {
  try {
    const parsed = new URL(protocolUrl);
    const routeHost = parsed.host ? `/${parsed.host}` : '';
    const routePath = parsed.pathname === '/' ? '' : parsed.pathname;
    return `http://localhost:${PORT}${routeHost}${routePath}${parsed.search}`;
  } catch (error) {
    console.warn('[Electron] Invalid desktop protocol URL:', protocolUrl, error);
    return null;
  }
}

function focusMainWindow(): void {
  if (!mainWindow) {
    return;
  }

  if (mainWindow.isMinimized()) {
    mainWindow.restore();
  }

  mainWindow.show();
  mainWindow.focus();
}

function handleDesktopProtocolUrl(protocolUrl: string): void {
  const targetUrl = mapProtocolUrlToAppUrl(protocolUrl);
  if (!targetUrl) {
    return;
  }

  if (mainWindow) {
    focusMainWindow();
    void mainWindow.loadURL(targetUrl);
  }
}

async function startBackend(): Promise<void> {
  setupEnvironment();
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { startServer } = require('../app');
  await startServer();
}

async function performPostInstallBootstrap(): Promise<void> {
  const baseUrl = `http://localhost:${PORT}`;
  const bootstrapStartedAt = Date.now();

  console.log(`[Electron][Bootstrap] Starting post-install bootstrap. baseUrl=${baseUrl}`);
  console.log(`[Electron][Bootstrap] Runtime context pid=${process.pid} node=${process.version} db=${process.env.SQLITE_PATH ?? 'undefined'}`);

  const autoLoginStartedAt = Date.now();
  console.log('[Electron][Bootstrap] Step 1/3 auto-login started');
  const autoLoginResponse = await fetch(`${baseUrl}/api/auth/auto-login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  const autoLoginPreview = await getResponsePreview(autoLoginResponse);
  console.log(`[Electron][Bootstrap] Step 1/3 auto-login response status=${autoLoginResponse.status} ${autoLoginResponse.statusText} durationMs=${Date.now() - autoLoginStartedAt} body=${autoLoginPreview}`);

  if (!autoLoginResponse.ok) {
    const body = await autoLoginResponse.text().catch(() => '<unable to read response body>');
    throw new Error(`auto-login failed (${autoLoginResponse.status}): ${body}`);
  }

  const authPayload = await autoLoginResponse.json() as { token?: string };
  const token = authPayload?.token;
  if (!token) {
    throw new Error('auto-login response did not include token');
  }
  console.log(`[Electron][Bootstrap] Step 1/3 auto-login token received tokenLength=${token.length}`);

  const authHeaders = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const scanStartedAt = Date.now();
  console.log('[Electron][Bootstrap] Step 2/3 local scan started');
  const scanResponse = await fetch(`${baseUrl}/api/launchers/scan/local`, {
    method: 'GET',
    headers: authHeaders,
  });
  const scanPreview = await getResponsePreview(scanResponse);
  console.log(`[Electron][Bootstrap] Step 2/3 local scan response status=${scanResponse.status} ${scanResponse.statusText} durationMs=${Date.now() - scanStartedAt} body=${scanPreview}`);

  if (!scanResponse.ok) {
    const body = await scanResponse.text().catch(() => '<unable to read response body>');
    throw new Error(`local scan failed (${scanResponse.status}): ${body}`);
  }

  const syncStartedAt = Date.now();
  console.log('[Electron][Bootstrap] Step 3/3 sync-all started');
  const syncResponse = await fetch(`${baseUrl}/api/launchers/sync/all`, {
    method: 'POST',
    headers: authHeaders,
  });
  const syncPreview = await getResponsePreview(syncResponse);
  console.log(`[Electron][Bootstrap] Step 3/3 sync-all response status=${syncResponse.status} ${syncResponse.statusText} durationMs=${Date.now() - syncStartedAt} body=${syncPreview}`);

  if (!syncResponse.ok) {
    const body = await syncResponse.text().catch(() => '<unable to read response body>');
    throw new Error(`sync-all failed (${syncResponse.status}): ${body}`);
  }

  console.log(`[Electron][Bootstrap] Completed successfully totalDurationMs=${Date.now() - bootstrapStartedAt}`);
}

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    frame: false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js'),
    },
    title: 'Launcher of Launchers',
    show: false,
  });

  ipcMain.on('app:close', () => mainWindow?.close());
  ipcMain.on('app:minimize', () => mainWindow?.minimize());
  ipcMain.on('app:maximize', () => mainWindow?.maximize());
  ipcMain.on('app:unmaximize', () => mainWindow?.unmaximize());
  ipcMain.handle('app:toggle-maximize', () => {
    if (!mainWindow) {
      return false;
    }

    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
      return false;
    }

    mainWindow.maximize();
    return true;
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

app.on('second-instance', (_event, argv) => {
  focusMainWindow();

  const protocolUrl = extractProtocolUrl(argv);
  if (protocolUrl) {
    handleDesktopProtocolUrl(protocolUrl);
  }
});

app.on('open-url', (event, url) => {
  event.preventDefault();
  handleDesktopProtocolUrl(url);
});

app.whenReady().then(async () => {
  initLogger();
  registerLocalImageProtocol();
  registerDesktopProtocol();
  console.log('[Electron] App ready, starting backend...');
  try {
    await startBackend();

    if (isPostInstallBootstrapMode) {
      console.log('[Electron] Running post-install bootstrap mode...');
      try {
        await performPostInstallBootstrap();
        requestedExitCode = 0;
      } catch (bootstrapError) {
        console.error('[Electron][Bootstrap] Failed during post-install flow:', bootstrapError);
        requestedExitCode = 2;
      }
      app.quit();
      return;
    }

    console.log('[Electron] Backend started, opening window...');
    createWindow();

    const protocolUrl = extractProtocolUrl(process.argv);
    if (protocolUrl) {
      handleDesktopProtocolUrl(protocolUrl);
    }
  } catch (err) {
    console.error('[Electron] Failed to start backend:', err);
    requestedExitCode = 1;
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
  logStream?.end(() => app.exit(requestedExitCode));
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
