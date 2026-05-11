import { Controller, Get, Post, Body, Path, Produces, Route, Tags, Security, Response, Request } from 'tsoa';
import fs from 'fs';
import path from 'path';
import { UserLibraryService } from '@services/gameLibrary/UserLibraryService';
import gameActionService from '@services/gameLibrary/GameActionService';
import { iconService } from '@services/gameLibrary/IconService';
import { gameStoreEnrichmentService } from '@services/gameLibrary/GameStoreEnrichmentService';
import gameCatalogRepository from '@repositories/GameRepository';
import userGameRepository from '@repositories/UserGameRepository';
import { Logger } from '@utils/logger';
import type { AuthenticatedRequest } from '../middlewares/auth.middleware';
import type { Response as ExResponse } from 'express';

export interface LibraryItemDto {
  userGameId: string;
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

export interface GameActionResult {
  success: boolean;
  launched: boolean;
  protocolUrl?: string;
  message?: string;
  error?: string;
}

export interface GameDetailDto {
  userGameId: string;
  id: string;
  title: string;
  launcher: string;
  launcherId: string;
  coverUrl?: string;
  gridImageUrl?: string;
  backgroundImageUrl?: string;
  description?: string;
  detailedDescription?: string;
  aboutTheGame?: string;
  releaseDate?: Date;
  genres?: unknown;
  categories?: unknown;
  screenshots?: unknown;
  movies?: unknown;
  developers?: unknown;
  publishers?: unknown;
  platforms?: unknown;
  metacriticScore?: number;
  metacriticUrl?: string;
  website?: string;
  supportedLanguages?: string;
  requiredAge?: number;
  isFree?: boolean;
  detailsFetchedAt?: Date | null;
  isInstalled: boolean;
  installPath?: string;
  executablePath?: string;
  playtime: number;
}

interface LibraryErrorResponse { success: false; error: string; }

export interface BatchGridImagesBody {
  /** List of userGameIds whose grid images should be returned. */
  ids: string[];
}

/** Map of userGameId → base64 data URL (e.g. "data:image/jpeg;base64,..."). Missing images are omitted. */
export type BatchGridImagesResponse = Record<string, string>;

@Route('library')
@Tags('Library')
@Security('jwt')
export class LibraryHttpController extends Controller {
  private readonly userLibraryService: UserLibraryService;

  constructor() {
    super();
    this.userLibraryService = new UserLibraryService();
  }

  /** Devuelve todos los juegos de la biblioteca del usuario */
  @Get('all')
  public async getAll(@Request() req: any): Promise<LibraryItemDto[]> {
    const userId = (req as AuthenticatedRequest).authUserId;
    return this.userLibraryService.getLibraryByUser(userId);
  }

  /**
   * Devuelve las grid images de varios juegos en una sola petición.
   * Hace 1 query a la BD y lee todos los ficheros en paralelo.
   * Las imágenes ausentes simplemente se omiten del resultado.
   */
  @Post('grid-images/batch')
  public async getBatchGridImages(
    @Body() body: BatchGridImagesBody,
    @Request() req: any,
  ): Promise<BatchGridImagesResponse> {
    const userId = (req as AuthenticatedRequest).authUserId;

    const MAX_IDS = 500;
    const ids = (body.ids ?? []).slice(0, MAX_IDS);

    const userGames = await userGameRepository.findByUserAndIds(userId, ids);

    const results = await Promise.all(
      userGames.map(async (userGame) => {
        const catalogEntry = (userGame as any).GameCatalog ?? (userGame as any).gameCatalog;
        const rawGridPath = catalogEntry?.gridImageUrl;
        if (!rawGridPath) return null;

        const gridPath = path.resolve(rawGridPath);
        const ext = path.extname(gridPath).toLowerCase();
        const mimeType = ext === '.png'
          ? 'image/png'
          : ext === '.jpg' || ext === '.jpeg'
            ? 'image/jpeg'
            : ext === '.webp'
              ? 'image/webp'
              : null;

        if (!mimeType || !path.isAbsolute(gridPath) || !fs.existsSync(gridPath)) return null;

        try {
          const imageBuffer = fs.readFileSync(gridPath);
          if (imageBuffer.length === 0) return null;
          const dataUrl = `data:${mimeType};base64,${imageBuffer.toString('base64')}`;
          return { id: userGame.id, dataUrl };
        } catch {
          return null;
        }
      }),
    );

    const response: BatchGridImagesResponse = {};
    for (const entry of results) {
      if (entry) response[entry.id] = entry.dataUrl;
    }
    return response;
  }

