import React from 'react';
import MainLayout from '../layouts/MainLayout';
import PageHeader from '../components/common/PageHeader';
import CoursesList from '../components/courses/CoursesList';
import Button from '../components/common/Button';
import { BookOpen, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CoursesPage() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <PageHeader
        greeting="Curated Curriculum"
        title="Courses & Modules"
        description="Smart, prioritized curriculum modules matched to your active competencies and learning path."
        badge="Curated Catalog"
        badgeVariant="coral"
        action={
          <Button
            variant="outline"
            size="sm"
            icon={Sparkles}
            onClick={() => navigate('/assessments')}
          >
            Take Skill Quiz
          </Button>
        }
      />

      <CoursesList />
    </MainLayout>
  );
}
