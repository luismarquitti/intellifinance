import React, { createContext, useContext, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client/react';
import { ME_QUERY } from '../graphql/auth';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  email: string;
  fullName: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: () => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  // We assume Apollo Client is set up with an auth link to send headers
  const { data, loading, error, client } = useQuery(ME_QUERY, {
    skip: !localStorage.getItem('accessToken'),
  });

  useEffect(() => {
    if (data?.me) {
      setUser(data.me);
    } else if (error) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setUser(null);
    }
  }, [data, error]);

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
    client.resetStore();
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
