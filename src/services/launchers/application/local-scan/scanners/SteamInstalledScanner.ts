import { promises as fs } from 'fs';
import path from 'path';
import { Logger } from '@utils/logger';
import type { ILauncherGame } from '@shared/types/launcher.types';

export const STEAM_CANDIDATE_ROOTS = [
  'C:\\Program Files (x86)\\Steam',
  'C:\\Program Files\\Steam',
  'D:\\Steam',
  'E:\\Steam',
];

export async function resolveSteamRoot(overridePath?: string): Promise<string | null> {
  const candidates = overridePath ? [overridePath] : STEAM_CANDIDATE_ROOTS;
  for (const base of candidates) {
    const normalizedBase = base.toLowerCase().endsWith('\\steamapps')
      ? path.dirname(base)
      : base;
    try {
      await fs.access(path.join(normalizedBase, 'steamapps'));
      return normalizedBase;
    } catch {
      // not found, try next
    }
  }
  return null;
}

export async function scanSteamInstalledGames(overridePath?: string): Promise<ILauncherGame[]> {
  const candidateBases = overridePath
    ? [overridePath]
    : STEAM_CANDIDATE_ROOTS;

  for (const base of candidateBases) {
    const steamAppsPath = path.join(base, 'steamapps');
    try {
      await fs.access(steamAppsPath);
      const steamRootForGrid = await resolveSteamGridCacheRoot(base);
      const libraryPaths = await getSteamLibraryPaths(steamAppsPath);
      const games: ILauncherGame[] = [];
      for (const libPath of libraryPaths) {
        const found = await scanSteamAppsFolder(libPath, steamRootForGrid);
        games.push(...found);
      }
      const withGrid = games.filter((game) => !!game.gridImagePath).length;
      Logger.log(`[LocalGameScanner] Steam: grid images resolved ${withGrid}/${games.length} (cache root: ${steamRootForGrid ?? 'not found'})`);
      Logger.log(`[LocalGameScanner] Steam: found ${games.length} installed games`);
      return games;
    } catch {
      // Path doesn't exist or not accessible — try next candidate
    }
  }

  Logger.log('[LocalGameScanner] Steam: no installation found');
  return [];
}

export async function findSteamGridImage(steamRoot: string, appId: string): Promise<string | undefined> {
  const cacheDir = path.join(steamRoot, 'appcache', 'librarycache');
  const nestedDir = path.join(cacheDir, appId);
  const candidates = [
    path.join(nestedDir, 'library_600x900.jpg'),
    path.join(nestedDir, 'library_600x900.png'),
    path.join(cacheDir, `${appId}_library_600x900.jpg`),
    path.join(cacheDir, `${appId}_library_600x900.png`),
  ];

  for (const fullPath of candidates) {
    try {
      await fs.access(fullPath);
      return fullPath;
    } catch {
      // file not found, try next
    }
  }

  return undefined;
}

async function getSteamLibraryPaths(steamAppsPath: string): Promise<string[]> {
  const paths: string[] = [steamAppsPath];
  try {
    const vdfPath = path.join(steamAppsPath, 'libraryfolders.vdf');
    const content = await fs.readFile(vdfPath, 'utf-8');
    for (const match of content.matchAll(/"path"\s+"([^"]+)"/gi)) {
      const libPath = match[1].replace(/\\\\/g, '\\');
      paths.push(path.join(libPath, 'steamapps'));
    }
  } catch {
    // libraryfolders.vdf not found — only default path
  }
  return paths;
}

async function resolveSteamGridCacheRoot(preferredBase?: string): Promise<string | null> {
  const candidates = [
    ...(preferredBase ? [preferredBase] : []),
    ...STEAM_CANDIDATE_ROOTS,
  ];

  const seen = new Set<string>();
  for (const candidate of candidates) {
    const normalized = candidate.toLowerCase().endsWith('\\steamapps')
      ? path.dirname(candidate)
      : candidate;
    if (seen.has(normalized.toLowerCase())) continue;
    seen.add(normalized.toLowerCase());
    try {
      await fs.access(path.join(normalized, 'appcache', 'librarycache'));
      return normalized;
    } catch {
      // no cache dir, try next candidate
    }
  }

  return null;
}

async function scanSteamAppsFolder(steamAppsPath: string, steamRootForGrid?: string | null): Promise<ILauncherGame[]> {
  const games: ILauncherGame[] = [];
  let entries: string[];
  try {
    entries = await fs.readdir(steamAppsPath);
  } catch {
    return games;
  }

  const steamRoot = steamRootForGrid ?? path.dirname(steamAppsPath);

  for (const file of entries.filter((entry) => entry.startsWith('appmanifest_') && entry.endsWith('.acf'))) {
    try {
      const content = await fs.readFile(path.join(steamAppsPath, file), 'utf-8');
      const appId = parseVdfValue(content, 'appid');
      const name = parseVdfValue(content, 'name');
      const stateFlags = parseInt(parseVdfValue(content, 'StateFlags') ?? '0', 10);
      const installDir = parseVdfValue(content, 'installdir');

      if (!appId || !name) continue;

      const isFullyInstalled = (stateFlags & 4) !== 0;
      if (!isFullyInstalled) continue;

      const gridImagePath = await findSteamGridImage(steamRoot, appId);
      games.push({
        launcherId: appId,
        title: name,
        isInstalled: true,
        installPath: installDir
          ? path.join(steamAppsPath, 'common', installDir)
          : undefined,
        gridImagePath,
      });
    } catch {
      // Skip malformed ACF files
    }
  }

  return games;
}

function parseVdfValue(content: string, key: string): string | undefined {
  const match = content.match(new RegExp(`"${key}"\\s+"([^"]+)"`, 'i'));
  return match?.[1];
}