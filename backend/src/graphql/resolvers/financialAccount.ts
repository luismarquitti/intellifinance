import { FinancialAccount } from '../../models/financialAccount';
import pool from '../../db';

const financialAccountResolvers = {
  Query: {
    accounts: async (_: any, __: any, context: { userId: string }): Promise<FinancialAccount[]> => {
      const result = await pool.query('SELECT * FROM financial_accounts WHERE user_id = $1', [context.userId]);
      return result.rows;
    },
    account: async (_: any, { id }: { id: string }, context: { userId: string }): Promise<FinancialAccount | null> => {
        const result = await pool.query('SELECT * FROM financial_accounts WHERE id = $1 AND user_id = $2', [id, context.userId]);
        return result.rows[0] || null;
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
    updateAccount: async (
      _: any,
      { id, name, type, institution }: { id: string; name?: string; type?: string; institution?: string },
      context: { userId: string }
    ): Promise<FinancialAccount | null> => {
      const { rows } = await pool.query(
        'UPDATE financial_accounts SET name = COALESCE($1, name), type = COALESCE($2, type), institution = COALESCE($3, institution) WHERE id = $4 AND user_id = $5 RETURNING *',
        [name, type, institution, id, context.userId]
      );
      return rows[0] || null;
    },
    deleteAccount: async (_: any, { id }: { id: string }, context: { userId: string }): Promise<boolean> => {
      const { rowCount } = await pool.query('DELETE FROM financial_accounts WHERE id = $1 AND user_id = $2', [id, context.userId]);
      return rowCount ? rowCount > 0 : false;
    },
  },
};

export default financialAccountResolvers;
