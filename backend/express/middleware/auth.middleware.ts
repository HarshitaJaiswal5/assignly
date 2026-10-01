import type { NextFunction, Request, Response } from 'express';

import {
  AuthService,
  type AuthenticatedUser,
} from '@repo/auth-service/';

import { UnauthorizedError } from '@utils/ApiError.js';

export interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser;
}

const authService = new AuthService();

export const requireAuth = async (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const sessionToken =
      req.cookies?.['authjs.session-token'] ??
      req.cookies?.['__Secure-authjs.session-token'];

    if (!sessionToken) {
      throw new UnauthorizedError('Authentication required');
    }

    const user = await authService.getAuthenticatedUser(sessionToken);

    if (!user) {
      throw new UnauthorizedError('Invalid or expired session');
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};