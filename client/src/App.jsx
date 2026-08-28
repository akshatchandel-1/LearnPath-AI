import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { LearningPathProvider } from './context/LearningPathContext';
import ProtectedRoute from './components/common/ProtectedRoute';

// Canonical Authentication Page (Obsidian + Ivory + Coral)
import AuthPage from './pages/AuthPage';

// Member 1 Feature Pages (Dashboard + Profile)
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';

// Member 2 Feature Pages (Learning Path + Skill Gaps)
import LearningPathPage from './pages/LearningPathPage';
import SkillGapsPage from './pages/SkillGapsPage';

// Member 3 Feature Pages (Courses + Assessments)
import CoursesPage from './pages/CoursesPage';
import AssessmentsPage from './pages/AssessmentsPage';

// Member 4 Feature Pages (AI Assistant + Progress)
import AIAssistantPage from './pages/AIAssistantPage';
import ProgressPage from './pages/ProgressPage';

/**
 * Unified Canonical LearnPath AI Router Architecture
 * All 8 feature modules integrated into a single protected environment.
 */
export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LearningPathProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Entry Routes (Landing removed, direct Auth interface) */}
              <Route path="/" element={<AuthPage defaultIsLogin={true} />} />
              <Route path="/login" element={<AuthPage defaultIsLogin={true} />} />
              <Route path="/signup" element={<AuthPage defaultIsLogin={false} />} />

              {/* Member 1 Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />

              {/* Member 2 Routes */}
              <Route
                path="/learning-path"
                element={
                  <ProtectedRoute>
                    <LearningPathPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/skill-gaps"
                element={
                  <ProtectedRoute>
                    <SkillGapsPage />
                  </ProtectedRoute>
                }
              />

              {/* Member 3 Routes */}
              <Route
                path="/courses"
                element={
                  <ProtectedRoute>
                    <CoursesPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/assessments"
                element={
                  <ProtectedRoute>
                    <AssessmentsPage />
                  </ProtectedRoute>
                }
              />

              {/* Member 4 Routes */}
              <Route
                path="/ai-assistant"
                element={
                  <ProtectedRoute>
                    <AIAssistantPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/progress"
                element={
                  <ProtectedRoute>
                    <ProgressPage />
                  </ProtectedRoute>
                }
              />

              {/* Legacy Route Aliases */}
              <Route path="/roadmap" element={<Navigate to="/learning-path" replace />} />
              <Route path="/skills" element={<Navigate to="/skill-gaps" replace />} />
              <Route path="/analytics" element={<Navigate to="/progress" replace />} />
              <Route path="/resources" element={<Navigate to="/courses" replace />} />

              {/* Fallback Catch-all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </LearningPathProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
