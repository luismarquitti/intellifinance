import React, { useState } from 'react';
import { Container, Typography, Box, Fab, CircularProgress, Alert, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useQuery, useMutation } from '@apollo/client/react';
import SummaryCards from '../components/financial/SummaryCards';
import FilterSection from '../components/financial/FilterSection';
import TransactionTable from '../components/financial/TransactionTable';
import { GET_TRANSACTIONS, GET_SUMMARY, GET_ACCOUNTS } from '../graphql/queries';
import { UPLOAD_STATEMENT } from '../graphql/mutations';

const TransactionsPage: React.FC = () => {
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    accountId: '',
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Prepare filter object for GraphQL
  const apiFilter = {
    accountId: filters.accountId || undefined,
    startDate: filters.startDate || undefined,
    endDate: filters.endDate || undefined,
  };

  const { data: transactionsData, loading: loadingTransactions, error: errorTransactions } = useQuery(GET_TRANSACTIONS, {
    variables: { filter: apiFilter, limit: 50, offset: 0 },
    pollInterval: 5000, // Poll to update list after ingestion completes
  });

  const { data: summaryData, loading: loadingSummary } = useQuery(GET_SUMMARY, {
    variables: { filter: apiFilter },
    pollInterval: 5000,
  });

  const { data: accountsData } = useQuery(GET_ACCOUNTS);

  const [uploadStatement, { loading: uploading }] = useMutation(UPLOAD_STATEMENT);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const targetAccountId = filters.accountId;
    if (!targetAccountId) {
      alert("Please select an account in the filter to upload a statement.");
      // Reset input value to allow selecting same file again if needed
      event.target.value = '';
      return;
    }

    try {
      await uploadStatement({
        variables: {
          file,
          accountId: targetAccountId
        }
      });
      alert('Upload successful! Processing in background.');
    } catch (e: any) {
      console.error(e);
      alert(`Upload failed: ${e.message}`);
    }
    // Reset input
    event.target.value = '';
  };

  if (errorTransactions) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">Error loading transactions: {errorTransactions.message}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Transactions
        </Typography>
        <Box>
          <input
            accept=".csv,.pdf"
            style={{ display: 'none' }}
            id="raised-button-file"
            type="file"
            onChange={handleFileUpload}
          />
          <label htmlFor="raised-button-file">
            <Button variant="outlined" component="span" startIcon={<UploadFileIcon />} disabled={uploading}>
              {uploading ? 'Uploading...' : 'Import Statement'}
            </Button>
          </label>
        </Box>
      </Box>

      {loadingSummary ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}><CircularProgress /></Box>
      ) : (
        <SummaryCards
          balance={summaryData?.financialSummary?.balance || 0}
          income={summaryData?.financialSummary?.income || 0}
          expense={summaryData?.financialSummary?.expense || 0}
        />
      )}

      <FilterSection
        startDate={filters.startDate}
        endDate={filters.endDate}
        accountId={filters.accountId}
        onFilterChange={handleFilterChange}
      // TODO: Pass accounts list to FilterSection if we enhance it to be dynamic
      />

      {loadingTransactions ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}><CircularProgress /></Box>
      ) : (
        <TransactionTable transactions={transactionsData?.transactions || []} />
      )}

      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', bottom: 32, right: 32 }}
        onClick={() => console.log('Add transaction clicked')}
      >
        <AddIcon />
      </Fab>
    </Container>
  );
};

export default TransactionsPage;
