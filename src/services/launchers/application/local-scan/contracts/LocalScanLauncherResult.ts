import type { LauncherType } from '@shared/types/launcher.types';

export interface LocalScanLauncherResult {
  launcherType: LauncherType;
  count: number;
  persistedAdded: number;
  persistedUpdated: number;
  games: Array<{ launcherId: string; title: string; installPath?: string; isInstalled: boolean }>;
}