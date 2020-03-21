import { createLogger } from "../../utils/logger";
import { handleErrorFilter, HttpError } from "../error-handler";
import { HttpStatus, req, HttpMethods } from "http4ts";

const logger = createLogger("fatal");
const errorHandler = handleErrorFilter(logger);

describe("Filters.errorHandler", () => {
  it("should handle errors and return a default error", async () => {
    const handler = errorHandler(() => {
      throw new Error();
    });

    // TODO: error handler does not need to be an async function
    const resp = await handler(req({ url: "/", method: HttpMethods.POST }));

    expect(resp.status).toBe(HttpStatus.UNPROCESSABLE_ENTITY);
    expect(await resp.body.asString()).toBe(
      '{"errors":{"body":["UNPROCESSABLE_ENTITY"]}}'
    );
  });

  it("should return the correct http error if the exception is an HttpError", async () => {
    const handler = errorHandler(() => {
      throw new HttpError(HttpStatus.BAD_REQUEST);
    });

    const resp = await handler(req({ url: "/" }));

    expect(resp.status).toBe(HttpStatus.BAD_REQUEST);
    expect(await resp.body.asString()).toBe(
      '{"errors":{"body":["BAD_REQUEST"]}}'
    );
  });
});
