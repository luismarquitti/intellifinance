import { ApolloServer } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';
import typeDefs from '../../../src/graphql/schemas/financialAccount.graphql';
import resolvers from '../../../src/graphql/resolvers/financialAccount';
import pool from '../../../src/db';

jest.mock('../../../src/db');

const GET_ACCOUNTS = `
  query GetAccounts {
    accounts {
      id
      name
      type
      institution
    }
  }
`;

describe('accounts query', () => {
  it('should return a list of financial accounts', async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: () => ({ userId: '1' }),
    });
    const { query } = createTestClient(server as any);

    const accounts = [
      {
        id: '1',
        name: 'Test Account 1',
        type: 'CHECKING',
        institution: 'Test Bank 1',
        user_id: '1',
      },
      {
        id: '2',
        name: 'Test Account 2',
        type: 'SAVINGS',
        institution: 'Test Bank 2',
        user_id: '1',
      },
    ];

    (pool.query as jest.Mock).mockResolvedValueOnce({ rows: accounts });

    const { data } = await query({
      query: GET_ACCOUNTS,
    });

    expect(data.accounts).toBeDefined();
    expect(data.accounts.length).toBe(2);
    expect(data.accounts[0].name).toBe('Test Account 1');
    expect(data.accounts[1].name).toBe('Test Account 2');
  });
});
