import { app } from '@app/app.js';
import { env } from '@config/env.js';
import { WebSocketServer } from '@wss/server/server.js';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';

export function serverExpress() {
  const port = Number(env.HTTP_SERVER_PORT) || 6000;

  const httpServer = createServer(app);

  const websocketserver = new WebSocketServer(httpServer);

  httpServer.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

  setTimeout(() => {
    websocketserver.testApplicationNotification('cmuwasmpi0000f4ullvv8f2ca');
  }, 5000);

  return httpServer;
}

const filename = fileURLToPath(import.meta.url);

if (process.argv[1] === filename) {
  serverExpress();
}
