import "reflect-metadata";
import express from 'express';
import * as TypeORM from "typeorm";
import { ApolloServer } from 'apollo-server-express';
import {buildSchema} from "type-graphql";
import {Container} from "typedi";
import {authChecker} from "./authChecker";
import {User} from "./entities/User";
import {Role} from "./entities/Role";
import {Post} from "./entities/Post";
import {UserRoleLike} from "./entities/UserRoleLike";
import {UserResolver} from "./resolvers/user";
import {RoleResolver} from "./resolvers/role";
import {TestResolver} from "./resolvers/test";

TypeORM.useContainer(Container);

async function bootstrap() {
  try {
  
    await TypeORM.createConnection({
      type: "mysql",
      database: "personal_db",
      username: "root", // fill this with your username
      password: "password", // and password
      port: 3306,
      host: "localhost",
      entities: [User, Role, UserRoleLike, Post],
      synchronize: true,
      logger: "advanced-console",
      logging: "all",
      cache: true,
      insecureAuth : true,
      dropSchema: true
    });
    
    const schema = await buildSchema({
      resolvers: [UserResolver, RoleResolver, TestResolver],
      container: Container,
      authChecker
    });
  
    const server = new ApolloServer({
      schema,
      context: (ctx) => {
        const token: string | undefined = ctx.req.header('Authorization');
        if (!token) {
          return {
            user: undefined
          }
        }
        const jwt = token.replace('Bearer ', '');
        return {
          jwt
        }
      }
    });
  
    const app = express();
    server.applyMiddleware({app});
  
    app.listen({port: 4000}, () =>
      console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    );
  } catch (e) {
    console.error(e);
  }
}

bootstrap();
