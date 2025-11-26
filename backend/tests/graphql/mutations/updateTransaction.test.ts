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

    describe('Mutation: updateTransaction', () => {
        const mockUser = { id: 'user-1' };
        const mockInput = {
            amount: 100.00, // Changed from 50
            type: 'EXPENSE',
            date: '2023-01-02',
            description: 'Groceries Updated',
            category: 'Food',
        };
        const transactionId = 'trans-1';

        it('should update a transaction and adjust account balance', async () => {
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
            // Old expense 50, New expense 100. Diff = -50. New balance = 50.
            mockClient.query.mockResolvedValueOnce({ rows: [] });

            // Mock update transaction
            mockClient.query.mockResolvedValueOnce({
                rows: [{
                    id: transactionId,
                    account_id: 'account-1',
                    ...mockInput,
                    user_id: 'user-1',
                    created_at: new Date(),
                    updated_at: new Date(),
                }],
            });

            // Mock commit
            mockClient.query.mockResolvedValueOnce({ rows: [] });

            const result = await resolvers.Mutation.updateTransaction(
                null,
                { id: transactionId, input: mockInput },
                { user: mockUser }
            );

            expect(result).toHaveProperty('id', transactionId);
            expect(result).toHaveProperty('amount', 100.00);
            expect(mockClient.query).toHaveBeenCalledTimes(6); // BEGIN, SELECT TRANS, SELECT ACC, UPDATE BAL, UPDATE TRANS, COMMIT
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
                resolvers.Mutation.updateTransaction(
                    null,
                    { id: transactionId, input: mockInput },
                    { user: mockUser }
                )
            ).rejects.toThrow('Transaction not found or access denied');

            expect(mockClient.release).toHaveBeenCalled();
        });
    });
});
