import React from 'react';
import { useQuery } from '@apollo/client';
import { List, CircularProgress, Typography } from '@mui/material';
import AccountListItem from '../components/AccountListItem';
import { GET_ACCOUNTS } from './queries';

const AccountListPage: React.FC = () => {
  const { loading, error, data } = useQuery(GET_ACCOUNTS);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error.message}</Typography>;

  return (
    <List>
      {data.accounts.map((account: any) => (
        <AccountListItem key={account.id} account={account} />
      ))}
    </List>
  );
};

export default AccountListPage;