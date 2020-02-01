import { User, NewUser, Username } from "../models/domain";

export interface ConduitRepository {
  getUserByUsername(username: Username): Promise<User | null>;
  insertUser(newUser: NewUser): Promise<void>;
}

export class ConduitRepositoryImpl implements ConduitRepository {
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
    await this.db.put({ _id: `users/${newUser.username}`, ...newUser });
  }
}
