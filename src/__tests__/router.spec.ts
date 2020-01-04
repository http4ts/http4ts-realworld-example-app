import { Router } from "../router";
import { HttpRequestImpl, HttpBodyImpl, HttpStatus } from "http4ts";

describe("router", () => {
  it("should return not found when the endpoint is not found", async () => {
    const routes = new Router().routes;

    const resp = await routes(
      new HttpRequestImpl("/not-found", HttpBodyImpl.fromString(""), "GET")
    );

    expect(resp.status).toBe(HttpStatus.NOT_FOUND);
  });
});
