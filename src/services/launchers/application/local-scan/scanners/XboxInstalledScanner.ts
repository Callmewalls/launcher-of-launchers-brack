import path from 'path';
import { promises as fs } from 'fs';
import { Logger } from '@utils/logger';
import { scanInstallDir } from '../shared/InstalledGameDiscovery';
import type { ILauncherGame } from '@shared/types/launcher.types';

const PNG_SIGNATURE = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

interface PngDimensions {
  width: number;
  height: number;
}

interface PngCandidate {
  fullPath: string;
  width?: number;
  height?: number;
  size: number;
}

async function listAvailableDriveRoots(): Promise<string[]> {
  const roots: string[] = [];

  for (let code = 67; code <= 90; code += 1) {
    const drive = `${String.fromCharCode(code)}:\\`;
    try {
      await fs.access(drive);
      roots.push(drive);
    } catch {
      // Drive does not exist or is inaccessible.
    }
  }

  return roots;
}

async function getDefaultXboxCandidatePaths(): Promise<string[]> {
  const programFiles = process.env['ProgramFiles'] || 'C:\\Program Files';
  const defaults = [
    'C:\\XboxGames',
    path.join(programFiles, 'ModifiableWindowsApps'),
  ];

  const driveRoots = await listAvailableDriveRoots();
  const perDrive = driveRoots.flatMap((root) => [
    path.join(root, 'XboxGames'),
    path.join(root, 'Program Files', 'ModifiableWindowsApps'),
  ]);

  return Array.from(new Set([...defaults, ...perDrive]));
}

async function readPngDimensions(filePath: string): Promise<PngDimensions | undefined> {
  try {
    const handle = await fs.open(filePath, 'r');
    try {
      const buffer = Buffer.alloc(24);
      const { bytesRead } = await handle.read(buffer, 0, buffer.length, 0);
      if (bytesRead < 24) return undefined;
      if (!buffer.subarray(0, 8).equals(PNG_SIGNATURE)) return undefined;

      const width = buffer.readUInt32BE(16);
      const height = buffer.readUInt32BE(20);
      if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
        return undefined;
      }

      return { width, height };
    } finally {
      await handle.close();
    }
  } catch {
    return undefined;
  }
}

async function collectPngCandidates(
  dirPath: string,
  depth = 0,
  maxDepth = 2,
): Promise<PngCandidate[]> {
  if (depth > maxDepth) return [];

  const results: PngCandidate[] = [];
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      
      if (entry.isFile() && path.extname(entry.name).toLowerCase() === '.png') {
        try {
          const stat = await fs.stat(fullPath);
          const dimensions = await readPngDimensions(fullPath);
          results.push({
            fullPath,
            width: dimensions?.width,
            height: dimensions?.height,
            size: stat.size,
          });
        } catch {
          // Skip unreadable candidate.
        }
        continue;
      }

      if (entry.isDirectory() && depth < maxDepth) {
        const nested = await collectPngCandidates(fullPath, depth + 1, maxDepth);
        results.push(...nested);
      }
    }
  } catch {
    // Ignore inaccessible icon folders.
  }

  return results;
}

function scorePngCandidate(candidate: PngCandidate): number {
  const name = path.basename(candidate.fullPath).toLowerCase();
  let score = 0;

  // Prefer square artwork for Xbox grid tiles (target ratio 1:1).
  if (candidate.width && candidate.height) {
    const ratio = candidate.width / candidate.height;
    const targetRatio = 1;
    const ratioPenalty = Math.abs(ratio - targetRatio) * 1_000;
    const area = candidate.width * candidate.height;

    score += Math.max(0, 2_000 - ratioPenalty);
    score += Math.min(area / 200, 6_000);

    // Strongly penalize wide horizontal assets (e.g. 16:9 splash images).
    if (ratio > 1.2) {
      score -= 10_000;
    }
  }

  if (/(square|tile|logo|grid)/i.test(name)) score += 1_500;
  if (/(hero|poster|cover|key.?art|splash|wide)/i.test(name)) score -= 800;
  if (/(icon|badge|small|storelogo|appicon)/i.test(name)) score -= 1_000;

  // Prefer common Xbox packaging tile assets when available.
  if (/(square310x310logo|310x310)/i.test(name)) score += 3_500;
  if (/(square480x480logo|480x480)/i.test(name)) score += 1_500;
  if (/^logo\./i.test(name)) score -= 1_200;

  // File size as tie breaker.
  score += Math.min(candidate.size / 1_024, 1_500);
  return score;
}

async function findBestXboxGridImage(installPath?: string): Promise<string | undefined> {
  if (!installPath) return undefined;

  const roots = [
    path.join(installPath, 'Content'),
    path.join(installPath, 'Content', 'icons'),
    path.join(installPath, 'Content', 'Images'),
    path.join(installPath, 'icons'),
  ];

  const allCandidates: PngCandidate[] = [];
  for (const root of roots) {
    const found = await collectPngCandidates(root, 0, 2);
    allCandidates.push(...found);
  }

  if (allCandidates.length === 0) return undefined;

  allCandidates.sort((left, right) => scorePngCandidate(right) - scorePngCandidate(left));
  return allCandidates[0]?.fullPath;
}

export async function scanXboxInstalledGames(overridePath?: string): Promise<ILauncherGame[]> {
  const candidatePaths = overridePath ? [overridePath] : await getDefaultXboxCandidatePaths();
  const collected: ILauncherGame[] = [];
  const seen = new Set<string>();

  for (const candidatePath of candidatePaths) {
    const games = await scanInstallDir(candidatePath, 'xbox');
    if (games.length === 0) {
      continue;
    }

    Logger.log(`[LocalGameScanner] Xbox: found ${games.length} installed games in ${candidatePath}`);

    for (const game of games) {
      const dedupeKey = `${game.title.toLowerCase()}|${(game.installPath ?? '').toLowerCase()}`;
      if (seen.has(dedupeKey)) continue;
      seen.add(dedupeKey);

      const gridImagePath = await findBestXboxGridImage(game.installPath);
      collected.push({
        ...game,
        gridImagePath,
      });
    }
  }

  if (collected.length > 0) {
    const withGrid = collected.filter((game) => !!game.gridImagePath).length;
    Logger.log(`[LocalGameScanner] Xbox: total installed games detected ${collected.length}, with grid ${withGrid}`);
    return collected;
  }

  Logger.log('[LocalGameScanner] Xbox: install directories not found or empty');
  return [];
}