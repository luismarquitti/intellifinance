import { ApolloServer } from '@apollo/server';
import { gql } from 'graphql-tag';
import { typeDefs } from '../src/graphql/schemas';
import resolvers from '../src/graphql/resolvers';
import pool from '../src/db';
import { DocumentNode } from 'graphql';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

interface GraphQLResponse<T = any> {
  body: {
    kind: 'single';
    singleResult: {
      data?: T;
      errors?: any[];
    };
  };
}

const executeOperation = async (operation: DocumentNode, variables: any = {}, userId?: string): Promise<any> => {
  const response = await server.executeOperation({
    query: operation,
    variables,
  },
    {
      contextValue: {
        user: {
          id: userId,
        },
      },
    });

  // Helper to extract data from v4 response structure
  if (response.body.kind === 'single') {
    return response.body.singleResult;
  }
  return response.body;
};

describe('Security Tests for Account Management', () => {
  let user1: { id: string }, user2: { id: string }, account1: { id: string }, account2: { id: string };

  beforeAll(async () => {
    const user1Res = await pool.query("INSERT INTO users (email, password_hash) VALUES ('user1@test.com', 'hash') RETURNING id");
    user1 = user1Res.rows[0];
    const account1Res = await pool.query("INSERT INTO financial_accounts (user_id, name, type, institution) VALUES ($1, 'Acc 1', 'CHECKING', 'Bank 1') RETURNING id", [user1.id]);
    account1 = account1Res.rows[0];

    const user2Res = await pool.query("INSERT INTO users (email, password_hash) VALUES ('user2@test.com', 'hash') RETURNING id");
    user2 = user2Res.rows[0];
    const account2Res = await pool.query("INSERT INTO financial_accounts (user_id, name, type, institution) VALUES ($1, 'Acc 2', 'SAVINGS', 'Bank 2') RETURNING id", [user2.id]);
    account2 = account2Res.rows[0];
  });

  afterAll(async () => {
    await pool.query('TRUNCATE financial_accounts, users RESTART IDENTITY');
  });

  test('User 1 should not be able to view accounts of User 2', async () => {
    const res = await executeOperation(gql`query { accounts }`, {}, user1.id);
    expect(res.data.accounts).toHaveLength(1);
    expect(res.data.accounts[0].name).toBe('Acc 1');
  });

  test('User 1 should not be able to view a specific account of User 2', async () => {
    const res = await executeOperation(gql`query Account($id: ID!) { account(id: $id) { id } }`, { id: account2.id }, user1.id);
    expect(res.data.account).toBeNull();
  });

  test('User 1 should not be able to update an account of User 2', async () => {
    const res = await executeOperation(gql`mutation UpdateAccount($id: ID!, $name: String) { updateAccount(id: $id, name: $name) { id } }`, { id: account2.id, name: 'Updated Name' }, user1.id);
    expect(res.data.updateAccount).toBeNull();
  });

  test('User 1 should not be able to delete an account of User 2', async () => {
    const res = await executeOperation(gql`mutation DeleteAccount($id: ID!) { deleteAccount(id: $id) }`, { id: account2.id }, user1.id);
    expect(res.data.deleteAccount).toBe(false);
  });
});
