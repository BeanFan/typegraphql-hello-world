import { Connection } from "typeorm";
import { faker } from "@faker-js/faker";
import { testCon } from "../../../../src/test-utils/testConn";
import { User } from "../../../entity/User";
import { gCall } from "../../../test-utils/gCall";

let conn: Connection;
beforeAll(async () => {
  conn = await testCon();
});
afterAll(async () => {
  await conn.close();
});

const meQuery = `
 {
  me {
    id
    firstName
    lastName
    email
    name
  }
}
`;

describe("Me", () => {
  const user = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  it("shoud get Me", async () => {
    const createdUser = await User.create(user).save();

    const meResult = await gCall({
      source: meQuery,
      userId: `${createdUser.id}`,
    });

    expect(meResult).toMatchObject({
      data: {
        me: {
          id: `${createdUser.id}`,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      },
    });
  });

  it("should return nulll", async () => {
    const result = await gCall({
      source: meQuery,
    });

    expect(result).toMatchObject({
      data: {
        me: null,
      },
    });
  });
});
