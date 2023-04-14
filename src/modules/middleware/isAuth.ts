import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../../types/MyContext";

declare module "express-session" {
  interface Session {
    userId: any;
  }
}

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  if (!context.req.session.userId) {
    throw new Error("not login please login first");
  }
  return next();
};
