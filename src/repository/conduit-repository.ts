import { User, NewUser, Username } from "../models/domain";
import { createLogger } from "../utils/logger";

export interface ConduitRepository {
  getUserByUsername(username: Username): Promise<User | null>;
  insertUser(newUser: NewUser): Promise<void>;
}

export class ConduitRepositoryImpl implements ConduitRepository {
  private logger = createLogger("info");

  constructor(private db: PouchDB.Database) {}

  async getUserByUsername(username: Username): Promise<User | null> {
    try {
      return await this.db.get<User>(`users/${username}`);
    } catch (error) {
      if (error.status === 404) {
        return null;
      }
      throw error;
    }
  }

  async insertUser(newUser: NewUser): Promise<void> {
    this.logger.info("inserUser:", newUser);
    await this.db.put({ _id: `users/${newUser.username}`, ...newUser });
  }
}
