import * as http from "http";

import { toNodeRequestListener } from "http4ts";

import { Router } from "./router";
import { handleErrorFilter } from "./filters/error-handler";
import { createLogger } from "./utils/logger";
import { createDb } from "./db/db";
import { AppConfig, local } from "./config/app-config";

async function main(appConfig: AppConfig) {
  const logger = createLogger(appConfig.logLevel);

  const db = createDb();

  const handleError = handleErrorFilter(logger);
  const routes = new Router().routes;

  const server = http.createServer(toNodeRequestListener(handleError(routes)));

  const hostname = "127.0.0.1";

  server.listen(appConfig.port, hostname, () => {
    logger.info(`Server running at http://${hostname}:${appConfig.port}/`);
  });
}

main(local).catch(console.error);
