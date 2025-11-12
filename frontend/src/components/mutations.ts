import { gql } from '@apollo/client';

export const UPDATE_ACCOUNT = gql`
  mutation UpdateAccount($id: ID!, $name: String, $type: String, $institution: String) {
    updateAccount(id: $id, name: $name, type: $type, institution: $institution) {
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
