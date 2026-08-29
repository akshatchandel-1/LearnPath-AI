/**
 * LearnPath AI - Recommendation Engine Orchestrator
 * End-to-end generation of personalized course recommendations based on role benchmarks and skill gap reports.
 */

const { COURSES_CATALOG } = require('../data/coursesData');
const { rankAndEnrichRecommendations } = require('./rankingEngine');
const SkillGapAnalyzer = require('../../skill-gap/analyzer/skillGapAnalyzer');

class RecommendationEngine {
  constructor(customCatalog = null) {
    this.catalog = Array.isArray(customCatalog) ? customCatalog : COURSES_CATALOG;
    this.gapAnalyzer = new SkillGapAnalyzer();
  }

  /**
   * Generates ranked, personalized recommendations for a user.
   *
   * @param {object} input
   * @param {string} input.targetRole - Target career goal
   * @param {Array<{ name: string, level: number }>} [input.skills] - User skills
   * @param {Array<{ name: string, level: number }>} [input.currentSkills] - Alternative user skills key
   * @param {Array<string|object>} [input.completedCourses] - Previously completed courses
   * @param {object} [input.learningPreferences] - Style/difficulty preferences
   * @param {number} [input.limit=6] - Number of recommendations to produce
   * @returns {object} Standardized recommendation output
   */
  generate(input = {}) {
    // 1. Input defensive validation
    if (!input || typeof input !== 'object' || Array.isArray(input)) {
      return {
        error: 'Invalid input format. Expected a JSON object.',
        targetRole: 'Unknown',
        recommendations: [],
      };
    }

    const targetRole = String(input.targetRole || input.role || input.careerGoal || '').trim();
    if (!targetRole) {
      return {
        error: 'Missing required parameter: targetRole.',
        targetRole: 'Unspecified',
        recommendations: [],
      };
    }

    const skills = Array.isArray(input.skills)
      ? input.skills
      : Array.isArray(input.currentSkills)
        ? input.currentSkills
        : [];

    const completedCourses = Array.isArray(input.completedCourses) ? input.completedCourses : [];
    const learningPreferences = input.learningPreferences && typeof input.learningPreferences === 'object'
      ? input.learningPreferences
      : {};
    const limit = typeof input.limit === 'number' && input.limit > 0 ? Math.min(20, input.limit) : 6;

    // 2. Perform Skill Gap Analysis
    const skillGapReport = this.gapAnalyzer.analyze({
      targetRole,
      currentSkills: skills,
    });

    // 3. Rank and enrich candidate courses
    const rankedRecs = rankAndEnrichRecommendations(
      this.catalog,
      skillGapReport,
      completedCourses,
      learningPreferences,
      skills,
      limit
    );

    // 4. Extract targeted gaps
    const targetedGaps = Array.from(
      new Set(
        rankedRecs.flatMap(r => r.skills || [])
      )
    );

    return {
      targetRole: skillGapReport.targetRole || targetRole,
      overallReadiness: skillGapReport.overallReadiness !== undefined ? skillGapReport.overallReadiness : 0,
      readinessTier: skillGapReport.readinessTier || 'Foundational',
      recommendations: rankedRecs,
      metadata: {
        totalEvaluated: this.catalog.length,
        returnedCount: rankedRecs.length,
        targetedGaps,
        completedExcludedCount: completedCourses.length,
      },
    };
  }
}

module.exports = RecommendationEngine;
