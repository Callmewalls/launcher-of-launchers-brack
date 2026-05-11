import { promises as fs } from 'fs';
import path from 'path';
import { Logger } from '@utils/logger';
import { scanFirstNonEmptyInstallDir } from '../shared/InstalledGameDiscovery';
import type { ILauncherGame } from '@shared/types/launcher.types';

export async function scanEAInstalledGames(installBasePath?: string): Promise<ILauncherGame[]> {
  const eaAppCatalog = installBasePath ?? 'C:\\ProgramData\\EA Desktop\\Catalog';
  const originContent = 'C:\\ProgramData\\Origin\\LocalContent';
  const directDirs = [
    'C:\\Program Files\\EA Games',
    'C:\\Program Files (x86)\\EA Games',
  ];

  const eaGames = await scanEAAppCatalog(eaAppCatalog);
  if (eaGames.length > 0) {
    Logger.log(`[LocalGameScanner] EA App: found ${eaGames.length} installed games`);
    return eaGames;
  }

  const originGames = await scanOriginContent(originContent);
  if (originGames.length > 0) {
    Logger.log(`[LocalGameScanner] Origin: found ${originGames.length} installed games`);
    return originGames;
  }

  const directGames = await scanFirstNonEmptyInstallDir(directDirs, 'ea');
  Logger.log(`[LocalGameScanner] EA direct install: found ${directGames.length} installed games`);
  return directGames;
}

async function scanEAAppCatalog(catalogPath: string): Promise<ILauncherGame[]> {
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
              launcherId: String(data['gameId'] ?? data['id'] ?? entry),
              title: String(data['title'] ?? data['displayName'] ?? entry),
              isInstalled: true,
              installPath: data['installPath'] ? String(data['installPath']) : undefined,
            });
            break;
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

async function scanOriginContent(contentPath: string): Promise<ILauncherGame[]> {
  const games: ILauncherGame[] = [];
  try {
    for (const gameName of await fs.readdir(contentPath)) {
      const gamePath = path.join(contentPath, gameName);
      try {
        if (!(await fs.stat(gamePath)).isDirectory()) continue;

        for (const subDir of await fs.readdir(gamePath)) {
          const mfstFile = path.join(gamePath, subDir, `${subDir}.mfst`);
          try {
            const content = await fs.readFile(mfstFile, 'utf-8');
            const params = new URLSearchParams(content.replace(/^\?/, ''));
            const gameId = params.get('id');
            if (!gameId) continue;

            const installPath = params.get('dipInstallPath') ?? undefined;
            games.push({
              launcherId: gameId,
              title: installPath ? path.basename(installPath) : gameName,
              isInstalled: true,
              installPath,
            });
            break;
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