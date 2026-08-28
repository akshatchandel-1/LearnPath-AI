import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const defaultUser = {
  id: 'usr_akshat_101',
  name: 'Akshat Singh',
  email: 'akshat.singh@learnpath.ai',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  targetRole: 'Full Stack MERN Developer',
  tagline: 'Full Stack AI Engineer & Cloud Architect',
  location: 'San Francisco, CA',
  education: 'B.Tech in Computer Science',
  experienceLevel: 'Intermediate',
  weeklyGoalHours: 12,
  completedHours: 7.5,
  overallProgress: 68,
  streakDays: 12,
  totalXp: 1850,
  bio: 'Passionate aspiring AI Full Stack engineer building high-scale cloud architectures, MERN web applications, and personalized AI pipelines.',
  areasOfInterest: 'Web Development, Artificial Intelligence, System Architecture',
  preferredLearningStyle: 'Hands-on Projects',
  weeklyLearningTime: '12-15 hours/week',
  currentFocus: 'React 18, Node.js Microservices, PyTorch, MongoDB',
  careerGoal: 'To engineer production-ready AI-driven scalable SaaS products and lead innovative engineering teams.',
  interests: ['Full Stack MERN', 'TypeScript', 'Vector Databases', 'Deep Learning', 'System Design']
};

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
    return defaultUser; // Default logged in as demo user for instant hackathon showcase
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
      if (res.data?.success) {
        setUser(res.data.user);
        localStorage.setItem('learnpath_token', res.data.token);
        setLoading(false);
        return { success: true, user: res.data.user };
      }
    } catch (err) {
      // Graceful offline mock fallback
      console.warn('Backend offline or login error, using local fallback:', err.message);
      const fallbackUser = {
        ...defaultUser,
        email: email || defaultUser.email,
        name: email ? email.split('@')[0] : defaultUser.name
      };
      setUser(fallbackUser);
      localStorage.setItem('learnpath_token', 'demo-jwt-token-learnpath-2026');
      setLoading(false);
      return { success: true, user: fallbackUser };
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
      if (res.data?.success) {
        setUser(res.data.user);
        localStorage.setItem('learnpath_token', res.data.token);
        setLoading(false);
        return { success: true, user: res.data.user };
      }
    } catch (err) {
      console.warn('Backend offline or register error, using local fallback:', err.message);
      const newUser = {
        ...defaultUser,
        name: name || defaultUser.name,
        email: email || defaultUser.email,
        targetRole: targetRole || defaultUser.targetRole
      };
      setUser(newUser);
      localStorage.setItem('learnpath_token', 'demo-jwt-token-learnpath-2026');
      setLoading(false);
      return { success: true, user: newUser };
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
      if (res.data?.success) {
        setUser(res.data.user);
        localStorage.setItem('learnpath_token', res.data.token);
        setLoading(false);
        return { success: true, user: res.data.user };
      }
    } catch (err) {
      console.warn('Demo login offline fallback active');
    }
    setUser(defaultUser);
    localStorage.setItem('learnpath_token', 'demo-jwt-token-learnpath-2026');
    setLoading(false);
    return { success: true, user: defaultUser };
  };

  const updateUserProfile = (updatedFields) => {
    setUser((prev) => {
      const updated = { ...prev, ...updatedFields };
      localStorage.setItem('learnpath_user', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      signup, 
      logout, 
      loginAsDemo, 
      updateUserProfile,
      isAuthenticated: !!user 
    }}>
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
