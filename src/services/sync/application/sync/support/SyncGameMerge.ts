import type { ILauncherGame } from '@shared/types/launcher.types';

/**
 * API games are the canonical set; local scan enriches install state/paths.
 */
export function mergeOwnedAndInstalledGames(
  ownedGames: ILauncherGame[],
  installedGames: ILauncherGame[],
): ILauncherGame[] {
  const gameMap = new Map<string, ILauncherGame>();

  for (const game of ownedGames) {
    gameMap.set(game.launcherId, game);
  }

  for (const installed of installedGames) {
    const existing = gameMap.get(installed.launcherId);
    gameMap.set(
      installed.launcherId,
      existing
        ? {
            ...existing,
            isInstalled: true,
            installPath: installed.installPath ?? existing.installPath,
            executablePath: installed.executablePath ?? existing.executablePath,
            gridImagePath: installed.gridImagePath ?? existing.gridImagePath,
          }
        : installed,
    );
  }

  return [...gameMap.values()];
}