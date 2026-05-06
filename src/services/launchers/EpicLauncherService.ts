import axios from 'axios';
import { OAuth2LauncherService } from './OAuth2LauncherService';
import { LocalGameScanner } from './LocalGameScanner';
import { EnvConfig } from '@config/env.config';
import { Logger } from '@utils/logger';
import type { ILauncherGame, LauncherCapabilities } from '@shared/types/launcher.types';
import type LauncherAccount from '@entities/LauncherAccount.model';

interface EpicLibraryRecord {
  appName?: string;
  catalogItemId?: string;
  namespace?: string;
  metadata?: {
    title?: string;
    keyImages?: Array<{ type: string; url: string }>;
  };
}

interface EpicLibraryResponse {
  records?: EpicLibraryRecord[];
  libraryItems?: EpicLibraryRecord[];
  elements?: EpicLibraryRecord[];
  items?: EpicLibraryRecord[];
}

/**
 * Epic Games Store integration.
 * Auth: OAuth2 via Epic's account service using Basic auth for token requests.
 * Library: GET https://library-service.live.use1a.on.epicgames.com/library/api/public/libraryItems
 *
 * Limit: Epic does not expose playtime or recently-played via this endpoint.
 */
export class EpicLauncherService extends OAuth2LauncherService {
  constructor() {
    super({
      launcherType: 'epic',
      clientId: EnvConfig.EPIC_CLIENT_ID,
      clientSecret: EnvConfig.EPIC_CLIENT_SECRET,
      authUrl: 'https://www.epicgames.com/id/authorize',
      tokenUrl: 'https://account-public-service-prod.ol.epicgames.com/account/api/oauth/token',
      redirectUri: EnvConfig.EPIC_REDIRECT_URI,
      scopes: ['basic_profile', 'friends_list', 'presence', 'country'],
      tokenAuthMethod: 'basic',
    });
  }

  async fetchOwnedGames(account: LauncherAccount): Promise<ILauncherGame[]> {
    if (!account.accessToken) {
      Logger.warn('[EpicLauncherService] No access token — skipping library fetch');
      return [];
    }

    try {
      const response = await axios.get<EpicLibraryResponse | EpicLibraryRecord[]>(
        'https://library-service.live.use1a.on.epicgames.com/library/api/public/libraryItems',
        {
          headers: { Authorization: `Bearer ${account.accessToken}` },
          params: {
            includeMetadata: true,
            include_metadata: true,
            count: 1000,
          },
        },
      );

      const payload = response.data;
      const records = Array.isArray(payload)
        ? payload
        : payload.records ?? payload.libraryItems ?? payload.elements ?? payload.items ?? [];

      Logger.log(`[EpicLauncherService] libraryItems response parsed: ${records.length} records`);

      return records
        .filter((r) => r.appName || r.catalogItemId)
        .map((r) => {
          const boxImage = r.metadata?.keyImages?.find(
            (img) => img.type === 'DieselGameBoxLogo' || img.type === 'DieselGameBox',
          );
          return {
            launcherId: r.appName ?? r.catalogItemId ?? '',
            title: r.metadata?.title ?? r.appName ?? r.catalogItemId ?? 'Unknown Epic Game',
            coverUrl: boxImage?.url,
            playtimeMinutes: 0,
            isInstalled: false,
          };
        });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const data = error.response?.data;
        Logger.error(
          `[EpicLauncherService] Failed to fetch libraryItems (status=${status ?? 'unknown'})`,
          data ?? error.message,
        );
      } else {
        Logger.error('[EpicLauncherService] Failed to fetch libraryItems', error);
      }
      return [];
    }
  }

  async fetchRecentlyPlayed(_account: LauncherAccount, _count?: number): Promise<ILauncherGame[]> {
    // Epic does not expose a recently-played endpoint via the public library API.
    return [];
  }

  override getCapabilities(): LauncherCapabilities {
    return {
      ...super.getCapabilities(),
      canFetchInstallState: true,
      canLaunchViaProtocol: true,  // com.epicgames.launcher:// is reliably handled by the Epic launcher
    };
  }

  override async fetchInstalledGames(installBasePath?: string): Promise<ILauncherGame[]> {
    return LocalGameScanner.scanEpic(installBasePath ?? EnvConfig.EPIC_MANIFESTS_PATH);
  }
}
