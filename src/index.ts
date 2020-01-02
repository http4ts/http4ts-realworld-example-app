import * as http from "http";

import { toNodeRequestListener } from "http4ts";

import { router } from "./router";
import { handleErrorFilter } from "./filters/error-handler";
import { createLogger } from "./utils/logger";

async function main() {
  const logger = createLogger();
  const handleError = handleErrorFilter(logger);

  const server = http.createServer(toNodeRequestListener(handleError(router)));

  const hostname = "127.0.0.1";
  const port = 3000;

  server.listen(port, hostname, () => {
    logger.info(`Server running at http://${hostname}:${port}/`);
  });
}

main().catch(console.error);
