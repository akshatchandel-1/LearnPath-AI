import React from 'react';
import MainLayout from '../layouts/MainLayout';
import PageHeader from '../components/common/PageHeader';
import AssessmentsList from '../components/assessments/AssessmentsList';
import Button from '../components/common/Button';
import { ClipboardCheck, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AssessmentsPage() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <PageHeader
        greeting="Skill Benchmarking"
        title="Assessments & Tests"
        description="Verify your knowledge, earn verified badges, and identify critical focus areas for your roadmap."
        badge="Competency Tests"
        badgeVariant="coral"
        action={
          <Button
            variant="outline"
            size="sm"
            icon={Sparkles}
            onClick={() => navigate('/skill-gaps')}
          >
            View Skill Gaps
          </Button>
        }
      />

      <AssessmentsList />
    </MainLayout>
  );
}
