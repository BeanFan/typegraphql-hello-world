import { InputType, Field } from "type-graphql";
import { Length, IsEmail, MinLength, MaxLength } from "class-validator";
import { IsEmailAlreadyExist } from "./isEmailAlreadyExist";

@InputType()
export class RegisterInput {
  @Field()
  @Length(4, 20)
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  @IsEmail()
  @IsEmailAlreadyExist({ message: "老哥, emai重复了" })
  email: string;

  @Field()
  @MinLength(4)
  @MaxLength(20, { message: "密码别搞太多了" })
  password: string;
}
