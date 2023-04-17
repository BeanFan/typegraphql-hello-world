import { Connection } from "typeorm";

import { testCon } from "../../../test-utils/testConn";
import { gCall } from "../../../test-utils/gCall";
import { User } from "src/entity/User";
import { faker } from "@faker-js/faker";
import bcry from "bcryptjs";
let conn: Connection;
beforeAll(async () => {
  conn = await testCon();
});
afterAll(async () => {
  await conn.close();
});

const registerMutation = `
mutation Register($data: RegisterInput!) {
  register(
    data: $data
  ) {
    id
    firstName
    lastName
    email
    name
  }
}   
`;

describe("Register", () => {
  it("create user", async () => {
    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    let result = await gCall({
      source: registerMutation,
      variableValues: {
        data: user,
      },
    });

    console.log(JSON.stringify(result));
    let { firstName, lastName, email } = user;
    expect(result).toBeDefined();
    expect(result).toMatchObject({
      data: { register: { firstName, lastName, email } },
    });
    expect(result.data!.register.confirmed).toBeFalsy();
  });
});
