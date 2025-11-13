import { ApolloServer } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';
import typeDefs from '../../../src/graphql/schemas/financialAccount.graphql';
import resolvers from '../../../src/graphql/resolvers/financialAccount';
import pool from '../../../src/db';

jest.mock('../../../src/db');

const CREATE_ACCOUNT = `
  mutation CreateAccount($name: String!, $type: AccountType!, $institution: String!) {
    createAccount(name: $name, type: $type, institution: $institution) {
      id
      name
      type
      institution
    }
  }
`;

describe('createAccount mutation', () => {
  it('should create a new financial account', async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: () => ({ userId: '1' }),
    });
    const { mutate } = createTestClient(server as any);

    const newAccount = {
      id: '1',
      name: 'Test Account',
      type: 'CHECKING',
      institution: 'Test Bank',
      user_id: '1',
    };

    (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [newAccount] });

    const { data } = await mutate({
      mutation: CREATE_ACCOUNT,
      variables: {
        name: 'Test Account',
        type: 'CHECKING',
        institution: 'Test Bank',
      },
    });

    expect(data.createAccount).toBeDefined();
    expect(data.createAccount.name).toBe('Test Account');
    expect(data.createAccount.type).toBe('CHECKING');
    expect(data.createAccount.institution).toBe('Test Bank');
  });
});
