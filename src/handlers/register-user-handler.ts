import { UserDto, NewUserDto } from "../models/dto";
import { ConduitRepository } from "../repository/conduit-repository";
import { HttpError } from "../filters/error-handler";
import { HttpStatus } from "http4ts";
import { generateJwtToken } from "../utils/jwt";
import { hash } from "../utils/password-hash";

export class RegisterUserHandler {
  constructor(private repository: ConduitRepository) {}

  async handle(newUserDto: NewUserDto): Promise<UserDto> {
    const user = await this.repository.getUserByUsername(newUserDto.username);

    if (user != null) {
      throw new HttpError(
        HttpStatus.CONFLICT,
        "The specified user already exists."
      );
    }

    await this.repository.insertUser({
      ...newUserDto,
      password: await hash(newUserDto.password)
    });

    return {
      email: newUserDto.email,
      token: await generateJwtToken(newUserDto.username, newUserDto.email),
      username: newUserDto.username,
      bio: undefined,
      image: undefined
    };
  }
}
