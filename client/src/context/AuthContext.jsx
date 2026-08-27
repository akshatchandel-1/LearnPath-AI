import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('learnpath_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing stored user:', e);
      }
    }
    return null;
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('learnpath_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('learnpath_user');
      localStorage.removeItem('learnpath_token');
    }
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data.success) {
        setUser(res.data.user);
        localStorage.setItem('learnpath_token', res.data.token);
        setLoading(false);
        return { success: true, user: res.data.user };
      }
    } catch (err) {
      setLoading(false);
      return { success: false, error: err.response?.data?.message || err.message };
    }
  };

  const signup = async (name, email, password, targetRole) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/register', { 
        name, 
        email, 
        password, 
        careerGoal: targetRole || 'Full Stack Developer'
      });
      if (res.data.success) {
        setUser(res.data.user);
        localStorage.setItem('learnpath_token', res.data.token);
        setLoading(false);
        return { success: true, user: res.data.user };
      }
    } catch (err) {
      setLoading(false);
      return { success: false, error: err.response?.data?.message || err.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('learnpath_user');
    localStorage.removeItem('learnpath_token');
  };

  const loginAsDemo = async () => {
    setLoading(true);
    try {
      const res = await api.post('/auth/demo-login');
      if (res.data.success) {
        setUser(res.data.user);
        localStorage.setItem('learnpath_token', res.data.token);
        setLoading(false);
        return { success: true, user: res.data.user };
      }
    } catch (err) {
      setLoading(false);
      return { success: false, error: err.response?.data?.message || err.message };
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, loginAsDemo, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
