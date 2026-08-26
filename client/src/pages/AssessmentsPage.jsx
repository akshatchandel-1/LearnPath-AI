import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import PageHeader from '../components/common/PageHeader';
import EmptyState from '../components/common/EmptyState';
import AssessmentsList from '../components/assessments/AssessmentsList';
import Button from '../components/common/Button';
import { ClipboardCheck } from 'lucide-react';

/**
 * Member 3 Feature Page: Assessments
 * Route: /assessments
 * Ownership: Member 3 (feature/member-3)
 */
export default function AssessmentsPage() {
  const [viewMode, setViewMode] = useState('preview');

  return (
    <MainLayout>
      <PageHeader
        title="Assessments"
        description="Verify your skills with timed adaptive quizzes and unlock advanced stages in your personalized roadmap."
        badge="Member 3"
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
        <AssessmentsList />
      ) : (
        <EmptyState
          title="Assessments Module"
          description="Assessments module will be fully implemented here by Member 3."
          memberBadge="Assigned: Member 3"
          branchName="feature/member-3"
          icon={ClipboardCheck}
          plannedFeatures={[
            'Topic quizzes with difficulty grading (Passed / Ready / Locked)',
            'Interactive quiz runner with timer and question progression',
            'Score calculation, XP reward triggers, and skill updates',
            'Post-quiz explanation breakdown with resource links',
          ]}
          onActionClick={() => setViewMode('preview')}
          actionText="Switch to Interactive Skeleton"
        />
      )}
    </MainLayout>
  );
}
