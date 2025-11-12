import { gql } from '@apollo/client';

export const GET_ACCOUNTS = gql`
  query GetAccounts {
    accounts {
      id
      name
      type
      institution
    }
  }
`;

export const GET_ACCOUNT = gql`
    query GetAccount($id: ID!) {
        account(id: $id) {
            id
            name
            type
            institution
        }
    }
`;

export const DELETE_ACCOUNT = gql`
    mutation DeleteAccount($id: ID!) {
        deleteAccount(id: $id)
    }
`;
