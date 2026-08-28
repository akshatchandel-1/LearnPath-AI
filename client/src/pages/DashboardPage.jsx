import React from 'react';
import MainLayout from '../layouts/MainLayout';
import PageHeader from '../components/common/PageHeader';
import DashboardOverview from '../components/dashboard/DashboardOverview';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <MainLayout>
      <PageHeader
        greeting={`Welcome back, ${user?.name?.split(' ')[0] || 'Akshat'} 👋`}
        title="Your Learning Overview"
        description="Track your personalized learning journey, milestones, and weekly study metrics."
        badge="Active Roadmap"
        badgeVariant="coral"
        action={
          <div className="flex items-center gap-2">
            <Link to="/learning-path">
              <Button variant="primary" size="sm" icon={Compass}>
                Explore Roadmap
              </Button>
            </Link>
          </div>
        }
      />

      <DashboardOverview />
    </MainLayout>
  );
}
