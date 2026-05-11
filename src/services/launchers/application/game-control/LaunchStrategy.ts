import path from 'path';
import type { LauncherType, LauncherCapabilities } from '@shared/types/launcher.types';
import { buildLauncherProtocolUrl, openProtocolUrl } from './LauncherProtocol';
import { launchViaSteamExe } from './LauncherExecutableLocator';

export interface LaunchStrategyResult {
  success: boolean;
  launched: boolean;
  protocolUrl?: string;
  message?: string;
  error?: string;
}

interface ExecuteLaunchFlowInput {
  launcher: LauncherType;
  launcherId: string;
  title: string;
  storedExecutablePath?: string;
  capabilities?: LauncherCapabilities;
  discoverAndPersistExe: () => Promise<string | undefined>;
  spawnExecutable: (executablePath: string) => void;
}

/**
 * Launch flow with strict fallback order:
 * 1) stored executable
 * 2) steam native executable launch
 * 3) protocol launch for launchers that support it
 * 4) live-scan resolve executable + persist
 * 5) protocol fallback
 */
export async function executeLaunchFlow(
  input: ExecuteLaunchFlowInput,
): Promise<LaunchStrategyResult> {
  const {
    launcher,
    launcherId,
    title,
    storedExecutablePath,
    capabilities,
    discoverAndPersistExe,
    spawnExecutable,
  } = input;

  const protocolUrl = buildLauncherProtocolUrl(launcher, launcherId, 'launch');

  if (storedExecutablePath) {
    spawnExecutable(storedExecutablePath);
    return { success: true, launched: true, message: `Launching ${title}` };
  }

  if (launcher === 'steam') {
    const launched = await launchViaSteamExe(launcherId);
    if (launched) {
      return {
        success: true,
        launched: true,
        message: `Launching ${title} via Steam`,
      };
    }
  }

  if (capabilities?.canLaunchViaProtocol && protocolUrl && launcher !== 'steam') {
    await openProtocolUrl(protocolUrl);
    return {
      success: true,
      launched: true,
      protocolUrl,
      message: `Launching ${title} via ${launcher}`,
    };
  }

  if (capabilities?.canFetchInstallState) {
    const exePath = await discoverAndPersistExe();
    if (exePath) {
      spawnExecutable(exePath);
      return {
        success: true,
        launched: true,
        message: `Launching ${title} (${path.basename(exePath)})`,
      };
    }
  }

  if (protocolUrl) {
    await openProtocolUrl(protocolUrl);
    return {
      success: true,
      launched: true,
      protocolUrl,
      message: `Launching ${title} via ${launcher} — ensure the launcher client is running`,
    };
  }

  return {
    success: false,
    launched: false,
    error: `No executable found for ${title}. Run a sync or set executablePath via PUT /api/launchers/${launcher}/local-config.`,
  };
}
