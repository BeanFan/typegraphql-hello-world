import { Field, ID, ObjectType, Root } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @Column("text", { unique: true })
  @Field()
  email: string;

  @Column()
  @Field()
  password: string;

  @Column("bool", { default: false })
  confirmed: boolean;

  @Field({ complexity: 3 })
  name(@Root() parent: User): string {
    return parent.firstName + " " + parent.lastName;
  }
}
