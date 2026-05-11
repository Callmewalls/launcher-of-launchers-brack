import gameCatalogRepository, { StoreDetailsData } from '@repositories/GameRepository';
import type GameCatalog from '@entities/Game.model';
import type { LauncherType } from '@shared/types/launcher.types';
import { Logger } from '@utils/logger';

// ── Provider interface ────────────────────────────────────────────────────────

/**
 * Generalised contract for fetching store metadata from any launcher's store.
 * Implement one per launcher that exposes a store API (Steam, Epic, GOG, …).
 */
export interface IStoreDetailsProvider {
  readonly launcherType: LauncherType;
  /**
   * Fetch all available store metadata for a single game.
   * Returns `null` when the game is not found, unlisted, or the request fails.
   */
  fetchDetails(launcherId: string): Promise<StoreDetailsData | null>;
}

// ── Service ───────────────────────────────────────────────────────────────────

export class GameStoreEnrichmentService {
  private readonly providers = new Map<LauncherType, IStoreDetailsProvider>();

  register(provider: IStoreDetailsProvider): void {
    this.providers.set(provider.launcherType, provider);
  }

  /**
   * On-demand enrichment for a single catalog entry.
   * Checks detailsFetchedAt — if already populated, returns the existing row.
   * Otherwise calls the registered provider, persists results and stamps
   * detailsFetchedAt so future calls skip the network hit.
   */
  async enrichIfNeeded(catalogEntry: GameCatalog): Promise<GameCatalog> {
    if (catalogEntry.detailsFetchedAt != null) {
      return catalogEntry;
    }

    const provider = this.providers.get(catalogEntry.launcher);
    if (!provider) {
      Logger.warn(`[GameStoreEnrichmentService] No provider registered for launcher: ${catalogEntry.launcher}`);
      return catalogEntry;
    }

    Logger.log(`[GameStoreEnrichmentService] Fetching store details for ${catalogEntry.launcher}:${catalogEntry.launcherId}`);

    const details = await provider.fetchDetails(catalogEntry.launcherId);
    if (!details) {
      // Mark as fetched even on empty result to avoid re-fetching on every request.
      await gameCatalogRepository.saveStoreDetails(catalogEntry.id, {});
      return catalogEntry;
    }

    await gameCatalogRepository.saveStoreDetails(catalogEntry.id, details);

    // Reload to return the fully populated record.
    const updated = await gameCatalogRepository.findByLauncherAndId(
      catalogEntry.launcher,
      catalogEntry.launcherId,
    );
    return updated ?? catalogEntry;
  }

  /**
   * Batch enrichment — fetches store details only for entries whose
   * detailsFetchedAt is NULL, with concurrency control between games.
   * Designed for post-sync background enrichment.
   */
  async enrichBatch(
    launcher: LauncherType,
    launcherIds: string[],
    options: { concurrency?: number; delayMs?: number } = {},
  ): Promise<{ enriched: number; skipped: number; failed: number }> {
    const { concurrency = 5, delayMs = 500 } = options;
    const unenriched = await gameCatalogRepository.findUnenriched(launcher, launcherIds);

    const result = { enriched: 0, skipped: launcherIds.length - unenriched.length, failed: 0 };

    if (unenriched.length === 0) {
      Logger.log(`[GameStoreEnrichmentService] Batch: all ${launcherIds.length} ${launcher} games already enriched`);
      return result;
    }

    Logger.log(`[GameStoreEnrichmentService] Batch: enriching ${unenriched.length} ${launcher} games (concurrency: ${concurrency})`);

    const provider = this.providers.get(launcher);
    if (!provider) {
      Logger.warn(`[GameStoreEnrichmentService] No provider for launcher: ${launcher}`);
      return result;
    }

    const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

    for (let i = 0; i < unenriched.length; i += concurrency) {
      const chunk = unenriched.slice(i, i + concurrency);

      const settlements = await Promise.allSettled(
        chunk.map(async (entry) => {
          const details = await provider.fetchDetails(entry.launcherId);
          await gameCatalogRepository.saveStoreDetails(entry.id, details ?? {});
        }),
      );

      for (const s of settlements) {
        if (s.status === 'fulfilled') {
          result.enriched++;
        } else {
          result.failed++;
          Logger.error('[GameStoreEnrichmentService] Batch enrichment error', s.reason);
        }
      }

      if (i + concurrency < unenriched.length) {
        await delay(delayMs);
      }
    }

    Logger.log(
      `[GameStoreEnrichmentService] Batch complete — enriched: ${result.enriched}, ` +
      `skipped: ${result.skipped}, failed: ${result.failed}`,
    );

    return result;
  }
}

export const gameStoreEnrichmentService = new GameStoreEnrichmentService();
