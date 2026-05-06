import { Controller, Get, Post, Put, Delete, Body, Path, Query, Route, Tags, Security, SuccessResponse, Response, Request } from 'tsoa';
import { LauncherLinkService } from '@services/launchers/LauncherLinkService';
import { Logger } from '@utils/logger';
import { LauncherType } from '@shared/types/launcher.types';
import type { AuthenticatedRequest } from '../middlewares/auth.middleware';

interface ApiError { success: false; error: string; }
interface AuthUrlResponse { success: true; authUrl: string; }
interface MessageResponse { success: true; message: string; }
interface CapabilitiesResponse { success: true; launchers: unknown; }
interface LocalConfigResponse { success: true; config: unknown; }
interface LinkLauncherBody { launcherType: string; accountName: string; }
interface ExchangeCodeBody { code: string; state: string; }
interface LocalConfigBody { installBasePath?: string; executablePattern?: string; }

@Route('launchers')
@Tags('Launchers')
export class LauncherHttpController extends Controller {
  private readonly launcherLinkService: LauncherLinkService;

  constructor() {
    super();
    this.launcherLinkService = new LauncherLinkService();
  }

  /** Devuelve las capacidades de todos los launchers registrados */
  @Get('capabilities')
  public async getCapabilities(): Promise<CapabilitiesResponse> {
    const launchers = this.launcherLinkService.getLauncherCapabilities();
    return { success: true, launchers };
  }

  /** Devuelve las cuentas de launcher vinculadas del usuario */
  @Get('linked')
  @Security('jwt')
  public async getLinkedAccounts(@Request() req: any): Promise<unknown> {
    const userId = (req as AuthenticatedRequest).authUserId;
    return this.launcherLinkService.getLinkedAccounts(userId);
  }

  /**
   * Devuelve la URL de autenticación OAuth2/OpenID para el launcher indicado.
   * Steam usa OpenID 2.0; el resto usa OAuth2.
   */
  @Get('{launcherType}/auth-url')
  @Security('jwt')
  @Response<ApiError>(400, 'Launcher no soportado')
  public async getAuthUrl(
    @Request() req: any,
    @Path() launcherType: string,
    @Query() returnUrl?: string,
  ): Promise<AuthUrlResponse> {
    const userId = (req as AuthenticatedRequest).authUserId;
    const authUrl = launcherType === 'steam'
      ? this.launcherLinkService.getSteamAuthUrl(userId, returnUrl)
      : this.launcherLinkService.getOAuth2AuthUrl(userId, launcherType as LauncherType, returnUrl);
    return { success: true, authUrl };
  }

  /**
   * Callback OAuth2 para launchers que redirigen al backend directamente.
   * Ruta pública — no requiere JWT.
   */
  @Get('{launcherType}/callback')
  @Response<ApiError>(400, 'Parámetros inválidos')
  public async handleCallback(
    @Request() req: any,
    @Path() launcherType: string,
    @Query() code?: string,
    @Query() state?: string,
  ): Promise<MessageResponse> {
    if (launcherType === 'steam') {
      return this.handleSteamCallbackInternal(req);
    }
    if (!code) throw Object.assign(new Error('Missing code parameter'), { status: 400 });
    if (!state) throw Object.assign(new Error('Missing state parameter'), { status: 400 });

    const result = await this.launcherLinkService.handleOAuth2CallbackForLauncher(launcherType as LauncherType, code, state);
    if (!result.success) {
      Logger.warn(`[LauncherHttpController] ${launcherType} callback failed: ${result.error}`);
      throw Object.assign(new Error(result.error ?? `${launcherType} linking failed`), { status: 400 });
    }
    return { success: true, message: result.message ?? 'Linked' };
  }

  private async handleSteamCallbackInternal(req: any): Promise<MessageResponse> {
    const query = (req.query ?? {}) as Record<string, unknown>;
    const state = typeof query.state === 'string' ? query.state : '';
    if (!state) throw Object.assign(new Error('Missing state parameter'), { status: 400 });

    const rawQueryString = typeof req.originalUrl === 'string' && req.originalUrl.includes('?') ? req.originalUrl.split('?')[1] : '';
    const result = await this.launcherLinkService.handleSteamCallback(state, rawQueryString);
    if (!result.success) {
      Logger.warn(`[LauncherHttpController] Steam callback failed: ${result.error}`);
      throw Object.assign(new Error(result.error ?? 'Steam linking failed'), { status: 500 });
    }
    return { success: true, message: result.message ?? 'Steam linked' };
  }

  /** Vincula manualmente una cuenta de launcher (sin OAuth2) */
  @Post('link')
  @Security('jwt')
  @SuccessResponse(201, 'Created')
  @Response<ApiError>(400, 'Datos inválidos')
  public async linkLauncher(@Body() body: LinkLauncherBody, @Request() req: any): Promise<unknown> {
    const userId = (req as AuthenticatedRequest).authUserId;
    this.setStatus(201);
    return this.launcherLinkService.linkLauncher(userId, body.launcherType as LauncherType, body.accountName);
  }

  /** Desvincula una cuenta de launcher */
  @Delete('{accountId}')
  @Security('jwt')
  @Response<ApiError>(404, 'Launcher account not found')
  public async unlinkLauncher(@Path() accountId: string, @Request() req: any): Promise<MessageResponse> {
    const userId = (req as AuthenticatedRequest).authUserId;
    const unlinked = await this.launcherLinkService.unlinkLauncher(userId, accountId);
    if (!unlinked) {
      throw Object.assign(new Error('Launcher account not found'), { status: 404 });
    }
    return { success: true, message: 'Launcher account unlinked' };
  }

