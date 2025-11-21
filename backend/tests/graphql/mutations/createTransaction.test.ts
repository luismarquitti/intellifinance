jest.mock('../../../src/db');

import transactionResolvers from '../../../src/graphql/resolvers/transaction';
import pool from '../../../src/db';

const resolvers = transactionResolvers as any;

describe('Transaction Resolvers', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Mutation: createTransaction', () => {
        const mockUser = { id: 'user-1' };
        const mockInput = {
            accountId: 'account-1',
            amount: 50.00,
            type: 'EXPENSE',
            date: '2023-01-01',
            description: 'Groceries',
            category: 'Food',
        };

        it('should create a transaction and update account balance', async () => {
            const mockClient = {
                query: jest.fn(),
                release: jest.fn(),
            };
            (pool.connect as jest.Mock).mockResolvedValue(mockClient);

            // Mock account check
            mockClient.query.mockResolvedValueOnce({
                rows: [{ id: 'account-1', balance: 100.00 }],
            });

            // Mock update balance
            mockClient.query.mockResolvedValueOnce({ rows: [] });

            // Mock insert transaction
            mockClient.query.mockResolvedValueOnce({
                rows: [{
                    id: 'trans-1',
                    ...mockInput,
                    created_at: new Date(),
                    updated_at: new Date(),
                }],
            });

            // Mock commit
            mockClient.query.mockResolvedValueOnce({ rows: [] });

            const result = await resolvers.Mutation.createTransaction(
                null,
                { input: mockInput },
                { user: mockUser }
            );

            expect(result).toHaveProperty('id', 'trans-1');
            expect(result).toHaveProperty('amount', 50.00);
            expect(mockClient.query).toHaveBeenCalledTimes(5); // BEGIN, SELECT, UPDATE, INSERT, COMMIT
            expect(mockClient.release).toHaveBeenCalled();
        });

        it('should throw error if user is not authenticated', async () => {
            await expect(
                resolvers.Mutation.createTransaction(null, { input: mockInput }, { user: null })
            ).rejects.toThrow('Not authenticated');
        });
    });
});
