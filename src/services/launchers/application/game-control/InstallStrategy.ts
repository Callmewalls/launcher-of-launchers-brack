import type { LauncherType } from '@shared/types/launcher.types';
import { buildLauncherProtocolUrl, openProtocolUrl } from './LauncherProtocol';

export interface InstallStrategyResult {
  success: boolean;
  launched: boolean;
  protocolUrl?: string;
  message?: string;
  error?: string;
}

interface ExecuteInstallFlowInput {
  launcher: LauncherType;
  launcherId: string;
  title: string;
}

/**
 * Install flow delegates to launcher protocol handlers when available.
 */
export async function executeInstallFlow(
  input: ExecuteInstallFlowInput,
): Promise<InstallStrategyResult> {
  const { launcher, launcherId, title } = input;
  const protocolUrl = buildLauncherProtocolUrl(launcher, launcherId, 'install');

  if (!protocolUrl) {
    return {
      success: false,
      launched: false,
      error: `Install via ${launcher} is not supported automatically. Open the launcher and install manually.`,
    };
  }

  await openProtocolUrl(protocolUrl);
  return {
    success: true,
    launched: true,
    protocolUrl,
    message: `Opening ${launcher} to install ${title}`,
  };
}
