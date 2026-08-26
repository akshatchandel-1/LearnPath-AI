import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/common/ProtectedRoute';

// Public Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

// Member 1 Feature Pages
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';

// Member 2 Feature Pages
import LearningPathPage from './pages/LearningPathPage';
import SkillGapsPage from './pages/SkillGapsPage';

// Member 3 Feature Pages
import CoursesPage from './pages/CoursesPage';
import AssessmentsPage from './pages/AssessmentsPage';

// Member 4 Feature Pages
import AIAssistantPage from './pages/AIAssistantPage';
import ProgressPage from './pages/ProgressPage';

/**
 * Main Application Routes Setup
 * App.jsx contains strictly route definitions and global context providers.
 * Feature development occurs inside isolated pages/ and components/ folders.
 */
export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Entry Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

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

            {/* Fallback Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
