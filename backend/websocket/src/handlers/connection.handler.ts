import type { Server } from 'socket.io';
import type { AuthenticatedSocket } from '../types/socket.types.js';

export class ConnectionHandler {
  constructor(
    private readonly io: Server,
  ) {}

  public handleConnection(socket: AuthenticatedSocket): void {
    const userId = this.extractUserId(socket);

    if (!userId) {
      socket.disconnect(true);
      return;
    }

    socket.userId = userId;

    // Create a private room for this user.
    socket.join(`user:${userId}`);

    console.log(
      `Socket connected: ${userId} (${socket.id})`,
    );

    socket.on('disconnect', (reason) => {
      console.log(
        `Socket disconnected: ${userId} (${reason})`,
      );
    });
  }

  private extractUserId(
    socket: AuthenticatedSocket,
  ): string | null {
    const userId = socket.handshake.auth?.userId;

    return typeof userId === 'string' && userId.length > 0
      ? userId
      : null;
  }
}