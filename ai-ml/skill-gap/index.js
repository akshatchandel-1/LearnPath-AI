/**
 * LearnPath AI — Skill Gap Analysis Engine Entry Point
 * Exports public analyzeSkillGap / analyzeSkillGaps APIs, SkillGapAnalyzer class,
 * benchmark datasets, and normalizer utilities.
 */

const {
  analyzeSkillGap,
  analyzeSkillGaps,
  SkillGapService
} = require('./service/skillGapService');

const SkillGapAnalyzer = require('./analyzer/skillGapAnalyzer');

const {
  SKILL_BENCHMARKS,
  normalizeSkillName,
  findRoleBenchmark,
  getRoleBenchmarks,
  getSupportedRoles
} = require('./data/skillBenchmarks');

module.exports = {
  analyzeSkillGap,
  analyzeSkillGaps,
  SkillGapAnalyzer,
  SkillGapService,
  SKILL_BENCHMARKS,
  normalizeSkillName,
  findRoleBenchmark,
  getRoleBenchmarks,
  getSupportedRoles
};
