import { EnvConfig } from '@config/env.config';

const jwt = require('jsonwebtoken') as {
  sign: (payload: Record<string, unknown>, secret: string, options?: Record<string, unknown>) => string;
  verify: (token: string, secret: string) => Record<string, unknown>;
};

export interface SteamLinkStatePayload extends Record<string, unknown> {
  type: 'steam-link';
  userId: string;
  returnUrl?: string;
}

export interface LauncherLinkStatePayload extends Record<string, unknown> {
  type: 'launcher-link';
  launcherType: string;
  userId: string;
  returnUrl?: string;
}

export class AuthSessionService {
  extractBearerToken(authorizationHeader?: string): string | null {
    if (!authorizationHeader) return null;

    const [scheme, token] = authorizationHeader.split(' ');
    if (scheme?.toLowerCase() !== 'bearer' || !token) {
      return null;
    }

    return token;
  }

  resolveUserIdFromToken(token: string): string | null {
    try {
      const payload = jwt.verify(token, EnvConfig.JWT_SECRET);
      const userId = typeof payload.userId === 'string'
        ? payload.userId
        : (typeof payload.sub === 'string' ? payload.sub : null);

      return userId;
    } catch {
      return null;
    }
  }

  signSteamLinkState(userId: string, returnUrl?: string): string {
    const payload: SteamLinkStatePayload = {
      type: 'steam-link',
      userId,
      returnUrl,
    };

    return jwt.sign(payload, EnvConfig.JWT_SECRET, { expiresIn: '10m' });
  }

  verifySteamLinkState(state: string): SteamLinkStatePayload | null {
    try {
      const payload = jwt.verify(state, EnvConfig.JWT_SECRET) as SteamLinkStatePayload;
      if (payload.type !== 'steam-link' || typeof payload.userId !== 'string') {
        return null;
      }

      return payload;
    } catch {
      return null;
    }
  }

  signLauncherLinkState(userId: string, launcherType: string, returnUrl?: string): string {
    const payload: LauncherLinkStatePayload = { type: 'launcher-link', launcherType, userId, returnUrl };
    return jwt.sign(payload, EnvConfig.JWT_SECRET, { expiresIn: '10m' });
  }

  verifyLauncherLinkState(state: string): LauncherLinkStatePayload | null {
    try {
      const payload = jwt.verify(state, EnvConfig.JWT_SECRET) as LauncherLinkStatePayload;
      if (payload.type !== 'launcher-link' || typeof payload.userId !== 'string') {
        return null;
      }

      return payload;
    } catch {
      return null;
    }
  }
}