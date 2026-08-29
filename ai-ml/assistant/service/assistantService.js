/**
 * LearnPath AI — Assistant Service Layer
 * Exposes clean, validated function: generateAssistantResponse(input).
 */

import { ChatEngine } from '../chat/chatEngine.js';
import { OfflineMockProvider, RemoteLLMProvider } from './providerAdapter.js';

// Default singleton chat engine instance
const defaultProvider = new OfflineMockProvider();
const defaultEngine = new ChatEngine(defaultProvider);

/**
 * Generates an AI mentor response based on user message and active learning context.
 *
 * @param {Object} input
 * @param {string} input.message - User prompt / question
 * @param {string} [input.targetRole] - Target career goal
 * @param {Array<{name: string, level: number}>} [input.currentSkills] - Existing skill list
 * @param {Object} [input.learningContext] - Current roadmap phase / study data
 * @param {Object} [options]
 * @param {Object} [options.provider] - Custom provider override
 * @returns {Promise<{response: string, relatedTopics: string[], suggestedActions: string[]}>}
 */
export const generateAssistantResponse = async (input = {}, options = {}) => {
  try {
    const engine = options.provider ? new ChatEngine(options.provider) : defaultEngine;
    return await engine.processMessage(input);
  } catch (error) {
    console.error('[AssistantService] Error:', error.message);
    return {
      response: `I am here to guide your engineering progress. Please let me know what technical concept, interview topic, or roadmap step you would like to explore.`,
      relatedTopics: ['Engineering Fundamentals', 'Roadmap Navigation', 'Assessment Preparation'],
      suggestedActions: ['Ask a technical question', 'Review your roadmap in Learning Path']
    };
  }
};
