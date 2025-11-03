import { FinancialAccount } from '../../models/financialAccount';
import { randomUUID } from 'crypto';

export const financialAccounts: FinancialAccount[] = [];

const financialAccountResolvers = {
  Query: {
    accounts: async (): Promise<FinancialAccount[]> => {
      return financialAccounts;
    },
  },
  Mutation: {
    createAccount: async (_: any, { name, type, institution }: { name: string; type: 'CHECKING' | 'SAVINGS' | 'CREDIT_CARD' | 'INVESTMENT' | 'LOAN' | 'MORTGAGE'; institution: string }): Promise<FinancialAccount> => {
      const newAccount: FinancialAccount = {
        id: randomUUID(),
        userId: '1', // Placeholder for now
        name,
        type,
        institution,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      financialAccounts.push(newAccount);
      return newAccount;
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
