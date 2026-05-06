import { promises as fs } from 'fs';
import path from 'path';
import { execFile } from 'child_process';
import { promisify } from 'util';
import { Logger } from '@utils/logger';
import type { ILauncherGame } from '@shared/types/launcher.types';

const execFileAsync = promisify(execFile);

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
  private static readonly EXE_NAME_IGNORE_REGEX =
    /^(unins\d+|uninstall|crashhandler|unitycrashhandler|dotnetfx|vcredist|dxsetup|vc_redist|directx)/i;

  private static async resolveExecutablePath(
    installPath?: string,
    explicitExecutablePath?: string,
  ): Promise<string | undefined> {
    if (explicitExecutablePath) {
      const normalizedExplicit = explicitExecutablePath.replace(/^"|"$/g, '').trim();
      try {
        const explicitStat = await fs.stat(normalizedExplicit);
        if (explicitStat.isFile() && path.extname(normalizedExplicit).toLowerCase() === '.exe') {
          return normalizedExplicit;
        }
      } catch {
        // Explicit executable path is invalid or missing.
      }
    }

    if (!installPath) {
      return undefined;
    }

    try {
      const entries = await fs.readdir(installPath);
      const candidates: Array<{ fullPath: string; size: number }> = [];

      for (const entry of entries) {
        const fullPath = path.join(installPath, entry);
        const ext = path.extname(entry).toLowerCase();
        if (ext !== '.exe' || LocalGameScanner.EXE_NAME_IGNORE_REGEX.test(entry)) {
          continue;
        }

        try {
          const stat = await fs.stat(fullPath);
          if (stat.isFile()) {
            candidates.push({ fullPath, size: stat.size });
          }
        } catch {
          // Ignore files that cannot be stat'ed.
        }
      }

      candidates.sort((a, b) => b.size - a.size);
      return candidates[0]?.fullPath;
    } catch {
      return undefined;
    }
  }

  private static async normalizeInstalledGames(games: ILauncherGame[]): Promise<ILauncherGame[]> {
    const normalized: ILauncherGame[] = [];

    for (const game of games) {
      const executablePath = await LocalGameScanner.resolveExecutablePath(game.installPath, game.executablePath);
      if (!executablePath) {
        continue;
      }

      normalized.push({
        ...game,
        isInstalled: true,
        executablePath,
      });
    }

    return normalized;
  }


  // ── Steam ──────────────────────────────────────────────────────────────────
  //
  // Reads appmanifest_*.acf files from every Steam library folder.
  // steamapps/libraryfolders.vdf lists additional library paths beyond the
  // default installation directory.

  static async scanSteam(overridePath?: string): Promise<ILauncherGame[]> {
    const candidateBases = overridePath
      ? [overridePath]
      : [
          'C:\\Program Files (x86)\\Steam',
          'C:\\Program Files\\Steam',
          'D:\\Steam',
          'E:\\Steam',
        ];

    for (const base of candidateBases) {
      const steamAppsPath = path.join(base, 'steamapps');
      try {
        await fs.access(steamAppsPath);
        // Found a valid Steam install — collect all library paths from VDF
        const libraryPaths = await LocalGameScanner.getSteamLibraryPaths(steamAppsPath);
        const games: ILauncherGame[] = [];
        for (const libPath of libraryPaths) {
          const found = await LocalGameScanner.scanSteamAppsFolder(libPath);
          games.push(...found);
        }
        Logger.log(`[LocalGameScanner] Steam: found ${games.length} installed games`);
        return games;
      } catch {
        // Path doesn't exist or not accessible — try next candidate
      }
    }

    Logger.log('[LocalGameScanner] Steam: no installation found');
    return [];
  }

  private static async getSteamLibraryPaths(steamAppsPath: string): Promise<string[]> {
    const paths: string[] = [steamAppsPath];
    try {
      const vdfPath = path.join(steamAppsPath, 'libraryfolders.vdf');
      const content = await fs.readFile(vdfPath, 'utf-8');
      // VDF format: "path"   "D:\\SteamLibrary"
      for (const match of content.matchAll(/"path"\s+"([^"]+)"/gi)) {
        const libPath = match[1].replace(/\\\\/g, '\\');
        paths.push(path.join(libPath, 'steamapps'));
      }
    } catch {
      // libraryfolders.vdf not found — only default path
    }
    return paths;
  }

  private static async scanSteamAppsFolder(steamAppsPath: string): Promise<ILauncherGame[]> {
    const games: ILauncherGame[] = [];
    let entries: string[];
    try {
      entries = await fs.readdir(steamAppsPath);
    } catch {
      return games;
    }

    for (const file of entries.filter(f => f.startsWith('appmanifest_') && f.endsWith('.acf'))) {
      try {
        const content = await fs.readFile(path.join(steamAppsPath, file), 'utf-8');
        const appId      = LocalGameScanner.parseVdfValue(content, 'appid');
        const name       = LocalGameScanner.parseVdfValue(content, 'name');
        const stateFlags = parseInt(LocalGameScanner.parseVdfValue(content, 'StateFlags') ?? '0', 10);
        const installDir = LocalGameScanner.parseVdfValue(content, 'installdir');

        if (!appId || !name) continue;

        // StateFlags bit 2 (value 4) means "fully installed"
        // Bit 10 (value 1024) means "update required" — still playable
        const isFullyInstalled = (stateFlags & 4) !== 0;
        if (!isFullyInstalled) continue;

        games.push({
          launcherId: appId,
          title: name,
          isInstalled: true,
          installPath: installDir
            ? path.join(steamAppsPath, 'common', installDir)
            : undefined,
        });
      } catch {
        // Skip malformed ACF files
      }
    }
    return games;
  }

  private static parseVdfValue(content: string, key: string): string | undefined {
    const match = content.match(new RegExp(`"${key}"\\s+"([^"]+)"`, 'i'));
    return match?.[1];
  }

  // ── Epic Games ─────────────────────────────────────────────────────────────
  //
  // Epic stores one JSON .item file per installed game in a fixed manifests dir.
  // Each file contains DisplayName, AppName, InstallLocation, bIsIncompleteInstall.

  static async scanEpic(overridePath?: string): Promise<ILauncherGame[]> {
    const manifestsPath = overridePath
      ?? 'C:\\ProgramData\\Epic\\EpicGamesLauncher\\Data\\Manifests';

    try {
      const entries = await fs.readdir(manifestsPath);
      const games: ILauncherGame[] = [];

      for (const file of entries.filter(f => f.endsWith('.item'))) {
        try {
          const content = await fs.readFile(path.join(manifestsPath, file), 'utf-8');
          const manifest = JSON.parse(content) as Record<string, unknown>;

          if (manifest['bIsIncompleteInstall']) continue;
          // Skip engine/redistributables — they don't have a real display name
          if (!manifest['DisplayName'] && !manifest['AppName']) continue;

          games.push({
            launcherId: String(manifest['AppName'] ?? manifest['CatalogItemId'] ?? ''),
            title: String(manifest['DisplayName'] ?? manifest['AppName'] ?? 'Unknown Epic Game'),
            isInstalled: true,
            installPath: manifest['InstallLocation'] ? String(manifest['InstallLocation']) : undefined,
          });
        } catch {
          // Skip malformed .item files
        }
      }

      Logger.log(`[LocalGameScanner] Epic: found ${games.length} installed games`);
      return games;
    } catch {
      Logger.log('[LocalGameScanner] Epic: manifests directory not found');
      return [];
    }
  }

  // ── GOG Galaxy ─────────────────────────────────────────────────────────────
  //
  // GOG stores per-game data in the Windows registry.
  // HKLM\SOFTWARE\WOW6432Node\GOG.com\Games\<productId>
  //   GAMENAME  REG_SZ  <title>
  //   PATH      REG_SZ  <install dir>

  static async scanGog(installBasePath?: string): Promise<ILauncherGame[]> {
    // ── Registry scan (Windows only, primary) ───────────────────────────────
    if (process.platform === 'win32') {
      const registryPaths = [
        'HKLM\\SOFTWARE\\WOW6432Node\\GOG.com\\Games',
        'HKLM\\SOFTWARE\\GOG.com\\Games',
      ];

      for (const regPath of registryPaths) {
        try {
          const { stdout } = await execFileAsync('reg', ['query', regPath, '/s']);
          const games = await LocalGameScanner.normalizeInstalledGames(
            LocalGameScanner.parseGogRegistry(stdout),
          );
          if (games.length > 0) {
            Logger.log(`[LocalGameScanner] GOG: found ${games.length} installed games (registry)`);
            return games;
          }
        } catch {
          // Key not found — try next
        }
      }
    }

    // ── Directory fallback (custom installBasePath or common defaults) ───────
    const gogCandidatePaths = installBasePath
      ? [installBasePath]
      : [
          'C:\\GOG Games',
          'C:\\Program Files (x86)\\GOG Galaxy\\Games',
          'C:\\Program Files\\GOG Galaxy\\Games',
          'D:\\GOG Games',
          'E:\\GOG Games',
        ];

    const directoryGames = await LocalGameScanner.scanFirstNonEmptyInstallDir(gogCandidatePaths, 'gog_dir');
    if (directoryGames.length > 0) {
      Logger.log(`[LocalGameScanner] GOG: found ${directoryGames.length} installed games (directory fallback)`);
      return directoryGames;
    }

    Logger.log('[LocalGameScanner] GOG: no installation found');
    return [];
  }

  private static parseGogRegistry(regOutput: string): ILauncherGame[] {
    const games: ILauncherGame[] = [];
    // Split on blank lines to get per-game sections
    for (const section of regOutput.split(/\r?\n\r?\n/)) {
      const idMatch   = section.match(/GOG\.com\\Games\\(\d+)/i);
      const nameMatch = section.match(/GAMENAME\s+REG_SZ\s+(.+)/i);
      const pathMatch = section.match(/\bPATH\b\s+REG_SZ\s+(.+)/i);
      const launchMatch = section.match(/LAUNCHCOMMAND\s+REG_SZ\s+(.+)/i);
      if (!idMatch || !nameMatch) continue;

      // LAUNCHCOMMAND may be: "C:\path\game.exe" or "C:\path\game.exe" --args
      // Extract only the executable path, stripping surrounding quotes and args.
      let executablePath: string | undefined;
      if (launchMatch) {
        const raw = launchMatch[1].trim();
        // Quoted path: "C:\path\game.exe" ...
        const quotedMatch = raw.match(/^"([^"]+\.exe)"/i);
        if (quotedMatch) {
          executablePath = quotedMatch[1];
        } else {
          // Unquoted: take first token ending in .exe
          const unquotedMatch = raw.match(/^(\S+\.exe)/i);
          executablePath = unquotedMatch?.[1];
        }
      }

      games.push({
        launcherId: idMatch[1],
        title:       nameMatch[1].trim(),
        isInstalled: true,
        installPath: pathMatch?.[1].trim(),
        executablePath,
      });
    }
    return games;
  }

  // ── Ubisoft Connect ────────────────────────────────────────────────────────
  //
  // HKLM\SOFTWARE\WOW6432Node\Ubisoft\Launcher\Installs\<gameId>
  //   InstallDir  REG_SZ  <path>
  // No game name in registry — use folder name as fallback title.

  static async scanUplay(installBasePath?: string): Promise<ILauncherGame[]> {
    // ── Registry scan (Windows only, primary) ───────────────────────────────
    if (process.platform === 'win32') {
      try {
        const { stdout } = await execFileAsync('reg', [
          'query',
          'HKLM\\SOFTWARE\\WOW6432Node\\Ubisoft\\Launcher\\Installs',
          '/s',
        ]);
        const games = LocalGameScanner.parseUplayRegistry(stdout);
        if (games.length > 0) {
          Logger.log(`[LocalGameScanner] Ubisoft: found ${games.length} installed games (registry)`);
          return games;
        }
      } catch {
        // Registry key not found — fall through to directory scan
      }
    }

    // ── Directory fallback (custom installBasePath or common defaults) ───────
    const uplayCandidatePaths = installBasePath
      ? [installBasePath]
      : [
          'C:\\Program Files (x86)\\Ubisoft\\Ubisoft Game Launcher\\games',
          'C:\\Program Files\\Ubisoft\\Ubisoft Game Launcher\\games',
          'C:\\Ubisoft Games',
          'D:\\Ubisoft Games',
          'E:\\Ubisoft Games',
        ];

    const directoryGames = await LocalGameScanner.scanFirstNonEmptyInstallDir(uplayCandidatePaths, 'uplay_dir');
    if (directoryGames.length > 0) {
      Logger.log(`[LocalGameScanner] Ubisoft: found ${directoryGames.length} installed games (directory fallback)`);
      return directoryGames;
    }

    Logger.log('[LocalGameScanner] Ubisoft: no installation found');
    return [];
  }

  private static parseUplayRegistry(regOutput: string): ILauncherGame[] {
    const games: ILauncherGame[] = [];
    for (const section of regOutput.split(/\r?\n\r?\n/)) {
      const idMatch   = section.match(/Installs\\(\d+)/i);
      const pathMatch = section.match(/InstallDir\s+REG_SZ\s+(.+)/i);
      if (!idMatch) continue;

      const installPath = pathMatch?.[1].trim();
      games.push({
        launcherId:  idMatch[1],
        title:       installPath ? path.basename(installPath.replace(/[/\\]+$/, '')) : `Ubisoft Game ${idMatch[1]}`,
        isInstalled: true,
        installPath,
      });
    }
    return games;
  }

  // ── Battle.net ─────────────────────────────────────────────────────────────
  //
  // Blizzard has no clean public manifest format; each product has its own
  // registry key. We probe known registry paths for each title.

  private static readonly BATTLENET_GAMES: ReadonlyArray<{ id: string; name: string; regKey: string }> = [
    { id: 'WoW',   name: 'World of Warcraft',      regKey: 'HKLM\\SOFTWARE\\WOW6432Node\\Blizzard Entertainment\\World of Warcraft' },
    { id: 'D3',    name: 'Diablo III',              regKey: 'HKLM\\SOFTWARE\\WOW6432Node\\Blizzard Entertainment\\Diablo III' },
    { id: 'D4',    name: 'Diablo IV',               regKey: 'HKLM\\SOFTWARE\\WOW6432Node\\Blizzard Entertainment\\Diablo IV' },
    { id: 'S1',    name: 'StarCraft',               regKey: 'HKLM\\SOFTWARE\\WOW6432Node\\Blizzard Entertainment\\StarCraft' },
    { id: 'S2',    name: 'StarCraft II',             regKey: 'HKLM\\SOFTWARE\\WOW6432Node\\Blizzard Entertainment\\StarCraft II' },
    { id: 'HS',    name: 'Hearthstone',             regKey: 'HKLM\\SOFTWARE\\WOW6432Node\\Blizzard Entertainment\\Hearthstone' },
    { id: 'HotS',  name: 'Heroes of the Storm',     regKey: 'HKLM\\SOFTWARE\\WOW6432Node\\Blizzard Entertainment\\Heroes of the Storm' },
    { id: 'VIPR',  name: 'Overwatch 2',             regKey: 'HKLM\\SOFTWARE\\WOW6432Node\\Blizzard Entertainment\\Overwatch' },
    { id: 'W3',    name: 'Warcraft III: Reforged',  regKey: 'HKLM\\SOFTWARE\\WOW6432Node\\Blizzard Entertainment\\Warcraft III' },
    { id: 'ANBS',  name: 'Diablo Immortal',         regKey: 'HKLM\\SOFTWARE\\WOW6432Node\\Blizzard Entertainment\\Diablo Immortal' },
  ];

  static async scanBattleNet(installBasePath?: string): Promise<ILauncherGame[]> {
    // ── Registry scan (Windows only, primary) ───────────────────────────────
    if (process.platform === 'win32') {
      // Query all known registry keys concurrently
      const settlements = await Promise.allSettled(
        LocalGameScanner.BATTLENET_GAMES.map(async (entry) => {
          const { stdout } = await execFileAsync('reg', ['query', entry.regKey]);
          const pathMatch = stdout.match(/(?:GamePath|InstallPath|InstallLocation)\s+REG_SZ\s+(.+)/i);
          return {
            launcherId:  entry.id,
            title:       entry.name,
            isInstalled: true,
            installPath: pathMatch?.[1].trim(),
          } satisfies ILauncherGame;
        }),
      );

      const games: ILauncherGame[] = [];
      for (const s of settlements) {
        if (s.status === 'fulfilled') games.push(s.value);
        // rejected = key absent = game not installed — skip silently
      }

      if (games.length > 0) {
        Logger.log(`[LocalGameScanner] Battle.net: found ${games.length} installed games (registry)`);
        return games;
      }
    }

    // ── Directory fallback (custom installBasePath or common defaults) ───────
    const battleNetCandidatePaths = installBasePath
      ? [installBasePath]
      : [
          'C:\\Program Files (x86)\\Battle.net\\Games',
          'C:\\Program Files\\Battle.net\\Games',
          'C:\\Program Files (x86)\\Blizzard App\\Games',
          'C:\\Program Files\\Blizzard App\\Games',
          'D:\\Battle.net\\Games',
          'E:\\Battle.net\\Games',
        ];

    const directoryGames = await LocalGameScanner.scanFirstNonEmptyInstallDir(battleNetCandidatePaths, 'bnet_dir');
    if (directoryGames.length > 0) {
      // Try to match directory names to known Battle.net titles
      const enriched = directoryGames.map(g => {
        const known = LocalGameScanner.BATTLENET_GAMES.find(
          e => e.name.toLowerCase().includes(g.title.toLowerCase()) ||
               g.title.toLowerCase().includes(e.name.toLowerCase()),
        );
        return known ? { ...g, launcherId: known.id, title: known.name } : g;
      });
      Logger.log(`[LocalGameScanner] Battle.net: found ${enriched.length} installed games (directory fallback)`);
      return enriched;
    }

    Logger.log('[LocalGameScanner] Battle.net: no installation found');
    return [];
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
    const eaAppCatalog  = installBasePath ?? 'C:\\ProgramData\\EA Desktop\\Catalog';
    const originContent = 'C:\\ProgramData\\Origin\\LocalContent';
    const directDirs    = [
      'C:\\Program Files\\EA Games',
      'C:\\Program Files (x86)\\EA Games',
    ];

    const eaGames = await LocalGameScanner.scanEAAppCatalog(eaAppCatalog);
    if (eaGames.length > 0) {
      Logger.log(`[LocalGameScanner] EA App: found ${eaGames.length} installed games`);
      return eaGames;
    }

    const originGames = await LocalGameScanner.scanOriginContent(originContent);
    if (originGames.length > 0) {
      Logger.log(`[LocalGameScanner] Origin: found ${originGames.length} installed games`);
      return originGames;
    }

    const directGames = await LocalGameScanner.scanFirstNonEmptyInstallDir(directDirs, 'ea');
    Logger.log(`[LocalGameScanner] EA direct install: found ${directGames.length} installed games`);
    return directGames;
  }

  private static async scanEAAppCatalog(catalogPath: string): Promise<ILauncherGame[]> {
    const games: ILauncherGame[] = [];
    try {
      for (const entry of await fs.readdir(catalogPath)) {
        const entryPath = path.join(catalogPath, entry);
        try {
          if (!(await fs.stat(entryPath)).isDirectory()) continue;

          for (const file of await fs.readdir(entryPath)) {
            if (!file.endsWith('.json')) continue;
            try {
              const content = await fs.readFile(path.join(entryPath, file), 'utf-8');
              const data = JSON.parse(content) as Record<string, unknown>;
              games.push({
                launcherId:  String(data['gameId'] ?? data['id'] ?? entry),
                title:       String(data['title'] ?? data['displayName'] ?? entry),
                isInstalled: true,
                installPath: data['installPath'] ? String(data['installPath']) : undefined,
              });
              break; // one JSON file per game folder is enough
            } catch {
              // Skip malformed JSON
            }
          }
        } catch {
          // Skip inaccessible subdirectory
        }
      }
    } catch {
      // Catalog path doesn't exist
    }
    return games;
  }

  private static async scanOriginContent(contentPath: string): Promise<ILauncherGame[]> {
    const games: ILauncherGame[] = [];
    try {
      for (const gameName of await fs.readdir(contentPath)) {
        const gamePath = path.join(contentPath, gameName);
        try {
          if (!(await fs.stat(gamePath)).isDirectory()) continue;

          // Each game folder contains a subfolder named after the content ID
          // which contains a <id>.mfst file (URL-encoded key=value pairs)
          for (const subDir of await fs.readdir(gamePath)) {
            const mfstFile = path.join(gamePath, subDir, `${subDir}.mfst`);
            try {
              const content = await fs.readFile(mfstFile, 'utf-8');
              const params  = new URLSearchParams(content.replace(/^\?/, ''));
              const gameId  = params.get('id');
              if (!gameId) continue;

              const installPath = params.get('dipInstallPath') ?? undefined;
              games.push({
                launcherId:  gameId,
                title:       installPath ? path.basename(installPath) : gameName,
                isInstalled: true,
                installPath,
              });
              break; // one .mfst per game
            } catch {
              // No mfst file in this subdir
            }
          }
        } catch {
          // Skip inaccessible game folder
        }
      }
    } catch {
      // Content path doesn't exist
    }
    return games;
  }

  // ── Generic directory scanner ──────────────────────────────────────────────
  //
  // Lists immediate subdirectories of installBasePath, treating each as a
  // separate game installation.  Used as a fallback when registry/manifest
  // scanning fails or is not available (non-Windows, missing keys, etc.).
  //
  // launcherIdPrefix is a short string prepended to the directory name so the
  // resulting launcherId stays unique even when the same folder name appears in
  // multiple launchers.

  private static async scanInstallDir(
    installBasePath: string,
    launcherIdPrefix: string,
  ): Promise<ILauncherGame[]> {
    const discoveredGames: ILauncherGame[] = [];
    try {
      const entries = await fs.readdir(installBasePath);
      for (const entry of entries) {
        const fullPath = path.join(installBasePath, entry);
        try {
          const stat = await fs.stat(fullPath);
          if (!stat.isDirectory()) continue;
          discoveredGames.push({
            launcherId:  `${launcherIdPrefix}_${entry}`,
            title:       entry,
            isInstalled: false,
            installPath: fullPath,
          });
        } catch {
          // Skip inaccessible entry
        }
      }
    } catch {
      // Base path doesn't exist or not accessible
    }
    return LocalGameScanner.normalizeInstalledGames(discoveredGames);
  }

  private static async scanFirstNonEmptyInstallDir(
    candidatePaths: string[],
    launcherIdPrefix: string,
  ): Promise<ILauncherGame[]> {
    for (const candidatePath of candidatePaths) {
      const games = await LocalGameScanner.scanInstallDir(candidatePath, launcherIdPrefix);
      if (games.length > 0) return games;
    }
    return [];
  }
}