  /**
   * Sincroniza un launcher específico del usuario.
   * Devuelve el resumen de juegos agregados/actualizado.
   */
  @Post('{accountId}/sync')
  @Security('jwt')
  @Response<ApiError>(404, 'Linked launcher account not found')
  public async syncLauncher(@Path() accountId: string, @Request() req: any): Promise<{ success: true; message: string; count: number; errors: number; }> {
    const userId = (req as AuthenticatedRequest).authUserId;
    const summary = await this.launcherLinkService.syncLauncher(userId, accountId);
    if (!summary) {
      throw Object.assign(new Error('Linked launcher account not found'), { status: 404 });
    }
    return {
      success: true,
      message: 'Launcher synchronized',
      count: summary.count,
      errors: summary.errors,
    };
  }

  /**
   * Sincroniza todos los launchers vinculados del usuario.
   */
  @Post('sync/all')
  @Security('jwt')
  public async syncAllLaunchers(@Request() req: any): Promise<{ success: true; message: string; summary: unknown; }> {
    const userId = (req as AuthenticatedRequest).authUserId;
    const summary = await this.launcherLinkService.syncAll(userId);
    return {
      success: true,
      message: 'All linked launchers synchronized',
      summary,
    };
  }

  /**
   * Realiza un escaneo local directo de instalaciones para todos los launchers que soportan detección de estado.
   * No requiere sincronización previa y no escribe a la base de datos.
   */
  @Get('scan/local')
  @Security('jwt')
  public async scanLocalInstallations(@Request() req: any): Promise<{ success: true; message: string; summary: unknown; }> {
    const userId = (req as AuthenticatedRequest).authUserId;
    const summary = await this.launcherLinkService.scanLocalInstalledGames(userId);
    return {
      success: true,
      message: 'Local scan completed',
      summary,
    };
  }

  /**
   * Realiza un escaneo local directo solo para el tipo de launcher solicitado.
   */
  @Get('{launcherType}/scan/local')
  @Security('jwt')
  @Response<ApiError>(400, 'Unable to scan')
  public async scanLocalInstallationsByLauncher(
    @Path() launcherType: string,
    @Request() req: any,
  ): Promise<{ success: true; message: string; summary: unknown; }> {
    const userId = (req as AuthenticatedRequest).authUserId;
    try {
      const summary = await this.launcherLinkService.scanLocalInstalledGames(userId, launcherType as LauncherType);
      return {
        success: true,
        message: 'Local scan completed',
        summary,
      };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unable to scan local launcher installation';
      throw Object.assign(new Error(message), { status: 400 });
    }
  }

  /**
   * Utilizado para launchers cuyo redirect_uri apunta a una URL externa (p.ej GOG).
   * El frontend extrae el `code` y `state` de esa URL de redirección y
   * los envía aquí para que el backend complete el intercambio OAuth2.
   */
  @Post('{launcherType}/exchange')
  @Response<ApiError>(400, 'code and state are required')
  public async exchangeCode(
    @Path() launcherType: string,
    @Body() body: ExchangeCodeBody,
  ): Promise<MessageResponse> {
    const code = body.code?.trim() ?? '';
    const state = body.state?.trim() ?? '';

    if (!code || !state) {
      throw Object.assign(new Error('code and state are required'), { status: 400 });
    }

    const result = await this.launcherLinkService.handleOAuth2CallbackForLauncher(launcherType as LauncherType, code, state);

    if (!result.success) {
      Logger.warn(`[LauncherHttpController] ${launcherType} exchange failed: ${result.error}`);
      throw Object.assign(new Error(result.error ?? `${launcherType} exchange failed`), { status: 400 });
    }

    return { success: true, message: result.message ?? 'Code exchanged successfully' };
  }

  /**
   * GET /api/launchers/:launcherType/local-config
   * Devuelve la configuración de instalación local almacenada para este launcher.
   */
  @Get('{launcherType}/local-config')
  @Security('jwt')
  public async getLocalConfig(@Path() launcherType: string, @Request() req: any): Promise<LocalConfigResponse> {
    const userId = (req as AuthenticatedRequest).authUserId;
    const config = await this.launcherLinkService.getLauncherConfig(userId, launcherType as LauncherType);
    return { success: true, config: config ?? null };
  }

  /**
   * PUT /api/launchers/:launcherType/local-config
   * Crea o actualiza la configuración de instalación local para este launcher.
   *
   * installBasePath   — directorio raíz personalizado donde se instalan los juegos
   * executablePattern — plantilla para la ruta del ejecutable; soporta
   *                     placeholders {installPath} y {gameName},
   *                     p.ej "{installPath}\\bin\\{gameName}.exe"
   */
  @Put('{launcherType}/local-config')
  @Security('jwt')
  @Response<ApiError>(400, 'At least one property is required')
  public async upsertLocalConfig(
    @Path() launcherType: string,
    @Body() body: LocalConfigBody,
    @Request() req: any,
  ): Promise<LocalConfigResponse> {
    const userId = (req as AuthenticatedRequest).authUserId;

    const installBasePath = body.installBasePath?.trim() || undefined;
    const executablePattern = body.executablePattern?.trim() || undefined;

    if (installBasePath === undefined && executablePattern === undefined) {
      throw Object.assign(new Error('At least one of installBasePath or executablePattern is required'), { status: 400 });
    }

    const config = await this.launcherLinkService.upsertLauncherConfig(userId, launcherType as LauncherType, {
      installBasePath,
      executablePattern,
    });

    return { success: true, config };
  }
}
