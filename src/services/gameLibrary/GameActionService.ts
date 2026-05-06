import { exec, spawn } from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';
import UserGame from '@entities/UserGame.model';
import GameCatalog, { GAME_CATALOG_ASSOC } from '@entities/Game.model';
import { launcherRegistry } from '@services/launchers/LauncherServiceRegistry';
import { Logger } from '@utils/logger';
import type { LauncherType } from '@shared/types/launcher.types';

type GameAction = 'launch' | 'install' | 'uninstall';

export interface GameActionResult {
  success: boolean;
  /** True when the OS was instructed to open/run something (process or protocol URL). */
  launched: boolean;
  /** Protocol URL used, returned so the client can open it if the backend cannot. */
  protocolUrl?: string;
  message?: string;
  error?: string;
}

// ── Protocol URL builders ─────────────────────────────────────────────────────
//
// Each launcher registers a custom URL scheme on Windows.  We build the
// canonical URL and let the OS handler do the rest.

function buildProtocolUrl(launcher: LauncherType, launcherId: string, action: GameAction): string | undefined {
  switch (launcher) {
    case 'steam':
      if (action === 'launch')    return `steam://run/${launcherId}`;
      if (action === 'install')   return `steam://install/${launcherId}`;
      if (action === 'uninstall') return `steam://uninstall/${launcherId}`;
      return undefined;
    case 'gog':
      if (action === 'launch')    return `goggalaxy://rungameid/${launcherId}`;
      if (action === 'install')   return `goggalaxy://installgame/${launcherId}`;
      if (action === 'uninstall') return `goggalaxy://uninstallgame/${launcherId}`;
      return undefined;
    case 'uplay':
      if (action === 'launch')  return `uplay://launch/${launcherId}/0`;
      if (action === 'install') return `uplay://install/${launcherId}`;
      return undefined;
    case 'origin':
      if (action === 'launch')    return `origin://launchgame/${launcherId}`;
      if (action === 'install')   return `origin://installgame/${launcherId}`;
      // EA App does not support a reliable uninstall protocol deep-link.
      return undefined;
    case 'battlenet':
      if (action === 'launch') return `battlenet://${launcherId}`;
      return undefined;
    case 'epic':
      if (action === 'launch')  return `com.epicgames.launcher://apps/${launcherId}?action=launch&silent=true`;
      if (action === 'install') return `com.epicgames.launcher://apps/${launcherId}?action=install`;
      return undefined;
    default:
      return undefined;
  }
}

/**
 * Opens a protocol URL via the OS-registered handler.
 * On Windows the `start` built-in delegates to the URL scheme handler.
 * Non-blocking — resolves as soon as the OS receives the command.
 */
function openProtocolUrl(url: string): Promise<void> {
  // Strip any embedded quotes to prevent command injection.
  // Protocol URLs built by buildProtocolUrl() never contain quotes legitimately.
  const safe = url.replace(/"/g, '');
  return new Promise((resolve) => {
    const child = exec(`start "" "${safe}"`, (err) => {
      if (err) Logger.warn(`[GameActionService] Failed to open protocol URL: ${err.message}`);
      resolve();
    });
    // Safety timeout — kill the child if it hasn't exited after 10 s
    const timer = setTimeout(() => child.kill(), 10_000);
    child.once('exit', () => clearTimeout(timer));
  });
}

/**
 * Finds the Steam executable by checking the standard install paths.
 * Returns the full path to steam.exe, or undefined if not found.
 */
async function findSteamExe(): Promise<string | undefined> {
  const candidates = [
    'C:\\Program Files (x86)\\Steam\\steam.exe',
    'C:\\Program Files\\Steam\\steam.exe',
    'D:\\Steam\\steam.exe',
    'E:\\Steam\\steam.exe',
  ];
  for (const p of candidates) {
    try { await fs.access(p); return p; } catch { /* not here */ }
  }
  return undefined;
}

/**
 * Launches a Steam game directly via `steam.exe -applaunch <appId>`, avoiding
 * the browser "Open Steam?" confirmation dialog entirely.
 * Returns true if steam.exe was found and spawned, false otherwise.
 */
async function launchViaSteamExe(appId: string): Promise<boolean> {
  const steamExe = await findSteamExe();
  if (!steamExe) return false;
  try {
    const child = spawn(steamExe, ['-applaunch', appId], { detached: true, stdio: 'ignore', shell: false });
    child.unref();
    return true;
  } catch (err) {
    Logger.warn(`[GameActionService] Failed to spawn steam.exe: ${err}`);
    return false;
  }
}

/**
 * Spawns a game executable directly.  Detached + stdio ignored so the game
 * process is independent of the API server and keeps running if the server stops.
 */
function spawnExecutable(executablePath: string): void {
  try {
    const child = spawn(executablePath, [], { detached: true, stdio: 'ignore', shell: false });
    child.unref();
  } catch (err) {
    Logger.warn(`[GameActionService] Failed to spawn executable: ${err}`);
  }
}

// ── Executable discovery ──────────────────────────────────────────────────────
//
// When neither executablePath nor a working protocol URL is available, we scan
// the game's installPath looking for the most likely main .exe.

/** Filenames that are almost never the game's main executable. */
const EXCLUDED_EXE_NAMES = new Set([
  'unins000.exe', 'uninstall.exe', 'uninst.exe', 'setup.exe', 'install.exe',
  'unitycrashandler64.exe', 'unitycrashandler32.exe',
  'crashpad_handler.exe', 'crashreportclient.exe', 'crashreporter.exe',
  'vcredist_x64.exe', 'vcredist_x86.exe',
  'dxsetup.exe', 'isdone.exe', 'dotnetfx40_full_setup.exe',
  'launcher.exe', // generic launchers are skipped in favour of the actual game exe
]);

/** Recursively lists .exe files up to `maxDepth` levels deep, skipping excluded names. */
async function findExeFiles(
  dir: string,
  depth = 0,
  maxDepth = 2,
): Promise<Array<{ path: string; size: number }>> {
  const results: Array<{ path: string; size: number }> = [];
  if (depth > maxDepth) return results;

  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isFile() && entry.name.toLowerCase().endsWith('.exe')) {
        if (!EXCLUDED_EXE_NAMES.has(entry.name.toLowerCase())) {
          try {
            const stat = await fs.stat(fullPath);
            results.push({ path: fullPath, size: stat.size });
          } catch { /* inaccessible — skip */ }
        }
      } else if (entry.isDirectory() && depth < maxDepth) {
        const sub = await findExeFiles(fullPath, depth + 1, maxDepth);
        results.push(...sub);
      }
    }
  } catch { /* dir not accessible */ }

  return results;
}

