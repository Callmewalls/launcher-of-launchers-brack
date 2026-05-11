import type { LauncherCapabilities, LauncherType } from '@shared/types/launcher.types';

export interface LauncherCapabilitiesSummary {
  launcherType: LauncherType;
  configured: boolean;
  capabilities: LauncherCapabilities;
}