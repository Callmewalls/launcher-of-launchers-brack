import { exec } from 'child_process';
import { Logger } from '@utils/logger';
import type { LauncherType } from '@shared/types/launcher.types';

export type LauncherClientAction = 'launch' | 'install' | 'uninstall';

// Builds launcher-specific protocol URLs used to delegate game control to clients.
export function buildLauncherProtocolUrl(
  launcher: LauncherType,
  launcherId: string,
  action: LauncherClientAction,
): string | undefined {
  switch (launcher) {
    case 'steam':
      if (action === 'launch') return `steam://run/${launcherId}`;
      if (action === 'install') return `steam://install/${launcherId}`;
      if (action === 'uninstall') return `steam://uninstall/${launcherId}`;
      return undefined;
    case 'gog':
      if (action === 'launch') return `goggalaxy://rungameid/${launcherId}`;
      if (action === 'install') return `goggalaxy://installgame/${launcherId}`;
      if (action === 'uninstall') return `goggalaxy://uninstallgame/${launcherId}`;
      return undefined;
    case 'uplay':
      if (action === 'launch') return `uplay://launch/${launcherId}/0`;
      if (action === 'install') return `uplay://install/${launcherId}`;
      return undefined;
    case 'origin':
      if (action === 'launch') return `origin://launchgame/${launcherId}`;
      if (action === 'install') return `origin://installgame/${launcherId}`;
      return undefined;
    case 'battlenet':
      if (action === 'launch') return `battlenet://${launcherId}`;
      return undefined;
    case 'epic':
      if (action === 'launch') return `com.epicgames.launcher://apps/${launcherId}?action=launch&silent=true`;
      if (action === 'install') return `com.epicgames.launcher://apps/${launcherId}?action=install`;
      return undefined;
    case 'xbox':
      if (action === 'launch') return 'msxbox://';
      return undefined;
    default:
      return undefined;
  }
}

/** Opens a protocol URL through OS handler. */
export function openProtocolUrl(url: string): Promise<void> {
  const safe = url.replace(/"/g, '');
  return new Promise((resolve) => {
    const child = exec(`start "" "${safe}"`, (err) => {
      if (err) Logger.warn(`[LauncherProtocol] Failed to open protocol URL: ${err.message}`);
      resolve();
    });

    const timer = setTimeout(() => child.kill(), 10_000);
    child.once('exit', () => clearTimeout(timer));
  });
}
