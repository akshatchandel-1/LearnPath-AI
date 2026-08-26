import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import PageHeader from '../components/common/PageHeader';
import EmptyState from '../components/common/EmptyState';
import AIChatInterface from '../components/aiAssistant/AIChatInterface';
import Button from '../components/common/Button';
import { Bot } from 'lucide-react';

/**
 * Member 4 Feature Page: AI Assistant
 * Route: /ai-assistant
 * Ownership: Member 4 (feature/member-4)
 */
export default function AIAssistantPage() {
  const [viewMode, setViewMode] = useState('preview');

  return (
    <MainLayout>
      <PageHeader
        title="AI Assistant"
        description="24/7 intelligent AI tutor to clarify difficult concepts, review code, and provide personalized study coaching."
        badge="Member 4"
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
        <AIChatInterface />
      ) : (
        <EmptyState
          title="AI Assistant Module"
          description="AI Assistant module will be fully implemented here by Member 4."
          memberBadge="Assigned: Member 4"
          branchName="feature/member-4"
          icon={Bot}
          plannedFeatures={[
            'Streaming conversational AI interface (Gemini / Claude / OpenAI)',
            'Context-aware answers referencing the user roadmap and gaps',
            'Pre-populated quick prompt chips (e.g. explain concepts, test prep)',
            'Chat history persistence and code snippet syntax formatting',
          ]}
          onActionClick={() => setViewMode('preview')}
          actionText="Switch to Interactive Skeleton"
        />
      )}
    </MainLayout>
  );
}
