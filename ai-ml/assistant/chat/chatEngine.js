/**
 * LearnPath AI — Assistant Chat Engine
 * Coordinates intent classification, context normalization, prompt building, and provider execution.
 */

import { ContextManager } from '../context/contextManager.js';
import { buildPromptForMessage, getSystemPrompt } from '../prompts/index.js';
import { OfflineMockProvider, RemoteLLMProvider } from '../service/providerAdapter.js';

export class ChatEngine {
  constructor(provider = new OfflineMockProvider()) {
    this.provider = provider;
  }

  /**
   * Processes a user chat interaction and returns a structured AI mentor response.
   *
   * @param {Object} input
   * @param {string} input.message - User prompt or question
   * @param {string} [input.targetRole] - Active target role
   * @param {Array<{name: string, level: number}>} [input.currentSkills] - Existing skills
   * @param {Array<Object|string>} [input.skillGaps] - Known skill gaps
   * @param {Object} [input.learningContext] - User's active phase/study metrics
   * @param {Object} [input.userMetrics] - Live user telemetry (courses, XP, streak, lessons)
   * @returns {Promise<{response: string, relatedTopics: string[], suggestedActions: Array}>}
   */
  async processMessage(input = {}) {
    // 1. Sanitize & Normalize User Message
    const rawMessage = input.message;
    if (!rawMessage || typeof rawMessage !== 'string' || !rawMessage.trim()) {
      return {
        response: `Hello! I am your 24/7 AI Learning Path Mentor. You can ask me any technical question, skill gap analysis, interview preparation tip, or progress metric. How can I assist your engineering journey today?`,
        relatedTopics: ['Curriculum Pacing', 'Skill Gap Remediation', 'Interview Prep', 'Progress Metrics'],
        suggestedActions: [
          { label: 'Ask: "I am weak in JavaScript. What should I study?"', action: 'SEND_PROMPT', payload: { prompt: 'I am weak in JavaScript. What should I study?' } },
          { label: 'Ask: "How many courses have I completed?"', action: 'SEND_PROMPT', payload: { prompt: 'How many courses have I completed?' } },
          { label: 'Ask: "Explain React hooks with an example"', action: 'SEND_PROMPT', payload: { prompt: 'Explain React hooks with an example' } },
          { label: 'Ask: "How should I prepare for a backend interview?"', action: 'SEND_PROMPT', payload: { prompt: 'How should I prepare for a backend interview?' } }
        ]
      };
    }

    const message = rawMessage.trim();

    // 2. Normalize Context
    const normalizedContext = ContextManager.normalizeContext(input);

    // 3. Build Enriched Prompt Metadata & Intent Classification
    const promptPayload = buildPromptForMessage({
      message,
      targetRole: normalizedContext.targetRole,
      currentSkills: normalizedContext.currentSkills,
      learningContext: normalizedContext.learningContext,
      userMetrics: normalizedContext.userMetrics
    });

    // 4. Delegate Generation to Pluggable Provider
    try {
      const result = await this.provider.generate({
        message,
        targetRole: normalizedContext.targetRole,
        currentSkills: normalizedContext.currentSkills,
        skillGaps: normalizedContext.skillGaps,
        learningContext: normalizedContext.learningContext,
        userMetrics: normalizedContext.userMetrics,
        intent: promptPayload.intent,
        metricType: promptPayload.metricType,
        targetSkill: promptPayload.targetSkill
      });

      return {
        response: result.response || 'I am ready to help you with technical concepts and learning pathways.',
        relatedTopics: Array.isArray(result.relatedTopics) ? result.relatedTopics : [],
        suggestedActions: Array.isArray(result.suggestedActions) ? result.suggestedActions : []
      };
    } catch (error) {
      console.error('[ChatEngine] Generation error:', error.message);
      return {
        response: `I encountered an issue processing your request. In the meantime, you can explore the Courses catalog or test your knowledge in the Assessments section.`,
        relatedTopics: ['System Recovery', 'Curriculum Tracks'],
        suggestedActions: [
          { label: 'Explore Courses Catalog', action: 'NAVIGATE_COURSES', payload: {} },
          { label: 'Take an Assessment', action: 'NAVIGATE_ASSESSMENTS', payload: {} }
        ]
      };
    }
  }
}
