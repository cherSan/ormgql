import {Field, ID, InputType, ObjectType} from "type-graphql";
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";

@ObjectType()
@Entity()
export class Role {
 
  @Field(type => ID, {nullable: false})
  @PrimaryGeneratedColumn()
  public readonly id!: number;
  
  @Field(type => String, {nullable: false})
  @Column({ default: 'USER' })
  public name!: string;
  
  @Field(type => String, {nullable: true, defaultValue: null})
  @Column({nullable: true})
  public description!: string;
  
  @Field(type => [User], {nullable: true})
  @OneToMany(type => User, user => user.roleId)
  public users!: [User]
}

@InputType()
export class RoleInput {
  @Field(type => String, {nullable: false})
  public name!: string;
  
  @Field(type => String, {nullable: true})
  public description!: string;
}
