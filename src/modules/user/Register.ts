import { Resolver, Query, Mutation, Arg, Authorized } from "type-graphql";
import bcryptjs from "bcryptjs";
import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";
import { sendEmail } from "../utils/sendEmail";
import { createConfrimUrl } from "../utils/createConfrimUrl";

// @Resolver(User)  need add this when add FiledResolver of user
@Resolver()
export class RegisterResolver {
  @Query(() => String /** {name:"hello"}*/)
  @Authorized()
  async helloWorld() {
    return "Hello World!";
  }

  //   @FieldResolver()
  //   async name(@Root() parent:User){
  //     return parent.firstName +" "+parent.lastName;
  //   }

  @Mutation(() => User)
  async register(
    @Arg("data") { firstName, lastName, email, password }: RegisterInput
  ): Promise<User> {
    const hashedPassword = await bcryptjs.hash(password, 12);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    }).save();

    await sendEmail(await createConfrimUrl(user.id), email);

    return user;
  }
}
