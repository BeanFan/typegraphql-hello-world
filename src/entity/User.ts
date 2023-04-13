import { Field, ID, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@ObjectType()
@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    @Field(()=>ID)
    id: number;

    @Column()
    @Field()
    firstName: string

    @Column()
    @Field()
    lastName: string

    @Column("text",{unique:true})
    @Field()
    email: string

    @Column()
    @Field()
    password:string

    @Field()
    name:string;
}
