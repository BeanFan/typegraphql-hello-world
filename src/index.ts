import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";

import { RegisterResolver } from "./modules/user/resovler/Register";
import { redis } from "./redis";
import { LoginResolver } from "./modules/user/resovler/Login";
import { MeResolver } from "./modules/user/resovler/Me";
import { ConfirmUserResolver } from "./modules/user/resovler/ConfirmUser";
import { ForgetPassWordResovler } from "./modules/user/resovler/ForgetPassWord";
import { createSchema } from "./modules/utils/createSchema";
// import { sendEmail } from "./utils/SendEmail";
// import cookieParser from "cookie-parser";
declare module "express-session" {
  interface Session {
    userId: any;
  }
}

declare module "express" {
  interface Request {
    session: session.Session;
  }
  interface Response {
    clearCookie: any;
  }
}

const main = async () => {
  await createConnection();

  const schema = await createSchema();

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }: any) => ({ req, res }),
  });

  const app = Express();

  const RedisStore = connectRedis(session);

  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  );

  app.use(
    session({
      store: new RedisStore({
        client: redis as any,
      }),
      name: "qid",
      secret: "aslkdfjoiq12312",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
      },
    })
  );

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("server started on http://localhost:4000/graphql");
    // sendEmail();
  });
};

main();
