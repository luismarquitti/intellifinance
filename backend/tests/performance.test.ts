import { createTestClient } from 'apollo-server-testing';
import { ApolloServer, gql } from 'apollo-server-express';
import { typeDefs } from '../../src/graphql/schemas';
import resolvers from '../../src/graphql/resolvers';
import pool from '../../src/db';
import { performance } from 'perf_hooks';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const user = { id: req.headers['x-user-id'] || 'test-user' };
    return { user };
  },
});

const { query, mutate } = createTestClient(server);

describe('Performance Tests for Account Management', () => {

  beforeAll(async () => {
    // Create 100 users
    for (let i = 0; i < 100; i++) {
      const userId = `test-user-${i}`;
      await pool.query("INSERT INTO users (id, email, password_hash) VALUES ($1, $2, 'hash')", [userId, `performance${i}@test.com`]);
      // Create 100 accounts for each user
      for (let j = 0; j < 100; j++) {
        await pool.query("INSERT INTO financial_accounts (user_id, name, type, institution) VALUES ($1, $2, 'CHECKING', 'Perf Bank')", [userId, `Perf Test ${j}`]);
      }
    }
  });

  afterAll(async () => {
    await pool.query("TRUNCATE financial_accounts, users RESTART IDENTITY");
  });

  test('accounts query should be performant under load', async () => {
    const startTime = performance.now();
    await query({ query: gql`query { accounts }`, context: { user: { id: 'test-user-50' } } });
    const endTime = performance.now();
    expect(endTime - startTime).toBeLessThan(300);
  });
});
