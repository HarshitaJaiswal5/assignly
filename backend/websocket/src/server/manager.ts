import { WebSocket } from 'ws';

export class WebSocketManager {
  private readonly connections = new Map<
    string,
    WebSocket
  >();

  public addConnection(
    userId: string,
    socket: WebSocket,
  ): void {
    const existingSocket =
      this.connections.get(userId);

    if (existingSocket) {
      existingSocket.close();
    }

    this.connections.set(userId, socket);

    console.log(
      `WebSocket connected: ${userId}`,
    );
  }

  public removeConnection(
    userId: string,
    socket: WebSocket,
  ): void {
    const currentSocket =
      this.connections.get(userId);

    /*
     * Prevent an old socket from removing
     * a newer connection belonging to the
     * same user.
     */
    if (currentSocket !== socket) {
      return;
    }

    this.connections.delete(userId);

    console.log(
      `WebSocket disconnected: ${userId}`,
    );
  }

  public sendToUser(
    userId: string,
    message: unknown,
  ): boolean {
    const socket =
      this.connections.get(userId);

    if (!socket) {
      return false;
    }

    if (socket.readyState !== WebSocket.OPEN) {
      this.connections.delete(userId);

      return false;
    }

    socket.send(
      JSON.stringify(message),
    );

    return true;
  }

  public isConnected(
    userId: string,
  ): boolean {
    const socket =
      this.connections.get(userId);

    return (
      socket?.readyState === WebSocket.OPEN
    );
  }
}