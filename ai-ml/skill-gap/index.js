/**
 * LearnPath AI — Skill Gap Analysis Package
 * Exports clean API function: analyzeSkillGaps, SkillGapAnalyzer, and benchmark taxonomy helpers.
 */

export { analyzeSkillGaps } from './service/skillGapService.js';
export { SkillGapAnalyzer } from './analyzer/skillGapAnalyzer.js';
export {
  SKILL_BENCHMARKS,
  getRoleBenchmarks,
  normalizeSkillName
} from './data/skillBenchmarks.js';
