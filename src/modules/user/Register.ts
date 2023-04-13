import { Resolver, Query, Mutation, Arg } from "type-graphql";
import bcryptjs from "bcryptjs";
import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";

// @Resolver(User)  need add this when add FiledResolver of user
@Resolver()
export class RegisterResolver {
  @Query(() => String /** {name:"hello"}*/)
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
    const user = User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    }).save();

    return user;
  }
}
