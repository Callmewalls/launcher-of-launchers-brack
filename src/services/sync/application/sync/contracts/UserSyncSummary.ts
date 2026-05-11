import type { SyncResult } from './SyncResult';

export interface UserSyncSummary {
  userId: string;
  results: SyncResult[];
  totalAdded: number;
  totalUpdated: number;
  durationMs: number;
}