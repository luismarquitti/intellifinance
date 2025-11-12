import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DeleteAccountDialog } from '../DeleteAccountDialog';

describe('DeleteAccountDialog', () => {
  it('should call the deleteAccount mutation when the delete button is clicked', async () => {
    const deleteAccount = jest.fn();
    render(<DeleteAccountDialog open={true} onClose={() => {}} deleteAccount={deleteAccount} />);

    await userEvent.click(screen.getByRole('button', { name: 'Delete' }));

    expect(deleteAccount).toHaveBeenCalled();
  });
});
