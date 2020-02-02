import { routes, get, HttpStatus, post, HttpHandler } from "http4ts";
import { res } from "./utils/http-message-factories";
import { RegisterUserRequest, UserResponse } from "./models/dto";
import { RegisterUserHandler } from "./handlers/register-user-handler";
import { BodyMapper } from "./utils/body-mapper";
// TODO: router handlers should not be availabe on top-level http4ts package

export class Router {
  constructor(private registerUser: RegisterUserHandler) {}

  // TODO: http4ts: Maybe we should create generic HttpHandler type. We should look into http4k for inspiration.
  private _registerUser: HttpHandler = async req => {
    // TODO: http4ts: We need a typesafe requst body validator. Like lenses in http4k
    const bodyMapper = new BodyMapper<RegisterUserRequest, UserResponse>(req);

    const result = await this.registerUser.handle(
      (await bodyMapper.parse()).user
    );

    // TODO: http4ts: We need better jsonRes response factories.
    // TODO: Investigate the possibility of using a filter for jsonRes factory

    return bodyMapper.response(HttpStatus.CREATED, { user: result });
  };

  routes = routes(
    get("/healthcheck", () => res(HttpStatus.OK)),
    post("/api/users", this._registerUser)
  );
}
