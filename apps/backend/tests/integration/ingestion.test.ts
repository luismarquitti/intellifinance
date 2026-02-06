import { ApolloServer } from '@apollo/server';
import { readFileSync } from 'fs';
import { gql } from 'graphql-tag';
import { IngestionQueue } from '@intellifinance/jobs';

const typeDefs = gql(readFileSync('apps/backend/src/graphql/schemas/ingestion.graphql', 'utf8'));

// Mock the IngestionQueue
jest.mock('@intellifinance/jobs', () => ({
  IngestionQueue: {
    add: jest.fn(),
  },
}));

describe('Ingestion Integration', () => {
  let server: ApolloServer;

  beforeEach(() => {
    server = new ApolloServer({
      typeDefs,
      // Mock resolvers
      resolvers: {
        Mutation: {
          uploadStatement: async (_, { file, accountId }) => {
            // In a real implementation, we would save the file and add a job to the queue
            await IngestionQueue.add('ingestion', { file, accountId });
            return {
              id: 'test-job-id',
              status: 'PENDING',
              fileUrl: 'test-file-url',
              createdAt: new Date(),
              account: {
                  id: accountId,
              }
            };
          },
        },
      },
    });
  });

  it('should have uploadStatement mutation and add a job to the queue', async () => {
    const { createReadStream, filename, mimetype, encoding } = {
        createReadStream: () => "stream",
        filename: "test.csv",
        mimetype: "text/csv",
        encoding: "7bit"
    }

    const response = await server.executeOperation({
      query: gql`
        mutation UploadStatement($file: Upload!, $accountId: ID!) {
          uploadStatement(file: $file, accountId: $accountId) {
            id
            status
          }
        }
      `,
      variables: {
        file: { createReadStream, filename, mimetype, encoding },
        accountId: 'test-account-id'
      },
    });

    expect(response.body.singleResult.data.uploadStatement.id).toBe('test-job-id');
    expect(IngestionQueue.add).toHaveBeenCalledWith('ingestion', {
        file: { createReadStream, filename, mimetype, encoding },
        accountId: 'test-account-id'
    });
  });
});