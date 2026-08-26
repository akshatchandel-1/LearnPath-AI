import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import PageHeader from '../components/common/PageHeader';
import EmptyState from '../components/common/EmptyState';
import ProgressAnalytics from '../components/progress/ProgressAnalytics';
import Button from '../components/common/Button';
import { TrendingUp } from 'lucide-react';

/**
 * Member 4 Feature Page: Progress
 * Route: /progress
 * Ownership: Member 4 (feature/member-4)
 */
export default function ProgressPage() {
  const [viewMode, setViewMode] = useState('preview');

  return (
    <MainLayout>
      <PageHeader
        title="Progress"
        description="Comprehensive visual study analytics, weekly hours tracking, category breakdowns, and achievements."
        badge="Member 4"
        badgeVariant="primary"
        action={
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'preview' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setViewMode('preview')}
            >
              Skeleton Preview
            </Button>
            <Button
              variant={viewMode === 'spec' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setViewMode('spec')}
            >
              Module Scope
            </Button>
          </div>
        }
      />

      {viewMode === 'preview' ? (
        <ProgressAnalytics />
      ) : (
        <EmptyState
          title="Progress Module"
          description="Progress module will be fully implemented here by Member 4."
          memberBadge="Assigned: Member 4"
          branchName="feature/member-4"
          icon={TrendingUp}
          plannedFeatures={[
            'Weekly study activity time histogram',
            'Competency category time allocation breakdown',
            'Streak calculation and milestone reward badges',
            'PDF/CSV study report generation',
          ]}
          onActionClick={() => setViewMode('preview')}
          actionText="Switch to Interactive Skeleton"
        />
      )}
    </MainLayout>
  );
}
