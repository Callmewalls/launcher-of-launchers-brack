import type { LauncherType } from '@shared/types/launcher.types';

export interface SyncResult {
  launcherType: LauncherType;
  accountId: string;
  added: number;
  updated: number;
  errors: number;
}