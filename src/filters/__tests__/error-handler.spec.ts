import { createLogger } from "../../utils/logger";
import { handleErrorFilter } from "../error-handler";
import { HttpRequestImpl, HttpBodyImpl, HttpStatus } from "http4ts";

const logger = createLogger();
const errorHandler = handleErrorFilter(logger);

describe("Filters.errorHandler", () => {
  it("should handle errors", async () => {
    const handler = errorHandler(() => {
      throw new Error();
    });

    // TODO: error handler does not need to be an async function
    const resp = await handler(
      new HttpRequestImpl("/", HttpBodyImpl.fromString(""), "POST", {})
    );
    // TODO: http4ts: add req factory function
    // TODO: http4ts: Improve HttpMethod type
    // TODO: http4ts: Change HttpRequestImpl constructor parameter type of httpmethod

    expect(resp.status).toBe(HttpStatus.UNPROCESSABLE_ENTITY);
  });
});
