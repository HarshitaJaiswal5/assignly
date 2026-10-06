import type { Socket } from 'socket.io';

import type { AuthenticatedUser } from '@repo/auth-service';

export interface AuthenticatedSocket extends Socket {
  user: AuthenticatedUser;
  userId: string;
}