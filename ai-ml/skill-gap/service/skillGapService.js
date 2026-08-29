/**
 * LearnPath AI — Skill Gap Service Interface
 * Exposes analyzeSkillGap and analyzeSkillGaps functions with defensive wrappers.
 */

const SkillGapAnalyzer = require('../analyzer/skillGapAnalyzer');

const defaultAnalyzer = new SkillGapAnalyzer();

/**
 * Analyzes skill gaps and computes weighted overall readiness against target role benchmarks.
 *
 * @param {Object} input
 * @param {string} input.targetRole - Target career role
 * @param {Array<{name: string, level: number}>} [input.currentSkills] - User verified skills
 * @param {Array<{name: string, level: number}>} [input.skills] - Alternative key for skills
 * @returns {Object} Structured skill gap analysis report
 */
function analyzeSkillGap(input) {
  try {
    return defaultAnalyzer.analyze(input);
  } catch (error) {
    console.error('[SkillGapService] Error in analyzeSkillGap:', error.message);
    return {
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: error.message
      },
      targetRole: (input && (input.targetRole || input.role)) || 'Unspecified',
      overallReadiness: 0,
      readinessScore: 0,
      gaps: [],
      criticalGaps: [],
      strengths: [],
      skills: []
    };
  }
}

/**
 * Plural alias for backward compatibility.
 * @param {Object} input
 * @returns {Object}
 */
function analyzeSkillGaps(input) {
  return analyzeSkillGap(input);
}

class SkillGapService {
  constructor(analyzer = defaultAnalyzer) {
    this.analyzer = analyzer;
  }

  analyze(input) {
    return this.analyzer.analyze(input);
  }
}

module.exports = {
  analyzeSkillGap,
  analyzeSkillGaps,
  SkillGapService,
  defaultAnalyzer
};
