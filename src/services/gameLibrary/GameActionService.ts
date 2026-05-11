import { spawn } from 'child_process';
import UserGame from '@entities/UserGame.model';
import GameCatalog, { GAME_CATALOG_ASSOC } from '@entities/Game.model';
import { launcherRegistry } from '@services/launchers/core/LauncherServiceRegistry';
import { resolveExecutableFromInstallPath } from '@services/launchers/application/game-control/ExecutableResolver';
import { executeLaunchFlow } from '@services/launchers/application/game-control/LaunchStrategy';
import { executeInstallFlow } from '@services/launchers/application/game-control/InstallStrategy';
import { executeUninstallFlow } from '@services/launchers/application/game-control/UninstallStrategy';
import { Logger } from '@utils/logger';
import type { LauncherType } from '@shared/types/launcher.types';

export interface GameActionResult {
  success: boolean;
  /** True when the OS was instructed to open/run something (process or protocol URL). */
  launched: boolean;
  /** Protocol URL used, returned so the client can open it if the backend cannot. */
  protocolUrl?: string;
  message?: string;
  error?: string;
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
    const service = launcherRegistry.isSupported(catalog.launcher)
      ? launcherRegistry.get(catalog.launcher)
      : undefined;
    const caps = service?.getCapabilities();

    return executeLaunchFlow({
      launcher: catalog.launcher,
      launcherId: catalog.launcherId,
      title: catalog.title,
      storedExecutablePath: userGame.executablePath ?? undefined,
      capabilities: caps,
      discoverAndPersistExe: async () => {
        if (!service) return undefined;
        return this.discoverAndPersistExe(userGame, catalog, service);
      },
      spawnExecutable,
    });
  }

  /**
   * Discovers the game's executable by running a live local scan for its launcher,
   * then persists installPath + executablePath to the DB so future launches are instant.
   * Returns the exe path if found, undefined otherwise.
   */
  private async discoverAndPersistExe(
    userGame: UserGame,
    catalog: GameCatalog,
    service: import('@services/launchers/base/ILauncherService').ILauncherService,
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
    return executeInstallFlow({
      launcher: catalog.launcher,
      launcherId: catalog.launcherId,
      title: catalog.title,
    });
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

    return executeUninstallFlow({
      launcher: catalog.launcher,
      launcherId: catalog.launcherId,
      title: catalog.title,
      installPath: userGame.installPath ?? undefined,
      spawnExecutable,
    });
  }
}

export default new GameActionService();
