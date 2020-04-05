import { Router } from "./router";
import { handleErrorFilter } from "./filters/error-handler";
import { createLogger } from "./utils/logger";
import { createDb } from "./repository/db";
import { AppConfig } from "./config/app-config";
import { RegisterUserHandler } from "./handlers/register-user-handler";
import { ConduitRepositoryImpl } from "./repository/conduit-repository";

export function app(config: AppConfig) {
  const logger = createLogger(config.logLevel);

  const db = createDb(config.db);
  logger.info("DB created");

  const repository = new ConduitRepositoryImpl(db);

  const registerUserHandler = new RegisterUserHandler(repository);

  const handleError = handleErrorFilter(logger);
  const router = new Router(registerUserHandler);

  return handleError(router.routes);
}
