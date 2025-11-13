import React from 'react';
import { ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface AccountListItemProps {
  account: {
    id: string;
    name: string;
    type: string;
    institution: string;
  };
  onDelete: (id: string) => void;
}

const AccountListItem: React.FC<AccountListItemProps> = ({ account, onDelete }) => {
  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={() => onDelete(account.id)}>
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemText primary={account.name} secondary={`${account.type} - ${account.institution}`} />
    </ListItem>
  );
};

export default AccountListItem;
