import { ApolloServer } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';
import typeDefs from '../../../src/graphql/schemas/financialAccount.graphql';
import resolvers from '../../../src/graphql/resolvers/financialAccount';

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

describe('createAccount mutation', () => {
  beforeEach(() => {
    financialAccounts.length = 0;
  });

  it('should create a new financial account', async () => {
    const server = new ApolloServer({ typeDefs, resolvers });
    const { mutate } = createTestClient(server as any);

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
