import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Validate stored JWT token with backend on mount
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('learnpath_token');
      if (token) {
        try {
          const res = await api.get('/auth/me');
          if (res.data?.success && res.data.user) {
            setUser(res.data.user);
            localStorage.setItem('learnpath_user', JSON.stringify(res.data.user));
          } else {
            setUser(null);
            localStorage.removeItem('learnpath_user');
            localStorage.removeItem('learnpath_token');
          }
        } catch (err) {
          setUser(null);
          localStorage.removeItem('learnpath_user');
          localStorage.removeItem('learnpath_token');
        }
      } else {
        setUser(null);
        localStorage.removeItem('learnpath_user');
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data?.success) {
        const loggedUser = res.data.user;
        setUser(loggedUser);
        localStorage.setItem('learnpath_token', res.data.token);
        localStorage.setItem('learnpath_user', JSON.stringify(loggedUser));
        setLoading(false);
        return { success: true, user: loggedUser };
      }
      setLoading(false);
      return { success: false, error: res.data?.message || 'Invalid email or password' };
    } catch (err) {
      setLoading(false);
      return { success: false, error: err.response?.data?.message || err.message || 'Login failed' };
    }
  };

  const signup = async (name, email, password, targetRole) => {
    setLoading(true);
    try {
      // Clear old cached client telemetry from previous accounts
      localStorage.removeItem('m3_courses_data');
      localStorage.removeItem('m3_assessments_data');
      localStorage.removeItem('m3_assessment_history');

      const res = await api.post('/auth/register', { 
        name, 
        email, 
        password, 
        careerGoal: targetRole || 'Full Stack Developer'
      });
      if (res.data?.success) {
        const newUser = res.data.user;
        setUser(newUser);
        localStorage.setItem('learnpath_token', res.data.token);
        localStorage.setItem('learnpath_user', JSON.stringify(newUser));
        setLoading(false);
        return { success: true, user: newUser };
      }
      setLoading(false);
      return { success: false, error: res.data?.message || 'Registration failed' };
    } catch (err) {
      setLoading(false);
      return { success: false, error: err.response?.data?.message || err.message || 'Registration failed' };
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (e) {}
    if (user?._id) {
      localStorage.removeItem(`m3_courses_data_${user._id}`);
      localStorage.removeItem(`m3_assessments_data_${user._id}`);
      localStorage.removeItem(`m3_assessment_history_${user._id}`);
    }
    setUser(null);
    localStorage.removeItem('learnpath_user');
    localStorage.removeItem('learnpath_token');
    localStorage.removeItem('m3_courses_data');
    localStorage.removeItem('m3_assessments_data');
    localStorage.removeItem('m3_assessment_history');
  };

  const updateUserProfile = async (updatedFields) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...updatedFields };
      localStorage.setItem('learnpath_user', JSON.stringify(updated));
      return updated;
    });
    try {
      await api.put('/profile', updatedFields);
    } catch (err) {
      console.error('Failed to sync profile update with server:', err);
    }
  };

  const awardXp = async (amount = 100, reason = 'Completed Learning Milestone') => {
    const pointsToAdd = Number(amount) || 100;
    setUser((prev) => {
      if (!prev) return prev;
      const currentXp = Number(prev.points ?? prev.totalXp ?? 0);
      const newXp = currentXp + pointsToAdd;
      const updated = { ...prev, points: newXp, totalXp: newXp };
      localStorage.setItem('learnpath_user', JSON.stringify(updated));
      return updated;
    });

    try {
      const res = await api.post('/progress/activity', {
        type: 'milestone_reward',
        title: reason,
        xpEarned: pointsToAdd,
        durationMinutes: 15,
      });

      if (res.data?.success && res.data.stats) {
        setUser((prev) => {
          if (!prev) return prev;
          const updated = {
            ...prev,
            points: res.data.stats.xp,
            totalXp: res.data.stats.xp,
            streak: res.data.stats.streak ?? prev.streak,
          };
          localStorage.setItem('learnpath_user', JSON.stringify(updated));
          return updated;
        });
      }
    } catch (err) {
      console.warn('Backend activity sync note:', err.message);
    }
  };

  const updateSkillMastery = (skillName, newLevel) => {
    setUser((prev) => {
      if (!prev) return prev;
      const skills = prev.skills || [];
      const index = skills.findIndex(s => s.name.toLowerCase() === skillName.toLowerCase());
      let updatedSkills;
      if (index >= 0) {
        updatedSkills = skills.map((s, i) => i === index ? { ...s, level: Math.min(100, Math.max(s.level || s.progress || 0, newLevel)), progress: Math.min(100, Math.max(s.progress || s.level || 0, newLevel)) } : s);
      } else {
        updatedSkills = [...skills, { name: skillName, level: newLevel, progress: newLevel }];
      }
      const updated = { ...prev, skills: updatedSkills };
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
      updateUserProfile,
      awardXp,
      updateSkillMastery,
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
