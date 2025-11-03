import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ACCOUNTS } from './queries';
import { AccountListItem } from '../components/AccountListItem';

export const AccountListPage: React.FC = () => {
  const { loading, error, data } = useQuery(GET_ACCOUNTS);

  console.log('data', data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h1>Accounts</h1>
      {data && data.accounts.map((account: any) => (
        <AccountListItem key={account.id} account={account} />
      ))}
    </div>
  );
};
