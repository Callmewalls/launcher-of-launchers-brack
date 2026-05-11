import {
  STEAM_CANDIDATE_ROOTS,
  findSteamGridImage,
  resolveSteamRoot,
  scanSteamInstalledGames,
} from '../application/local-scan/scanners/SteamInstalledScanner';
import { scanEAInstalledGames } from '../application/local-scan/scanners/EAInstalledScanner';
import { scanEpicInstalledGames } from '../application/local-scan/scanners/EpicInstalledScanner';
import { scanGogInstalledGames } from '../application/local-scan/scanners/GogInstalledScanner';
import { scanUplayInstalledGames } from '../application/local-scan/scanners/UplayInstalledScanner';
import { scanBattleNetInstalledGames } from '../application/local-scan/scanners/BattleNetInstalledScanner';
import { scanXboxInstalledGames } from '../application/local-scan/scanners/XboxInstalledScanner';
import type { ILauncherGame } from '@shared/types/launcher.types';

// ─────────────────────────────────────────────────────────────────────────────
// LocalGameScanner
//
// Reads local launcher data (manifests, VDF files, registry) to detect which
// games are currently installed on this machine — no API calls, no tokens.
//
// All methods are static and return [] gracefully on any error (wrong OS,
// launcher not installed, permission denied, etc.).
// ─────────────────────────────────────────────────────────────────────────────
export class LocalGameScanner {
  // ── Steam ──────────────────────────────────────────────────────────────────
  //
  // Reads appmanifest_*.acf files from every Steam library folder.
  // steamapps/libraryfolders.vdf lists additional library paths beyond the
  // default installation directory.

  /** Default candidate Steam root directories (Windows). */
  static readonly STEAM_CANDIDATE_ROOTS = [
    ...STEAM_CANDIDATE_ROOTS,
  ];

  /**
   * Returns the first reachable Steam root directory, or null when Steam is
   * not found.  Accepts an override to skip auto-detection.
   */
  static async resolveSteamRoot(overridePath?: string): Promise<string | null> {
    return resolveSteamRoot(overridePath);
  }

  static async scanSteam(overridePath?: string): Promise<ILauncherGame[]> {
    return scanSteamInstalledGames(overridePath);
  }

  /**
   * Returns the absolute path of the grid portrait image for a Steam app, or
   * undefined when no file is found.
   *
   * Steam names the file `library_600x900.(jpg|png)` and stores it under:
   *   <steam_root>\appcache\librarycache\<appid>\
   *
   * The folder name IS the numeric appid — direct 1:1 mapping.
   */
  static async findSteamGridImage(steamRoot: string, appId: string): Promise<string | undefined> {
    return findSteamGridImage(steamRoot, appId);
  }

  // ── Epic Games ─────────────────────────────────────────────────────────────
  //
  // Epic stores one JSON .item file per installed game in a fixed manifests dir.
  // Each file contains DisplayName, AppName, InstallLocation, bIsIncompleteInstall.

  static async scanEpic(overridePath?: string): Promise<ILauncherGame[]> {
    return scanEpicInstalledGames(overridePath);
  }

  // ── GOG Galaxy ─────────────────────────────────────────────────────────────
  //
  // GOG stores per-game data in the Windows registry.
  // HKLM\SOFTWARE\WOW6432Node\GOG.com\Games\<productId>
  //   GAMENAME  REG_SZ  <title>
  //   PATH      REG_SZ  <install dir>

  static async scanGog(installBasePath?: string): Promise<ILauncherGame[]> {
    return scanGogInstalledGames(installBasePath);
  }

  // ── Ubisoft Connect ────────────────────────────────────────────────────────
  //
  // HKLM\SOFTWARE\WOW6432Node\Ubisoft\Launcher\Installs\<gameId>
  //   InstallDir  REG_SZ  <path>
  // No game name in registry — use folder name as fallback title.

  static async scanUplay(installBasePath?: string): Promise<ILauncherGame[]> {
    return scanUplayInstalledGames(installBasePath);
  }

  // ── Battle.net ─────────────────────────────────────────────────────────────
  //
  static async scanBattleNet(installBasePath?: string): Promise<ILauncherGame[]> {
    return scanBattleNetInstalledGames(installBasePath);
  }

  // ── EA App / Origin ────────────────────────────────────────────────────────
  //
  // Strategy (in order):
  //  1. EA App catalog  — C:\ProgramData\EA Desktop\Catalog  (JSON files)
  //  2. Origin legacy   — C:\ProgramData\Origin\LocalContent  (.mfst files)
  //  3. Direct install  — C:\Program Files\EA Games (or x86)  (subdirs)
  //
  // installBasePath overrides the EA App catalog path (step 1) when provided.

  static async scanEA(installBasePath?: string): Promise<ILauncherGame[]> {
    return scanEAInstalledGames(installBasePath);
  }

  // ── Xbox App (PC) ──────────────────────────────────────────────────────────
  //
  // Strategy (in order):
  //  1. Custom override path from LauncherConfig / env
  //  2. C:\XboxGames
  //  3. C:\Program Files\ModifiableWindowsApps

  static async scanXbox(installBasePath?: string): Promise<ILauncherGame[]> {
    return scanXboxInstalledGames(installBasePath);
  }

}
