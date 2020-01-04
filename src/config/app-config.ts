import { LogLevel } from "../utils/logger";

export interface AppConfig {
  logLevel: LogLevel;
  port: number;
}

export const local: AppConfig = {
  logLevel: "info",
  port: 3000
};
