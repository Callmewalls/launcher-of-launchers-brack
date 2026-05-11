import { Controller, Post, Body, Tags, Route, SuccessResponse, Response } from 'tsoa';
import { UserAuthService } from '@services/auth/UserAuthService';

interface RegisterBody {
  username: string;
  email: string;
  password: string;
}

interface LoginBody {
  email: string;
  password: string;
}

interface GoogleAuthBody {
  idToken: string;
}

interface ErrorResponse {
  success: false;
  message: string;
}

@Route('auth')
@Tags('Auth')
export class AuthHttpController extends Controller {
  private readonly authService: UserAuthService;

  constructor() {
    super();
    this.authService = new UserAuthService();
  }

  /** Registra un nuevo usuario con email y contraseña */
  @Post('register')
  @SuccessResponse(201, 'Created')
  @Response<ErrorResponse>(400, 'Datos inválidos')
  @Response<ErrorResponse>(409, 'Usuario ya existe')
  public async register(@Body() body: RegisterBody): Promise<unknown> {
    this.setStatus(201);
    return this.authService.register(body.username, body.email, body.password);
  }

  /** Inicia sesión con email y contraseña */
  @Post('login')
  @Response<ErrorResponse>(401, 'Credenciales inválidas')
  public async login(@Body() body: LoginBody): Promise<unknown> {
    return this.authService.login(body.email, body.password);
  }

  /** Registra un nuevo usuario usando un Google ID token */
  @Post('register/google')
  @SuccessResponse(201, 'Created')
  @Response<ErrorResponse>(400, 'Token inválido')
  @Response<ErrorResponse>(503, 'Google Auth no configurado')
  public async registerWithGoogle(@Body() body: GoogleAuthBody): Promise<unknown> {
    this.setStatus(201);
    return this.authService.registerWithGoogle(body.idToken);
  }

  /** Inicia sesión usando un Google ID token */
  @Post('login/google')
  @Response<ErrorResponse>(401, 'Sin cuenta asociada')
  @Response<ErrorResponse>(503, 'Google Auth no configurado')
  public async loginWithGoogle(@Body() body: GoogleAuthBody): Promise<unknown> {
    return this.authService.loginWithGoogle(body.idToken);
  }

  /**
   * Auto-login silencioso para la app desktop local.
   * Crea el usuario local si no existe y devuelve un JWT válido.
   * Solo debe llamarse desde localhost.
   */
  @Post('auto-login')
  @SuccessResponse(200, 'OK')
  public async autoLogin(): Promise<unknown> {
    return this.authService.autoLogin();
  }
}

