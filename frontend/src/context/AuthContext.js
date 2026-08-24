import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe utilizarse dentro de AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(Boolean(localStorage.getItem('token')));

  useEffect(() => {
    const restoreSession = async () => {
      if (!localStorage.getItem('token')) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.me();
        localStorage.setItem('user', JSON.stringify(response.user));
        setUserProfile(response.user);
      } catch {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUserProfile(null);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  const signIn = ({ token, user }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setUserProfile(user);
  };

  const signOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUserProfile(null);
  };

  const value = useMemo(() => ({
    authenticated: Boolean(userProfile && localStorage.getItem('token')),
    userProfile,
    loading,
    signIn,
    signOut
  }), [userProfile, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
