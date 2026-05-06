import GameCatalog, { GAME_CATALOG_ASSOC } from '@entities/Game.model';
import UserGame from '@entities/UserGame.model';

export interface LibraryItemDto {
  /** user_games row ID — use this as :userGameId for launch / install / uninstall */
  userGameId: string;
  /** game_catalog row ID */
  id: string;
  title: string;
  launcher: string;
  launcherId: string;
  coverUrl?: string;
  description?: string;
  releaseDate?: Date;
  genres?: unknown;
  isInstalled: boolean;
  installPath?: string;
  executablePath?: string;
  playtime: number;
  createdAt: Date;
  updatedAt: Date;
}

export class UserLibraryService {
  async getLibraryByUser(userId: string): Promise<LibraryItemDto[]> {
    // uk_user_game_ownership guarantees one row per (user, game), so no
    // deduplication is needed here — just load and sort alphabetically.
    const libraryEntries = await UserGame.findAll({
      where: { userId },
      include: [{ model: GameCatalog, as: GAME_CATALOG_ASSOC, required: true }],
      order: [[{ model: GameCatalog, as: GAME_CATALOG_ASSOC }, 'title', 'ASC']],
    });

    const deduplicated = libraryEntries;

    return deduplicated.map((entry) => {
      const game = entry.get(GAME_CATALOG_ASSOC) as GameCatalog;

      return {
        userGameId: entry.id,
        id: game.id,
        title: game.title,
        launcher: game.launcher,
        launcherId: game.launcherId,
        coverUrl: game.coverUrl,
        description: game.description,
        releaseDate: game.releaseDate,
        genres: game.genres,
        isInstalled: entry.isInstalled,
        installPath: entry.installPath,
        executablePath: entry.executablePath,
        playtime: entry.playtimeMinutes,
        createdAt: game.createdAt,
        updatedAt: game.updatedAt,
      };
    });
  }
}