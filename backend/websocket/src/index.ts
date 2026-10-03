import { env } from '@config/env.js';
import { WebSocketServer } from '@src/server/server.js';

const webSocketServer =
  new WebSocketServer(env.WS_SERVER_PORT);

const shutdown = (): void => {
  console.log(
    'Shutting down WebSocket server...',
  );

  webSocketServer.close();

  process.exit(0);
};

process.on(
  'SIGINT',
  shutdown,
);

process.on(
  'SIGTERM',
  shutdown,
);