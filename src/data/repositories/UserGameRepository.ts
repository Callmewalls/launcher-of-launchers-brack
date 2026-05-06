import { Op } from 'sequelize';
import { BaseRepository } from './BaseRepository';
import UserGame from '@entities/UserGame.model';
import GameCatalog, { GAME_CATALOG_ASSOC } from '@entities/Game.model';
import type { LauncherType } from '@shared/types/launcher.types';

export class UserGameRepository extends BaseRepository<UserGame> {
  constructor() {
    super(UserGame);
  }

  /** Full library for a user, joined with game catalog metadata */
  async findByUserId(userId: string): Promise<UserGame[]> {
    return UserGame.findAll({
      where: { userId },
      include: [{ model: GameCatalog, as: GAME_CATALOG_ASSOC }],
      order: [[{ model: GameCatalog, as: GAME_CATALOG_ASSOC }, 'title', 'ASC']],
    });
  }

  async findByUserIdAndLauncherAccount(userId: string, launcherAccountId: string): Promise<UserGame[]> {
    return UserGame.findAll({
      where: { userId, launcherAccountId },
      include: [{ model: GameCatalog, as: GAME_CATALOG_ASSOC }],
    });
  }

  async findInstalledByUserId(userId: string): Promise<UserGame[]> {
    return UserGame.findAll({
      where: { userId, isInstalled: true },
      include: [{ model: GameCatalog, as: GAME_CATALOG_ASSOC }],
      order: [[{ model: GameCatalog, as: GAME_CATALOG_ASSOC }, 'title', 'ASC']],
    });
  }

  async countByUserId(userId: string): Promise<number> {
    return UserGame.count({ where: { userId } });
  }

  /**
   * Upserts a user's ownership record.
   * Safe to call on every sync — won't create duplicates.
   */
  async upsertOwnership(
    userId: string,
    gameCatalogId: string,
    launcherAccountId: string,
    data: Partial<Pick<UserGame, 'playtimeMinutes' | 'isInstalled' | 'installPath' | 'executablePath' | 'lastPlayedAt' | 'syncedAt'>>,
  ): Promise<UserGame> {
    const [record] = await UserGame.upsert(
      {
        userId,
        gameCatalogId,
        launcherAccountId,
        syncedAt: new Date(),
        playtimeMinutes: 0,
        isInstalled: false,
        ...data,
      },
      // Conflict key mirrors uk_user_game_ownership: one row per (user, game).
      // launcherAccountId is updated in place so it always reflects the most
      // recent sync source (real linked account wins over synthetic local one).
      { conflictFields: ['userId', 'gameCatalogId'] as any },
    );
    return record;
  }

  /**
   * Authoritative post-scan cleanup: marks as uninstalled every game of
   * `launcherType` that belongs to `userId` but whose launcherId is NOT in
   * `installedLauncherIds`.
   *
   * Pass an empty array to mark ALL games of that launcher as uninstalled.
   * Also clears installPath and executablePath so stale paths don't linger.
   *
   * Returns the number of rows updated.
   */
  async markUninstalledExcept(
    userId: string,
    launcherType: LauncherType,
    installedLauncherIds: string[],
  ): Promise<number> {
    const catalogWhere = installedLauncherIds.length > 0
      ? { launcher: launcherType, launcherId: { [Op.notIn]: installedLauncherIds } }
      : { launcher: launcherType };

    const toUninstall = await GameCatalog.findAll({
      where: catalogWhere,
      attributes: ['id'],
    });

    if (toUninstall.length === 0) return 0;

    const catalogIds = toUninstall.map((c) => c.id);
    const [affected] = await UserGame.update(
      { isInstalled: false, installPath: null, executablePath: null },
      { where: { userId, gameCatalogId: catalogIds, isInstalled: true } },
    );

    return affected;
  }
}

export default new UserGameRepository();
