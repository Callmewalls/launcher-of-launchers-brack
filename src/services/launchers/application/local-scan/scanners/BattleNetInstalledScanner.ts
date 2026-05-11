import { execFile } from 'child_process';
import { promisify } from 'util';
import { Logger } from '@utils/logger';
import { scanFirstNonEmptyInstallDir } from '../shared/InstalledGameDiscovery';
import type { ILauncherGame } from '@shared/types/launcher.types';

const execFileAsync = promisify(execFile);

const BATTLENET_GAMES: ReadonlyArray<{ id: string; name: string; regKey: string }> = [
  { id: 'WoW', name: 'World of Warcraft', regKey: 'HKLM\\SOFTWARE\\WOW6432Node\\Blizzard Entertainment\\World of Warcraft' },
  { id: 'D3', name: 'Diablo III', regKey: 'HKLM\\SOFTWARE\\WOW6432Node\\Blizzard Entertainment\\Diablo III' },
  { id: 'D4', name: 'Diablo IV', regKey: 'HKLM\\SOFTWARE\\WOW6432Node\\Blizzard Entertainment\\Diablo IV' },
  { id: 'S1', name: 'StarCraft', regKey: 'HKLM\\SOFTWARE\\WOW6432Node\\Blizzard Entertainment\\StarCraft' },
  { id: 'S2', name: 'StarCraft II', regKey: 'HKLM\\SOFTWARE\\WOW6432Node\\Blizzard Entertainment\\StarCraft II' },
  { id: 'HS', name: 'Hearthstone', regKey: 'HKLM\\SOFTWARE\\WOW6432Node\\Blizzard Entertainment\\Hearthstone' },
  { id: 'HotS', name: 'Heroes of the Storm', regKey: 'HKLM\\SOFTWARE\\WOW6432Node\\Blizzard Entertainment\\Heroes of the Storm' },
  { id: 'VIPR', name: 'Overwatch 2', regKey: 'HKLM\\SOFTWARE\\WOW6432Node\\Blizzard Entertainment\\Overwatch' },
  { id: 'W3', name: 'Warcraft III: Reforged', regKey: 'HKLM\\SOFTWARE\\WOW6432Node\\Blizzard Entertainment\\Warcraft III' },
  { id: 'ANBS', name: 'Diablo Immortal', regKey: 'HKLM\\SOFTWARE\\WOW6432Node\\Blizzard Entertainment\\Diablo Immortal' },
];

export async function scanBattleNetInstalledGames(installBasePath?: string): Promise<ILauncherGame[]> {
  if (process.platform === 'win32') {
    const settlements = await Promise.allSettled(
      BATTLENET_GAMES.map(async (entry) => {
        const { stdout } = await execFileAsync('reg', ['query', entry.regKey]);
        const pathMatch = stdout.match(/(?:GamePath|InstallPath|InstallLocation)\s+REG_SZ\s+(.+)/i);
        return {
          launcherId: entry.id,
          title: entry.name,
          isInstalled: true,
          installPath: pathMatch?.[1].trim(),
        } satisfies ILauncherGame;
      }),
    );

    const games: ILauncherGame[] = [];
    for (const settlement of settlements) {
      if (settlement.status === 'fulfilled') games.push(settlement.value);
    }

    if (games.length > 0) {
      Logger.log(`[LocalGameScanner] Battle.net: found ${games.length} installed games (registry)`);
      return games;
    }
  }

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

  const directoryGames = await scanFirstNonEmptyInstallDir(battleNetCandidatePaths, 'bnet_dir');
  if (directoryGames.length > 0) {
    const enriched = directoryGames.map((game) => {
      const known = BATTLENET_GAMES.find(
        (entry) => entry.name.toLowerCase().includes(game.title.toLowerCase())
          || game.title.toLowerCase().includes(entry.name.toLowerCase()),
      );
      return known ? { ...game, launcherId: known.id, title: known.name } : game;
    });
    Logger.log(`[LocalGameScanner] Battle.net: found ${enriched.length} installed games (directory fallback)`);
    return enriched;
  }

  Logger.log('[LocalGameScanner] Battle.net: no installation found');
  return [];
}