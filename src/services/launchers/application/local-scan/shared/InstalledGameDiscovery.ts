import { promises as fs } from 'fs';
import path from 'path';
import type { ILauncherGame } from '@shared/types/launcher.types';

const EXE_NAME_IGNORE_REGEX =
  /^(unins\d*|uninstall|crashhandler|unitycrashhandler|dotnetfx|vcredist|dxsetup|vc_redist|directx|updater|update|patcher|patch|setup|installer|helper|service|agent|easyanticheat|be_service|battleye|crashpad|crashreport|crash_report|bugreport|redist|redistrib|installscript|prerequisite)/i;

function scoreTitleMatch(exeBaseName: string, gameTitle: string): number {
  const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, '');
  const tokenize = (value: string) =>
    value.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter((word) => word.length > 2);

  const normalizedExe = normalize(exeBaseName);
  const normalizedTitle = normalize(gameTitle);

  if (normalizedTitle.length >= 3 && normalizedExe.includes(normalizedTitle)) return 100;
  if (normalizedExe.length >= 3 && normalizedTitle.includes(normalizedExe)) return 90;

  const titleWords = tokenize(gameTitle);
  if (titleWords.length === 0) return 0;

  const matchingWords = titleWords.filter((word) => normalizedExe.includes(word));
  return Math.round((matchingWords.length / titleWords.length) * 80);
}

async function collectExeCandidatesRecursive(
  dirPath: string,
  gameTitle: string | undefined,
  depth = 0,
  maxDepth = 2,
): Promise<Array<{ fullPath: string; size: number; score: number }>> {
  if (depth > maxDepth) return [];

  const candidates: Array<{ fullPath: string; size: number; score: number }> = [];
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (ext !== '.exe' || EXE_NAME_IGNORE_REGEX.test(entry.name)) {
          continue;
        }

        try {
          const stat = await fs.stat(fullPath);
          if (!stat.isFile()) continue;
          const baseName = path.basename(entry.name, '.exe');
          const score = gameTitle ? scoreTitleMatch(baseName, gameTitle) : 0;
          candidates.push({ fullPath, size: stat.size, score });
        } catch {
          // Ignore files that cannot be stat'ed.
        }
        continue;
      }

      if (entry.isDirectory() && depth < maxDepth) {
        const nested = await collectExeCandidatesRecursive(fullPath, gameTitle, depth + 1, maxDepth);
        candidates.push(...nested);
      }
    }
  } catch {
    // Directory is not accessible.
  }

  return candidates;
}

async function resolveExecutablePath(
  installPath?: string,
  explicitExecutablePath?: string,
  gameTitle?: string,
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
    const candidates: Array<{ fullPath: string; size: number; score: number }> = [];

    for (const entry of entries) {
      const fullPath = path.join(installPath, entry);
      const ext = path.extname(entry).toLowerCase();
      if (ext !== '.exe' || EXE_NAME_IGNORE_REGEX.test(entry)) {
        continue;
      }

      try {
        const stat = await fs.stat(fullPath);
        if (stat.isFile()) {
          const baseName = path.basename(entry, '.exe');
          const score = gameTitle ? scoreTitleMatch(baseName, gameTitle) : 0;
          candidates.push({ fullPath, size: stat.size, score });
        }
      } catch {
        // Ignore files that cannot be stat'ed.
      }
    }

    candidates.sort((left, right) => {
      const scoreDiff = right.score - left.score;
      return scoreDiff !== 0 ? scoreDiff : right.size - left.size;
    });

    if (candidates.length > 0) {
      return candidates[0]?.fullPath;
    }

    // Some launchers (including several Xbox/Game Pass installs) place the game
    // executable in a nested folder rather than in install root.
    const deepCandidates = await collectExeCandidatesRecursive(installPath, gameTitle, 0, 2);
    deepCandidates.sort((left, right) => {
      const scoreDiff = right.score - left.score;
      return scoreDiff !== 0 ? scoreDiff : right.size - left.size;
    });

    return deepCandidates[0]?.fullPath;
  } catch {
    return undefined;
  }
}

export async function normalizeInstalledGames(games: ILauncherGame[]): Promise<ILauncherGame[]> {
  const normalized: ILauncherGame[] = [];

  for (const game of games) {
    const executablePath = await resolveExecutablePath(
      game.installPath,
      game.executablePath,
      game.title,
    );
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

export async function scanInstallDir(
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
          launcherId: `${launcherIdPrefix}_${entry}`,
          title: entry,
          isInstalled: false,
          installPath: fullPath,
        });
      } catch {
        // Skip inaccessible entry.
      }
    }
  } catch {
    // Base path doesn't exist or is not accessible.
  }

  return normalizeInstalledGames(discoveredGames);
}

export async function scanFirstNonEmptyInstallDir(
  candidatePaths: string[],
  launcherIdPrefix: string,
): Promise<ILauncherGame[]> {
  for (const candidatePath of candidatePaths) {
    const games = await scanInstallDir(candidatePath, launcherIdPrefix);
    if (games.length > 0) {
      return games;
    }
  }

  return [];
}