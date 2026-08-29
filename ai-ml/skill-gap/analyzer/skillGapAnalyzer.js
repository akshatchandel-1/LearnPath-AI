/**
 * LearnPath AI — Skill Gap Analysis Engine
 * Evaluates verified competencies against role benchmarks, computes explainable readiness scores,
 * and identifies critical learning bottlenecks without inventing user data.
 */

import { getRoleBenchmarks, normalizeSkillName } from '../data/skillBenchmarks.js';

export class SkillGapAnalyzer {
  /**
   * Performs deterministic gap analysis between user skills and role target benchmarks.
   *
   * @param {Object} input
   * @param {string} [input.targetRole] - Target career specialization
   * @param {Array<{name: string, level: number}>} [input.currentSkills] - User verified skills
   * @param {Object} [input.userProfile] - Optional user metadata
   * @param {Array} [input.assessmentHistory] - Optional quiz/assessment history
   * @returns {Object} Structured skill gap report
   */
  analyze(input = {}) {
    const rawRole = input && typeof input.targetRole === 'string' ? input.targetRole.trim() : 'Full Stack Developer';
    const targetRole = rawRole || 'Full Stack Developer';
    const benchmarkData = getRoleBenchmarks(targetRole);

    // 1. Build a normalized lookup map of user verified skills
    const userSkillMap = new Map();
    if (input && Array.isArray(input.currentSkills)) {
      for (const item of input.currentSkills) {
        if (!item) continue;
        const rawName = item.name || item.skill || '';
        if (typeof rawName !== 'string' || !rawName.trim()) continue;

        const canonicalName = normalizeSkillName(rawName);
        const rawLevel = item.level !== undefined ? item.level : (item.progress !== undefined ? item.progress : item.score);
        const parsedLevel = Number(rawLevel);
        const validLevel = isNaN(parsedLevel) ? 0 : Math.max(0, Math.min(100, Math.round(parsedLevel)));

        // Keep highest verified level if duplicate aliases provided
        const existing = userSkillMap.get(canonicalName) || 0;
        userSkillMap.set(canonicalName, Math.max(existing, validLevel));
      }
    }

    // 2. Evaluate each skill in the benchmark
    let totalWeightedCurrent = 0;
    let totalWeightedTarget = 0;

    const evaluatedSkills = [];
    const criticalGaps = [];
    const strengths = [];

    for (const benchmark of benchmarkData.skills) {
      const canonicalName = normalizeSkillName(benchmark.name);
      const isAssessed = userSkillMap.has(canonicalName) || userSkillMap.has(benchmark.name);
      const currentLevel = userSkillMap.get(canonicalName) !== undefined
        ? userSkillMap.get(canonicalName)
        : (userSkillMap.get(benchmark.name) || 0);

      const targetLevel = benchmark.targetLevel || 80;
      const weight = benchmark.weight || 1.0;
      const isCore = !!benchmark.isCore;
      const gap = Math.max(0, targetLevel - currentLevel);

      // Accumulate weighted readiness metrics
      const effectiveCurrent = Math.min(currentLevel, targetLevel);
      totalWeightedCurrent += effectiveCurrent * weight;
      totalWeightedTarget += targetLevel * weight;

      // Determine priority level
      let priority = 'NONE';
      if (gap >= 40 || (gap >= 25 && isCore)) {
        priority = 'CRITICAL';
      } else if (gap >= 25 || (gap >= 15 && isCore)) {
        priority = 'HIGH';
      } else if (gap >= 10) {
        priority = 'MEDIUM';
      } else if (gap > 0) {
        priority = 'LOW';
      }

      const skillRecord = {
        name: benchmark.name,
        currentLevel,
        targetLevel,
        gap,
        priority,
        category: benchmark.category || 'Technical',
        isCore,
        isAssessed,
        prerequisites: Array.isArray(benchmark.prerequisites) ? benchmark.prerequisites : []
      };

      evaluatedSkills.push(skillRecord);

      // Categorize into critical gaps or strengths
      if (priority === 'CRITICAL' || priority === 'HIGH') {
        criticalGaps.push({
          name: benchmark.name,
          currentLevel,
          targetLevel,
          gap,
          priority,
          category: benchmark.category,
          impactScore: gap * weight
        });
      } else if (gap === 0) {
        strengths.push({
          name: benchmark.name,
          currentLevel,
          targetLevel,
          surplus: currentLevel - targetLevel,
          category: benchmark.category
        });
      }
    }

    // Sort critical gaps by impact score descending
    criticalGaps.sort((a, b) => b.impactScore - a.impactScore);

    // Sort strengths by currentLevel descending
    strengths.sort((a, b) => b.currentLevel - a.currentLevel);

    // 3. Compute explainable Readiness Score [0 - 100%]
    const readinessScore = totalWeightedTarget > 0
      ? Math.max(0, Math.min(100, Math.round((totalWeightedCurrent / totalWeightedTarget) * 100)))
      : 0;

    // 4. Generate structured high-level recommendations
    const recommendations = [];
    if (criticalGaps.length > 0) {
      const topBottleneck = criticalGaps[0];
      recommendations.push({
        type: 'CRITICAL_BOTTLENECK',
        skill: topBottleneck.name,
        message: `Prioritize ${topBottleneck.name} (Current: ${topBottleneck.currentLevel}%, Target: ${topBottleneck.targetLevel}%). It is your highest disparity core competency for ${targetRole}.`,
        suggestedAction: 'ENROLL_MODULE'
      });
    }

    if (criticalGaps.length > 1) {
      const secondGap = criticalGaps[1];
      recommendations.push({
        type: 'SECONDARY_REINFORCEMENT',
        skill: secondGap.name,
        message: `Schedule dedicated study hours for ${secondGap.name} to close the ${secondGap.gap}% gap before advancing to capstone modules.`,
        suggestedAction: 'TAKE_CHECKPOINT_QUIZ'
      });
    }

    if (strengths.length > 0) {
      recommendations.push({
        type: 'STRENGTH_LEVERAGE',
        skill: strengths[0].name,
        message: `Strong mastery demonstrated in ${strengths[0].name} (${strengths[0].currentLevel}%). Fast-track introductory lessons to focus on advanced architecture.`,
        suggestedAction: 'FAST_TRACK_MODULE'
      });
    }

    return {
      targetRole: benchmarkData.role || targetRole,
      readinessScore,
      skills: evaluatedSkills,
      criticalGaps: criticalGaps.map(({ impactScore, ...rest }) => rest),
      strengths,
      recommendations
    };
  }
}
