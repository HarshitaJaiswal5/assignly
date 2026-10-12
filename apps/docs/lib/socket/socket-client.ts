import { io, type Socket } from 'socket.io-client';

import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from './socket.types';

let socket: Socket<
  ServerToClientEvents,
  ClientToServerEvents
> | null = null;

export function getSocket() {
  if (!socket) {
    const url = process.env.NEXT_PUBLIC_SOCKET_URL;

    if (!url) {
      throw new Error(
        'NEXT_PUBLIC_SOCKET_URL is not configured',
      );
    }

    socket = io<ServerToClientEvents, ClientToServerEvents>(
      url,
      {
        autoConnect: false,
        withCredentials: true,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        timeout: 10000,
      },
    );
  }

  return socket;
}

export function disconnectSocket() {
  if (socket?.connected) {
    socket.disconnect();
  }
}