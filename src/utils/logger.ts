import * as pino from "pino";

export function createLogger() {
  return pino({ prettyPrint: true });
}
