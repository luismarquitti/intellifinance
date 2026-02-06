import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  Box,
} from '@mui/material';
import { format } from 'date-fns';

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'INCOME' | 'EXPENSE' | 'TRANSFER';
  status: 'PENDING' | 'COMPLETED';
  category: {
    name: string;
    color: string;
    icon: string;
  };
  account: {
    name: string;
  };
}

interface TransactionTableProps {
  transactions: Transaction[];
}

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions }) => {
  return (
    <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0' }}>
      <Table sx={{ minWidth: 650 }} aria-label="transaction table">
        <TableHead sx={{ bgcolor: '#F4F6F8' }}>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Account</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="center">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow
              key={transaction.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {format(new Date(transaction.date), 'dd MMM yyyy')}
              </TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>
                <Chip
                  label={transaction.category.name}
                  size="small"
                  sx={{
                    bgcolor: transaction.category.color + '20', // 20% opacity
                    color: transaction.category.color,
                    fontWeight: 500,
                  }}
                />
              </TableCell>
              <TableCell>{transaction.account.name}</TableCell>
              <TableCell
                align="right"
                sx={{
                  color:
                    transaction.type === 'INCOME'
                      ? 'success.main'
                      : transaction.type === 'EXPENSE'
                      ? 'error.main'
                      : 'text.primary',
                  fontWeight: 600,
                }}
              >
                {transaction.type === 'EXPENSE' ? '-' : '+'}
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(Math.abs(transaction.amount))}
              </TableCell>
              <TableCell align="center">
                <Chip
                  label={transaction.status}
                  size="small"
                  color={transaction.status === 'COMPLETED' ? 'success' : 'warning'}
                  variant="outlined"
                />
              </TableCell>
            </TableRow>
          ))}
          {transactions.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                <Typography variant="body1" color="text.secondary">
                  No transactions found.
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionTable;
