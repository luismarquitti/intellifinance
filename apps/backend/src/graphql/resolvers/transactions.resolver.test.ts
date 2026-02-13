import { transactionsResolvers } from './transactions.resolver';
import { prisma } from '@intellifinance/database';

jest.mock('@intellifinance/database', () => ({
  prisma: {
    transaction: {
      findMany: jest.fn(),
      groupBy: jest.fn(),
    },
    account: {
        findMany: jest.fn(),
    },
    category: {
        findMany: jest.fn(),
    }
  },
}));

describe('Transactions Resolvers', () => {
  const context = { user: { id: 'user-1' } };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch transactions with filters', async () => {
    const mockTransactions = [{ id: 't1', amount: 100 }];
    (prisma.transaction.findMany as jest.Mock).mockResolvedValue(mockTransactions);

    const filter = { accountId: 'acc-1' };
    const result = await transactionsResolvers.Query.transactions({}, { filter }, context);

    expect(prisma.transaction.findMany).toHaveBeenCalledWith(expect.objectContaining({
      where: expect.objectContaining({
        accountId: 'acc-1',
        account: { userId: 'user-1' }
      })
    }));
    expect(result).toEqual(mockTransactions);
  });

  it('should calculate financial summary', async () => {
    (prisma.transaction.groupBy as jest.Mock).mockResolvedValue([
        { type: 'INCOME', _sum: { amount: 1000 } },
        { type: 'EXPENSE', _sum: { amount: 400 } }
    ]);

    const result = await transactionsResolvers.Query.financialSummary({}, {}, context);

    expect(result).toEqual({
        income: 1000,
        expense: 400,
        balance: 600
    });
  });
});
