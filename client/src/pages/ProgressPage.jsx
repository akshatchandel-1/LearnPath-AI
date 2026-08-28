import React from 'react';
import MainLayout from '../layouts/MainLayout';
import PageHeader from '../components/common/PageHeader';
import ProgressAnalytics from '../components/progress/ProgressAnalytics';

export default function ProgressPage() {
  return (
    <MainLayout>
      <PageHeader
        greeting="Weekly Study Metrics"
        title="Learning Progress & Analytics"
        description="Comprehensive analytics tracking your weekly study hours, assessment benchmarks, unlocked certifications, and consistency streaks."
        badge="Analytics Engine"
        badgeVariant="coral"
      />

      <ProgressAnalytics />
    </MainLayout>
  );
}
