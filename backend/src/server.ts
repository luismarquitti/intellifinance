import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import rateLimit from 'express-rate-limit';
import { authResolvers } from './api/auth';

const typeDefs = gql`
  type Query {
    hello: String
  }
  type Mutation {
    register(email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    logout(refreshToken: String!): LogoutPayload
    refreshToken(refreshToken: String!): RefreshTokenPayload
  }
  type AuthPayload {
    accessToken: String
    refreshToken: String
    user: User
  }
  type User {
    id: ID
    email: String
  }
  type LogoutPayload {
    success: Boolean
  }
  type RefreshTokenPayload {
    accessToken: String
  }
`;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

async function startServer() {
  const app = express();
  app.use(limiter);

  const server = new ApolloServer({ typeDefs, resolvers: authResolvers });
  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

startServer();
