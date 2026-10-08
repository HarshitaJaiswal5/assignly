import type { Server as HttpServer } from 'node:http';
import { Server } from 'socket.io';
import { env } from '@config/env.js';
import { socketAuth } from '@wss/middleware/auth.middleware.js';
import { ConnectionHandler } from '@wss/handlers/connection.handler.js';
import { ApplicationNotificationService } from '@wss/services/notification.services.js';
import type { AuthenticatedSocket } from '@shared-types/socket.types.js';

export class WebSocketServer {
  private readonly io: Server;
  private readonly connectionHandler: ConnectionHandler;
  private readonly notificationService: ApplicationNotificationService;

  constructor(
    httpServer: HttpServer,
  ) {
    this.io = new Server(httpServer, {
      cors: {
        origin: env.CLIENT_ORIGIN,
        credentials: true,
      },
    });

    this.io.use(socketAuth);

    this.connectionHandler =
      new ConnectionHandler(this.io);

    this.notificationService =
      new ApplicationNotificationService(this.io);

    this.registerConnection();
  }

  private registerConnection(): void {
    this.io.on(
      'connection',
      (socket) => {
        this.connectionHandler.handleConnection(
          socket as AuthenticatedSocket,
        );
      },
    );
  }

  public getNotificationService(): ApplicationNotificationService {
    return this.notificationService;
  }

  public testApplicationNotification(userId: string): void {
  const payload = {
    gigId: 'fake-gig-123',
    applicationId: 'fake-application-456',
    applicantId: 'fake-user-A',
    applicantName: 'User A',
    postedByUserId: userId,
    negotiatedPrice: 500,
  };

  this.notificationService.notifyGigOwner(payload);
}
}