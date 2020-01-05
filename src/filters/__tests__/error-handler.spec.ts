import { createLogger } from "../../utils/logger";
import { handleErrorFilter, HttpError } from "../error-handler";
import { HttpStatus } from "http4ts";
import { req } from "../../utils/http-message-factories";

const logger = createLogger("fatal");
const errorHandler = handleErrorFilter(logger);

describe("Filters.errorHandler", () => {
  it("should handle errors and return a default error", async () => {
    const handler = errorHandler(() => {
      throw new Error();
    });

    // TODO: error handler does not need to be an async function
    const resp = await handler(req("/", "", "POST"));
    // TODO: http4ts: add req factory function
    // TODO: http4ts: Improve HttpMethod type. Maybe something like an enum?
    // TODO: http4ts: Change HttpRequestImpl constructor parameter type of httpmethod

    expect(resp.status).toBe(HttpStatus.UNPROCESSABLE_ENTITY);
    expect(await resp.body.asString()).toBe(
      '{"errors":{"body":["UNPROCESSABLE_ENTITY"]}}'
    );
  });

  it("should return the correct http error if the exception is an HttpError", async () => {
    const handler = errorHandler(() => {
      throw new HttpError(HttpStatus.BAD_REQUEST);
    });

    const resp = await handler(req("/", ""));

    expect(resp.status).toBe(HttpStatus.BAD_REQUEST);
    expect(await resp.body.asString()).toBe(
      '{"errors":{"body":["BAD_REQUEST"]}}'
    );
  });
});
