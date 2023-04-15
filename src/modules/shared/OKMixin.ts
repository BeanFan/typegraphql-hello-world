import { MinLength } from "class-validator";
import { ClassType, Field, InputType } from "type-graphql";

export const OKMixin = <T extends ClassType>(BaseClass: T) => {
  @InputType()
  class OK extends BaseClass {
    @Field()
    isOk: boolean;
  }

  return OK;
};
