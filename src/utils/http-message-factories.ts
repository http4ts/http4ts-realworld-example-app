import { HttpStatus, RequestHttpHeaders, res } from "http4ts";
import { GenericErrorModel } from "../models/dto";

export function errorRes(status: HttpStatus, errorMessages: string[]) {
  const body: GenericErrorModel = {
    errors: {
      body: errorMessages
    }
  };

  // TODO: http4ts: add factory function to create response from object and serialize as json
  return res({ status, body: JSON.stringify(body) });
}

export function jsonRes<T>(response: {
  status: HttpStatus;
  body?: T;
  headers?: RequestHttpHeaders;
}) {
  return res({
    status: response.status,
    body: JSON.stringify(response.body),
    headers: {
      ...response.headers,
      "Content-Type": "application/json; charset=utf-8"
    }
  });
}
