import * as http from "http";

import { toNodeRequestListener } from "http4ts";

import { Router } from "./router";
import { handleErrorFilter } from "./filters/error-handler";
import { createLogger } from "./utils/logger";
import { createDb } from "./repository/db";
import { AppConfig } from "./config/app-config";
import { RegisterUserHandler } from "./handlers/register-user-handler";
import { ConduitRepositoryImpl } from "./repository/conduit-repository";

export async function main(appConfig: AppConfig) {
  const logger = createLogger(appConfig.logLevel);

  const db = createDb(appConfig.db);
  logger.info("DB created");

  const repository = new ConduitRepositoryImpl(db);

  const registerUserHandler = new RegisterUserHandler(repository);

  const handleError = handleErrorFilter(logger);
  const router = new Router(registerUserHandler);
  const server = http.createServer(
    toNodeRequestListener(handleError(router.routes))
  );

  const hostname = "127.0.0.1";

  await new Promise(resolve => {
    server.listen(appConfig.port, hostname, () => {
      logger.info(`Server running at http://${hostname}:${appConfig.port}/`);
      resolve();
    });
  });

  return server;
}
