import React from 'react';
import MainLayout from '../layouts/MainLayout';
import DashboardOverview from '../components/dashboard/DashboardOverview';

/**
 * Member 1 Feature Page: Dashboard
 * Route: /dashboard
 * Ownership: Member 1
 */
export default function DashboardPage() {
  return (
    <MainLayout>
      <DashboardOverview />
    </MainLayout>
  );
}
