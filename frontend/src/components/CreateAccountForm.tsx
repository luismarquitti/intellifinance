import React, { useState } from 'react';

interface CreateAccountFormProps {
  createAccount: (variables: { name: string; type: string; institution: string }) => void;
}

export const CreateAccountForm: React.FC<CreateAccountFormProps> = ({ createAccount }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('CHECKING');
  const [institution, setInstitution] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    createAccount({ variables: { name, type, institution } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Account Name</label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="type">Account Type</label>
        <select id="type" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="CHECKING">Checking</option>
          <option value="SAVINGS">Savings</option>
          <option value="CREDIT_CARD">Credit Card</option>
          <option value="INVESTMENT">Investment</option>
          <option value="LOAN">Loan</option>
          <option value="MORTGAGE">Mortgage</option>
        </select>
      </div>
      <div>
        <label htmlFor="institution">Institution</label>
        <input
          id="institution"
          value={institution}
          onChange={(e) => setInstitution(e.target.value)}
        />
      </div>
      <button type="submit">Create Account</button>
    </form>
  );
};
