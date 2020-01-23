import {Field, ID, InputType, ObjectType} from "type-graphql";
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Role} from "./Role";

@ObjectType()
@Entity()
export class User {
  
  @Field(type => ID, {nullable: false})
  @PrimaryGeneratedColumn()
  public readonly id!: number;
  
  @Field(type => String, {nullable: false})
  @Column()
  public username!: string;
  
  @Field(type => String, {nullable: false})
  @Column()
  public password!: string;
  
  @Field(type => Role, {nullable: false})
  @ManyToOne(type => Role)
  public role!: Role;

  @Column({nullable: false, default: 1})
  public roleId!: number;
}

@InputType()
export class UserInput {
  @Field(type => String, {nullable: false})
  public username!: string;
  
  @Field(type => String, {nullable: false})
  public password!: string;
  
  @Field(type => ID, {nullable: true})
  public roleId!: number;
}
