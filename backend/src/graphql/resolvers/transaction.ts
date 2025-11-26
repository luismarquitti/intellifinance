import { IResolvers } from '@graphql-tools/utils';
import { AuthenticationError, UserInputError } from 'apollo-server-express';
import pool from '../../db';
import { Transaction } from '../../models/transaction';

const resolvers: IResolvers = {
    Query: {
        transactions: async (_: any, __: any, { user }: { user: { id: string } }) => {
            if (!user) throw new AuthenticationError('Not authenticated');
            const res = await pool.query(
                'SELECT * FROM transactions WHERE user_id = $1 ORDER BY date DESC',
                [user.id]
            );
            return res.rows;
        },
        transaction: async (_: any, { id }: { id: string }, { user }: { user: { id: string } }) => {
            if (!user) throw new AuthenticationError('Not authenticated');
            const res = await pool.query(
                'SELECT * FROM transactions WHERE id = $1 AND user_id = $2',
                [id, user.id]
            );
            return res.rows[0] || null;
        },
    },
    Mutation: {
        createTransaction: async (_: any, { input }: { input: any }, { user }: { user: { id: string } }) => {
            if (!user) throw new AuthenticationError('Not authenticated');

            const client = await pool.connect();
            try {
                await client.query('BEGIN');

                // 1. Check if account exists and belongs to user
                const accountRes = await client.query(
                    'SELECT id, balance FROM financial_accounts WHERE id = $1 AND user_id = $2',
                    [input.accountId, user.id]
                );

                if (accountRes.rows.length === 0) {
                    throw new UserInputError('Account not found or access denied');
                }

                const currentBalance = parseFloat(accountRes.rows[0].balance);
                const amount = input.amount;
                let newBalance = currentBalance;

                // 2. Calculate new balance
                if (input.type === 'INCOME') {
                    newBalance += amount;
                } else {
                    newBalance -= amount;
                }

                // 3. Update account balance
                await client.query(
                    'UPDATE financial_accounts SET balance = $1, updated_at = NOW() WHERE id = $2',
                    [newBalance, input.accountId]
                );

                // 4. Create transaction
                const transactionRes = await client.query(
                    `INSERT INTO transactions (
            id, account_id, user_id, amount, type, date, description, category, created_at, updated_at
          ) VALUES (
            gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, NOW(), NOW()
          ) RETURNING *`,
                    [
                        input.accountId,
                        user.id,
                        input.amount,
                        input.type,
                        input.date,
                        input.description,
                        input.category,
                    ]
                );

                await client.query('COMMIT');
                return transactionRes.rows[0];
            } catch (e) {
                await client.query('ROLLBACK');
                throw e;
            } finally {
                client.release();
            }
        },
        updateTransaction: async (_: any, { id, input }: { id: string, input: any }, { user }: { user: { id: string } }) => {
            if (!user) throw new AuthenticationError('Not authenticated');

            const client = await pool.connect();
            try {
                await client.query('BEGIN');

                // 1. Fetch existing transaction and check ownership
                const transactionRes = await client.query(
                    'SELECT * FROM transactions WHERE id = $1 AND user_id = $2',
                    [id, user.id]
                );

                if (transactionRes.rows.length === 0) {
                    throw new UserInputError('Transaction not found or access denied');
                }

                const oldTransaction = transactionRes.rows[0];
                const accountId = oldTransaction.account_id;

                // 2. Fetch account to update balance
                const accountRes = await client.query(
                    'SELECT balance FROM financial_accounts WHERE id = $1',
                    [accountId]
                );

                // Should exist if transaction exists, but good to check
                if (accountRes.rows.length === 0) {
                    throw new Error('Account not found');
                }

                let currentBalance = parseFloat(accountRes.rows[0].balance);

                // 3. Revert old transaction effect
                if (oldTransaction.type === 'INCOME') {
                    currentBalance -= parseFloat(oldTransaction.amount);
                } else {
                    currentBalance += parseFloat(oldTransaction.amount);
                }

                // 4. Apply new transaction effect
                const newAmount = input.amount ?? parseFloat(oldTransaction.amount);
                const newType = input.type ?? oldTransaction.type;

                if (newType === 'INCOME') {
                    currentBalance += newAmount;
                } else {
                    currentBalance -= newAmount;
                }

                // 5. Update account balance
                await client.query(
                    'UPDATE financial_accounts SET balance = $1, updated_at = NOW() WHERE id = $2',
                    [currentBalance, accountId]
                );

                // 6. Update transaction
                // Build dynamic update query or just update all fields if input is complete.
                // Input is partial? The schema says input is TransactionInput! which has all fields mandatory?
                // Let's check schema.
                // Schema: input: TransactionInput!
                // TransactionInput { accountId, amount, type, date, description, category }
                // Wait, update usually allows partial?
                // Schema says: updateTransaction(id: ID!, input: TransactionInput!): Transaction!
                // TransactionInput has all fields mandatory except description/category?
                // Let's check schema file.

                const updateRes = await client.query(
                    `UPDATE transactions SET 
            amount = $1, type = $2, date = $3, description = $4, category = $5, updated_at = NOW()
           WHERE id = $6 RETURNING *`,
                    [
                        input.amount,
                        input.type,
                        input.date,
                        input.description,
                        input.category,
                        id
                    ]
                );

                await client.query('COMMIT');
                return updateRes.rows[0];
            } catch (e) {
                await client.query('ROLLBACK');
                throw e;
            } finally {
                client.release();
            }
        },
        deleteTransaction: async (_: any, { id }: { id: string }, { user }: { user: { id: string } }) => {
            if (!user) throw new AuthenticationError('Not authenticated');

            const client = await pool.connect();
            try {
                await client.query('BEGIN');

                // 1. Fetch existing transaction and check ownership
                const transactionRes = await client.query(
                    'SELECT * FROM transactions WHERE id = $1 AND user_id = $2',
                    [id, user.id]
                );

                if (transactionRes.rows.length === 0) {
                    throw new UserInputError('Transaction not found or access denied');
                }

                const transaction = transactionRes.rows[0];
                const accountId = transaction.account_id;

                // 2. Fetch account to update balance
                const accountRes = await client.query(
                    'SELECT balance FROM financial_accounts WHERE id = $1',
                    [accountId]
                );

                if (accountRes.rows.length === 0) {
                    throw new Error('Account not found');
                }

                let currentBalance = parseFloat(accountRes.rows[0].balance);

                // 3. Revert transaction effect
                if (transaction.type === 'INCOME') {
                    currentBalance -= parseFloat(transaction.amount);
                } else {
                    currentBalance += parseFloat(transaction.amount);
                }

                // 4. Update account balance
                await client.query(
                    'UPDATE financial_accounts SET balance = $1, updated_at = NOW() WHERE id = $2',
                    [currentBalance, accountId]
                );

                // 5. Delete transaction
                await client.query(
                    'DELETE FROM transactions WHERE id = $1',
                    [id]
                );

                await client.query('COMMIT');
                return true;
            } catch (e) {
                await client.query('ROLLBACK');
                throw e;
            } finally {
                client.release();
            }
        },
    },
};

export default resolvers;
