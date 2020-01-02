import { setupEnvironment } from "http4ts";
import { ReadableStream } from "web-streams-polyfill/ponyfill/es2018";
import { TextDecoder } from "util";

setupEnvironment(ReadableStream, TextDecoder as any);
// TODO: http4ts: calling setupEnvironment for tests is not a pleasant experience
