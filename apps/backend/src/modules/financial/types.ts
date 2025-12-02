import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Account {
    id: ID!
    name: String!
    type: AccountType!
    balance: Float!
    userId: ID!
  }

  enum AccountType {
    CHECKING
    CREDIT_CARD
    CASH
  }

  type Category {
    id: ID!
    name: String!
    icon: String!
    color: String!
    type: CategoryType!
    userId: ID!
  }

  enum CategoryType {
    INCOME
    EXPENSE
  }

  type Transaction {
    id: ID!
    amount: Float!
    description: String!
    date: String!
    type: TransactionType!
    status: TransactionStatus!
    account: Account!
    category: Category!
  }

  enum TransactionType {
    INCOME
    EXPENSE
    TRANSFER
  }

  enum TransactionStatus {
    PENDING
    COMPLETED
  }

  input TransactionFilter {
    accountId: ID
    categoryId: ID
    startDate: String
    endDate: String
    type: TransactionType
  }

  type FinancialSummary {
    balance: Float!
    income: Float!
    expense: Float!
  }

  extend type Query {
    accounts: [Account!]!
    categories: [Category!]!
    transactions(
      filter: TransactionFilter
      limit: Int
      offset: Int
    ): [Transaction!]!
    financialSummary(filter: TransactionFilter): FinancialSummary!
  }

  input CreateTransactionInput {
    amount: Float!
    description: String!
    date: String!
    type: TransactionType!
    status: TransactionStatus!
    accountId: ID!
    categoryId: ID!
  }

  extend type Mutation {
    createTransaction(input: CreateTransactionInput!): Transaction!
  }
`;

export interface TransactionFilter {
  accountId?: string;
  categoryId?: string;
  startDate?: string;
  endDate?: string;
  type?: "INCOME" | "EXPENSE" | "TRANSFER";
}

export interface CreateTransactionInput {
  amount: number;
  description: string;
  date: string;
  type: "INCOME" | "EXPENSE" | "TRANSFER";
  status: "PENDING" | "COMPLETED";
  accountId: string;
  categoryId: string;
}
