import type { Socket } from 'socket.io';
import { parseCookie } from 'cookie';

import { AuthService } from '@repo/auth-service';
import type { AuthenticatedSocket } from '@shared-types/socket.types.js';

const authService = new AuthService();

export const socketAuth = async (
  socket: Socket,
  next: (error?: Error) => void,
): Promise<void> => {
  try {
    const cookieHeader = socket.handshake.headers.cookie;

    if (!cookieHeader) {
      return next(new Error('Authentication required'));
    }

    const cookies = parseCookie(cookieHeader);

    const sessionToken =
      cookies['authjs.session-token'] ??
      cookies['__Secure-authjs.session-token'];

    if (!sessionToken) {
      return next(new Error('Authentication required'));
    }

    const user = await authService.getAuthenticatedUser(sessionToken);

    if (!user) {
      return next(new Error('Invalid or expired session'));
    }

    const authenticatedSocket = socket as AuthenticatedSocket;

    authenticatedSocket.user = user;
    authenticatedSocket.userId = user.id;

    next();
  } catch (error) {
    next(
      error instanceof Error
        ? error
        : new Error('Authentication failed'),
    );
  }
};