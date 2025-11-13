import React from 'react';
import { render, screen } from '@testing-library/react';
import AccountListItem from '../../components/AccountListItem';

describe('AccountListItem', () => {
  it('should render the account name and details', () => {
    const account = {
      name: 'Test Account',
      type: 'CHECKING',
      institution: 'Test Bank',
    };
    render(<AccountListItem account={account} />);

    expect(screen.getByText('Test Account')).toBeInTheDocument();
    expect(screen.getByText('CHECKING - Test Bank')).toBeInTheDocument();
  });
});
