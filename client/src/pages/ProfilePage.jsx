import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import PageHeader from '../components/common/PageHeader';
import EmptyState from '../components/common/EmptyState';
import ProfileOverview from '../components/profile/ProfileOverview';
import Button from '../components/common/Button';
import { User } from 'lucide-react';

/**
 * Member 1 Feature Page: My Profile
 * Route: /profile
 * Ownership: Member 1 (feature/member-1)
 */
export default function ProfilePage() {
  const [viewMode, setViewMode] = useState('preview');

  return (
    <MainLayout>
      <PageHeader
        title="My Profile"
        description="Manage your learner bio, target engineering role, experience level, and AI study preferences."
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
        <ProfileOverview />
      ) : (
        <EmptyState
          title="My Profile Module"
          description="My Profile module will be fully implemented here by Member 1."
          memberBadge="Assigned: Member 1"
          branchName="feature/member-1"
          icon={User}
          plannedFeatures={[
            'Learner profile details & avatar configuration',
            'Target role selection (e.g. Full Stack MERN, DevOps, AI Engineer)',
            'AI Mentor personality and weekly commitment settings',
            'Competency interests & verified badges list',
          ]}
          onActionClick={() => setViewMode('preview')}
          actionText="Switch to Interactive Skeleton"
        />
      )}
    </MainLayout>
  );
}
