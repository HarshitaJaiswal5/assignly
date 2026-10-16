
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';

import { app } from '@app/app.js';
import { env } from '@config/env.js';
import { applicationService } from '@services/application.services.js';
import { WebSocketServer } from '@wss/server/server.js';

export function serverExpress() {
  const port = Number(env.HTTP_SERVER_PORT) || 8080;

  const httpServer = createServer(app);
  const webSocketServer = new WebSocketServer(httpServer);

  applicationService.setNotificationService(
    webSocketServer.getNotificationService(),
  );

  httpServer.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

  return { httpServer, webSocketServer };
}

const filename = fileURLToPath(import.meta.url);

if (process.argv[1] === filename) {
  serverExpress();
}
