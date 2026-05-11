import path from 'path';
import { execFile } from 'child_process';
import { promisify } from 'util';
import { Logger } from '@utils/logger';
import { scanFirstNonEmptyInstallDir } from '../shared/InstalledGameDiscovery';
import type { ILauncherGame } from '@shared/types/launcher.types';

const execFileAsync = promisify(execFile);

export async function scanUplayInstalledGames(installBasePath?: string): Promise<ILauncherGame[]> {
  if (process.platform === 'win32') {
    try {
      const { stdout } = await execFileAsync('reg', [
        'query',
        'HKLM\\SOFTWARE\\WOW6432Node\\Ubisoft\\Launcher\\Installs',
        '/s',
      ]);
      const games = parseUplayRegistry(stdout);
      if (games.length > 0) {
        Logger.log(`[LocalGameScanner] Ubisoft: found ${games.length} installed games (registry)`);
        return games;
      }
    } catch {
      // Registry key not found — fall through to directory scan
    }
  }

  const uplayCandidatePaths = installBasePath
    ? [installBasePath]
    : [
        'C:\\Program Files (x86)\\Ubisoft\\Ubisoft Game Launcher\\games',
        'C:\\Program Files\\Ubisoft\\Ubisoft Game Launcher\\games',
        'C:\\Ubisoft Games',
        'D:\\Ubisoft Games',
        'E:\\Ubisoft Games',
      ];

  const directoryGames = await scanFirstNonEmptyInstallDir(uplayCandidatePaths, 'uplay_dir');
  if (directoryGames.length > 0) {
    Logger.log(`[LocalGameScanner] Ubisoft: found ${directoryGames.length} installed games (directory fallback)`);
    return directoryGames;
  }

  Logger.log('[LocalGameScanner] Ubisoft: no installation found');
  return [];
}

function parseUplayRegistry(regOutput: string): ILauncherGame[] {
  const games: ILauncherGame[] = [];
  for (const section of regOutput.split(/\r?\n\r?\n/)) {
    const idMatch = section.match(/Installs\\(\d+)/i);
    const pathMatch = section.match(/InstallDir\s+REG_SZ\s+(.+)/i);
    if (!idMatch) continue;

    const installPath = pathMatch?.[1].trim();
    games.push({
      launcherId: idMatch[1],
      title: installPath ? path.basename(installPath.replace(/[/\\]+$/, '')) : `Ubisoft Game ${idMatch[1]}`,
      isInstalled: true,
      installPath,
    });
  }

  return games;
}