import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import PageHeader from '../components/common/PageHeader';
import EmptyState from '../components/common/EmptyState';
import LearningPathView from '../components/learningPath/LearningPathView';
import Button from '../components/common/Button';
import { Compass } from 'lucide-react';

/**
 * Member 2 Feature Page: Learning Path
 * Route: /learning-path
 * Ownership: Member 2 (feature/member-2)
 */
export default function LearningPathPage() {
  const [viewMode, setViewMode] = useState('preview');

  return (
    <MainLayout>
      <PageHeader
        title="Learning Path"
        description="Structured step-by-step personalized curriculum dynamically tailored to your background and career target."
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
        <LearningPathView />
      ) : (
        <EmptyState
          title="Learning Path Module"
          description="Learning Path module will be fully implemented here by Member 2."
          memberBadge="Assigned: Member 2"
          branchName="feature/member-2"
          icon={Compass}
          plannedFeatures={[
            'Personalized milestone roadmap timeline',
            'Interactive stage expansion with topic checklists',
            'Progress tracking and stage completion toggles',
            'Adaptive path regeneration trigger with AI/ML engine',
          ]}
          onActionClick={() => setViewMode('preview')}
          actionText="Switch to Interactive Skeleton"
        />
      )}
    </MainLayout>
  );
}
