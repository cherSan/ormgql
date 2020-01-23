import {Arg, FieldResolver, Query, Resolver, Root} from "type-graphql";
import {InjectRepository} from "typeorm-typedi-extensions";
import {User} from "../entities/User";
import {Repository} from "typeorm";
import {GraphQLError} from "graphql";
import {Test} from "../entities/Test";

@Resolver(of => Test)
export class TestResolver {
  
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {
  }
  
  @FieldResolver()
  async user(@Root() test: Test) {
    try {
      return { id: test.user.id + 10 };
    } catch (e) {
      throw new GraphQLError(e)
    }
  }
  
  @Query(returns => Test, {nullable: true})
  async getTest(
    @Arg('id') id: number
  ) {
    try {
      return { id, user: { id } };
    } catch (e) {
      throw new GraphQLError(e)
    }
  }
}
