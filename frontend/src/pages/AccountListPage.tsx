import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { List, CircularProgress, Typography, Button } from '@mui/material';
import AccountListItem from '../components/AccountListItem';
import { DeleteAccountDialog } from '../components/DeleteAccountDialog';
import { GET_ACCOUNTS } from './queries';
import { DELETE_ACCOUNT } from '../components/mutations';

const AccountListPage: React.FC = () => {
  const { loading, error, data } = useQuery(GET_ACCOUNTS);
  const [deleteAccount] = useMutation(DELETE_ACCOUNT, {
    refetchQueries: [{ query: GET_ACCOUNTS }],
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    setSelectedAccountId(id);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedAccountId(null);
  };

  const handleDeleteConfirm = () => {
    if (selectedAccountId) {
      deleteAccount({ variables: { id: selectedAccountId } });
    }
    handleDialogClose();
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error.message}</Typography>;

  return (
    <div>
      <List>
        {data.accounts.map((account: any) => (
          <AccountListItem key={account.id} account={account} onDelete={handleDeleteClick} />
        ))}
      </List>
      <DeleteAccountDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        deleteAccount={handleDeleteConfirm}
      />
    </div>
  );
};

export default AccountListPage;
