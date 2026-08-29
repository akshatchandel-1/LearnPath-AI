import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const defaultUser = {
  id: 'usr_default_101',
  name: 'Learner',
  email: 'learner@learnpath.ai',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  targetRole: 'Full Stack Developer',
  tagline: 'Aspiring Software Engineer & Cloud Architect',
  location: 'San Francisco, CA',
  education: 'B.Tech in Computer Science',
  experienceLevel: 'Intermediate',
  weeklyGoalHours: 12,
  completedHours: 0,
  overallProgress: 0,
  streakDays: 0,
  totalXp: 0,
  bio: 'Passionate developer building scalable web architectures, mastering full-stack systems and cloud engineering.',
  areasOfInterest: 'Web Development, Artificial Intelligence, System Architecture',
  preferredLearningStyle: 'Hands-on Projects',
  weeklyLearningTime: '12-15 hours/week',
  currentFocus: 'React 18, Node.js Microservices, MongoDB',
  careerGoal: 'Full Stack Developer',
  interests: ['Full Stack Development', 'TypeScript', 'System Design', 'Cloud Architecture'],
  skills: [
    { name: 'HTML & CSS', progress: 85 },
    { name: 'JavaScript ES6+', progress: 75 },
    { name: 'React.js', progress: 60 },
    { name: 'Node.js & Express', progress: 50 },
    { name: 'MongoDB', progress: 45 },
  ],
  completedMilestonesCount: 0,
  activeCoursesCount: 0,
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
    return defaultUser;
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
      console.warn('Backend offline or login error, using local session fallback:', err.message);
      const fallbackUser = {
        ...defaultUser,
        email: email || defaultUser.email,
        name: email ? email.split('@')[0].replace('.', ' ').replace(/^[a-z]/, c => c.toUpperCase()) : 'Learner'
      };
      setUser(fallbackUser);
      localStorage.setItem('learnpath_token', 'session-jwt-token-learnpath-2026');
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
      console.warn('Backend offline or register error, using local session fallback:', err.message);
      const newUser = {
        ...defaultUser,
        name: name || (email ? email.split('@')[0] : 'Learner'),
        email: email || defaultUser.email,
        targetRole: targetRole || 'Full Stack Developer',
        careerGoal: targetRole || 'Full Stack Developer'
      };
      setUser(newUser);
      localStorage.setItem('learnpath_token', 'session-jwt-token-learnpath-2026');
      setLoading(false);
      return { success: true, user: newUser };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('learnpath_user');
    localStorage.removeItem('learnpath_token');
    localStorage.removeItem('m3_courses_data');
    localStorage.removeItem('m3_assessments_data');
  };

  const updateUserProfile = (updatedFields) => {
    setUser((prev) => {
      const updated = { ...prev, ...updatedFields };
      localStorage.setItem('learnpath_user', JSON.stringify(updated));
      return updated;
    });
  };

  const awardXp = (amount = 100) => {
    setUser((prev) => {
      if (!prev) return prev;
      const newXp = (prev.totalXp || 0) + amount;
      const updated = { ...prev, totalXp: newXp };
      localStorage.setItem('learnpath_user', JSON.stringify(updated));
      return updated;
    });
  };

  const updateSkillMastery = (skillName, newLevel) => {
    setUser((prev) => {
      if (!prev) return prev;
      const skills = prev.skills || [];
      const index = skills.findIndex(s => s.name.toLowerCase() === skillName.toLowerCase());
      let updatedSkills;
      if (index >= 0) {
        updatedSkills = skills.map((s, i) => i === index ? { ...s, progress: Math.min(100, Math.max(s.progress, newLevel)) } : s);
      } else {
        updatedSkills = [...skills, { name: skillName, progress: newLevel }];
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
