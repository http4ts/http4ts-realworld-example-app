import { Opaque } from "./opaque";

export type Email = Opaque<string, "Email">;
export type PlainPassword = Opaque<string, "Password">;
export type HashedPassword = Opaque<string, "HashedPassword">;
export type Token = Opaque<string, "Token">;
export type Username = Opaque<string, "Username">;
export type Bio = Opaque<string, "Bio">;
export type Image = Opaque<string, "Image">;

export interface User {
  email: Email;
  password: HashedPassword;
  token?: Token;
  username: Username;
  bio?: Bio;
  image?: Image;
}

export interface NewUser {
  username: Username;
  password: HashedPassword;
  email: Email;
}
