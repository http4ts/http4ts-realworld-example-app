import { setupEnvironment } from "http4ts";
import { TextDecoder, TextEncoder } from "util";

setupEnvironment(TextDecoder as any, TextEncoder);
// TODO: http4ts: calling setupEnvironment for tests is not a pleasant experience
