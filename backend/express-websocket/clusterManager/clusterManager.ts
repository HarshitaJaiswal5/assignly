
import cluster from 'node:cluster';
import { availableParallelism } from 'node:os';

import { serverExpress } from '@server/server.js';

const totalCPUs = availableParallelism();

if (cluster.isPrimary) {
  for (let i = 0; i < totalCPUs; i += 1) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(
      `Worker ${worker.process.pid} exited (code: ${code}, signal: ${signal})`,
    );

    cluster.fork();
  });
} else {
  const server = serverExpress();

  process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    console.error('Shutting down worker...');

    server.httpServer.close(() => {
      process.exit(1);
    });
  });

  process.on('unhandledRejection', (error) => {
    console.error('Unhandled Rejection:', error);

    server.webSocketServer.getIO().close(() => {
      process.exit(1);
    });
  });
}
