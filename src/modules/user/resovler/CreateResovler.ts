import {
  Arg,
  ClassType,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Resolver,
} from "type-graphql";
import { Column, Entity, ObjectIdColumn } from "typeorm";
import { User } from "../../../entity/User";
import { RegisterInput } from "../register/RegisterInput";
import { IsNotEmpty, MinLength } from "class-validator";
import { Product } from "../../../entity/Product";

function CreateResvler<T extends ClassType, X extends ClassType>(
  suffix: string,
  returnType: T,
  inputType: X,
  entity: any
) {
  @Resolver({ isAbstract: true })
  abstract class BaseResolver {
    @Mutation(() => returnType, { name: `create${suffix}` })
    asynccreate(@Arg("data", () => inputType) data: any) {
      return entity.create(data).save();
    }
  }

  return BaseResolver;
}

@InputType()
class ProductInput {
  @IsNotEmpty()
  @MinLength(5)
  @Field()
  name: string;
}

const AbstractCreateUser = CreateResvler("User", User, RegisterInput, User);

const AbstractCreateProduct = CreateResvler(
  "Production",
  Product,
  ProductInput,
  Product
);

@Resolver()
export class CreateUserResovler extends AbstractCreateUser {}

@Resolver()
export class CreateProductionResovler extends AbstractCreateProduct {}
