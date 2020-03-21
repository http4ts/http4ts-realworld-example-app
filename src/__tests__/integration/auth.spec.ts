import { itConfig } from "./integration";
import { Actions } from "./actions";
import { Server } from "http";
import { main } from "../../main";

describe("Integration.Auth", () => {
  let actions: Actions;
  let server: Server;

  // Add helper function for starting and stopping integration tests
  beforeEach(async () => {
    server = await main(itConfig);
    actions = new Actions(`http://localhost:${itConfig.port}`);
  });

  afterEach((done) => {
    server.close(done);
  });

  it("Register", async () => {
    const response = await actions.registerUser(
      "jjacob@gmail.com",
      "johnjacob",
      "jjcb"
    );

    const expectedResponse = {
      user: {
        email: "jjacob@gmail.com",
        username: "johnjacob",
      },
    };

    expect(response).toMatchObject(expectedResponse);
    expect(response.user.token).toBeTruthy();
  });
});
