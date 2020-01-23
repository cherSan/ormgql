import "reflect-metadata";
import express from 'express';
import * as TypeORM from "typeorm";
import { ApolloServer } from 'apollo-server-express';
import {buildSchema} from "type-graphql";
import {Container} from "typedi";
import {User} from "./entities/User";
import {Role} from "./entities/Role";
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
      entities: [User, Role],
      synchronize: true,
      logger: "advanced-console",
      logging: "all",
      cache: true,
      insecureAuth : true
    });
    
    const schema = await buildSchema({
      resolvers: [UserResolver, RoleResolver, TestResolver],
      container: Container
    });
  
    const server = new ApolloServer({schema});
  
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
