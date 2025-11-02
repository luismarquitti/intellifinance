import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LogoutButton } from '../LogoutButton';
import { logoutUser } from '../../services/auth';

jest.mock('../../services/auth', () => ({
  logoutUser: jest.fn(),
}));

describe('LogoutButton', () => {
  it('should call the logout service on click', async () => {
    localStorage.setItem('refreshToken', 'test-token');
    (logoutUser as jest.Mock).mockResolvedValue({ data: { logout: { success: true } } });
    render(<LogoutButton />);

    fireEvent.click(screen.getByRole('button', { name: /logout/i }));

    await waitFor(() => {
      expect(logoutUser).toHaveBeenCalledWith({ refreshToken: 'test-token' });
    });
  });
});
