import React from 'react';
import { ListItem, ListItemText } from '@mui/material';

interface AccountListItemProps {
  account: {
    name: string;
    type: string;
    institution: string;
  };
}

const AccountListItem: React.FC<AccountListItemProps> = ({ account }) => {
  return (
    <ListItem>
      <ListItemText primary={account.name} secondary={`${account.type} - ${account.institution}`} />
    </ListItem>
  );
};

export default AccountListItem;
