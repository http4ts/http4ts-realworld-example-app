import { HttpBodyImpl, HttpRequestHeaders, HttpStatus } from "http4ts";
import { GenericErrorModel } from "../models/dto";

export function res(
  status: HttpStatus,
  body = "",
  headers: HttpRequestHeaders = {}
) {
  return {
    status,
    body: HttpBodyImpl.fromString(body),
    headers
  };
}
// TODO: http4ts: Add response factory function

export function errorRes(status: HttpStatus, errorMessages: string[]) {
  const body: GenericErrorModel = {
    errors: {
      body: errorMessages
    }
  };

  // TODO: http4ts: add factory function to create response from object and serialize as json
  return res(status, JSON.stringify(body));
}
