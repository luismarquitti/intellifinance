import React from 'react';
import { CreateAccountForm } from '../components/CreateAccountForm';
import { useMutation, gql } from '@apollo/client';

const CREATE_ACCOUNT = gql`
  mutation CreateAccount($name: String!, $type: AccountType!, $institution: String!) {
    createAccount(name: $name, type: $type, institution: $institution) {
      id
      name
      type
      institution
    }
  }
`;

export const AddAccountPage: React.FC = () => {
  const [createAccount, { data, loading, error }] = useMutation(CREATE_ACCOUNT);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( Please try again</p>;
  if (data) return <p>Account created!</p>;

  return (
    <div>
      <h1>Add New Account</h1>
      <CreateAccountForm createAccount={createAccount} />
    </div>
  );
};
