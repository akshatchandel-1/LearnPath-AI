import React from 'react';
import MainLayout from '../layouts/MainLayout';
import PageHeader from '../components/common/PageHeader';
import AIChatInterface from '../components/aiAssistant/AIChatInterface';

export default function AIAssistantPage() {
  return (
    <MainLayout>
      <PageHeader
        greeting="Real-Time AI Tutor"
        title="AI Assistant"
        description="Your 24/7 dedicated AI engineering mentor for code explanation, debugging, conceptual breakthroughs, and path advisory."
        badge="Gemini 1.5 Pro & Claude 3.5"
        badgeVariant="coral"
      />

      <AIChatInterface />
    </MainLayout>
  );
}
