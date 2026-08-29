import React from 'react';
import MainLayout from '../layouts/MainLayout';
import PageHeader from '../components/common/PageHeader';
import AIChatInterface from '../components/aiAssistant/AIChatInterface';

/**
 * Member 4 Feature Page: AI Assistant
 * Route: /ai-assistant
 */
export default function AIAssistantPage() {
  return (
    <MainLayout>
      <PageHeader
        greeting="24/7 Intelligent Tutor"
        title="AI Assistant & Mentor"
        description="Clarify difficult concepts, review code, and receive real-time personalized study coaching tailored to your learning path."
        badge="Active AI Mentor"
        badgeVariant="coral"
      />

      <AIChatInterface />
    </MainLayout>
  );
}
