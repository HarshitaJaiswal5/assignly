import { WebSocketServer } from '@src/server/server.js';

const webSocketServer = new WebSocketServer();

webSocketServer.start();

const shutdown = (): void => {
  console.log('Shutting down WebSocket server...');

  webSocketServer.close();

  process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);