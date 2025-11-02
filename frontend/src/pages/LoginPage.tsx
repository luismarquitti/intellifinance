import React, { useState } from 'react';
import { LoginForm } from '../components/LoginForm';
import { loginUser, refreshToken } from '../services/auth';
import { jwtDecode } from 'jwt-decode';

export const LoginPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleLoginSuccess = (accessToken: string, refreshTokenStr: string) => {
    localStorage.setItem('refreshToken', refreshTokenStr);
    const decodedToken: { exp: number } = jwtDecode(accessToken);
    const expiresIn = decodedToken.exp * 1000 - Date.now() - 60000; // 1 minute before expiry
    setTimeout(() => {
      console.warn('Session is about to expire. Refreshing token...');
      refreshToken({ refreshToken: refreshTokenStr });
    }, expiresIn);
  };

  const handleSubmit = async (variables: any) => {
    try {
      const response = await loginUser(variables);
      if (response.data.login.accessToken && response.data.login.refreshToken) {
        handleLoginSuccess(response.data.login.accessToken, response.data.login.refreshToken);
      }
      setSuccess(true);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setSuccess(false);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {success ? (
        <p>Login successful!</p>
      ) : (
        <LoginForm onSubmit={handleSubmit} error={error} />
      )}
    </div>
  );
};
