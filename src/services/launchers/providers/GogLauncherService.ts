import axios from 'axios';
import { OAuth2LauncherService } from '../base/OAuth2LauncherService';
import { LocalGameScanner } from '../core/LocalGameScanner';
import { EnvConfig } from '@config/env.config';
import { Logger } from '@utils/logger';
import type { ILauncherGame, LauncherCapabilities } from '@shared/types/launcher.types';
import type LauncherAccount from '@entities/LauncherAccount.model';

interface GogOwnedGamesResponse {
  owned?: number[];
}

interface GogProductResponse {
  id?: number;
  title?: string;
  slug?: string;
  images?: {
    background?: string;
    logo?: string;
    logo2x?: string;
    icon?: string;
    sidebarGraphic?: string;
    sidebarGraphic2x?: string;
  };
}

const CONCURRENCY = 10;

/**
 * GOG integration.
 * Auth: OAuth2 — https://auth.gog.com/auth + https://auth.gog.com/token
 * Owned IDs: GET https://embed.gog.com/user/data/games
 * Catalog metadata: GET https://catalog.gog.com/v1/catalog?productId=...
 *
 * Limit: GOG does not expose playtime or recently-played via public API.
 */
export class GogLauncherService extends OAuth2LauncherService {
  constructor() {
    super({
      launcherType: 'gog',
      clientId: EnvConfig.GOG_CLIENT_ID,
      clientSecret: EnvConfig.GOG_CLIENT_SECRET,
      authUrl: 'https://auth.gog.com/auth',
      tokenUrl: 'https://auth.gog.com/token',
      redirectUri: EnvConfig.GOG_REDIRECT_URI,
      scopes: ['galaxyAccounts', 'openId', 'email', 'libraryAccess'],
    });
  }

  async fetchOwnedGames(account: LauncherAccount): Promise<ILauncherGame[]> {
    if (!account.accessToken) {
      Logger.warn(
        `[GogLauncherService] No access token for account ${account.id} — skipping library fetch. ` +
        'Re-link this launcher via OAuth2 auth-url + exchange flow.',
      );
      return [];
    }

    // Step 1: owned product IDs
    const ownedResp = await axios.get<GogOwnedGamesResponse>('https://embed.gog.com/user/data/games', {
      headers: { Authorization: `Bearer ${account.accessToken}` },
    });

    const ids = ownedResp.data.owned ?? [];
    if (ids.length === 0) return [];

    // Step 2: product metadata via https://api.gog.com/products/{id}
    // Fetch in parallel with a concurrency cap to avoid rate-limiting
    const results: ILauncherGame[] = [];

    for (let offset = 0; offset < ids.length; offset += CONCURRENCY) {
      const batch = ids.slice(offset, offset + CONCURRENCY);
      const settled = await Promise.allSettled(
        batch.map(id =>
          axios.get<GogProductResponse>(`https://api.gog.com/products/${id}`, {
            headers: { Authorization: `Bearer ${account.accessToken}` },
          })
        )
      );

      for (let i = 0; i < settled.length; i++) {
        const result = settled[i];
        const id = batch[i];
        if (result.status === 'fulfilled') {
          const p = result.value.data;
          results.push({
            launcherId: String(p.id ?? id),
            title: p.title ?? `GOG ${id}`,
            coverUrl: p.images?.logo2x ?? p.images?.logo ?? p.images?.background ?? undefined,
            playtimeMinutes: 0,
            isInstalled: false,
          });
        } else {
          Logger.warn(`[GogLauncherService] Failed to fetch product ${id}`, result.reason);
          results.push({ launcherId: String(id), title: `GOG ${id}`, playtimeMinutes: 0, isInstalled: false });
        }
      }
    }

    return results;
  }

  async fetchRecentlyPlayed(_account: LauncherAccount, _count?: number): Promise<ILauncherGame[]> {
    // GOG does not expose playtime or recently-played via public API.
    return [];
  }

  override getCapabilities(): LauncherCapabilities {
    return {
      ...super.getCapabilities(),
      canFetchInstallState: true,
    };
  }

  override async fetchInstalledGames(installBasePath?: string): Promise<ILauncherGame[]> {
    return LocalGameScanner.scanGog(installBasePath);
  }
}
