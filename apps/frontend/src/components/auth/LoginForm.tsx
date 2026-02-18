import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginInputSchema, LoginInput } from '@intellifinance/types';
import { useMutation } from '@apollo/client/react';
import { LOGIN_MUTATION } from '../../graphql/auth';
import { useNavigate } from 'react-router-dom';

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({
    resolver: zodResolver(LoginInputSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    try {
      const response = await login({ variables: { input: data } });
      if (response.data?.login) {
        const { token, refreshToken } = response.data.login;

        localStorage.setItem('accessToken', token);
        localStorage.setItem('refreshToken', refreshToken);

        navigate('/dashboard');
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email</label>
        <input {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <label>Password</label>
        <input type="password" {...register('password')} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      {error && <p>Error: {error.message}</p>}

      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};
