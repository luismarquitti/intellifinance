import { PrismaClient, Prisma } from "@prisma/client";
import { CreateTransactionInput, TransactionFilter } from "./types";

const prisma = new PrismaClient();

export const getAccounts = async (userId: string) => {
  return prisma.account.findMany({
    where: { userId },
  });
};

export const getAccountById = async (id: string) => {
  return prisma.account.findUnique({
    where: { id },
  });
};

export const getCategories = async (userId: string) => {
  return prisma.category.findMany({
    where: { userId },
  });
};

export const getCategoryById = async (id: string) => {
  return prisma.category.findUnique({
    where: { id },
  });
};

export const getTransactions = async (
  userId: string,
  filter?: TransactionFilter,
  limit: number = 50,
  offset: number = 0
) => {
  const where: Prisma.TransactionWhereInput = {
    account: { userId },
  };

  if (filter) {
    if (filter.accountId) where.accountId = filter.accountId;
    if (filter.categoryId) where.categoryId = filter.categoryId;
    if (filter.type) where.type = filter.type;
    if (filter.startDate || filter.endDate) {
      where.date = {};
      if (filter.startDate) where.date.gte = new Date(filter.startDate);
      if (filter.endDate) where.date.lte = new Date(filter.endDate);
    }
  }

  return prisma.transaction.findMany({
    where,
    take: limit,
    skip: offset,
    orderBy: { date: "desc" },
  });
};

export const getFinancialSummary = async (
  userId: string,
  filter?: TransactionFilter
) => {
  const where: Prisma.TransactionWhereInput = {
    account: { userId },
  };

  if (filter) {
    if (filter.accountId) where.accountId = filter.accountId;
    if (filter.categoryId) where.categoryId = filter.categoryId;
    if (filter.type) where.type = filter.type;
    if (filter.startDate || filter.endDate) {
      where.date = {};
      if (filter.startDate) where.date.gte = new Date(filter.startDate);
      if (filter.endDate) where.date.lte = new Date(filter.endDate);
    }
  }

  const incomeAgg = await prisma.transaction.aggregate({
    where: { ...where, type: "INCOME" },
    _sum: { amount: true },
  });

  const expenseAgg = await prisma.transaction.aggregate({
    where: { ...where, type: "EXPENSE" },
    _sum: { amount: true },
  });

  const balanceWhere: Prisma.AccountWhereInput = { userId };
  if (filter?.accountId) {
    balanceWhere.id = filter.accountId;
  }
  const accountAgg = await prisma.account.aggregate({
    where: balanceWhere,
    _sum: { balance: true },
  });

  return {
    balance: accountAgg._sum.balance || 0,
    income: incomeAgg._sum.amount || 0,
    expense: expenseAgg._sum.amount || 0,
  };
};

export const createTransaction = async (
  userId: string,
  input: CreateTransactionInput
) => {
  // Verify account belongs to user
  const account = await prisma.account.findFirst({
    where: { id: input.accountId, userId },
  });

  if (!account) {
    throw new Error("Account not found or access denied");
  }

  return prisma.transaction.create({
    data: {
      ...input,
      date: new Date(input.date),
    },
  });
};
