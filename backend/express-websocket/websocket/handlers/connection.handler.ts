import type { AuthenticatedSocket } from '@shared-types/socket.types.js';

export class ConnectionHandler {
  public handleConnection(socket: AuthenticatedSocket): void {
    const userId = socket.userId;
    const room = `user:${userId}`;

    socket.join(room);

    console.log('Socket user ID:', userId);
    console.log('Joined room:', room);

    socket.on('disconnect', (reason) => {
      console.log(`Socket disconnected: ${userId} (${reason})`);
    });
  }
}