  /**
   * Devuelve el ícono PNG embebido en el ejecutable local del juego.
   * 404 cuando el juego no está instalado o no tiene executablePath.
   * Cacheable 24 h — los íconos no cambian entre sincronizaciones.
   */
  @Get('{userGameId}/icon')
  @Produces('image/png')
  @Response<LibraryErrorResponse>(404, 'Ícono no disponible')
  public async getIcon(@Path() userGameId: string, @Request() req: any): Promise<Buffer | void> {
    const userId = (req as AuthenticatedRequest).authUserId;
    const res: ExResponse = req.res;

    const icon = await iconService.getIconForUserGame(userId, userGameId);
    if (!icon) {
      res.status(404).json({ error: 'Icon not available' });
      return;
    }

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.send(icon);
  }

  /**
   * Devuelve la grid image (portrait) encontrada por el scanner local.
   * Se sirve por HTTP autenticado para evitar bloqueos del navegador al cargar file://.
   */
  @Get('{userGameId}/grid')
  @Produces('image/*')
  @Response<LibraryErrorResponse>(404, 'Grid image no disponible')
  public async getGridImage(@Path() userGameId: string, @Request() req: any): Promise<Buffer | void> {
    const userId = (req as AuthenticatedRequest).authUserId;
    const res: ExResponse = req.res;
    Logger.log(`[LibraryHttpController] GET /library/${userGameId}/grid user=${userId}`);

    const userGame = await userGameRepository.findByUserAndId(userId, userGameId);
    if (!userGame) {
      res.status(404).json({ error: 'Game not found' });
      return;
    }

    const catalogEntry = (userGame as any).GameCatalog ?? (userGame as any).gameCatalog;
    const rawGridPath = catalogEntry?.gridImageUrl;
    if (!rawGridPath) {
      Logger.warn(`[LibraryHttpController] grid miss: no gridImageUrl in catalog for userGameId=${userGameId}`);
      res.status(404).json({ error: 'Grid image not available' });
      return;
    }

    const gridPath = path.resolve(rawGridPath);
    const ext = path.extname(gridPath).toLowerCase();
    const contentType = ext === '.png'
      ? 'image/png'
      : ext === '.jpg' || ext === '.jpeg'
        ? 'image/jpeg'
        : ext === '.webp'
          ? 'image/webp'
          : null;

    if (!contentType || !path.isAbsolute(gridPath) || !fs.existsSync(gridPath)) {
      Logger.warn(`[LibraryHttpController] grid miss: invalid/non-existent path for userGameId=${userGameId} path=${gridPath}`);
      res.status(404).json({ error: 'Grid image not available' });
      return;
    }

    const image = fs.readFileSync(gridPath);
    if (image.length === 0) {
      Logger.warn(`[LibraryHttpController] grid miss: empty image for userGameId=${userGameId} path=${gridPath}`);
      res.status(404).json({ error: 'Grid image not available' });
      return;
    }

    Logger.log(`[LibraryHttpController] grid hit: userGameId=${userGameId} path=${gridPath} size=${image.length}`);
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.send(image);
  }

