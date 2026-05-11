import { promises as fs } from 'fs';
import path from 'path';
import type { LauncherType } from '@shared/types/launcher.types';
import { buildLauncherProtocolUrl, openProtocolUrl } from './LauncherProtocol';
import { findLauncherExe } from './LauncherExecutableLocator';

export interface UninstallStrategyResult {
  success: boolean;
  launched: boolean;
  protocolUrl?: string;
  message?: string;
  error?: string;
}

interface ExecuteUninstallFlowInput {
  launcher: LauncherType;
  launcherId: string;
  title: string;
  installPath?: string;
  spawnExecutable: (executablePath: string) => void;
}

export async function executeUninstallFlow(
  input: ExecuteUninstallFlowInput,
): Promise<UninstallStrategyResult> {
  const { launcher, launcherId, title, installPath, spawnExecutable } = input;

  const protocolUrl = buildLauncherProtocolUrl(launcher, launcherId, 'uninstall');
  if (protocolUrl) {
    await openProtocolUrl(protocolUrl);
    return {
      success: true,
      launched: true,
      protocolUrl,
      message: `Opening ${launcher} to uninstall ${title}. Run a sync once uninstalled to update the library.`,
    };
  }

  if (installPath) {
    const uninstallerNames = ['unins000.exe', 'uninstall.exe', 'uninst.exe'];
    for (const name of uninstallerNames) {
      const uninsPath = path.join(installPath, name);
      try {
        await fs.access(uninsPath);
        spawnExecutable(uninsPath);
        return {
          success: true,
          launched: true,
          message: `Opening uninstaller for ${title}. Run a sync once uninstalled to update the library.`,
        };
      } catch {
        // not found: continue
      }
    }
  }

  const launcherExe = await findLauncherExe(launcher);
  if (launcherExe) {
    spawnExecutable(launcherExe);
    return {
      success: true,
      launched: true,
      message: `Opened ${launcher} launcher — uninstall ${title} from there. Run a sync afterwards to update the library.`,
    };
  }

  return {
    success: false,
    launched: false,
    error: `Could not find an uninstaller for ${title}. Open the ${launcher} launcher and uninstall from there.`,
  };
}
