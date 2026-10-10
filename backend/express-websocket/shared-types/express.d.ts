import type { AuthenticatedUser } from '@repo/auth-service';

declare global {
  namespace Express {
    interface Request {
      user: AuthenticatedUser;
    }
  }
}

export {};