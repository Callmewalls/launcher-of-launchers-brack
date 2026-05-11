import type { LocalScanLauncherResult } from './LocalScanLauncherResult';

export interface LocalScanSummary {
  total: number;
  results: LocalScanLauncherResult[];
}