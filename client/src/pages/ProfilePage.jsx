import React from 'react';
import MainLayout from '../layouts/MainLayout';
import ProfileOverview from '../components/profile/ProfileOverview';

/**
 * Member 1 Feature Page: My Profile
 * Route: /profile
 * Ownership: Member 1
 */
export default function ProfilePage() {
  return (
    <MainLayout>
      <ProfileOverview />
    </MainLayout>
  );
}
