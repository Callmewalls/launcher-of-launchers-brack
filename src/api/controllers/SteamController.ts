import { Controller, Get, Path, Query, Route, Tags, SuccessResponse, Response } from 'tsoa';
import { SteamWebApiService } from '@services/launchers/SteamWebApiService';
import {
  SteamErrorResponse,
  SteamGame,
  SteamGamesResponse,
  SteamPlayer,
  SteamPlayerResponse,
} from '../../shared/types/steam.api.types';

@Route('steam')
@Tags('Steam')
export class SteamController extends Controller {
  private readonly steamService: SteamWebApiService;

  constructor() {
    super();
    this.steamService = new SteamWebApiService();
  }

  /**
   * Devuelve el listado de juegos en propiedad de un usuario de Steam.
   * @param steamId SteamID64 de 17 dígitos (ej: 76561198000000000)
   * @param includeAppInfo Incluir nombre e imágenes de cada juego (por defecto true)
   */
  @Get('{steamId}/owned-games')
  @SuccessResponse(200, 'OK')
  @Response<SteamErrorResponse>(503, 'Steam API no configurada')
  @Response<SteamErrorResponse>(400, 'SteamID inválido')
  public async getOwnedGames(
    @Path() steamId: string,
    @Query() includeAppInfo?: boolean,
  ): Promise<SteamGamesResponse> {
    if (!this.steamService.isConfigured()) {
      this.setStatus(503);
      return { success: false, error: 'STEAM_API_KEY not configured' };
    }

    const games = await this.steamService.getOwnedGames(steamId, includeAppInfo ?? true);

    return {
      success: true,
      data: games as SteamGame[],
      message: `${games.length} games found`,
    };
  }

  /**
   * Devuelve el resumen del perfil de un usuario de Steam.
   * @param steamId SteamID64 de 17 dígitos
   */
  @Get('{steamId}/player-summary')
  @SuccessResponse(200, 'OK')
  @Response<SteamErrorResponse>(503, 'Steam API no configurada')
  @Response<SteamErrorResponse>(404, 'Jugador no encontrado')
  public async getPlayerSummary(
    @Path() steamId: string,
  ): Promise<SteamPlayerResponse> {
    if (!this.steamService.isConfigured()) {
      this.setStatus(503);
      return { success: false, error: 'STEAM_API_KEY not configured' };
    }

    const player = await this.steamService.getPlayerSummary(steamId);

    if (!player) {
      this.setStatus(404);
      return { success: false, error: 'Player not found' };
    }

    return { success: true, data: player as SteamPlayer };
  }

  /**
   * Devuelve los juegos jugados recientemente (últimas 2 semanas).
   * @param steamId SteamID64 de 17 dígitos
   * @param count Número máximo de juegos a devolver (por defecto 10)
   */
  @Get('{steamId}/recently-played')
  @SuccessResponse(200, 'OK')
  @Response<SteamErrorResponse>(503, 'Steam API no configurada')
  public async getRecentlyPlayedGames(
    @Path() steamId: string,
    @Query() count?: number,
  ): Promise<SteamGamesResponse> {
    if (!this.steamService.isConfigured()) {
      this.setStatus(503);
      return { success: false, error: 'STEAM_API_KEY not configured' };
    }

    const games = await this.steamService.getRecentlyPlayedGames(steamId, count ?? 10);

    return {
      success: true,
      data: games as SteamGame[],
      message: `${games.length} recently played games`,
    };
  }
}