/**
 * Picks the most likely game executable from an install directory.
 * Scoring: title-word match (×1 000 000 each) + file size in bytes.
 * Ties broken by file size — larger binaries are usually the actual game.
 *
 * Returns undefined if no .exe candidates are found.
 */
async function resolveExecutableFromInstallPath(
  installPath: string,
  gameTitle: string,
): Promise<string | undefined> {
  const candidates = await findExeFiles(installPath);
  if (candidates.length === 0) return undefined;
  if (candidates.length === 1) return candidates[0].path;

  const titleWords = gameTitle.toLowerCase().split(/\W+/).filter(Boolean);

  const scored = candidates.map((c) => {
    const baseName = path.basename(c.path).toLowerCase().replace(/\.exe$/, '');
    const titleScore = titleWords.filter((w) => baseName.includes(w)).length * 1_000_000;
    return { ...c, score: titleScore + c.size };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored[0].path;
}

/**
 * Finds the launcher's own executable so it can be opened as a fallback for
 * launchers that don't support a protocol uninstall URL.
 * Returns undefined if not found.
 */
async function findLauncherExe(launcher: LauncherType): Promise<string | undefined> {
  const candidates: Record<string, string[]> = {
    origin: [
      'C:\\Program Files\\Electronic Arts\\EA Desktop\\EA Desktop.exe',
      'C:\\Program Files (x86)\\Origin\\Origin.exe',
      'C:\\Program Files\\Origin\\Origin.exe',
    ],
    epic: [
      'C:\\Program Files (x86)\\Epic Games\\Launcher\\Portal\\Binaries\\Win32\\EpicGamesLauncher.exe',
      'C:\\Program Files\\Epic Games\\Launcher\\Portal\\Binaries\\Win64\\EpicGamesLauncher.exe',
    ],
    uplay: [
      'C:\\Program Files (x86)\\Ubisoft\\Ubisoft Game Launcher\\UbisoftConnect.exe',
      'C:\\Program Files\\Ubisoft\\Ubisoft Game Launcher\\UbisoftConnect.exe',
    ],
    battlenet: [
      'C:\\Program Files (x86)\\Battle.net\\Battle.net.exe',
      'C:\\Program Files\\Battle.net\\Battle.net.exe',
    ],
    gog: [
      'C:\\Program Files (x86)\\GOG Galaxy\\GalaxyClient.exe',
      'C:\\Program Files\\GOG Galaxy\\GalaxyClient.exe',
    ],
  };

  const paths = candidates[launcher] ?? [];
  for (const p of paths) {
    try { await fs.access(p); return p; } catch { /* not here */ }
  }
  return undefined;
}

export class GameActionService {
  /**
   * Resolves a UserGame row for the given user.
   * Accepts either the user_games primary key (userGameId from GET /api/library/all)
   * or the game_catalog id — the frontend may pass either.
   * When multiple rows exist for the same catalog entry, the installed one is preferred.
   */
  private async resolveUserGame(userId: string, idFromRequest: string): Promise<UserGame | null> {
    const include = [{ model: GameCatalog, as: GAME_CATALOG_ASSOC }];

    // 1 — exact user_games.id match
    const byPk = await UserGame.findOne({ where: { id: idFromRequest, userId }, include });
    if (byPk) return byPk;

    // 2 — game_catalog_id match (frontend passed the catalog id instead)
    return UserGame.findOne({
      where: { gameCatalogId: idFromRequest, userId },
      include,
      order: [['isInstalled', 'DESC']], // prefer installed row when multiple accounts own the same game
    });
  }

  // ── Launch ─────────────────────────────────────────────────────────────────

  /**
   * Launches an installed game.
   * Priority:
   *  1. Stored executablePath in user_games
   *  2. Launcher protocol URL  (steam://run/..., goggalaxy://..., etc.)
   *  3. Auto-discover the main .exe inside installPath
   *     (result is persisted to user_games.executablePath for next calls)
   */
  async launchGame(userId: string, userGameId: string): Promise<GameActionResult> {
    const userGame = await this.resolveUserGame(userId, userGameId);
    if (!userGame) return { success: false, launched: false, error: 'Game not found in your library' };
    if (!userGame.isInstalled) return { success: false, launched: false, error: 'Game is not installed. Use install first.' };

    const catalog = userGame.get(GAME_CATALOG_ASSOC) as GameCatalog;
    const protocolUrl = buildProtocolUrl(catalog.launcher, catalog.launcherId, 'launch');

    const service = launcherRegistry.isSupported(catalog.launcher)
      ? launcherRegistry.get(catalog.launcher)
      : undefined;
    const caps = service?.getCapabilities();

    // ── Step 1: stored exe (already discovered or set by the user) ──────────
    if (userGame.executablePath) {
      spawnExecutable(userGame.executablePath);
      // No protocolUrl: game already launched server-side, nothing for the frontend to open.
      return { success: true, launched: true, message: `Launching ${catalog.title}` };
    }

    // ── Step 2a: Steam — launch via steam.exe -applaunch to avoid the browser popup ─
    if (catalog.launcher === 'steam') {
      const launched = await launchViaSteamExe(catalog.launcherId);
      if (launched) {
        // No protocolUrl: launched server-side, frontend must not open any URL.
        return {
          success: true,
          launched: true,
          message: `Launching ${catalog.title} via Steam`,
        };
      }
      // steam.exe not found — fall through to protocol URL as last resort
    }

    // ── Step 2b: protocol URL for launchers whose handler auto-starts the client
    //    (Epic registers an OS-level handler; no running client needed) ─
    if (caps?.canLaunchViaProtocol && protocolUrl && catalog.launcher !== 'steam') {
      await openProtocolUrl(protocolUrl);
      return {
        success: true,
        launched: true,
        protocolUrl,
        message: `Launching ${catalog.title} via ${catalog.launcher}`,
      };
    }

    // ── Step 3: live scan — find exe path from the launcher's local data
    //    (registry or manifest files) and persist for future calls ─────────
    if (service && caps?.canFetchInstallState) {
      const exePath = await this.discoverAndPersistExe(userGame, catalog, service);
      if (exePath) {
        spawnExecutable(exePath);
        // No protocolUrl: launched server-side, frontend must not open any URL.
        return {
          success: true,
          launched: true,
          message: `Launching ${catalog.title} (${path.basename(exePath)})`,
        };
      }
    }

    // ── Step 4: last resort — protocol URL even if the client may need to be open
    if (protocolUrl) {
      await openProtocolUrl(protocolUrl);
      return {
        success: true,
        launched: true,
        protocolUrl,
        message: `Launching ${catalog.title} via ${catalog.launcher} — ensure the launcher client is running`,
      };
    }

    return {
      success: false,
      launched: false,
      error: `No executable found for ${catalog.title}. Run a sync or set executablePath via PUT /api/launchers/${catalog.launcher}/local-config.`,
    };
  }

  /**
   * Discovers the game's executable by running a live local scan for its launcher,
   * then persists installPath + executablePath to the DB so future launches are instant.
   * Returns the exe path if found, undefined otherwise.
   */
  private async discoverAndPersistExe(
    userGame: UserGame,
    catalog: GameCatalog,
    service: import('@services/launchers/ILauncherService').ILauncherService,
  ): Promise<string | undefined> {
    let installPath = userGame.installPath;
    let exePath: string | undefined;

    // If installPath is missing, run a full local scan to find it
    if (!installPath) {
      Logger.log(`[GameActionService] No installPath for "${catalog.title}" — running live local scan`);
      try {
        const liveGames = await service.fetchInstalledGames();
        const match = liveGames.find((g) => g.launcherId === catalog.launcherId);
        if (match) {
          installPath = match.installPath;
          exePath = match.executablePath;
          Logger.log(`[GameActionService] Live scan found "${catalog.title}": installPath=${installPath} exe=${exePath}`);
        } else {
          Logger.warn(`[GameActionService] Live scan did not find launcherId ${catalog.launcherId} for "${catalog.title}"`);
        }
      } catch (err) {
        Logger.warn(`[GameActionService] Live scan failed for ${catalog.launcher}: ${err}`);
      }
    }

    // If we got the exe from the scan (e.g. GOG LAUNCHCOMMAND registry key), use it
    if (!exePath && installPath) {
      exePath = await resolveExecutableFromInstallPath(installPath, catalog.title);
    }

    if (exePath || installPath) {
      await userGame.update({
        ...(installPath    && { installPath }),
        ...(exePath        && { executablePath: exePath }),
        isInstalled: true,
      });
    }

    return exePath;
  }

  // ── Install ────────────────────────────────────────────────────────────────

  /**
   * Triggers installation of a synced-but-not-installed game through the launcher.
   * Only possible for launchers that register a protocol handler (all except direct installs).
   */
  async installGame(userId: string, userGameId: string): Promise<GameActionResult> {
    const userGame = await this.resolveUserGame(userId, userGameId);
    if (!userGame) return { success: false, launched: false, error: 'Game not found in your library' };
    if (userGame.isInstalled) return { success: false, launched: false, error: 'Game is already installed' };

    const catalog = userGame.get(GAME_CATALOG_ASSOC) as GameCatalog;
    const protocolUrl = buildProtocolUrl(catalog.launcher, catalog.launcherId, 'install');

    if (!protocolUrl) {
      return {
        success: false,
        launched: false,
        error: `Install via ${catalog.launcher} is not supported automatically. Open the launcher and install manually.`,
      };
    }

    await openProtocolUrl(protocolUrl);
    return {
      success: true,
      launched: true,
      protocolUrl,
      message: `Opening ${catalog.launcher} to install ${catalog.title}`,
    };
  }

  // ── Uninstall ──────────────────────────────────────────────────────────────

  /**
   * Marks the game as not installed in the DB and, when possible, opens the
   * launcher's uninstall dialog.  Does NOT delete files directly.
   *
   * Priority:
   *  1. Launcher-specific protocol URL  (steam://, goggalaxy://, ...)
   *  2. Game's own uninstaller exe      (unins000.exe, uninstall.exe, etc.)
   *  3. Open the launcher application itself so the user can uninstall from there.
   */
  async uninstallGame(userId: string, userGameId: string): Promise<GameActionResult> {
    const userGame = await this.resolveUserGame(userId, userGameId);
    if (!userGame) return { success: false, launched: false, error: 'Game not found in your library' };

    const catalog = userGame.get(GAME_CATALOG_ASSOC) as GameCatalog;

    // Do NOT flip isInstalled here — the uninstall dialog opened in the launcher
    // requires user interaction and may be cancelled.  The actual state will be
    // corrected on the next sync via the local scan.

    // ── Step 1: protocol URL (steam://, goggalaxy://, ...) ───────────────────
    const protocolUrl = buildProtocolUrl(catalog.launcher, catalog.launcherId, 'uninstall');
    if (protocolUrl) {
      await openProtocolUrl(protocolUrl);
      return {
        success: true,
        launched: true,
        protocolUrl,
        message: `Opening ${catalog.launcher} to uninstall ${catalog.title}. Run a sync once uninstalled to update the library.`,
      };
    }

    // ── Step 2: game-bundled uninstaller exe ─────────────────────────────────
    if (userGame.installPath) {
      const uninstallerNames = ['unins000.exe', 'uninstall.exe', 'uninst.exe'];
      for (const name of uninstallerNames) {
        const uninsPath = path.join(userGame.installPath, name);
        try {
          await fs.access(uninsPath);
          spawnExecutable(uninsPath);
          return {
            success: true,
            launched: true,
            message: `Opening uninstaller for ${catalog.title}. Run a sync once uninstalled to update the library.`,
          };
        } catch { /* not found — try next */ }
      }
    }

    // ── Step 3: open the launcher app itself ─────────────────────────────────
    const launcherExe = await findLauncherExe(catalog.launcher);
    if (launcherExe) {
      spawnExecutable(launcherExe);
      return {
        success: true,
        launched: true,
        message: `Opened ${catalog.launcher} launcher — uninstall ${catalog.title} from there. Run a sync afterwards to update the library.`,
      };
    }

    // ── Step 4: nothing worked — tell the user which launcher to open ────────
    return {
      success: false,
      launched: false,
      error: `Could not find an uninstaller for ${catalog.title}. Open the ${catalog.launcher} launcher and uninstall from there.`,
    };
  }
}

export default new GameActionService();
