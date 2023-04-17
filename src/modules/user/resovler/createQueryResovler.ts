import {
  Arg,
  ClassType,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Column, Entity, ObjectIdColumn, createQueryBuilder } from "typeorm";
import { User } from "../../../entity/User";
import { RegisterInput } from "../register/RegisterInput";
import { IsNotEmpty, MinLength } from "class-validator";
import { Product } from "../../../entity/Product";
import { Middleware } from "type-graphql/interfaces/Middleware";

function CreateQueryResvler<T extends ClassType>(
  suffix: string,
  returnType: T,
  entity: any,
  middleware?: Middleware<any>[]
) {
  @Resolver()
  class BaseResolver {
    @Query(() => returnType, { name: `query${suffix}ById` })
    @UseMiddleware(...(middleware || []))
    create(@Arg("id") id: number) {
      return entity.findOne(id);
    }
  }

  return BaseResolver;
}

export const queryUser = CreateQueryResvler("User", User, User);
export const queryProduct = CreateQueryResvler("Prod", Product, Product);
