import { Resolver, Query, Mutation, Arg, FieldResolver, Root } from "type-graphql";
import * as bcryptjs from "bcryptjs";
import {User} from "../../entity/User";

@Resolver(User)
export  class RegisterResolver  {
  @Query(() => String,/** {name:"hello"}*/)
  async helloWorld() {
    return "Hello World!";
  }

  @FieldResolver()
  async name(@Root() parent:User){
    return parent.firstName +" "+parent.lastName;
  }


  @Mutation(()=>User)
  async register(
    @Arg("firstName") firstName:string,
    @Arg("lastName") lastName:string,
    @Arg("email") email:string,
    @Arg("password") password:string
  ):Promise<User>{

    const hashedPassword = await bcryptjs.hash(password,12);
    const user = User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword
    }).save();

    return user;
  }

}


