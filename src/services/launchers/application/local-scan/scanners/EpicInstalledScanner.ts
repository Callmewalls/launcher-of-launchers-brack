import { promises as fs } from 'fs';
import path from 'path';
import { Logger } from '@utils/logger';
import type { ILauncherGame } from '@shared/types/launcher.types';

export async function scanEpicInstalledGames(overridePath?: string): Promise<ILauncherGame[]> {
  const manifestsPath = overridePath
    ?? 'C:\\ProgramData\\Epic\\EpicGamesLauncher\\Data\\Manifests';

  try {
    const entries = await fs.readdir(manifestsPath);
    const games: ILauncherGame[] = [];

    for (const file of entries.filter((entry) => entry.endsWith('.item'))) {
      try {
        const content = await fs.readFile(path.join(manifestsPath, file), 'utf-8');
        const manifest = JSON.parse(content) as Record<string, unknown>;

        if (manifest['bIsIncompleteInstall']) continue;
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