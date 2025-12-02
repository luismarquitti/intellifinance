import { IResolvers } from "@graphql-tools/utils";
import * as financialService from "./services";
import { CreateTransactionInput, TransactionFilter } from "./types";

export const resolvers: IResolvers = {
  Query: {
    accounts: async (_, __, context) => {
      // TODO: Get userId from context
      const userId = "e210ddbc-c165-4f1c-93d7-799bb47173be"; // Demo User ID from seed
      return financialService.getAccounts(userId);
    },
    categories: async (_, __, context) => {
      const userId = "e210ddbc-c165-4f1c-93d7-799bb47173be";
      return financialService.getCategories(userId);
    },
    transactions: async (
      _,
      args: { filter?: TransactionFilter; limit?: number; offset?: number },
      context
    ) => {
      const userId = "e210ddbc-c165-4f1c-93d7-799bb47173be";
      return financialService.getTransactions(
        userId,
        args.filter,
        args.limit,
        args.offset
      );
    },
    financialSummary: async (
      _,
      args: { filter?: TransactionFilter },
      context
    ) => {
      const userId = "e210ddbc-c165-4f1c-93d7-799bb47173be";
      return financialService.getFinancialSummary(userId, args.filter);
    },
  },
  Mutation: {
    createTransaction: async (
      _,
      args: { input: CreateTransactionInput },
      context
    ) => {
      const userId = "e210ddbc-c165-4f1c-93d7-799bb47173be";
      return financialService.createTransaction(userId, args.input);
    },
  },
  Transaction: {
    account: async (parent) => {
      return financialService.getAccountById(parent.accountId);
    },
    category: async (parent) => {
      return financialService.getCategoryById(parent.categoryId);
    },
  },
};
