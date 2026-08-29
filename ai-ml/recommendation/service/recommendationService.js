/**
 * LearnPath AI - Recommendation Service Layer
 * Public service interface for generating AI-powered course and skill recommendations.
 */

const RecommendationEngine = require('../engine/recommendationEngine');

const recommendationEngineInstance = new RecommendationEngine();

/**
 * Generates personalized course and skill recommendations based on learner profile and role gaps.
 *
 * @param {object} input - Input containing targetRole, skills, completedCourses, learningPreferences
 * @returns {object} JSON-compatible recommendation output
 */
function generateRecommendations(input) {
  try {
    return recommendationEngineInstance.generate(input);
  } catch (error) {
    return {
      error: `Recommendation generation failed: ${error.message}`,
      targetRole: (input && input.targetRole) || 'Unknown',
      recommendations: [],
    };
  }
}

module.exports = {
  generateRecommendations,
  RecommendationEngine,
};
