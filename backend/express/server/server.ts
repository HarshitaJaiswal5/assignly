import { app } from "@app/app.js";
import { fileURLToPath } from "url";
import { env } from "@config/env.js";

export function serverExpress() {
  const port = Number(env.HTTP_SERVER_PORT) || 6000;

  const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

  return server;
}

const filename = fileURLToPath(import.meta.url);

if (process.argv[1] === filename) {
  serverExpress();
}