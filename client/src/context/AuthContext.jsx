import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockUser } from '../utils/mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Check if user session exists in localStorage, otherwise default to demo user for seamless team preview
    const saved = localStorage.getItem('learnpath_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing stored user:', e);
      }
    }
    return mockUser;
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
      // Basic login placeholder (will connect to backend later)
      const simulatedUser = {
        ...mockUser,
        email: email || mockUser.email,
      };
      setUser(simulatedUser);
      localStorage.setItem('learnpath_token', 'demo_token_xyz_123');
      setLoading(false);
      return { success: true, user: simulatedUser };
    } catch (err) {
      setLoading(false);
      return { success: false, error: err.message };
    }
  };

  const signup = async (name, email, password, targetRole) => {
    setLoading(true);
    try {
      const newUser = {
        ...mockUser,
        name: name || 'Learner',
        email: email || 'learner@learnpath.ai',
        targetRole: targetRole || 'Full Stack Developer',
      };
      setUser(newUser);
      localStorage.setItem('learnpath_token', 'demo_token_xyz_123');
      setLoading(false);
      return { success: true, user: newUser };
    } catch (err) {
      setLoading(false);
      return { success: false, error: err.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('learnpath_user');
    localStorage.removeItem('learnpath_token');
  };

  const loginAsDemo = () => {
    setUser(mockUser);
    localStorage.setItem('learnpath_token', 'demo_token_xyz_123');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, loginAsDemo }}>
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
