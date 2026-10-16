
import { io, type Socket } from "socket.io-client";

import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from "@/types/socket.types";

export type AppSocket = Socket<
  ServerToClientEvents,
  ClientToServerEvents
>;

let socket: AppSocket | null = null;

export function createSocketClient(): AppSocket {
  if (socket) {
    return socket;
  }

  const url = process.env.NEXT_PUBLIC_SOCKET_URL;

  if (!url) {
    throw new Error("NEXT_PUBLIC_SOCKET_URL is not configured");
  }

  socket = io(url, {
    autoConnect: false,
    withCredentials: true,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    timeout: 10000,
  }) as AppSocket;

  return socket;
}

export function disconnectSocket(): void {
  if (!socket) return;

  socket.disconnect();
  socket = null;
}
