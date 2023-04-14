import { Resolver, Mutation, Arg /*Ctx*/ } from "type-graphql";
import { User } from "../../entity/User";
// import { MyContext } from "../../types/MyContext";
import { redis } from "../../../src/redis";
import { confirmUserPrefix } from "../constants/redisPrefixs";

// @Resolver(User)  need add this when add FiledResolver of user
@Resolver()
export class ConfirmUserResolver {
  @Mutation(() => Boolean)
  async confirm(
    @Arg("token") token: string
    // @Ctx() ctx: MyContext
  ): Promise<boolean> {
    const userId = await redis.get(confirmUserPrefix + token);
    console.log("userId in redis ,", userId);
    if (!userId) {
      return false;
    }
    await User.update({ id: parseInt(userId, 10) }, { confirmed: true });

    await redis.del(token);
    return true;
  }
}
