import { ApolloServer } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';
import typeDefs from '../../../src/graphql/schemas/financialAccount.graphql';
import resolvers from '../../../src/graphql/resolvers/financialAccount';
import pool from '../../../src/db';

jest.mock('../../../src/db');

const UPDATE_ACCOUNT = `
  mutation UpdateAccount($id: ID!, $name: String, $type: AccountType, $institution: String) {
    updateAccount(id: $id, name: $name, type: $type, institution: $institution) {
      id
      name
      type
      institution
    }
  }
`;

describe('updateAccount mutation', () => {
  it('should update an existing financial account', async () => {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: () => ({ userId: '1' }),
    });
    const { mutate } = createTestClient(server as any);

    const updatedAccountResponse = {
      id: '1',
      name: 'Updated Test Account',
      type: 'SAVINGS',
      institution: 'Updated Test Bank',
      user_id: '1',
    };
    (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [updatedAccountResponse] });


    const { data } = await mutate({
      mutation: UPDATE_ACCOUNT,
      variables: {
        id: '1',
        name: 'Updated Test Account',
        type: 'SAVINGS',
        institution: 'Updated Test Bank',
      },
    });

    expect(data.updateAccount).toBeDefined();
    expect(data.updateAccount.name).toBe('Updated Test Account');
    expect(data.updateAccount.type).toBe('SAVINGS');
    expect(data.updateAccount.institution).toBe('Updated Test Bank');
  });

  it('should not update an account belonging to another user', async () => {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: () => ({ userId: '2' }),
    });
    const { mutate } = createTestClient(server as any);

    (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [] });

    const { data } = await mutate({
        mutation: UPDATE_ACCOUNT,
        variables: {
            id: '1',
            name: 'Updated Test Account',
        },
    });

    expect(data.updateAccount).toBeNull();
  });
});
