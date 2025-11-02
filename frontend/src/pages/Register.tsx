import React, { useState } from 'react';
import { RegisterForm } from '../components/RegisterForm';
import { registerUser } from '../services/auth';

export const RegisterPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (variables: any) => {
    try {
      await registerUser(variables);
      setSuccess(true);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setSuccess(false);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      {success ? (
        <p>Registration successful!</p>
      ) : (
        <RegisterForm onSubmit={handleSubmit} error={error} />
      )}
    </div>
  );
};
