import { Resolver, Query, Mutation, Arg, Authorized } from "type-graphql";
import bcryptjs from "bcryptjs";
import { User } from "../../../entity/User";
import { RegisterInput } from "../register/RegisterInput";
import { sendEmail } from "../../utils/sendEmail";
import { createConfrimUrl } from "../../utils/createConfrimUrl";

// @Resolver(User)  need add this when add FiledResolver of user
@Resolver()
export class ForgetPassWordResovler {
  @Mutation(() => String)
  async forgetPassword(@Arg("email") email: string): Promise<string> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return "please confirm if your email is correct";
    }

    await sendEmail(await createConfrimUrl(user.id, "2"), email);

    return "email has been sent to you, please click the link reset the passwod";
  }
}
