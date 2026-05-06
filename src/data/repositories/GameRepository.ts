import { Op } from 'sequelize';
import sequelize from '@config/database.config';
import { BaseRepository } from './BaseRepository';
import GameCatalog from '@entities/Game.model';
import UserGame from '@entities/UserGame.model';
import type { LauncherType } from '@shared/types/launcher.types';

/** Synthetic launcherId prefixes created by directory-fallback scanners. */
const SYNTHETIC_PREFIX_RE = /_dir_/i;

export class GameCatalogRepository extends BaseRepository<GameCatalog> {
  constructor() {
    super(GameCatalog);
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
    data: Partial<Pick<GameCatalog, 'title' | 'coverUrl' | 'description' | 'releaseDate' | 'genres'>>,
  ): Promise<GameCatalog> {
    const [record, created] = await GameCatalog.findOrCreate({
      where: { launcher, launcherId },
      defaults: { launcher, launcherId, ...data },
    });
    if (!created) {
      await record.update(data);
    }

    // If this is a real (non-synthetic) ID and the title is known, clean up any
    // synthetic counterpart for the same (launcher, title) that was created by
    // a directory-fallback scan before the real ID was available.
    if (data.title && !SYNTHETIC_PREFIX_RE.test(launcherId)) {
      await this.absorbSyntheticDuplicates(launcher, data.title, record.id);
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
    const synthetics = await GameCatalog.findAll({
      where: {
        launcher,
        title,
        id: { [Op.ne]: realCatalogId },
        launcherId: { [Op.regexp]: '_dir_' },
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
