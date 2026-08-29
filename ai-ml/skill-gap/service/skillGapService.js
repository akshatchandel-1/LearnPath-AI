/**
 * LearnPath AI — Skill Gap Service
 * Public interface exposing analyzeSkillGaps(input) function.
 */

import { SkillGapAnalyzer } from '../analyzer/skillGapAnalyzer.js';

const defaultAnalyzer = new SkillGapAnalyzer();

/**
 * Analyzes skill gaps and computes readiness score based on target role and user verified competencies.
 *
 * @param {Object} input
 * @param {string} [input.targetRole] - Target engineering specialization
 * @param {Array<{name: string, level: number}>} [input.currentSkills] - User verified skills
 * @param {Object} [input.userProfile] - Optional user metadata
 * @param {Array} [input.assessmentHistory] - Optional assessment history
 * @returns {Object} Structured skill gap report
 */
export function analyzeSkillGaps(input = {}) {
  try {
    const safeInput = input && typeof input === 'object' ? input : {};
    return defaultAnalyzer.analyze(safeInput);
  } catch (error) {
    console.error('[SkillGapService] Error in analyzeSkillGaps:', error.message);
    return {
      targetRole: (input && input.targetRole) || 'Full Stack Developer',
      readinessScore: 0,
      skills: [],
      criticalGaps: [],
      strengths: [],
      recommendations: []
    };
  }
}
