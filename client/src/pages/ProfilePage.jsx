import React from 'react';
import MainLayout from '../layouts/MainLayout';
import PageHeader from '../components/common/PageHeader';
import ProfileOverview from '../components/profile/ProfileOverview';

export default function ProfilePage() {
  return (
    <MainLayout>
      <PageHeader
        greeting="Account & Preferences"
        title="My Profile"
        description="Manage your learning objectives, target competency level, and personalized AI tutor settings."
        badge="Verified Profile"
        badgeVariant="coral"
      />

      <ProfileOverview />
    </MainLayout>
  );
}
