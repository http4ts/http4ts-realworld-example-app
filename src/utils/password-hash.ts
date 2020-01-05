import * as bcrypt from "bcrypt";
import { PlainPassword, HashedPassword } from "../models/domain";

export async function hash(password: PlainPassword) {
  return new Promise<HashedPassword>((resolve, reject) => {
    bcrypt.hash(password, 13, (err, encrypted) => {
      if (!err) {
        return resolve(encrypted as HashedPassword);
      }

      return reject(err);
    });
  });
}
