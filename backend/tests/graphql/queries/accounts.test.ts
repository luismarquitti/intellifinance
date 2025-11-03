import { ApolloServer } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';
import typeDefs from '../../../src/graphql/schemas/financialAccount.graphql';
import resolvers from '../../../src/graphql/resolvers/financialAccount';

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

import { financialAccounts } from '../../../src/graphql/resolvers/financialAccount';

describe('accounts query', () => {
  beforeEach(() => {
    financialAccounts.length = 0;
  });

  it('should return a list of financial accounts', async () => {
    const server = new ApolloServer({ typeDefs, resolvers });
    const { query, mutate } = createTestClient(server as any);

    // Create an account first
    await mutate({
      mutation: CREATE_ACCOUNT,
      variables: {
        name: 'Test Account',
        type: 'CHECKING',
        institution: 'Test Bank',
      },
    });

    const { data } = await query({
      query: GET_ACCOUNTS,
    });

    expect(data.accounts).toBeDefined();
    expect(Array.isArray(data.accounts)).toBe(true);
    expect(data.accounts.length).toBe(1);
    expect(data.accounts[0].name).toBe('Test Account');
  });
});
