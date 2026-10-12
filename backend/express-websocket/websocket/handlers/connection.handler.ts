import type { Server } from 'socket.io';

import type { AuthenticatedSocket } from '@shared-types/socket.types.js';

export class ConnectionHandler {
  constructor(
    private readonly io: Server,
  ) {}

  public handleConnection(
    socket: AuthenticatedSocket,
  ): void {
    const userId = socket.userId;

    socket.join(this.getUserRoom(userId));

    console.log(`Socket connected: ${userId}`);

    socket.on('disconnect', (reason) => {
      console.log(
        `Socket disconnected: ${userId} (${reason})`,
      );
    });
  }

  private getUserRoom(userId: string): string {
    return `user:${userId}`;
  }
}