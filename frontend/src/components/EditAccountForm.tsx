import React, { useState } from 'react';
import { CircularProgress, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

export const EditAccountForm = ({ account, updateAccount }) => {
  const [name, setName] = useState(account.name);
  const [type, setType] = useState(account.type);
  const [institution, setInstitution] = useState(account.institution);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await updateAccount({
        variables: {
          id: account.id,
          name,
          type,
          institution,
        },
      });
      setSuccess(true);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id="name"
        label="Account Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="type-label">Account Type</InputLabel>
        <Select
          labelId="type-label"
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <MenuItem value="CHECKING">Checking</MenuItem>
          <MenuItem value="SAVINGS">Savings</MenuItem>
          <MenuItem value="CREDIT_CARD">Credit Card</MenuItem>
          <MenuItem value="INVESTMENT">Investment</MenuItem>
          <MenuItem value="LOAN">Loan</MenuItem>
          <MenuItem value="MORTGAGE">Mortgage</MenuItem>
        </Select>
      </FormControl>
      <TextField
        id="institution"
        label="Institution"
        value={institution}
        onChange={(e) => setInstitution(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button type="submit" disabled={loading} variant="contained" color="primary">
        {loading ? <CircularProgress size={24} /> : 'Update Account'}
      </Button>
      {error && <Typography color="error">{error}</Typography>}
      {success && <Typography color="primary">Account updated successfully!</Typography>}
    </form>
  );
};
