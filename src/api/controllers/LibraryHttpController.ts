import { Controller, Get, Post, Path, Produces, Route, Tags, Security, Response, Request } from 'tsoa';
import { UserLibraryService } from '@services/gameLibrary/UserLibraryService';
import gameActionService from '@services/gameLibrary/GameActionService';
import { iconService } from '@services/gameLibrary/IconService';
import type { AuthenticatedRequest } from '../middlewares/auth.middleware';
import type { Response as ExResponse } from 'express';

export interface LibraryItemDto {
  userGameId: string;
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

export interface GameActionResult {
  success: boolean;
  launched: boolean;
  protocolUrl?: string;
  message?: string;
  error?: string;
}

interface LibraryErrorResponse { success: false; error: string; }

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
