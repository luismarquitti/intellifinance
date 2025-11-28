import React from 'react';
import { RegisterForm } from '../components/auth/RegisterForm';

export const RegisterPage: React.FC = () => {
  return (
    <div>
      <h1>Create Account</h1>
      <RegisterForm />
    </div>
  );
};
