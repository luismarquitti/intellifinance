import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterInputSchema, RegisterInput } from '@intellifinance/types';
import { useMutation } from '@apollo/client/react';
import { REGISTER_MUTATION } from '../../graphql/auth';
import { useNavigate } from 'react-router-dom';

export const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const [register, { loading, error }] = useMutation(REGISTER_MUTATION);

  const { register: formRegister, handleSubmit, formState: { errors } } = useForm<RegisterInput>({
    resolver: zodResolver(RegisterInputSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    try {
      const response = await register({ variables: { input: data } });
      const { token, refreshToken } = response.data.register;

      // Store tokens
      localStorage.setItem('accessToken', token);
      localStorage.setItem('refreshToken', refreshToken);

      // Redirect
      navigate('/dashboard');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Full Name</label>
        <input {...formRegister('fullName')} />
        {errors.fullName && <p>{errors.fullName.message}</p>}
      </div>

      <div>
        <label>Email</label>
        <input {...formRegister('email')} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <label>Password</label>
        <input type="password" {...formRegister('password')} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      {error && <p>Error: {error.message}</p>}

      <button type="submit" disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
};
