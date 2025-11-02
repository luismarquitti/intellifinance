import React from 'react';
import { logoutUser } from '../services/auth';

export const LogoutButton: React.FC = () => {
  const handleLogout = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      try {
        await logoutUser({ refreshToken });
        localStorage.removeItem('refreshToken');
        console.log('Logout successful!');
      } catch (err: any) {
        console.error('Logout failed: ' + err.message);
      }
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};
