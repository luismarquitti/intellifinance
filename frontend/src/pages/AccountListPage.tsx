import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ACCOUNTS } from './queries';
export const AccountListPage: React.FC = () => {
  const { loading, error, data } = useQuery(GET_ACCOUNTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h1>Accounts</h1>
      {data.accounts.map((account: any) => (
        <p key={account.id}>{account.name}</p>
      ))}
    </div>
  );
};
