/**
 * LearnPath AI - Recommendation Engine Module Entry Point
 * Exposes generateRecommendations(input) and RecommendationEngine class.
 */

const { generateRecommendations, RecommendationEngine } = require('./service/recommendationService');
const { COURSES_CATALOG } = require('./data/coursesData');
const { getCoursesForSkills } = require('./data/roleCourseMapping');

module.exports = {
  generateRecommendations,
  RecommendationEngine,
  COURSES_CATALOG,
  getCoursesForSkills,
};
