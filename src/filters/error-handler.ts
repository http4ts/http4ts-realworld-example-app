import { HttpHandler, HttpRequest, HttpStatus } from "http4ts";
import { Logger } from "pino";
import { res } from "../utils/res";

export const handleErrorFilter = (logger: Logger) => (
  next: HttpHandler
) => async (req: HttpRequest) => {
  try {
    return await next(req);
  } catch (error) {
    logger.error(error);
    return res(HttpStatus.UNPROCESSABLE_ENTITY);
  }
};
