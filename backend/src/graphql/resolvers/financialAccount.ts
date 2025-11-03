import { FinancialAccount } from '../../models/financialAccount';
import pool from '../../db';

const financialAccountResolvers = {
  Query: {
    accounts: async (_: any, __: any, context: { userId: string }): Promise<FinancialAccount[]> => {
      const result = await pool.query('SELECT * FROM financial_accounts WHERE user_id = $1', [context.userId]);
      return result.rows;
    },
  },
  Mutation: {
    createAccount: async (_: any, { name, type, institution }: { name: string; type: string; institution: string }, context: { userId: string }): Promise<FinancialAccount> => {
      const newAccountResult = await pool.query(
        'INSERT INTO financial_accounts (user_id, name, type, institution) VALUES ($1, $2, $3, $4) RETURNING *',
        [context.userId, name, type, institution]
      );
      return newAccountResult.rows[0];
    },
    updateAccount: async (_: any, { id, name, type, institution }: { id: string; name?: string; type?: string; institution?: string }): Promise<FinancialAccount | null> => {
      // TODO: Implement database logic
      return null;
    },
    deleteAccount: async (_: any, { id }: { id: string }): Promise<boolean> => {
      // TODO: Implement database logic
      return false;
    },
  },
};

export default financialAccountResolvers;
