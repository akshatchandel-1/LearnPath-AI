/**
 * LearnPath AI — AI/ML Core Package
 * Master export interface for AI Learning Roadmap Generator, AI Assistant Engine,
 * Skill Gap Analysis Engine, and Recommendation Engine.
 */

// 1. Roadmap Generator & Recalibration Services (Member 4)
export {
  generateRoadmap,
  recalibrateRoadmap,
  RoadmapGenerator,
  ROLE_TEMPLATES,
  getRoleTemplate,
  SKILL_TAXONOMY,
  normalizeSkillName,
  getSkillMetadata
} from './roadmap/index.js';

// 2. AI Assistant & Chat Services (Member 4)
export {
  generateAssistantResponse,
  ChatEngine,
  ContextManager,
  BaseAIProvider,
  OfflineMockProvider,
  RemoteLLMProvider,
  SYSTEM_PROMPT,
  getSystemPrompt,
  getCareerPrompt,
  getCodingPrompt,
  getLearningPrompt,
  getInterviewPrompt,
  buildPromptForMessage
} from './assistant/index.js';

// 3. Skill Gap Analysis Services (Member 1 / Member 3)
export {
  analyzeSkillGaps,
  SkillGapAnalyzer,
  SKILL_BENCHMARKS,
  getRoleBenchmarks
} from './skill-gap/index.js';

// 4. Recommendation Engine Services (Member 1 / Member 3)
export {
  generateRecommendations,
  RecommendationEngine,
  RECOMMENDATION_CATALOG,
  normalizeCatalogSkill
} from './recommendation/index.js';
