import { OKMixin } from "../../shared/OKMixin";
import { PasswordInputMixin } from "../../shared/PasswordInputMixin";
import { Field, InputType } from "type-graphql";

@InputType()
export class ChangePasswordInput extends PasswordInputMixin(OKMixin(class {})) {
  @Field()
  token: string;
}
