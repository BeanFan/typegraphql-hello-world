import { buildSchema } from "type-graphql";

export const createSchema = () =>
  buildSchema({
    // resolvers: [
    //   RegisterResolver,
    //   LoginResolver,
    //   MeResolver,
    //   ConfirmUserResolver,
    //   ForgetPassWordResovler,
    // ],
    resolvers: [__dirname + "/../**/resovler/*.ts"],
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
      // here we can read the user from context
      // and check his permission in the db against the `roles` argument
      // that comes from the `@Authorized` decorator, eg. ["ADMIN", "MODERATOR"]

      // return true; // or false if access is denied
    },
  });
