import express from 'express';
import http from 'http';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import { json } from 'body-parser';
// @ts-ignore
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs';
import { readFileSync } from 'fs';
import { join } from 'path';

import { context } from './graphql/context';
import { resolvers as authResolvers } from './graphql/resolvers/auth.resolver';
import { ingestionResolvers } from './graphql/resolvers/ingestion.resolver';

// Helper to load schemas
const loadSchema = (name: string) => {
  try {
    return readFileSync(join(__dirname, 'graphql/schemas', name), 'utf-8');
  } catch (e) {
    console.error(`Failed to load schema: ${name}`, e);
    return '';
  }
};

const typeDefs = [
  loadSchema('auth.graphql'),
  loadSchema('ingestion.graphql')
];

const resolvers = {
  Query: {
    ...authResolvers.Query,
    ...ingestionResolvers.Query,
  },
  Mutation: {
    ...authResolvers.Mutation,
    ...ingestionResolvers.Mutation,
  },
  Transaction: ingestionResolvers.Transaction
};

const PORT = process.env.PORT || 3000;

async function start() {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    csrfPrevention: true,
  });

  await server.start();

  // Configured for max 5MB file size as per spec
  app.use(graphqlUploadExpress({ maxFileSize: 5 * 1024 * 1024, maxFiles: 1 }));

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => context({ req }),
    }),
  );

  await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(`🚀 Backend running on port ${PORT}`);
  console.log(`🚀 GraphQL endpoint: http://localhost:${PORT}/graphql`);
}

start().catch((err) => {
  console.error('Failed to start server:', err);
});