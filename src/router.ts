import { routes, get, HttpStatus, post, HttpHandler } from "http4ts";
import { res, jsonRes } from "./utils/http-message-factories";
import { RegisterUserRequest, UserResponse } from "./models/dto";
import { RegisterUserHandler } from "./handlers/register-user-handler";
// TODO: router handlers should not be availabe on top-level http4ts package

export class Router {
  constructor(private registerUser: RegisterUserHandler) {}

  routes = routes(
    get("/healthcheck", () => res(HttpStatus.OK)),
    post("/api/users", this._registerUser())
  );

  // TODO: http4ts: Maybe we should create generic HttpHandler type. We should look into http4k for inspiration.
  private _registerUser(): HttpHandler {
    return async req => {
      // TODO: http4ts: We need a typesafe requst body validator. Like lenses in http4k
      const result = await this.registerUser.handle(
        (await req.body.asJson<RegisterUserRequest>()).user
      );

      // TODO: http4ts: We need better jsonRes response factories.
      // TODO: Investigate the possibility of using a filter for jsonRes factory
      return jsonRes<UserResponse>({
        body: { user: result },
        status: HttpStatus.CREATED
      });
    };
  }
}
