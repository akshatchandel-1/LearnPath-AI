/**
 * LearnPath AI — Recommendation Service
 * Public interface exposing generateRecommendations(input) function.
 */

import { RecommendationEngine } from '../engine/recommendationEngine.js';

const defaultEngine = new RecommendationEngine();

/**
 * Generates personalized, prioritized educational recommendations.
 *
 * @param {Object} input
 * @param {string} [input.targetRole] - Target career role
 * @param {Array<{name: string, level: number}>} [input.currentSkills] - User verified skills
 * @param {Array<Object>} [input.skillGaps] - Calculated skill gaps
 * @param {Object} [input.learningContext] - Current roadmap phase and hours
 * @param {Object} [input.roadmap] - Optional roadmap instance
 * @returns {Object} Structured recommendations payload
 */
export function generateRecommendations(input = {}) {
  try {
    const safeInput = input && typeof input === 'object' ? input : {};
    return defaultEngine.generate(safeInput);
  } catch (error) {
    console.error('[RecommendationService] Error in generateRecommendations:', error.message);
    return {
      targetRole: (input && input.targetRole) || 'Full Stack Developer',
      totalRecommendations: 0,
      recommendations: []
    };
  }
}
