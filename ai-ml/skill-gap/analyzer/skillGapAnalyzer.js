/**
 * LearnPath AI — Skill Gap Analyzer Engine
 * Performs deterministic competency evaluations against target role benchmarks,
 * calculating weighted readiness percentages, gap priorities, and actionable suggestions.
 */

const {
  SKILL_BENCHMARKS,
  normalizeSkillName,
  findRoleBenchmark,
  getSupportedRoles
} = require('../data/skillBenchmarks');

/**
 * Sanitizes numeric and string skill levels into a bounded integer [0 - 100].
 * @param {any} raw
 * @returns {number}
 */
function sanitizeLevel(raw) {
  if (raw === null || raw === undefined) return 0;

  if (typeof raw === 'string') {
    const trimmed = raw.trim().toLowerCase();
    const parsedNum = parseFloat(trimmed);
    if (!isNaN(parsedNum)) {
      return Math.max(0, Math.min(100, Math.round(parsedNum)));
    }
    if (trimmed.includes('beginner') || trimmed.includes('novice') || trimmed.includes('foundational')) {
      return 30;
    }
    if (trimmed.includes('intermediate') || trimmed.includes('competent')) {
      return 60;
    }
    if (trimmed.includes('advanced') || trimmed.includes('proficient')) {
      return 85;
    }
    if (trimmed.includes('expert') || trimmed.includes('master')) {
      return 95;
    }
    return 0;
  }

  if (typeof raw === 'number') {
    if (isNaN(raw)) return 0;
    return Math.max(0, Math.min(100, Math.round(raw)));
  }

  return 0;
}

