import { promises as fs } from 'fs';
import { spawn } from 'child_process';
import { Logger } from '@utils/logger';
import type { LauncherType } from '@shared/types/launcher.types';

export async function findSteamExe(): Promise<string | undefined> {
  const candidates = [
    'C:\\Program Files (x86)\\Steam\\steam.exe',
    'C:\\Program Files\\Steam\\steam.exe',
    'D:\\Steam\\steam.exe',
    'E:\\Steam\\steam.exe',
  ];

  for (const candidate of candidates) {
    try {
      await fs.access(candidate);
      return candidate;
    } catch {
      // not found in this path
    }
  }

  return undefined;
}

export async function launchViaSteamExe(appId: string): Promise<boolean> {
  const steamExe = await findSteamExe();
  if (!steamExe) return false;

  try {
    const child = spawn(steamExe, ['-applaunch', appId], {
      detached: true,
      stdio: 'ignore',
      shell: false,
    });
    child.unref();
    return true;
  } catch (err) {
    Logger.warn(`[LauncherExecutableLocator] Failed to spawn steam.exe: ${err}`);
    return false;
  }
}

export async function findLauncherExe(launcher: LauncherType): Promise<string | undefined> {
  const candidates: Record<string, string[]> = {
    origin: [
      'C:\\Program Files\\Electronic Arts\\EA Desktop\\EA Desktop.exe',
      'C:\\Program Files (x86)\\Origin\\Origin.exe',
      'C:\\Program Files\\Origin\\Origin.exe',
    ],
    epic: [
      'C:\\Program Files (x86)\\Epic Games\\Launcher\\Portal\\Binaries\\Win32\\EpicGamesLauncher.exe',
      'C:\\Program Files\\Epic Games\\Launcher\\Portal\\Binaries\\Win64\\EpicGamesLauncher.exe',
    ],
    uplay: [
      'C:\\Program Files (x86)\\Ubisoft\\Ubisoft Game Launcher\\UbisoftConnect.exe',
      'C:\\Program Files\\Ubisoft\\Ubisoft Game Launcher\\UbisoftConnect.exe',
    ],
    battlenet: [
      'C:\\Program Files (x86)\\Battle.net\\Battle.net.exe',
      'C:\\Program Files\\Battle.net\\Battle.net.exe',
    ],
    gog: [
      'C:\\Program Files (x86)\\GOG Galaxy\\GalaxyClient.exe',
      'C:\\Program Files\\GOG Galaxy\\GalaxyClient.exe',
    ],
  };

  const paths = candidates[launcher] ?? [];
  for (const candidate of paths) {
    try {
      await fs.access(candidate);
      return candidate;
    } catch {
      // not found in this path
    }
  }

  return undefined;
}
