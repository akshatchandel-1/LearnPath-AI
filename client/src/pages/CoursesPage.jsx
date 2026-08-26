import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import PageHeader from '../components/common/PageHeader';
import EmptyState from '../components/common/EmptyState';
import CoursesList from '../components/courses/CoursesList';
import Button from '../components/common/Button';
import { BookOpen } from 'lucide-react';

/**
 * Member 3 Feature Page: Courses
 * Route: /courses
 * Ownership: Member 3 (feature/member-3)
 */
export default function CoursesPage() {
  const [viewMode, setViewMode] = useState('preview');

  return (
    <MainLayout>
      <PageHeader
        title="Courses"
        description="Smart, prioritized curriculum modules and curated educational resources matched to your active gaps."
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
        <CoursesList />
      ) : (
        <EmptyState
          title="Courses Module"
          description="Courses module will be fully implemented here by Member 3."
          memberBadge="Assigned: Member 3"
          branchName="feature/member-3"
          icon={BookOpen}
          plannedFeatures={[
            'Curated course card catalog with ratings and duration',
            'Category filtering (Frontend, Backend, Databases, DevOps)',
            'Enrollment tracking and progress state management',
            'Direct linkage into recommended skill-gap topics',
          ]}
          onActionClick={() => setViewMode('preview')}
          actionText="Switch to Interactive Skeleton"
        />
      )}
    </MainLayout>
  );
}
