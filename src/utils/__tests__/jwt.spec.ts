import * as jwt from "../jwt";
import { Username, Email, Token } from "../../models/domain";

describe("JWT", () => {
  it("should generate a valid token", async () => {
    const token = await jwt.generateJwtToken(
      "ali" as Username,
      "alisabzevari@gmail.com" as Email
    );

    const decoded = await jwt.decodeJwtToken(token);

    expect(decoded).toMatchObject({
      username: "ali",
      email: "alisabzevari@gmail.com",
      iss: "thinkster.io",
    });
  });

  it("should throw when token is invalid", async () => {
    const invalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsaSIsImVtYWlsIjoiYWxpc3NzYWJ6ZXZhcmlAZ21haWwiLCJpYXQiOjE1NzgxNjM4NTgsImV4cCI6MTU3ODE5OTg1OCwiaXNzIjoidGhpc3Nzc25rc3Rlci5pbyIsInN1YiI6ImFsaSJ9.03024d-rPOIiv1Gm-5mdN-vQjZo7xmjqvMiBGLkamF0" as Token;

    await expect(jwt.decodeJwtToken(invalidToken)).rejects.toThrow();
  });
});
