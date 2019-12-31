import { HttpBodyImpl, HttpRequestHeaders, HttpStatus } from "http4ts";

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
