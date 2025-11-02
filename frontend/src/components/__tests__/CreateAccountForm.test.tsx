import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CreateAccountForm } from '../CreateAccountForm';

describe('CreateAccountForm', () => {
  it('should render the form with all fields', () => {
    render(<CreateAccountForm />);

    expect(screen.getByLabelText('Account Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Account Type')).toBeInTheDocument();
    expect(screen.getByLabelText('Institution')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Create Account' })).toBeInTheDocument();
  });

  it('should call the createAccount mutation when the form is submitted', async () => {
    const createAccount = jest.fn();
    render(<CreateAccountForm createAccount={createAccount} />);

    await userEvent.type(screen.getByLabelText('Account Name'), 'Test Account');
    await userEvent.selectOptions(screen.getByLabelText('Account Type'), 'CHECKING');
    await userEvent.type(screen.getByLabelText('Institution'), 'Test Bank');
    await userEvent.click(screen.getByRole('button', { name: 'Create Account' }));

    expect(createAccount).toHaveBeenCalledWith({
      variables: {
        name: 'Test Account',
        type: 'CHECKING',
        institution: 'Test Bank',
      },
    });
  });
});
