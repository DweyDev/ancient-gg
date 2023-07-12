import 'reflect-metadata';
import { Sequelize } from 'sequelize-typescript';
import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { User } from './models/user';
import { Bet } from './models/bet';

const sequelize = new Sequelize({
  dialect: 'postgres',
  username: 'postgres',
  password: 'PasswordAg123!',
  database: 'ancientgamingtask',
  host: 'database-ancient-gaming.c0wq5ftbtrvb.eu-central-1.rds.amazonaws.com',
  models: [User, Bet],
});

const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context: { sequelize },
});

server.listen().then(({ url }:{url: string}) => {
  console.log(`🚀 Server ready at ${url}`);
});
