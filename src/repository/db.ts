import * as PouchDB from "pouchdb";
import * as adapter from "pouchdb-adapter-memory";
import { DbConfig } from "../config/app-config";

PouchDB.plugin(adapter);

export function createDb({ name, inMemory }: DbConfig) {
  const db = new PouchDB(name, { adapter: inMemory ? "memory" : undefined });
  return db;
}
