import type { IStoreDetailsProvider } from '@services/gameLibrary/GameStoreEnrichmentService';
import type { StoreDetailsData } from '@repositories/GameRepository';
import { SteamWebApiService } from './SteamWebApiService';
import type { LauncherType } from '@shared/types/launcher.types';

export class SteamStoreDetailsProvider implements IStoreDetailsProvider {
  readonly launcherType: LauncherType = 'steam';

  private readonly api: SteamWebApiService;

  constructor(api: SteamWebApiService) {
    this.api = api;
  }

  async fetchDetails(launcherId: string): Promise<StoreDetailsData | null> {
    const appId = Number(launcherId);
    if (!Number.isFinite(appId) || appId <= 0) return null;

    const raw = await this.api.getAppDetails(appId);
    if (!raw) return null;

    const releaseDate = this.parseReleaseDate(raw.release_date?.date);

    return {
      coverUrl:             raw.header_image ?? raw.capsule_image,
      backgroundImageUrl:   raw.background ?? raw.background_raw,
      description:          raw.short_description,
      detailedDescription:  raw.detailed_description,
      aboutTheGame:         raw.about_the_game,
      releaseDate,
      genres:               raw.genres as any,
      categories:           raw.categories as any,
      screenshots:          raw.screenshots as any,
      movies:               raw.movies as any,
      developers:           raw.developers as any,
      publishers:           raw.publishers as any,
      platforms:            raw.platforms as any,
      metacriticScore:      raw.metacritic?.score,
      metacriticUrl:        raw.metacritic?.url,
      website:              raw.website ?? undefined,
      supportedLanguages:   raw.supported_languages,
      requiredAge:          raw.required_age != null ? Number(raw.required_age) : undefined,
      isFree:               raw.is_free,
    };
  }

  private parseReleaseDate(dateStr?: string): Date | undefined {
    if (!dateStr) return undefined;
    const parsed = new Date(dateStr);
    return isNaN(parsed.getTime()) ? undefined : parsed;
  }
}
