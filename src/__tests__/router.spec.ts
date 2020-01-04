import { Router } from "../router";
import { HttpStatus } from "http4ts";
import { req } from "../utils/http-message-factories";

describe("router", () => {
  it("should return not found when the endpoint is not found", async () => {
    const routes = new Router().routes;

    const resp = await routes(req("/not-found", ""));

    expect(resp.status).toBe(HttpStatus.NOT_FOUND);
  });
});
