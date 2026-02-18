import { prisma } from '@intellifinance/database';

export const transactionsResolvers = {
  Query: {
    transactions: async (_: any, { filter, limit = 50, offset = 0 }: { filter?: any, limit?: number, offset?: number }, context: any) => {
      const userId = context.user?.id;
      if (!userId) throw new Error('Unauthorized');

      const where: any = {
        account: {
          userId: userId
        }
      };

      if (filter) {
        if (filter.accountId) where.accountId = filter.accountId;
        if (filter.startDate) where.date = { ...where.date, gte: new Date(filter.startDate) };
        if (filter.endDate) where.date = { ...where.date, lte: new Date(filter.endDate) };
        if (filter.type) where.type = filter.type;
        if (filter.categoryId) where.categoryId = filter.categoryId;
      }

      return prisma.transaction.findMany({
        where,
        take: limit,
        skip: offset,
        orderBy: { date: 'desc' },
        include: {
          account: true,
          category: true
        }
      });
    },
    accounts: async (_: any, __: any, context: any) => {
       const userId = context.user?.id;
       if (!userId) throw new Error('Unauthorized');
       return prisma.account.findMany({ where: { userId } });
    },
    categories: async (_: any, __: any, context: any) => {
       const userId = context.user?.id;
       if (!userId) throw new Error('Unauthorized');
       return prisma.category.findMany({ where: { userId } });
    },
    financialSummary: async (_: any, { filter }: { filter?: any }, context: any) => {
       const userId = context.user?.id;
       if (!userId) throw new Error('Unauthorized');

       const where: any = {
        account: {
          userId: userId
        }
      };

      if (filter) {
        if (filter.accountId) where.accountId = filter.accountId;
        if (filter.startDate) where.date = { ...where.date, gte: new Date(filter.startDate) };
        if (filter.endDate) where.date = { ...where.date, lte: new Date(filter.endDate) };
      }

      const aggregations = await prisma.transaction.groupBy({
        by: ['type'],
        where,
        _sum: {
          amount: true
        }
      });

      let income = 0;
      let expense = 0;

      aggregations.forEach(agg => {
        const amount = agg._sum.amount ? parseFloat(agg._sum.amount.toString()) : 0;
        if (agg.type === 'INCOME') income += amount;
        if (agg.type === 'EXPENSE') expense += amount;
      });

      const balance = income - expense;

      return {
        balance,
        income,
        expense
      };
    }
  },
  Transaction: {
    amount: (parent: any) => parent.amount ? parseFloat(parent.amount.toString()) : 0,
    // Prisma returns Date object, GraphQL expects String or Date depending on scalar.
    // Assuming simple scalar or string conversion.
  },
  Account: {
    balance: (parent: any) => parent.balance ? parseFloat(parent.balance.toString()) : 0,
  }
};
