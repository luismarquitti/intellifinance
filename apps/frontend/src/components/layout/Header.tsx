import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header style={{ padding: '1rem', borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-between' }}>
      <div className="logo">IntelliFinance</div>
      <nav>
        {user ? (
          <>
            <span>Welcome, {user.fullName}</span>
            <button onClick={logout} style={{ marginLeft: '1rem' }}>Logout</button>
          </>
        ) : (
          <>
             <Link to="/login" style={{ marginRight: '1rem' }}>Login</Link>
             <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};
