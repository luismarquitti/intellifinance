import transactionResolvers from '../../../src/graphql/resolvers/transaction';
import pool from '../../../src/db';

jest.mock('../../../src/db', () => ({
  connect: jest.fn(),
}));

const resolvers = transactionResolvers as any;

describe('Transaction Resolvers', () => {
    let mockClient: { query: jest.Mock, release: jest.Mock };

    beforeEach(() => {
        mockClient = {
            query: jest.fn(),
            release: jest.fn(),
        };
        (pool.connect as jest.Mock).mockResolvedValue(mockClient);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Mutation: deleteTransaction', () => {
        const mockUser = { id: 'user-1' };
        const transactionId = 'trans-1';

        it('should delete a transaction and revert account balance', async () => {
            // Mock fetch existing transaction
            mockClient.query.mockResolvedValueOnce({
                rows: [{
                    id: transactionId,
                    account_id: 'account-1',
                    amount: 50.00,
                    type: 'EXPENSE',
                    user_id: 'user-1'
                }],
            });

            // Mock fetch account
            mockClient.query.mockResolvedValueOnce({
                rows: [{ id: 'account-1', balance: 100.00 }],
            });

            // Mock update balance
            // Revert expense 50. Balance 100 -> 150.
            mockClient.query.mockResolvedValueOnce({ rows: [] });

            // Mock delete transaction
            mockClient.query.mockResolvedValueOnce({ rows: [] });

            // Mock commit
            mockClient.query.mockResolvedValueOnce({ rows: [] });

            const result = await resolvers.Mutation.deleteTransaction(
                null,
                { id: transactionId },
                { user: mockUser }
            );

            expect(result).toBe(true);
            expect(mockClient.query).toHaveBeenCalledTimes(6); // BEGIN, SELECT TRANS, SELECT ACC, UPDATE BAL, DELETE TRANS, COMMIT
            expect(mockClient.release).toHaveBeenCalled();
        });

        it('should throw error if transaction not found', async () => {
            const mockClient = {
                query: jest.fn(),
                release: jest.fn(),
            };
            (pool.connect as jest.Mock).mockResolvedValue(mockClient);
            mockClient.query.mockResolvedValueOnce({ rows: [] }); // Not found

            await expect(
                resolvers.Mutation.deleteTransaction(
                    null,
                    { id: transactionId },
                    { user: mockUser }
                )
            ).rejects.toThrow('Transaction not found or access denied');

            expect(mockClient.release).toHaveBeenCalled();
        });
    });
});
