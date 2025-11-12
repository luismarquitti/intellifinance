import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EditAccountForm } from '../EditAccountForm';

describe('EditAccountForm', () => {
  const account = {
    id: '1',
    name: 'Test Account',
    type: 'CHECKING',
    institution: 'Test Bank',
  };

  it('should render the form with all fields pre-filled', () => {
    render(<EditAccountForm account={account} />);

    expect(screen.getByLabelText('Account Name')).toHaveValue(account.name);
    expect(screen.getByRole('combobox')).toHaveTextContent('Checking');
    expect(screen.getByLabelText('Institution')).toHaveValue(account.institution);
    expect(screen.getByRole('button', { name: 'Update Account' })).toBeInTheDocument();
  });

  it('should call the updateAccount mutation when the form is submitted', async () => {
    const updateAccount = jest.fn();
    render(<EditAccountForm account={account} updateAccount={updateAccount} />);

    await userEvent.type(screen.getByLabelText('Account Name'), ' Updated');
    await userEvent.click(screen.getByRole('combobox'));
    await userEvent.click(screen.getByText('Savings'));
    await userEvent.click(screen.getByRole('button', { name: 'Update Account' }));

    expect(updateAccount).toHaveBeenCalledWith({
      variables: {
        id: '1',
        name: 'Test Account Updated',
        type: 'SAVINGS',
        institution: 'Test Bank',
      },
    });
  });
});
