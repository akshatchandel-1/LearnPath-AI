import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';
import {
  generatePathForRole,
  generateSkillGapsForRole,
  defaultSkillGapReport,
  defaultRecommendations
} from '../data/roadmapGenerator';

export {
  generatePathForRole,
  generateSkillGapsForRole,
  defaultSkillGapReport,
  defaultRecommendations
};

const LearningPathContext = createContext(null);

export const LearningPathProvider = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const currentRole = user?.targetRole || user?.careerGoal || 'Full Stack Developer';

  const [learningPath, setLearningPath] = useState(() => generatePathForRole(currentRole));
  const [recommendations, setRecommendations] = useState(defaultRecommendations);
  const [skillGapReport, setSkillGapReport] = useState(() => generateSkillGapsForRole(currentRole));
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [adapting, setAdapting] = useState(false);

  // Sync with user's active career goal
  useEffect(() => {
    if (user?.targetRole || user?.careerGoal) {
      const activeRole = user.targetRole || user.careerGoal;
      setLearningPath(prev => ({
        ...generatePathForRole(activeRole),
        goal: activeRole
      }));
      setSkillGapReport(generateSkillGapsForRole(activeRole));
    }
  }, [user?.targetRole, user?.careerGoal]);

  const fetchLearningPath = useCallback(async () => {
    try {
      const res = await api.get('/learning-path');
      if (res.data?.success && res.data.learningPath) {
        setLearningPath(res.data.learningPath);
      } else {
        setLearningPath(generatePathForRole(currentRole));
      }
    } catch (err) {
      setLearningPath(generatePathForRole(currentRole));
    }
  }, [currentRole]);

  const fetchRecommendations = useCallback(async () => {
    try {
      const res = await api.get('/recommendations');
      if (res.data?.success && res.data.recommendations?.length > 0) {
        setRecommendations(res.data.recommendations);
      } else {
        setRecommendations(defaultRecommendations);
      }
    } catch (err) {
      setRecommendations(defaultRecommendations);
    }
  }, []);

  const fetchSkillGap = useCallback(async () => {
    try {
      const res = await api.get('/skills/gap-analysis');
      if (res.data?.success && res.data.gapReport) {
        setSkillGapReport(res.data.gapReport);
      } else {
        setSkillGapReport(generateSkillGapsForRole(currentRole));
      }
    } catch (err) {
      setSkillGapReport(generateSkillGapsForRole(currentRole));
    }
  }, [currentRole]);

  const fetchInsights = useCallback(async () => {
    try {
      const res = await api.get('/ai/insights');
      if (res.data?.success && res.data.insights) {
        setInsights(res.data.insights);
      }
    } catch (err) {}
  }, []);

  const adaptRoadmap = async (data = {}) => {
    setAdapting(true);
    try {
      const res = await api.post('/learning-path/adapt', data);
      if (res.data?.success && res.data.learningPath) {
        setLearningPath(res.data.learningPath);
        await Promise.all([fetchRecommendations(), fetchSkillGap(), fetchInsights()]);
        return res.data;
      }
    } catch (err) {
      const newGoal = data.goal || learningPath.goal || currentRole;
      const updatedPath = {
        ...generatePathForRole(newGoal),
        goal: newGoal,
        adaptationHistory: [
          {
            actionTaken: `Calibrated roadmap for ${newGoal}`,
            reason: data.reason || 'AI Roadmap re-calibration',
            timestamp: new Date().toISOString()
          },
          ...(learningPath.adaptationHistory || [])
        ]
      };
      setLearningPath(updatedPath);
      setSkillGapReport(generateSkillGapsForRole(newGoal));
      return { success: true, learningPath: updatedPath };
    } finally {
      setAdapting(false);
    }
  };

  const submitFeedback = async (recommendationId, feedbackData) => {
    try {
      const res = await api.post(`/recommendations/${recommendationId}/feedback`, feedbackData);
      if (res.data?.success) {
        setRecommendations(prev =>
          prev.map(r => (r._id === recommendationId ? { ...r, feedback: res.data.recommendation.feedback } : r))
        );
      }
      return res.data;
    } catch (err) {
      setRecommendations(prev =>
        prev.map(r => (r._id === recommendationId ? { ...r, feedback: feedbackData } : r))
      );
      return { success: true };
    }
  };

  const refreshAll = useCallback(async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchLearningPath(),
        fetchRecommendations(),
        fetchSkillGap(),
        fetchInsights(),
      ]);
    } finally {
      setLoading(false);
    }
  }, [fetchLearningPath, fetchRecommendations, fetchSkillGap, fetchInsights]);

  useEffect(() => {
    if (isAuthenticated) {
      refreshAll();
    } else {
      setLearningPath(generatePathForRole(currentRole));
      setRecommendations(defaultRecommendations);
      setSkillGapReport(generateSkillGapsForRole(currentRole));
    }
  }, [isAuthenticated, refreshAll, currentRole]);

  return (
    <LearningPathContext.Provider
      value={{
        learningPath,
        recommendations,
        skillGapReport,
        insights,
        loading,
        adapting,
        fetchLearningPath,
        fetchRecommendations,
        fetchSkillGap,
        fetchInsights,
        adaptRoadmap,
        submitFeedback,
        refreshAll,
      }}
    >
      {children}
    </LearningPathContext.Provider>
  );
};

export const useLearningPath = () => {
  const context = useContext(LearningPathContext);
  if (!context) throw new Error('useLearningPath must be used within a LearningPathProvider');
  return context;
};
