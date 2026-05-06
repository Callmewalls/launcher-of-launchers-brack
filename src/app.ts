import express, { Express, Request, Response, NextFunction } from 'express';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import { EnvConfig } from '@config/env.config';
import { ensureDatabaseExists } from '@config/ensure-db';
import { syncDatabase } from '@config/sync-db';
import { Logger } from '@utils/logger';
import User from '@entities/User.model';
import GameCatalog from '@entities/Game.model';
import UserGame from '@entities/UserGame.model';
import LauncherAccount from '@entities/LauncherAccount.model';
import LauncherConfig from '@entities/LauncherConfig.model';
import { launcherRegistry } from '@services/launchers/LauncherServiceRegistry';
import { SteamLauncherService } from '@services/launchers/SteamLauncherService';
import { EpicLauncherService } from '@services/launchers/EpicLauncherService';
import { GogLauncherService } from '@services/launchers/GogLauncherService';
import { UplayLauncherService } from '@services/launchers/UplayLauncherService';
import { OriginLauncherService } from '@services/launchers/OriginLauncherService';
import { BattleNetLauncherService } from '@services/launchers/BattleNetLauncherService';
import { LauncherLinkService } from '@services/launchers/LauncherLinkService';
import type { LauncherType } from '@shared/types/launcher.types';

const app: Express = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Headers (for Electron IPC or external frontend)
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  // Respond immediately to OPTIONS preflight so the browser allows the actual request
  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
    return;
  }
  next();
});

// Sync Database
async function initializeDatabase() {
  try {
    await ensureDatabaseExists();
    Logger.log('Database existence verified');

    await syncDatabase();
    Logger.log('Database models synced successfully');
  } catch (error) {
    Logger.error('Failed to initialize database', error);
    process.exit(1);
  }
}

// Health / info routes
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'Server is running', timestamp: new Date() });
});

app.get('/api/info', (req: Request, res: Response) => {
  res.json({
    name: 'Launcher of Launchers Backend',
    version: '1.0.0',
    env: EnvConfig.NODE_ENV,
  });
});

// Launcher OAuth/OpenID callback routes registered before tsoa so Express can return 302 redirects.
// tsoa-generated routes return JSON; these take priority and redirect the browser to the frontend.
app.get('/launchers/:launcherType/callback', async (req: Request, res: Response) => {
  const { launcherType } = req.params;
  const fallbackBase = `http://localhost:${EnvConfig.PORT}/launchers`;
  try {
    const service = new LauncherLinkService();

    if (launcherType === 'steam') {
      const state = typeof req.query.state === 'string' ? req.query.state : '';
      if (!state) {
        return res.redirect(302, `${fallbackBase}?steamLinked=0&error=${encodeURIComponent('Missing state')}`);
      }
      const rawQS =
        typeof req.originalUrl === 'string' && req.originalUrl.includes('?')
          ? req.originalUrl.split('?')[1]
          : '';
      const result = await service.handleSteamCallback(state, rawQS);
      const target =
        result.redirectUrl ??
        (result.success
          ? `${fallbackBase}?steamLinked=1`
          : `${fallbackBase}?steamLinked=0&error=${encodeURIComponent(result.error ?? 'Steam linking failed')}`);
      return res.redirect(302, target);
    }

    const code = typeof req.query.code === 'string' ? req.query.code : '';
    const state = typeof req.query.state === 'string' ? req.query.state : '';
    if (!code) {
      return res.redirect(302, `${fallbackBase}?linked=0&launcher=${launcherType}&error=${encodeURIComponent('Missing code')}`);
    }
    if (!state) {
      return res.redirect(302, `${fallbackBase}?linked=0&launcher=${launcherType}&error=${encodeURIComponent('Missing state')}`);
    }
    const result = await service.handleOAuth2CallbackForLauncher(launcherType as LauncherType, code, state);
    const target =
      result.redirectUrl ??
      (result.success
        ? `${fallbackBase}?linked=1&launcher=${launcherType}`
        : `${fallbackBase}?linked=0&launcher=${launcherType}&error=${encodeURIComponent(result.error ?? 'Linking failed')}`);
    return res.redirect(302, target);
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : 'Unexpected error';
    Logger.error(`[Callback] ${launcherType} callback error`, err);
    return res.redirect(302, `${fallbackBase}?error=${encodeURIComponent(errMsg)}`);
  }
});

// All API routes are registered by tsoa-generated RegisterRoutes (auto-generated on every npm run dev).
// Do NOT add manual Express router mounts here — add tsoa decorators to the controllers instead.
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { RegisterRoutes } = require('./api/routes/routes');
  RegisterRoutes(app);
} catch {
  Logger.warn('tsoa routes not generated yet — run "npm run tsoa" or restart with nodemon');
}

// Serve OpenAPI spec as raw JSON
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const swaggerDocument = require('./api/swagger.json');

  app.get('/api/swagger.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerDocument);
  });

  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  Logger.log('Swagger UI available at /api/docs');
  Logger.log('OpenAPI spec available at /api/swagger.json');
} catch {
  Logger.warn('swagger.json not found — Swagger UI will not be available');
}

// Error handling middleware — tsoa throws errors with a .status property
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const status: number = typeof err.status === 'number' ? err.status : 500;
  if (status >= 500) Logger.error('Unhandled error', err);
  res.status(status).json({
    success: false,
    error: status < 500 ? err.message : 'Internal Server Error',
    message: status >= 500 && EnvConfig.IS_DEV ? err.message : undefined,
  });
});

// Serve Angular static build (only when running inside Electron / production)
const angularDist = path.join(__dirname, '..', 'frontend');
app.use(express.static(angularDist));
app.get(/^(?!\/api).*/, (req: Request, res: Response) => {
  res.sendFile(path.join(angularDist, 'index.html'));
});

// 404 handler (API routes only — non-API routes are handled by Angular above)
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Not Found',
    message: `Route ${req.path} not found`,
  });
});

// Register launcher services
function registerLaunchers(): void {
  launcherRegistry.register(new SteamLauncherService());
  launcherRegistry.register(new EpicLauncherService());
  launcherRegistry.register(new GogLauncherService());
  launcherRegistry.register(new UplayLauncherService());
  launcherRegistry.register(new OriginLauncherService());
  launcherRegistry.register(new BattleNetLauncherService());

  const configured = launcherRegistry.getConfigured().map((s) => s.launcherType);
  Logger.log(`[Launchers] Configured: ${configured.length > 0 ? configured.join(', ') : 'none'}`);
}

// Start server
let httpServer: ReturnType<typeof app.listen> | null = null;

async function startServer(): Promise<void> {
  await initializeDatabase();
  registerLaunchers();

  return new Promise((resolve, reject) => {
    httpServer = app.listen(EnvConfig.PORT, () => {
      Logger.log(`✅ Server running on http://localhost:${EnvConfig.PORT}`);
      Logger.log(`🔧 Environment: ${EnvConfig.NODE_ENV}`);
      resolve();
    }).on('error', reject);
  });
}

function stopServer(): Promise<void> {
  return new Promise((resolve) => {
    if (!httpServer) { resolve(); return; }
    httpServer.close(() => resolve());
    httpServer = null;
  });
}

export { app, startServer, stopServer };
