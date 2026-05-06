import bcrypt from 'bcryptjs';
import { OAuth2Client } from 'google-auth-library';
import crypto from 'crypto';
import userRepository from '@repositories/UserRepository';
import launcherConfigRepository from '@repositories/LauncherConfigRepository';
import User from '@entities/User.model';
import { AuthSessionService } from './AuthSessionService';
import { EnvConfig } from '@config/env.config';

export interface AuthUserDto {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthResponse {
  token: string;
  user: AuthUserDto;
}

export class UserAuthService {
  private readonly authSessionService = new AuthSessionService();
  private readonly googleClient = new OAuth2Client();

  async register(username: string, email: string, password: string): Promise<AuthResponse> {
    const normalizedUsername = username.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedUsername || !normalizedEmail || !password) {
      throw new Error('username, email y password son obligatorios');
    }

    const existingEmail = await userRepository.findByEmail(normalizedEmail);
    if (existingEmail) {
      throw new Error('Ya existe un usuario con ese email');
    }

    const existingUsername = await userRepository.findByUsername(normalizedUsername);
    if (existingUsername) {
      throw new Error('Ese username ya esta en uso');
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await userRepository.create({
      username: normalizedUsername,
      email: normalizedEmail,
      password: passwordHash,
    });

    await launcherConfigRepository.seedDefaultsForUser(user.id).catch(() => { /* no bloquea el registro */ });

    return this.buildAuthResponse(user);
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const normalizedEmail = email.trim().toLowerCase();
    const user = await userRepository.findByEmail(normalizedEmail);

    if (!user) {
      throw new Error('Credenciales invalidas');
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Credenciales invalidas');
    }

    return this.buildAuthResponse(user);
  }

  async loginWithGoogle(idToken: string): Promise<AuthResponse> {
    const googleProfile = await this.verifyGoogleToken(idToken);
    const existingUser = await userRepository.findByEmail(googleProfile.email);

    if (!existingUser) {
      throw new Error('No existe una cuenta para este email. Registrate con Google primero.');
    }

    return this.buildAuthResponse(existingUser);
  }

  async registerWithGoogle(idToken: string): Promise<AuthResponse> {
    const googleProfile = await this.verifyGoogleToken(idToken);
    const existingUser = await userRepository.findByEmail(googleProfile.email);

    if (existingUser) {
      return this.buildAuthResponse(existingUser);
    }

    const username = await this.buildUniqueUsername(googleProfile.name, googleProfile.email);
    const randomPassword = crypto.randomUUID();
    const passwordHash = await bcrypt.hash(randomPassword, 10);

    const user = await userRepository.create({
      username,
      email: googleProfile.email,
      password: passwordHash,
    });

    await launcherConfigRepository.seedDefaultsForUser(user.id).catch(() => { /* no bloquea el registro */ });

    return this.buildAuthResponse(user);
  }

  private async verifyGoogleToken(idToken: string): Promise<{ email: string; name: string }> {
    const trimmedToken = idToken.trim();
    if (!trimmedToken) {
      throw new Error('Google token is required');
    }

    const audiences = this.getGoogleAudiences();
    if (audiences.length === 0) {
      throw new Error('Google auth is not configured on backend. Set GOOGLE_CLIENT_ID.');
    }

    const ticket = await this.googleClient.verifyIdToken({
      idToken: trimmedToken,
      audience: audiences,
    });

    const payload = ticket.getPayload();
    if (!payload?.email) {
      throw new Error('Google token payload is missing email');
    }

    if (payload.email_verified === false) {
      throw new Error('Google account email is not verified');
    }

    const email = payload.email.trim().toLowerCase();
    const name = (payload.name ?? payload.email.split('@')[0] ?? 'user').trim();

    return { email, name };
  }

  private getGoogleAudiences(): string[] {
    return EnvConfig.GOOGLE_CLIENT_ID
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean);
  }

  private async buildUniqueUsername(preferredName: string, email: string): Promise<string> {
    const normalizedBase = this.normalizeUsername(preferredName) || this.normalizeUsername(email.split('@')[0]) || 'user';
    let candidate = normalizedBase;
    let suffix = 1;

    while (await userRepository.findByUsername(candidate)) {
      candidate = `${normalizedBase}${suffix}`;
      suffix += 1;
    }

    return candidate;
  }

  private normalizeUsername(value: string): string {
    const normalized = value
      .toLowerCase()
      .replace(/[^a-z0-9_]/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_+|_+$/g, '');

    if (!normalized) return '';
    return normalized.slice(0, 32);
  }

  private buildAuthResponse(user: User): AuthResponse {
    const token = this.signSessionToken(user.id);

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  }

  private signSessionToken(userId: string): string {
    const jwt = require('jsonwebtoken') as {
      sign: (payload: Record<string, unknown>, secret: string, options?: Record<string, unknown>) => string;
    };

    return jwt.sign(
      { userId, sub: userId, type: 'session' },
      EnvConfig.JWT_SECRET,
      { expiresIn: EnvConfig.JWT_EXPIRATION }
    );
  }
}
