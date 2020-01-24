import {Field, ID, InputType, ObjectType} from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import {User} from "./User";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  
  @Field(type => ID, {nullable: false})
  @PrimaryGeneratedColumn('uuid')
  public readonly id!: string;
  
  @Field(type => String, {nullable: false})
  @Column()
  public text!: string;

  @Column()
  public authorId!: string;
  
  @Field(type => User, {nullable: true})
  @ManyToOne(type => User,{ nullable: false, eager: true })
  public author!: User;
  
  @CreateDateColumn({ type: "timestamp" })
  public createdAt!: Date;
  
  @UpdateDateColumn({ type: "timestamp" })
  public updatedAt!: Date;
}

@InputType()
export class PostInput {
  @Field(type => String, {nullable: false})
  public text!: string;
  
  @Field(type => ID, {nullable: true})
  public author!: string;
}
