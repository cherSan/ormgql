import {Arg, FieldResolver, Mutation, Query, Resolver, Root} from "type-graphql";
import {GraphQLError} from "graphql";
import {InjectRepository} from "typeorm-typedi-extensions";
import {Repository} from "typeorm";
import {User} from "../entities/User";
import {Role, RoleInput} from "../entities/Role";

@Resolver(of => Role)
export class RoleResolver {
  
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>
  ) {
  }
  
  @FieldResolver()
  async users(@Root() role: Role) {
    try {
      return await this.userRepository.find({where: {roleId: role.id}});
    } catch (e) {
      throw new GraphQLError(e)
    }
    
  }
  
  @Query(returns => [Role], {nullable: true})
  async getRoles() {
    try {
      return await this.roleRepository.find();
    } catch (e) {
      throw new GraphQLError(e)
    }
  }
  
  @Query(returns => Role, {nullable: true})
  async getRole(
    @Arg('id', { nullable: false }) id: string
  ) {
    try {
      return await this.roleRepository.findOne(id);
    } catch (e) {
      throw new GraphQLError(e)
    }
  }
  
  @Mutation(returns => Role, {nullable: false})
  async addRole(
    @Arg('role') role: RoleInput
  ) {
    try {
      const data = await this.roleRepository.create(role);
      await this.roleRepository.save(data);
      return data;
    } catch (e) {
      throw new GraphQLError(e);
    }
  }
  
  @Mutation(returns => Role, {nullable: false})
  async updateRole(
    @Arg('id') id: string,
    @Arg('role') role: RoleInput
  ) {
    try {
      return await this.roleRepository.update(id, role);
    } catch (e) {
      throw new GraphQLError(e);
    }
  }
}
