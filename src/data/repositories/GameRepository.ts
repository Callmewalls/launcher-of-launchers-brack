import { Op } from 'sequelize';
import sequelize from '@config/database.config';
import { BaseRepository } from './BaseRepository';
import GameCatalog from '@entities/Game.model';
import UserGame from '@entities/UserGame.model';
import type { LauncherType } from '@shared/types/launcher.types';

/** Synthetic launcherId prefixes created by directory-fallback scanners. */
const SYNTHETIC_PREFIX_RE = /_dir_/i;

export type StoreDetailsData = Partial<Pick<GameCatalog,
  | 'coverUrl'
  | 'backgroundImageUrl'
  | 'description'
  | 'detailedDescription'
  | 'aboutTheGame'
  | 'releaseDate'
  | 'genres'
  | 'categories'
  | 'screenshots'
  | 'movies'
  | 'developers'
  | 'publishers'
  | 'platforms'
  | 'metacriticScore'
  | 'metacriticUrl'
  | 'website'
  | 'supportedLanguages'
  | 'requiredAge'
  | 'isFree'
>>;

export class GameCatalogRepository extends BaseRepository<GameCatalog> {
  constructor() {
    super(GameCatalog);
  }

  /**
   * Avoids clobbering existing DB values with `undefined` during partial syncs
   * (e.g. API-only sync passes no gridImageUrl after a local scan already found it).
   */
  private static omitUndefined<T extends Record<string, unknown>>(data: T): Partial<T> {
    return Object.fromEntries(
      Object.entries(data).filter(([, value]) => value !== undefined),
    ) as Partial<T>;
  }

  async findByLauncherAndId(launcher: LauncherType, launcherId: string): Promise<GameCatalog | null> {
    return GameCatalog.findOne({ where: { launcher, launcherId } });
  }

  async searchByTitle(title: string, limit = 20): Promise<GameCatalog[]> {
    return GameCatalog.findAll({
      where: { title: { [Op.like]: `%${title}%` } },
      limit,
      order: [['title', 'ASC']],
    });
  }

  /**
   * Returns catalog entries for a given launcher whose detailsFetchedAt is NULL
   * (never enriched) filtered to the provided set of launcherIds.
   */
  async findUnenriched(launcher: LauncherType, launcherIds: string[]): Promise<GameCatalog[]> {
    if (launcherIds.length === 0) return [];
    return GameCatalog.findAll({
      where: {
        launcher,
        launcherId: { [Op.in]: launcherIds },
        detailsFetchedAt: { [Op.is]: null },
      },
      attributes: ['id', 'launcherId'],
    });
  }

  /**
   * Persists store details for a catalog entry and stamps detailsFetchedAt = NOW.
   */
  async saveStoreDetails(id: string, details: StoreDetailsData): Promise<void> {
    await GameCatalog.update(
      { ...details, detailsFetchedAt: new Date() },
      { where: { id } },
    );
  }

  /**
   * Upserts catalog entry by (launcher, launcherId) natural key.
   * Used during sync — avoids duplicates without a prior SELECT.
   *
   * NOTE: Sequelize's Model.upsert() on MySQL (INSERT ... ON DUPLICATE KEY UPDATE)
   * returns the instance built from input values, so its `id` is the freshly
   * generated UUID — NOT the real PK of the existing row.  Using that fake UUID
   * as a FK in user_games causes a FK constraint violation.
   * findOrCreate + conditional update is the safe pattern.
   *
   * When the incoming launcherId is a real (non-synthetic) ID, any previously
   * created synthetic catalog entry for the same (launcher, title) is merged
   * into the real one and then deleted, preventing duplicate library entries.
   */
  async upsertByLauncherId(
    launcher: LauncherType,
    launcherId: string,
    data: Partial<Pick<GameCatalog, 'title' | 'coverUrl' | 'gridImageUrl' | 'description' | 'releaseDate' | 'genres'>>,
  ): Promise<GameCatalog> {
    const safeData = GameCatalogRepository.omitUndefined(data);

    const [record, created] = await GameCatalog.findOrCreate({
      where: { launcher, launcherId },
      defaults: { launcher, launcherId, ...safeData },
    });
    if (!created && Object.keys(safeData).length > 0) {
      await record.update(safeData);
    }

    // If this is a real (non-synthetic) ID and the title is known, clean up any
    // synthetic counterpart for the same (launcher, title) that was created by
    // a directory-fallback scan before the real ID was available.
    if (safeData.title && !SYNTHETIC_PREFIX_RE.test(launcherId)) {
      await this.absorbSyntheticDuplicates(launcher, safeData.title, record.id);
    }

    return record;
  }

  /**
   * Finds synthetic catalog entries for the same (launcher, title) and:
   * 1. Moves any user_games rows pointing to them to `realCatalogId` (merge).
   * 2. Deletes the now-orphaned synthetic catalog entries.
   *
   * Runs in a transaction so the move+delete is atomic.
   */
  private async absorbSyntheticDuplicates(
    launcher: LauncherType,
    title: string,
    realCatalogId: string,
  ): Promise<void> {
    // SQLite doesn't provide a built-in REGEXP function; use LIKE instead
    // when running against SQLite to remain portable and avoid runtime errors.
    const launcherIdFilter = sequelize.getDialect() === 'sqlite'
      ? { [Op.like]: '%_dir_%' }
      : { [Op.regexp]: '_dir_' };

    const synthetics = await GameCatalog.findAll({
      where: {
        launcher,
        title,
        id: { [Op.ne]: realCatalogId },
        launcherId: launcherIdFilter,
      },
      attributes: ['id'],
    });

    if (synthetics.length === 0) return;

    const syntheticIds = synthetics.map((s) => s.id);

    await sequelize.transaction(async (t) => {
      // For each user that has a user_games row pointing to a synthetic entry,
      // delete the synthetic row if they already have one for the real entry,
      // or update game_catalog_id to the real entry if they don't.
      for (const syntheticId of syntheticIds) {
        const syntheticRows = await UserGame.findAll({
          where: { gameCatalogId: syntheticId },
          attributes: ['id', 'userId'],
          transaction: t,
        });

        for (const row of syntheticRows) {
          const hasReal = await UserGame.findOne({
            where: { userId: row.userId, gameCatalogId: realCatalogId },
            transaction: t,
          });
          if (hasReal) {
            // Real row exists — the synthetic row is redundant, delete it.
            await row.destroy({ transaction: t });
          } else {
            // No real row yet — re-point the synthetic row to the real catalog entry.
            await row.update({ gameCatalogId: realCatalogId }, { transaction: t });
          }
        }

        await GameCatalog.destroy({ where: { id: syntheticId }, transaction: t });
      }
    });
  }
}

export default new GameCatalogRepository();

