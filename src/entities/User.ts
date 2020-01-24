import {Field, ID, InputType, ObjectType} from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import {Length} from "class-validator";
import {Role} from "./Role";
import {Post} from "./Post";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  
  @Field(type => ID, {nullable: false})
  @PrimaryGeneratedColumn('uuid')
  public readonly id!: string;
  
  @Field(type => String, {nullable: false})
  @Length(5, 25)
  @Column()
  public username!: string;
  
  @Field(type => String, {nullable: false})
  @Column()
  public password!: string;

  @ManyToMany(type => Role, role => role.id, { lazy: true })
  @JoinTable({
    name: 'user_role_like'
  })
  @Field(type => [Role], {nullable: true})
  public roles!: Promise<Role[]>;
  
  @OneToMany(type => Post, post => post.authorId, { nullable: true, eager: true, lazy: true })
  @Field(type => [Post])
  public posts!: Promise<Post[]>;
  
  @CreateDateColumn({ type: "timestamp" })
  public createdAt!: Date;
  
  @UpdateDateColumn({ type: "timestamp" })
  public updatedAt!: Date;
}

@InputType()
export class UserInput {
  @Field(type => String, {nullable: false})
  public username!: string;
  
  @Field(type => String, {nullable: false})
  public password!: string;
}
