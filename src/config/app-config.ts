import { LogLevel } from "../utils/logger";

export interface DbConfig {
  name: string;
  inMemory: boolean;
}
export interface AppConfig {
  logLevel: LogLevel;
  port: number;
  db: DbConfig;
}

export const local: AppConfig = {
  logLevel: "info",
  port: 3000,
  db: {
    name: "http://localhost:5984/conduit",
    inMemory: false
  }
};
