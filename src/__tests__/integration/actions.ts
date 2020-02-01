import fetch from "node-fetch";

import { HttpStatus } from "http4ts";

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

    const resp = await fetch(`${this.baseUrl}/api/users`, {
      method: "POST",
      body: registerReqBody,
      headers: {
        "Content-Type": "application/json"
      }
    });

    expect(resp.status).toBe(HttpStatus.CREATED);
    return await resp.json();
  }
}
