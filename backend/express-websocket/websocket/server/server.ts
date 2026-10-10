
import type { Server as HttpServer } from 'node:http';
import { Server } from 'socket.io';

import { env } from '@config/env.js';
import type { AuthenticatedSocket } from '@shared-types/socket.types.js';
import { ConnectionHandler } from '@wss/handlers/connection.handler.js';
import { socketAuth } from '@wss/middleware/auth.middleware.js';
import { ApplicationNotificationService } from '@wss/services/notification.services.js';

export class WebSocketServer {
  private readonly io: Server;
  private readonly connectionHandler: ConnectionHandler;
  private readonly notificationService: ApplicationNotificationService;

  constructor(httpServer: HttpServer) {
    this.io = new Server(httpServer, {
      cors: {
        origin: env.CLIENT_ORIGIN,
        credentials: true,
      },
    });

    this.io.use(socketAuth);

    this.connectionHandler = new ConnectionHandler();
    this.notificationService = new ApplicationNotificationService(this.io);

    this.registerEvents();
  }

  private registerEvents(): void {
    this.io.on('connection', (socket) => {
      this.connectionHandler.handleConnection(
        socket as AuthenticatedSocket,
      );
    });
  }

  public getNotificationService(): ApplicationNotificationService {
    return this.notificationService;
  }

  public getIO(): Server {
    return this.io;
  }
}
