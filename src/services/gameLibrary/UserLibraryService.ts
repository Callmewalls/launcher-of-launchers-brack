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
  /** Absolute local path to the Steam grid portrait image (library_600x900.jpg|png). */
  gridImageUrl?: string;
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
      const resolvedGridUrl = game.gridImageUrl ? `/library/${entry.id}/grid` : undefined;
      const resolvedCoverUrl = resolvedGridUrl ?? game.coverUrl;

      return {
        userGameId: entry.id,
        id: game.id,
        title: game.title,
        launcher: game.launcher,
        launcherId: game.launcherId,
        // Backward compatibility: many clients already bind the card image to coverUrl.
        // If a Steam grid image exists, promote it to coverUrl so desktop shows it
        // without requiring immediate frontend changes.
        coverUrl: resolvedCoverUrl,
        // Expose authenticated backend endpoint for grid image.
        gridImageUrl: resolvedGridUrl,
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