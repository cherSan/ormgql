import {Field, ID, ObjectType} from "type-graphql";
import {User} from "./User";

@ObjectType()
export class Test {

  @Field(type => ID, {nullable: false})
  public readonly id!: number;

  @Field(type => User)
  public readonly user!: User;
}
