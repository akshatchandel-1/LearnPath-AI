import React from 'react';
import MainLayout from '../layouts/MainLayout';
import PageHeader from '../components/common/PageHeader';
import ProgressAnalytics from '../components/progress/ProgressAnalytics';

/**
 * Member 4 Feature Page: Progress Analytics
 * Route: /progress
 */
export default function ProgressPage() {
  return (
    <MainLayout>
      <PageHeader
        greeting="Study Analytics & Metrics"
        title="Learning Progress"
        description="Comprehensive visual study analytics, weekly study hours, competency category breakdowns, and achievements."
        badge="Live Analytics"
        badgeVariant="coral"
      />

      <ProgressAnalytics />
    </MainLayout>
  );
}
