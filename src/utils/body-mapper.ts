import { HttpRequest, HttpStatus, RequestHttpHeaders } from "http4ts";
import { parse } from "content-type";
import { HttpError } from "../filters/error-handler";
import { jsonRes } from "./http-message-factories";

export class BodyMapper<TReqBody, TResBody> {
  constructor(private readonly request: HttpRequest) {}

  async parse() {
    const contentType = parse(
      (this.request.headers["content-type"] as string) ||
        "application/json; charset=utf-8"
    );
    if (contentType.type === "application/json") {
      return JSON.parse(await this.request.body.asString()) as TReqBody;
    } else {
      throw new HttpError(HttpStatus.BAD_REQUEST, "Unsupported content-type.");
    }
  }

  response(status: HttpStatus, body: TResBody, headers?: RequestHttpHeaders) {
    return jsonRes({ status, body, headers });
  }
}
