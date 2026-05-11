import { EnvConfig } from '@config/env.config';
import { LocalGameScanner } from '../core/LocalGameScanner';
import type { ILauncherService } from '../base/ILauncherService';
import type { LauncherCapabilities, LauncherTokens, ILauncherGame, LauncherType } from '@shared/types/launcher.types';
import type LauncherAccount from '@entities/LauncherAccount.model';

/**
 * Xbox app (PC) integration focused on local Game Pass installs.
 *
 * Current backend scope:
 * - No OAuth linking.
 * - No private service API dependency.
 * - Local install scan supported via XboxGames / ModifiableWindowsApps folders.
 */
export class XboxLauncherService implements ILauncherService {
  readonly launcherType: LauncherType = 'xbox';

  isConfigured(): boolean {
    return false;
  }

  getCapabilities(): LauncherCapabilities {
    return {
      canAuthenticate: false,
      canFetchOwnedGames: false,
      canFetchRecentlyPlayed: false,
      canFetchPlaytime: false,
      canFetchInstallState: true,
      canLaunchViaProtocol: false,
    };
  }

  buildAuthUrl(_state?: string): string {
    throw new Error('Xbox launcher does not support backend OAuth linking in this version');
  }

  async exchangeCode(_code: string): Promise<LauncherTokens> {
    throw new Error('Xbox launcher does not support OAuth code exchange in this version');
  }

  async refreshTokens(_account: LauncherAccount): Promise<LauncherTokens | null> {
    return null;
  }

  async fetchOwnedGames(_account: LauncherAccount): Promise<ILauncherGame[]> {
    return [];
  }

  async fetchRecentlyPlayed(_account: LauncherAccount, _count?: number): Promise<ILauncherGame[]> {
    return [];
  }

  async fetchInstalledGames(installBasePath?: string): Promise<ILauncherGame[]> {
    return LocalGameScanner.scanXbox(installBasePath ?? EnvConfig.XBOX_INSTALL_PATH);
  }
}