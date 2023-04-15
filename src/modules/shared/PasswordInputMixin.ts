import { MinLength } from "class-validator";
import { ClassType, Field, InputType } from "type-graphql";
import { OKMixin } from "./OKMixin";

export const PasswordInputMixin = <T extends ClassType>(BaseClass: T) => {
  @InputType()
  class PasswordInput extends BaseClass {
    @Field()
    @MinLength(6)
    password: string;
  }

  return PasswordInput;
};
