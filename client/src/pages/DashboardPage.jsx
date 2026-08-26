import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import PageHeader from '../components/common/PageHeader';
import EmptyState from '../components/common/EmptyState';
import DashboardOverview from '../components/dashboard/DashboardOverview';
import Button from '../components/common/Button';
import { LayoutDashboard, Sparkles, SlidersHorizontal } from 'lucide-react';

/**
 * Member 1 Feature Page: Dashboard
 * Route: /dashboard
 * Ownership: Member 1 (feature/member-1)
 */
export default function DashboardPage() {
  const [viewMode, setViewMode] = useState('preview'); // 'preview' | 'spec'

  return (
    <MainLayout>
      <PageHeader
        title="Dashboard"
        description="Track your personalized learning journey, milestones, and weekly study metrics."
        badge="Member 1"
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
        <DashboardOverview />
      ) : (
        <EmptyState
          title="Dashboard Module"
          description="Dashboard module will be fully implemented here by Member 1."
          memberBadge="Assigned: Member 1"
          branchName="feature/member-1"
          icon={LayoutDashboard}
          plannedFeatures={[
            'Personalized weekly target tracker',
            'AI-driven recommended next step prompt',
            'Recent milestones & study streak widget',
            'Active course & readiness metric cards',
          ]}
          onActionClick={() => setViewMode('preview')}
          actionText="Switch to Interactive Skeleton"
        />
      )}
    </MainLayout>
  );
}
