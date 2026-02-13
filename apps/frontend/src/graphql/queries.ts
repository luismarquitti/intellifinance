import { gql } from "@apollo/client";

export const GET_ACCOUNTS = gql`
  query GetAccounts {
    accounts {
      id
      name
      type
      balance
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
      icon
      color
      type
    }
  }
`;

export const GET_TRANSACTIONS = gql`
  query GetTransactions($filter: TransactionFilter, $limit: Int, $offset: Int) {
    transactions(filter: $filter, limit: $limit, offset: $offset) {
      id
      amount
      description
      date
      type
      status
      account {
        id
        name
      }
      category {
        id
        name
        color
        icon
      }
    }
  }
`;

export const GET_SUMMARY = gql`
  query GetSummary($filter: TransactionFilter) {
    financialSummary(filter: $filter) {
      balance
      income
      expense
    }
  }
`;
