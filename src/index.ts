import * as http from "http";

import { toNodeRequestListener } from "http4ts";

import { Router } from "./router";
import { handleErrorFilter } from "./filters/error-handler";
import { createLogger } from "./utils/logger";
import { createDb } from "./db/db";

async function main() {
  const logger = createLogger();

  const db = createDb();

  const handleError = handleErrorFilter(logger);
  const routes = new Router().routes;

  const server = http.createServer(toNodeRequestListener(handleError(routes)));

  const hostname = "127.0.0.1";
  const port = 3000;

  server.listen(port, hostname, () => {
    logger.info(`Server running at http://${hostname}:${port}/`);
  });
}

main().catch(console.error);
