import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LoginPage } from '../LoginPage';
import { loginUser } from '../../services/auth';

jest.mock('../../services/auth', () => ({
  loginUser: jest.fn(),
  refreshToken: jest.fn(),
}));

const validJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzU2ODk2MDB9.7_s_i-3-g_i-3-g_i-3-g_i-3-g_i-3-g_i-3-g';

describe('LoginPage', () => {
  it('should call the login service on form submission', async () => {
    (loginUser as jest.Mock).mockResolvedValue({ data: { login: { accessToken: validJwt, refreshToken: 'test-token' } } });
    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(loginUser).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });

  it('should display a success message on successful login', async () => {
    (loginUser as jest.Mock).mockResolvedValue({ data: { login: { accessToken: validJwt, refreshToken: 'test-token' } } });
    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/login successful/i)).toBeInTheDocument();
    });
  });

  it('should display an error message on failed login', async () => {
    const errorMessage = 'Something went wrong';
    (loginUser as jest.Mock).mockRejectedValue(new Error(errorMessage));
    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});