class SkillGapAnalyzer {
  /**
   * Evaluates user competencies against role benchmarks.
   *
   * @param {Object} input
   * @param {string} input.targetRole - Target career specialization
   * @param {Array<{name: string, level: number}>} [input.currentSkills] - User verified skills
   * @param {Array<{name: string, level: number}>} [input.skills] - Alternative key for user skills
   * @returns {Object} Deterministic skill gap report
   */
  analyze(input) {
    // 1. Defensive Input Validation
    if (input === undefined || input === null || typeof input !== 'object' || Array.isArray(input)) {
      return {
        success: false,
        error: {
          code: 'INVALID_INPUT',
          message: 'Input must be a valid JSON object.'
        },
        targetRole: 'Unspecified',
        overallReadiness: 0,
        readinessScore: 0,
        gaps: [],
        criticalGaps: [],
        strengths: [],
        skills: []
      };
    }

    const rawRole = String(input.targetRole || input.role || input.careerGoal || '').trim();
    if (!rawRole) {
      return {
        success: false,
        error: {
          code: 'MISSING_ROLE',
          message: 'Target role is required.'
        },
        targetRole: 'Unspecified',
        overallReadiness: 0,
        readinessScore: 0,
        gaps: [],
        criticalGaps: [],
        strengths: [],
        skills: []
      };
    }

    // 2. Resolve Role Benchmark
    const benchmark = findRoleBenchmark(rawRole);
    if (!benchmark) {
      return {
        success: false,
        isUnknownRole: true,
        error: {
          code: 'UNKNOWN_ROLE',
          message: 'No benchmark is available for the requested role.'
        },
        targetRole: rawRole,
        overallReadiness: 0,
        readinessScore: 0,
        warning: `Role '${rawRole}' is not in the standard taxonomy.`,
        statusSummary: `Role not found in standard taxonomy. Supported roles: ${getSupportedRoles().slice(0, 4).join(', ')}.`,
        gaps: [],
        criticalGaps: [],
        strengths: [],
        skills: [],
        supportedRoles: getSupportedRoles()
      };
    }

    // 3. Normalize User Skills Map
    const skillsList = Array.isArray(input.currentSkills)
      ? input.currentSkills
      : Array.isArray(input.skills)
        ? input.skills
        : [];

    const userSkillMap = new Map();
    for (const item of skillsList) {
      if (!item || typeof item !== 'object') continue;
      const rawName = String(item.name || item.skill || '').trim();
      if (!rawName) continue;

      const normName = normalizeSkillName(rawName);
      const rawLevel = item.level !== undefined
        ? item.level
        : (item.progress !== undefined
          ? item.progress
          : (item.score !== undefined ? item.score : item.proficiency));

      const validLevel = sanitizeLevel(rawLevel);

      // Keep highest level if multiple variations / aliases provided
      const normKey = normName.toLowerCase();
      const rawKey = rawName.toLowerCase();
      const prevNorm = userSkillMap.get(normKey) || 0;
      const prevRaw = userSkillMap.get(rawKey) || 0;
      const maxVal = Math.max(prevNorm, prevRaw, validLevel);

      userSkillMap.set(normKey, maxVal);
      userSkillMap.set(rawKey, maxVal);
    }

    // 4. Evaluate Every Benchmark Skill
    let totalWeightedCurrent = 0;
    let totalWeightedTarget = 0;

    const evaluatedGaps = [];
    const evaluatedStrengths = [];
    const allSkills = [];

    for (const bSkill of benchmark.skills) {
      const canonicalName = normalizeSkillName(bSkill.name);
      const normKey = canonicalName.toLowerCase();
      const rawKey = bSkill.name.toLowerCase();

      const isAssessed = userSkillMap.has(normKey) || userSkillMap.has(rawKey);
      const currentLevel = isAssessed
        ? Math.max(userSkillMap.get(normKey) ?? 0, userSkillMap.get(rawKey) ?? 0)
        : 0;

      const targetLevel = bSkill.targetLevel || 80;
      const weight = bSkill.weight || 1.0;
      const isCore = !!bSkill.isCore;
      const gap = Math.max(0, targetLevel - currentLevel);
      const gapPercentage = targetLevel > 0 ? Math.round((gap / targetLevel) * 100) : 0;

      // Accumulate Weighted Metrics
      const effectiveCurrent = Math.min(currentLevel, targetLevel);
      totalWeightedCurrent += effectiveCurrent * weight;
      totalWeightedTarget += targetLevel * weight;

      // Classify Priority
      let priority = 'none';
      if (gap === 0) {
        priority = 'none';
      } else if (gap >= 40 || (gap >= 25 && isCore)) {
        priority = 'critical';
      } else if (gap >= 25 || (gap >= 15 && isCore)) {
        priority = 'high';
      } else if (gap >= 10) {
        priority = 'medium';
      } else if (gap > 0) {
        priority = 'low';
      }

      // Classify Status
      let status = 'needs_improvement';
      if (gap === 0) {
        status = 'mastered';
      } else if (!isAssessed || currentLevel === 0) {
        status = 'missing';
      }

      const impactScore = gap * weight;
      const suggestion = bSkill.suggestion || `Focus on mastering ${bSkill.name} to reach the ${targetLevel}% proficiency target.`;

      const skillRecord = {
        skill: bSkill.name,
        name: bSkill.name,
        currentLevel,
        targetLevel,
        gap,
        gapPercentage,
        priority,
        status,
        isCore,
        isAssessed,
        category: bSkill.category || 'Technical',
        weight,
        impactScore,
        suggestion,
        improvementSuggestion: suggestion
      };

      allSkills.push(skillRecord);

      if (gap > 0) {
        evaluatedGaps.push(skillRecord);
      } else {
        evaluatedStrengths.push({
          skill: bSkill.name,
          name: bSkill.name,
          currentLevel,
          targetLevel,
          gap: 0,
          priority: 'none',
          status: 'mastered',
          isCore,
          category: bSkill.category || 'Technical',
          surplus: currentLevel - targetLevel
        });
      }
    }

    // 5. Sort Gaps by Impact Score Descending
    evaluatedGaps.sort((a, b) => b.impactScore - a.impactScore);

    // 6. Sort Strengths by Current Level Descending
    evaluatedStrengths.sort((a, b) => b.currentLevel - a.currentLevel);

    // 7. Calculate Deterministic Overall Readiness [0 - 100%]
    const overallReadiness = totalWeightedTarget > 0
      ? Math.max(0, Math.min(100, Math.round((totalWeightedCurrent / totalWeightedTarget) * 100)))
      : 0;

    // Readiness Tier
    let readinessTier = 'Foundational';
    if (overallReadiness >= 85) {
      readinessTier = 'Job Ready';
    } else if (overallReadiness >= 65) {
      readinessTier = 'Advanced';
    } else if (overallReadiness >= 40) {
      readinessTier = 'Intermediate';
    } else if (overallReadiness === 0) {
      readinessTier = 'Not Assessed';
    }

    // High Priority Gaps (Critical and High)
    const criticalGaps = evaluatedGaps.filter(g => g.priority === 'critical' || g.priority === 'high');

    // 8. Generate Structured Recommendations
    const recommendations = [];
    if (criticalGaps.length > 0) {
      const topGap = criticalGaps[0];
      recommendations.push({
        type: 'CRITICAL_BOTTLENECK',
        skill: topGap.name,
        message: `Prioritize ${topGap.name} (Current: ${topGap.currentLevel}%, Target: ${topGap.targetLevel}%). It is your highest impact competency gap for ${benchmark.role}.`,
        suggestedAction: 'ENROLL_MODULE'
      });
    }

    if (criticalGaps.length > 1) {
      const secondGap = criticalGaps[1];
      recommendations.push({
        type: 'SECONDARY_REINFORCEMENT',
        skill: secondGap.name,
        message: `Dedicate study sessions to ${secondGap.name} to close the ${secondGap.gap}% gap before advancing to complex architecture milestones.`,
        suggestedAction: 'TAKE_CHECKPOINT_QUIZ'
      });
    }

    if (evaluatedStrengths.length > 0) {
      recommendations.push({
        type: 'STRENGTH_LEVERAGE',
        skill: evaluatedStrengths[0].name,
        message: `Demonstrated mastery in ${evaluatedStrengths[0].name} (${evaluatedStrengths[0].currentLevel}%). Leverage this foundation to accelerate related modules.`,
        suggestedAction: 'FAST_TRACK_MODULE'
      });
    }

    return {
      success: true,
      targetRole: benchmark.role,
      overallReadiness,
      readinessScore: overallReadiness,
      readinessTier,
      statusSummary: `Evaluated against ${benchmark.role} benchmark. Readiness: ${overallReadiness}%.`,
      gaps: evaluatedGaps,
      criticalGaps,
      strengths: evaluatedStrengths,
      skills: allSkills,
      recommendations,
      summary: {
        totalRequiredSkills: benchmark.skills.length,
        userProvidedSkillsCount: skillsList.length,
        missingSkillsCount: evaluatedGaps.filter(g => g.status === 'missing').length,
        highPriorityGapsCount: criticalGaps.length
      }
    };
  }
}

module.exports = SkillGapAnalyzer;
