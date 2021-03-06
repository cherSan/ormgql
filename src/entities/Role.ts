import {Field, ID, InputType, ObjectType} from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import {User} from "./User";

@ObjectType()
@Entity()
export class Role extends BaseEntity {
 
  @Field(type => ID, {nullable: false})
  @PrimaryGeneratedColumn('uuid')
  public readonly id!: string;
  
  @Field(type => String, {nullable: false})
  @Column({ default: 'USER' })
  public name!: string;
  
  @Field(type => String, {nullable: true, defaultValue: null})
  @Column({nullable: true})
  public description!: string;
  
  @ManyToMany(type => User, user => { console.log(user); return user.id }, { lazy: true })
  @JoinTable({
    name: 'user_role_like'
  })
  @Field(type => [User], {nullable: true})
  public users!: Promise<User[]>;
  
  @CreateDateColumn({ type: "timestamp" })
  public createdAt!: Date;
  
  @UpdateDateColumn({ type: "timestamp" })
  public updatedAt!: Date;
}

@InputType()
export class RoleInput {
  @Field(type => String, {nullable: false})
  public name!: string;
  
  @Field(type => String, {nullable: true})
  public description!: string;
}
