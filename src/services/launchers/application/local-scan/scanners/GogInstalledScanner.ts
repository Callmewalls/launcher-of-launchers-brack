import { execFile } from 'child_process';
import { promisify } from 'util';
import { Logger } from '@utils/logger';
import {
  normalizeInstalledGames,
  scanFirstNonEmptyInstallDir,
} from '../shared/InstalledGameDiscovery';
import type { ILauncherGame } from '@shared/types/launcher.types';

const execFileAsync = promisify(execFile);

export async function scanGogInstalledGames(installBasePath?: string): Promise<ILauncherGame[]> {
  if (process.platform === 'win32') {
    const registryPaths = [
      'HKLM\\SOFTWARE\\WOW6432Node\\GOG.com\\Games',
      'HKLM\\SOFTWARE\\GOG.com\\Games',
    ];

    for (const regPath of registryPaths) {
      try {
        const { stdout } = await execFileAsync('reg', ['query', regPath, '/s']);
        const games = await normalizeInstalledGames(parseGogRegistry(stdout));
        if (games.length > 0) {
          Logger.log(`[LocalGameScanner] GOG: found ${games.length} installed games (registry)`);
          return games;
        }
      } catch {
        // Key not found — try next
      }
    }
  }

  const gogCandidatePaths = installBasePath
    ? [installBasePath]
    : [
        'C:\\GOG Games',
        'C:\\Program Files (x86)\\GOG Galaxy\\Games',
        'C:\\Program Files\\GOG Galaxy\\Games',
        'D:\\GOG Games',
        'E:\\GOG Games',
      ];

  const directoryGames = await scanFirstNonEmptyInstallDir(gogCandidatePaths, 'gog_dir');
  if (directoryGames.length > 0) {
    Logger.log(`[LocalGameScanner] GOG: found ${directoryGames.length} installed games (directory fallback)`);
    return directoryGames;
  }

  Logger.log('[LocalGameScanner] GOG: no installation found');
  return [];
}

function parseGogRegistry(regOutput: string): ILauncherGame[] {
  const games: ILauncherGame[] = [];
  for (const section of regOutput.split(/\r?\n\r?\n/)) {
    const idMatch = section.match(/GOG\.com\\Games\\(\d+)/i);
    const nameMatch = section.match(/GAMENAME\s+REG_SZ\s+(.+)/i);
    const pathMatch = section.match(/\bPATH\b\s+REG_SZ\s+(.+)/i);
    const launchMatch = section.match(/LAUNCHCOMMAND\s+REG_SZ\s+(.+)/i);
    if (!idMatch || !nameMatch) continue;

    let executablePath: string | undefined;
    if (launchMatch) {
      const raw = launchMatch[1].trim();
      const quotedMatch = raw.match(/^"([^"]+\.exe)"/i);
      if (quotedMatch) {
        executablePath = quotedMatch[1];
      } else {
        const unquotedMatch = raw.match(/^(\S+\.exe)/i);
        executablePath = unquotedMatch?.[1];
      }
    }

    games.push({
      launcherId: idMatch[1],
      title: nameMatch[1].trim(),
      isInstalled: true,
      installPath: pathMatch?.[1].trim(),
      executablePath,
    });
  }
  return games;
}