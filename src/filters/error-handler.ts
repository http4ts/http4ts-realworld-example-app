import { HttpHandler, HttpRequest, HttpStatus } from "http4ts";
import { Logger } from "../utils/logger";
import { errorRes } from "../utils/http-message-factories";

export class HttpError extends Error {
  constructor(public status: HttpStatus, message: string = HttpStatus[status]) {
    super(message);

    // See here: https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, Error.prototype);
  }
}

export function isHttpError(err: any): err is HttpError {
  return err.status && err instanceof Error;
}

export const handleErrorFilter = (logger: Logger) => (
  next: HttpHandler
) => async (req: HttpRequest) => {
  try {
    return await next(req);
  } catch (error) {
    logger.error(error);

    if (isHttpError(error)) {
      return errorRes(error.status, [error.message]);
    }

    return errorRes(HttpStatus.UNPROCESSABLE_ENTITY, [
      HttpStatus[HttpStatus.UNPROCESSABLE_ENTITY]
    ]);
  }
};
