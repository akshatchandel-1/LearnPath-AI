import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import PageHeader from '../components/common/PageHeader';
import EmptyState from '../components/common/EmptyState';
import SkillGapsView from '../components/skillGaps/SkillGapsView';
import Button from '../components/common/Button';
import { Target } from 'lucide-react';

/**
 * Member 2 Feature Page: Skill Gaps
 * Route: /skill-gaps
 * Ownership: Member 2 (feature/member-2)
 */
export default function SkillGapsPage() {
  const [viewMode, setViewMode] = useState('preview');

  return (
    <MainLayout>
      <PageHeader
        title="Skill Gaps"
        description="Comprehensive diagnostic comparison between your verified abilities and target job role benchmarks."
        badge="Member 2"
        badgeVariant="secondary"
        action={
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'preview' ? 'secondary' : 'outline'}
              size="sm"
              onClick={() => setViewMode('preview')}
            >
              Skeleton Preview
            </Button>
            <Button
              variant={viewMode === 'spec' ? 'secondary' : 'outline'}
              size="sm"
              onClick={() => setViewMode('spec')}
            >
              Module Scope
            </Button>
          </div>
        }
      />

      {viewMode === 'preview' ? (
        <SkillGapsView />
      ) : (
        <EmptyState
          title="Skill Gaps Module"
          description="Skill Gaps module will be fully implemented here by Member 2."
          memberBadge="Assigned: Member 2"
          branchName="feature/member-2"
          icon={Target}
          plannedFeatures={[
            'Role-based benchmark skill matrix',
            'Disparity calculation (Low, Medium, High Gap)',
            'Interactive radar / bar visualizer for competency levels',
            'Actionable bridges directly linking into course recommendations',
          ]}
          onActionClick={() => setViewMode('preview')}
          actionText="Switch to Interactive Skeleton"
        />
      )}
    </MainLayout>
  );
}
