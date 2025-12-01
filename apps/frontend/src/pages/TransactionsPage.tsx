import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SummaryCards from '../components/financial/SummaryCards';
import FilterSection from '../components/financial/FilterSection';
import TransactionTable from '../components/financial/TransactionTable';

// Mock Data for MVP (until GraphQL integration)
const MOCK_TRANSACTIONS = [
  {
    id: '1',
    date: '2025-10-30',
    description: 'Salário Mensal',
    amount: 5000,
    type: 'INCOME' as const,
    status: 'COMPLETED' as const,
    category: { name: 'Salário', color: '#4CAF50', icon: 'attach_money' },
    account: { name: 'Conta Principal' },
  },
  {
    id: '2',
    date: '2025-10-28',
    description: 'Supermercado',
    amount: 450.50,
    type: 'EXPENSE' as const,
    status: 'COMPLETED' as const,
    category: { name: 'Mercado', color: '#FF9800', icon: 'shopping_cart' },
    account: { name: 'Conta Principal' },
  },
];

const TransactionsPage: React.FC = () => {
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    accountId: '',
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Transactions
        </Typography>
      </Box>

      <SummaryCards balance={4549.50} income={5000} expense={450.50} />

      <FilterSection
        startDate={filters.startDate}
        endDate={filters.endDate}
        accountId={filters.accountId}
        onFilterChange={handleFilterChange}
      />

      <TransactionTable transactions={MOCK_TRANSACTIONS} />

      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', bottom: 32, right: 32 }}
      >
        <AddIcon />
      </Fab>
    </Container>
  );
};

export default TransactionsPage;
