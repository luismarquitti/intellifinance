import React, { useState } from 'react';
import { Container, Typography, Box, Fab, CircularProgress, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useQuery } from '@apollo/client';
import SummaryCards from '../components/financial/SummaryCards';
import FilterSection from '../components/financial/FilterSection';
import TransactionTable from '../components/financial/TransactionTable';
import { GET_TRANSACTIONS, GET_SUMMARY, GET_ACCOUNTS } from '../graphql/queries';

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
  });

  const { data: summaryData, loading: loadingSummary } = useQuery(GET_SUMMARY, {
    variables: { filter: apiFilter },
  });

  const { data: accountsData } = useQuery(GET_ACCOUNTS);

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
