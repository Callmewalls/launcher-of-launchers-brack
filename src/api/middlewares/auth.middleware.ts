import { NextFunction, Request, Response } from 'express';
import { AuthSessionService } from '@services/auth/AuthSessionService';

export interface AuthenticatedRequest extends Request {
  authUserId: string;
}

const authSessionService = new AuthSessionService();

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const token = authSessionService.extractBearerToken(req.header('Authorization'));
  if (!token) {
    res.status(401).json({ success: false, error: 'Missing Authorization bearer token' });
    return;
  }

  const userId = authSessionService.resolveUserIdFromToken(token);
  if (!userId) {
    res.status(401).json({ success: false, error: 'Invalid or expired token' });
    return;
  }

  (req as AuthenticatedRequest).authUserId = userId;
  next();
}