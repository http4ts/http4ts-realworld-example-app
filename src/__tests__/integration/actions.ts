import { HttpStatus, send, req, HttpMethods } from "http4ts";

export class Actions {
  constructor(private baseUrl: string) {}

  async registerUser(email: string, username: string, password: string) {
    const registerReqBody = JSON.stringify({
      user: {
        email,
        password,
        username
      }
    });

    const request = req({
      url: `${this.baseUrl}/api/users`,
      method: HttpMethods.POST,
      body: registerReqBody,
      headers: {
        "Content-Type": "application/json"
      }
    });
    const resp = await send(request);

    expect(resp.status).toBe(HttpStatus.CREATED);
    return JSON.parse(await resp.body.asString());
  }
}
