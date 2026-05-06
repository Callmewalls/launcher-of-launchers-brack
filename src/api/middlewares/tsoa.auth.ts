import type { Request } from 'express';
import { AuthSessionService } from '@services/auth/AuthSessionService';
import type { AuthenticatedRequest } from './auth.middleware';

const authSessionService = new AuthSessionService();

/**
 * tsoa authentication module.
 * Called automatically for every route decorated with @Security('jwt').
 * Must throw on failure — tsoa catches the error and returns 401.
 */
export function expressAuthentication(
  request: Request,
  securityName: string,
  _scopes?: string[],
): Promise<string> {
  if (securityName !== 'jwt') {
    return Promise.reject(new Error(`Unknown security scheme: ${securityName}`));
  }

  const token = authSessionService.extractBearerToken(request.header('Authorization'));
  if (!token) {
    return Promise.reject(Object.assign(new Error('Missing Authorization bearer token'), { status: 401 }));
  }

  const userId = authSessionService.resolveUserIdFromToken(token);
  if (!userId) {
    return Promise.reject(Object.assign(new Error('Invalid or expired token'), { status: 401 }));
  }

  // Attach userId to request so tsoa controllers can read it
  (request as AuthenticatedRequest).authUserId = userId;
  return Promise.resolve(userId);
}
