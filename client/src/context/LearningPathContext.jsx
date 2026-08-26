import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';

const LearningPathContext = createContext(null);

export const LearningPathProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [learningPath, setLearningPath] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [skillGapReport, setSkillGapReport] = useState(null);
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [adapting, setAdapting] = useState(false);

  const fetchLearningPath = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      setLoading(true);
      const res = await api.get('/learning-path');
      if (res.data.success) {
        setLearningPath(res.data.learningPath);
      }
    } catch (err) {
      console.warn('Error fetching learning path:', err.message);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const fetchRecommendations = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      const res = await api.get('/recommendations');
      if (res.data.success) {
        setRecommendations(res.data.recommendations);
      }
    } catch (err) {
      console.warn('Error fetching recommendations:', err.message);
    }
  }, [isAuthenticated]);

  const fetchSkillGap = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      const res = await api.get('/skills/gap-analysis');
      if (res.data.success) {
        setSkillGapReport(res.data.gapReport);
      }
    } catch (err) {
      console.warn('Error fetching skill gap:', err.message);
    }
  }, [isAuthenticated]);

  const fetchInsights = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      const res = await api.get('/ai/insights');
      if (res.data.success) {
        setInsights(res.data.insights);
      }
    } catch (err) {
      console.warn('Error fetching insights:', err.message);
    }
  }, [isAuthenticated]);

  const adaptRoadmap = async (data = {}) => {
    try {
      setAdapting(true);
      const res = await api.post('/learning-path/adapt', data);
      if (res.data.success) {
        setLearningPath(res.data.learningPath);
        await fetchRecommendations();
        await fetchSkillGap();
        await fetchInsights();
      }
      return res.data;
    } catch (err) {
      console.error('Error adapting roadmap:', err);
      throw err;
    } finally {
      setAdapting(false);
    }
  };

  const submitFeedback = async (recommendationId, feedbackData) => {
    try {
      const res = await api.post(`/recommendations/${recommendationId}/feedback`, feedbackData);
      if (res.data.success) {
        // Update local recommendation feedback state
        setRecommendations(prev =>
          prev.map(r => (r._id === recommendationId ? { ...r, feedback: res.data.recommendation.feedback } : r))
        );
      }
      return res.data;
    } catch (err) {
      console.error('Error submitting feedback:', err);
      throw err;
    }
  };

  const refreshAll = useCallback(async () => {
    if (isAuthenticated) {
      await Promise.all([
        fetchLearningPath(),
        fetchRecommendations(),
        fetchSkillGap(),
        fetchInsights(),
      ]);
    }
  }, [isAuthenticated, fetchLearningPath, fetchRecommendations, fetchSkillGap, fetchInsights]);

  useEffect(() => {
    if (isAuthenticated) {
      refreshAll();
    } else {
      setLearningPath(null);
      setRecommendations([]);
      setSkillGapReport(null);
      setInsights([]);
    }
  }, [isAuthenticated, refreshAll]);

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