  /**
   * Devuelve el detalle completo de un juego.
   * Si los datos de la store todavía no han sido obtenidos (detailsFetchedAt IS NULL),
   * los obtiene en este momento, los persiste en la DB y los devuelve.
   * Las llamadas posteriores se sirven directamente desde la cache en DB.
   */
  @Get('{userGameId}/detail')
  @Response<LibraryErrorResponse>(404, 'Juego no encontrado')
  public async getDetail(@Path() userGameId: string, @Request() req: any): Promise<GameDetailDto | void> {
    const userId = (req as AuthenticatedRequest).authUserId;
    const res: ExResponse = req.res;

    const userGame = await userGameRepository.findByUserAndId(userId, userGameId);
    if (!userGame) {
      res.status(404).json({ error: 'Game not found' });
      return;
    }

    const catalogEntry = (userGame as any).GameCatalog ?? (userGame as any).gameCatalog;
    if (!catalogEntry) {
      res.status(404).json({ error: 'Catalog entry not found' });
      return;
    }

    const enriched = await gameStoreEnrichmentService.enrichIfNeeded(catalogEntry);
    const resolvedGridUrl = enriched.gridImageUrl ? `/library/${userGame.id}/grid` : undefined;
    const resolvedCoverUrl = resolvedGridUrl ?? enriched.coverUrl;
    
    return {
      userGameId: userGame.id,
      id: enriched.id,
      title: enriched.title,
      launcher: enriched.launcher,
      launcherId: enriched.launcherId,
      // Backward compatibility for clients that still render from coverUrl.
      coverUrl: resolvedCoverUrl,
      // Expose authenticated backend endpoint for grid image.
      gridImageUrl: resolvedGridUrl,
      backgroundImageUrl: enriched.backgroundImageUrl,
      description: enriched.description,
      detailedDescription: enriched.detailedDescription,
      aboutTheGame: enriched.aboutTheGame,
      releaseDate: enriched.releaseDate,
      genres: enriched.genres,
      categories: enriched.categories,
      screenshots: enriched.screenshots,
      movies: enriched.movies,
      developers: enriched.developers,
      publishers: enriched.publishers,
      platforms: enriched.platforms,
      metacriticScore: enriched.metacriticScore,
      metacriticUrl: enriched.metacriticUrl,
      website: enriched.website,
      supportedLanguages: enriched.supportedLanguages,
      requiredAge: enriched.requiredAge,
      isFree: enriched.isFree,
      detailsFetchedAt: enriched.detailsFetchedAt,
      isInstalled: userGame.isInstalled,
      installPath: userGame.installPath,
      executablePath: userGame.executablePath,
      playtime: userGame.playtimeMinutes,
    };
  }

  /**
   * Lanza un juego instalado.
   * Prioridad: executablePath guardado → protocol URL del launcher → auto-descubrimiento del .exe.
   */
  @Post('{userGameId}/launch')
  @Response<LibraryErrorResponse>(400, 'No se puede lanzar')
  @Response<LibraryErrorResponse>(404, 'Juego no encontrado')
  public async launchGame(@Path() userGameId: string, @Request() req: any): Promise<GameActionResult> {
    const userId = (req as AuthenticatedRequest).authUserId;
    return gameActionService.launchGame(userId, userGameId);
  }

  /**
   * Abre el launcher para instalar un juego sincronizado pero no instalado localmente.
   */
  @Post('{userGameId}/install')
  @Response<LibraryErrorResponse>(400, 'No se puede instalar')
  @Response<LibraryErrorResponse>(404, 'Juego no encontrado')
  public async installGame(@Path() userGameId: string, @Request() req: any): Promise<GameActionResult> {
    const userId = (req as AuthenticatedRequest).authUserId;
    return gameActionService.installGame(userId, userGameId);
  }

  /**
   * Abre el launcher para desinstalar un juego.
   * NO borra archivos directamente. El estado se actualiza en la próxima sincronización.
   */
  @Post('{userGameId}/uninstall')
  @Response<LibraryErrorResponse>(404, 'Juego no encontrado')
  public async uninstallGame(@Path() userGameId: string, @Request() req: any): Promise<GameActionResult> {
    const userId = (req as AuthenticatedRequest).authUserId;
    return gameActionService.uninstallGame(userId, userGameId);
  }
}
