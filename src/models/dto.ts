import { Opaque } from "./opaque";

export interface GenericErrorModelBody {
  body: string[];
}

export interface GenericErrorModel {
  errors: GenericErrorModelBody;
}

export type Email = Opaque<string, "Email">;
export type Password = Opaque<string, "Password">;
export type Token = Opaque<string, "Token">;
export type Username = Opaque<string, "Username">;
export type Bio = Opaque<string, "Bio">;
export type Image = Opaque<string, "Image">;

export interface LoginUserDto {
  email: Email;
  password: Password;
}

export interface UserDto {
  email: Email;
  token: Token;
  username: Username;
  bio?: Bio;
  image?: Image;
}
