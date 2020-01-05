import { Email, Token, Username, Bio, Image, PlainPassword } from "./domain";

export interface GenericErrorModelBody {
  body: string[];
}

export interface GenericErrorModel {
  errors: GenericErrorModelBody;
}

export interface LoginUserDto {
  email: Email;
  password: PlainPassword;
}

export interface UserDto {
  email: Email;
  token: Token;
  username: Username;
  bio?: Bio;
  image?: Image;
}

export interface NewUserDto {
  username: Username;
  password: PlainPassword;
  email: Email;
}

export interface RegisterUserRequest {
  user: NewUserDto;
}

export interface UserResponse {
  user: UserDto;
}
