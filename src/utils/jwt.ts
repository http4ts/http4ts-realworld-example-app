import { Username, Email, Token } from "../models/domain";
import * as jwt from "jsonwebtoken";

const jwtSecret: jwt.Secret = "Top Secret";

export function generateJwtToken(username: Username, email: Email) {
  return new Promise<Token>((resolve, reject) => {
    jwt.sign(
      { username, email },
      jwtSecret,
      {
        issuer: "thinkster.io",
        subject: username,
        expiresIn: "10h"
      },
      (err, encoded) => {
        if (err) {
          return reject(err);
        }

        return resolve(encoded as Token);
      }
    );
  });
}

export interface DecodedToken {
  username: Username;
  email: Email;
  iat: Date;
  exp: Date;
  iss: string;
  sub: string;
}

export function decodeJwtToken(token: Token) {
  return new Promise<DecodedToken>((resolve, reject) => {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        return reject(err);
      }

      return resolve(decoded as DecodedToken);
    });
  });
}
