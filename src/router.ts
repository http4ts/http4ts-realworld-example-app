import { routes, get, HttpStatus } from "http4ts";
import { res } from "./utils/res";

function routerHandler() {
  return routes(
    get("/healthcheck", () => res(HttpStatus.OK)),
    get("/error", () => {
      throw new Error("an error occured.");
    })
  );
}

export const router = routerHandler();
