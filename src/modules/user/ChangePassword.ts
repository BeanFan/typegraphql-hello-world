import { Resolver, Mutation, Arg /*Ctx*/, Ctx } from "type-graphql";
import { User } from "../../entity/User";
// import { MyContext } from "../../types/MyContext";
import { redis } from "../../redis";
import {
  confirmUserPrefix,
  forgotPasswordPrefix,
} from "../constants/redisPrefixs";
import bcryptjs from "bcryptjs";
import { MyContext } from "src/types/MyContext";
import { ChangePasswordInput } from "./changepassword/ChangePassword";
// @Resolver(User)  need add this when add FiledResolver of user
@Resolver()
export class ChangePasswordResvoler {
  @Mutation(() => String)
  async changepassword(
    @Arg("resetObject") changeInput: ChangePasswordInput,
    @Ctx() ctx: MyContext
  ): Promise<string> {
    const { token, password } = changeInput;
    const userId = await redis.get(forgotPasswordPrefix + token);

    console.log("userId in redis ,", userId);
    if (!userId) {
      return "无效的重置密码token";
    }

    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return "无用户";
    }
    user.password = await bcryptjs.hash(password, 12);

    await user.save();

    await redis.del(forgotPasswordPrefix + token);
    ctx.req.session.userId = userId;

    return "密码重置成功";
  }
}
