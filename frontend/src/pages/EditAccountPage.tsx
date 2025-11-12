import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_ACCOUNT } from './queries';
import { UPDATE_ACCOUNT } from '../components/mutations';
import { EditAccountForm } from '../components/EditAccountForm';
import { CircularProgress, Typography } from '@mui/material';

const EditAccountPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery(GET_ACCOUNT, { variables: { id } });
  const [updateAccount] = useMutation(UPDATE_ACCOUNT);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error.message}</Typography>;

  return <EditAccountForm account={data.account} updateAccount={updateAccount} />;
};

export default EditAccountPage;
