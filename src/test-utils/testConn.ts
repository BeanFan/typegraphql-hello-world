import { createConnection } from "typeorm";

export const testCon = (drop: boolean = false) => {
  return createConnection({
    name: "default",
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "123",
    database: "testP",
    synchronize: drop,
    logging: false,
    dropSchema: drop,
    entities: ["src/entity/*.*"],
  });
};
