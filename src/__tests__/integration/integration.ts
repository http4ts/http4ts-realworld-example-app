import { AppConfig } from "../../config/app-config";

export const itConfig: AppConfig = {
  logLevel: "info",
  port: 3003,
  db: {
    inMemory: true,
    name: "conduit",
  },
};
