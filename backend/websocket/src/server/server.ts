import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

import { env } from '../config/env.js';
import { ConnectionHandler } from '../handlers/ConnectionHandler.js';
import type { AuthenticatedSocket } from '../types/socket.types.js';

export class SocketServer {
  private readonly app = express();

  private readonly httpServer = createServer(this.app);

  private readonly io: Server;

  private readonly connectionHandler: ConnectionHandler;

  constructor() {
    this.io = new Server(this.httpServer, {
      cors: {
        origin: env.FRONTEND_URL,
        credentials: true,
      },
    });

    this.connectionHandler = new ConnectionHandler(this.io);

    this.registerEvents();
  }

  private registerEvents(): void {
    this.io.on(
      'connection',
      (socket) => {
        this.connectionHandler.handleConnection(
          socket as AuthenticatedSocket,
        );
      },
    );
  }

  public getIO(): Server {
    return this.io;
  }

  public getApp() {
    return this.app;
  }

  public start(): void {
    this.httpServer.listen(
      env.WS_SERVER_PORT,
      () => {
        console.log(
          `Socket.IO server running on port ${env.WS_SERVER_PORT}`,
        );
      },
    );
  }

  public close(): void {
    this.io.close();
    this.httpServer.close();
  }
}