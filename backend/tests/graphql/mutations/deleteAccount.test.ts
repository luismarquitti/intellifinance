import { ApolloServer } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';
import typeDefs from '../../../src/graphql/schemas/financialAccount.graphql';
import resolvers from '../../../src/graphql/resolvers/financialAccount';
import pool from '../../../src/db';

jest.mock('../../../src/db');

const DELETE_ACCOUNT = `
  mutation DeleteAccount($id: ID!) {
    deleteAccount(id: $id)
  }
`;

describe('deleteAccount mutation', () => {
  it('should delete an existing financial account', async () => {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: () => ({ userId: '1' }),
    });
    const { mutate } = createTestClient(server as any);

    (pool.query as jest.Mock).mockResolvedValueOnce({ rowCount: 1 });

    const { data } = await mutate({
      mutation: DELETE_ACCOUNT,
      variables: {
        id: '1',
      },
    });

    expect(data.deleteAccount).toBe(true);
  });

  it('should not delete an account belonging to another user', async () => {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: () => ({ userId: '2' }),
    });
    const { mutate } = createTestClient(server as any);

    (pool.query as jest.Mock).mockResolvedValueOnce({ rowCount: 0 });

    const { data } = await mutate({
        mutation: DELETE_ACCOUNT,
        variables: {
            id: '1',
        },
    });

    expect(data.deleteAccount).toBe(false);
    });
});
