import React from 'react';
import { Box, TextField, MenuItem, Grid, Paper } from '@mui/material';

interface FilterSectionProps {
  startDate: string;
  endDate: string;
  accountId: string;
  onFilterChange: (key: string, value: string) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({ startDate, endDate, accountId, onFilterChange }) => {
  return (
    <Paper elevation={0} sx={{ p: 2, mb: 3, border: '1px solid #e0e0e0' }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={3}>
          <TextField
            label="Start Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={startDate}
            onChange={(e) => onFilterChange('startDate', e.target.value)}
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="End Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={endDate}
            onChange={(e) => onFilterChange('endDate', e.target.value)}
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            select
            label="Account"
            fullWidth
            value={accountId}
            onChange={(e) => onFilterChange('accountId', e.target.value)}
            size="small"
          >
            <MenuItem value="">All Accounts</MenuItem>
            {/* TODO: Populate dynamically */}
            <MenuItem value="e1fb5629-78c6-4a1f-ba01-1ec66df0cc35">Conta Principal</MenuItem>
          </TextField>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FilterSection;
