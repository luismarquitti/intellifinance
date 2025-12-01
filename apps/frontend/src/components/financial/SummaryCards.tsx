import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { ArrowUpward, ArrowDownward, AccountBalanceWallet } from '@mui/icons-material';

interface SummaryCardsProps {
  balance: number;
  income: number;
  expense: number;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ balance, income, expense }) => {
  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      <Grid item xs={12} md={4}>
        <Card sx={{ height: '100%', bgcolor: 'primary.main', color: 'white' }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="subtitle1" sx={{ opacity: 0.8 }}>
                Current Balance
              </Typography>
              <AccountBalanceWallet />
            </Box>
            <Typography variant="h4" fontWeight="bold">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(balance)}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card sx={{ height: '100%' }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="subtitle1" color="text.secondary">
                Income
              </Typography>
              <Box sx={{ bgcolor: 'success.light', p: 0.5, borderRadius: 1, color: 'success.main' }}>
                <ArrowUpward fontSize="small" />
              </Box>
            </Box>
            <Typography variant="h4" fontWeight="bold" color="text.primary">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(income)}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card sx={{ height: '100%' }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="subtitle1" color="text.secondary">
                Expenses
              </Typography>
              <Box sx={{ bgcolor: 'error.light', p: 0.5, borderRadius: 1, color: 'error.main' }}>
                <ArrowDownward fontSize="small" />
              </Box>
            </Box>
            <Typography variant="h4" fontWeight="bold" color="text.primary">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(expense)}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SummaryCards;
