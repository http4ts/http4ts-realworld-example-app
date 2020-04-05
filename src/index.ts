import * as http from "http";

import { toNodeRequestListener } from "http4ts";

import { app } from "./app";
import { local, AppConfig } from "./config/app-config";

export async function createServer(config: AppConfig) {
  const server = http.createServer(toNodeRequestListener(app(config)));

  const hostname = "127.0.0.1";

  await new Promise(resolve => {
    server.listen(config.port, hostname, () => {
      console.info(`Server running at http://${hostname}:${config.port}/`);
      resolve();
    });
  });

  return server;
}

createServer(local).catch(console.error);
