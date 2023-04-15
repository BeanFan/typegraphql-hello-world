import { MyContext } from "src/types/MyContext";
import { Ctx, Mutation, Resolver } from "type-graphql";

@Resolver()
class LogoutReslver {
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: MyContext) {
    return new Promise((res, rej) => {
      return ctx.req.session.destroy((error) => {
        if (error) {
          console.log(error);
          rej(false);
        }
        ctx.res.clearCookie("qid");
        res(true);
      });
    });
  }
}
