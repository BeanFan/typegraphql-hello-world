import { Resolver, Query, Ctx, UseMiddleware } from "type-graphql";

import { User } from "../../../entity/User";
import { MyContext } from "../../../types/MyContext";
import { isAuth } from "../../middleware/isAuth";
import { ResolveTime } from "../../middleware/ResolveTime";
@Resolver()
export class MeResolver {
  @Query(() => User, { nullable: true })
  @UseMiddleware(ResolveTime, isAuth)
  async me(@Ctx() ctx: MyContext): Promise<User | undefined> {
    if (!ctx.req.session!.userId) {
      return undefined;
    }

    return User.findOne(ctx.req.session!.userId);
  }
}
