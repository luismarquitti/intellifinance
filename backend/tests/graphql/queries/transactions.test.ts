jest.mock('../../../src/db');

import transactionResolvers from '../../../src/graphql/resolvers/transaction';
import pool from '../../../src/db';

const resolvers = transactionResolvers as any;

describe('Transaction Resolvers', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Query: transactions', () => {
        const mockUser = { id: 'user-1' };

        it('should return all transactions for the user', async () => {
            (pool.query as jest.Mock).mockResolvedValueOnce({
                rows: [
                    { id: 'trans-1', amount: 50.00, user_id: 'user-1' },
                    { id: 'trans-2', amount: 20.00, user_id: 'user-1' }
                ],
            });

            const result = await resolvers.Query.transactions(
                null,
                {},
                { user: mockUser }
            );

            expect(result).toHaveLength(2);
            expect(result[0]).toHaveProperty('id', 'trans-1');
            expect(pool.query).toHaveBeenCalledWith(
                'SELECT * FROM transactions WHERE user_id = $1 ORDER BY date DESC',
                ['user-1']
            );
        });

        it('should throw error if not authenticated', async () => {
            await expect(
                resolvers.Query.transactions(null, {}, { user: null })
            ).rejects.toThrow('Not authenticated');
        });
    });

    describe('Query: transaction', () => {
        const mockUser = { id: 'user-1' };
        const transactionId = 'trans-1';

        it('should return a specific transaction', async () => {
            (pool.query as jest.Mock).mockResolvedValueOnce({
                rows: [{ id: transactionId, amount: 50.00, user_id: 'user-1' }],
            });

            const result = await resolvers.Query.transaction(
                null,
                { id: transactionId },
                { user: mockUser }
            );

            expect(result).toHaveProperty('id', transactionId);
            expect(pool.query).toHaveBeenCalledWith(
                'SELECT * FROM transactions WHERE id = $1 AND user_id = $2',
                [transactionId, 'user-1']
            );
        });

        it('should return null if transaction not found', async () => {
            (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [] });

            const result = await resolvers.Query.transaction(
                null,
                { id: transactionId },
                { user: mockUser }
            );

            expect(result).toBeNull();
        });
    });
});
