import { GraphQLError } from "graphql";
import {Resolver, Query, Arg, Mutation, FieldResolver, Root} from "type-graphql";
import {InjectRepository} from "typeorm-typedi-extensions";
import { Repository } from "typeorm";
import {User, UserInput} from "../entities/User";
import {Role} from "../entities/Role";


@Resolver(of => User)
export class UserResolver {
  
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>
  ) {}
  
  @FieldResolver(returns => Role)
  async role(@Root() user: User) {
    return await this.roleRepository.findOne(user.roleId);
  }
  
  @Query(returns => [User], {nullable: true})
  async getUsers() {
    try {
      return await this.userRepository.find()
    } catch (e) {
      throw new GraphQLError(e)
    }
  }
  
  @Query(returns => User, {nullable: true})
  async getUser(
    @Arg('id', { nullable: false }) id: string
  ) {
    try {
      return await this.userRepository.findOne(id);
    } catch (e) {
      throw new GraphQLError(e)
    }
  }
  
  @Mutation(returns => User, {nullable: false})
  async addUser(
    @Arg('user') user: UserInput
  ) {
    try {
      const data = await this.userRepository.create(user);
      await this.userRepository.save(data);
      return data;
    } catch (e) {
      throw new GraphQLError(e);
    }
  }
  
  @Mutation(returns => User, {nullable: false})
  async updateUser(
    @Arg('id') id: string,
    @Arg('user') user: UserInput
  ) {
    try {
      return await this.userRepository.update(id, user);
    } catch (e) {
      throw new GraphQLError(e);
    }
  }
}
