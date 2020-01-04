import { routes, get, HttpStatus } from "http4ts";
import { res } from "./utils/res";
// TODO: router handlers should not be availabe on top-level http4ts package

export class Router {
  get routes() {
    return routes(
      get("/healthcheck", () => res(HttpStatus.OK)),
      get("/error", () => {
        throw new Error("an error occured.");
      })
    );
  }
}
