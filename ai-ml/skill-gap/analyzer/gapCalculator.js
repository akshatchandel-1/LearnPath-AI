/**
 * LearnPath AI - Gap Calculator
 * Core mathematical engine for assessing individual and aggregate skill gaps against role benchmarks.
 */

const { normalizeSkillName } = require('../data/skillsTaxonomy');
const { calculateOverallReadiness } = require('./readinessScorer');
const { generateImprovementSuggestion } = require('./suggestionEngine');

/**
 * Sanitizes input skill level value to a safe integer between 0 and 100.
 * @param {any} rawLevel
 * @returns {number}
 */
function sanitizeLevel(rawLevel) {
  if (typeof rawLevel === 'number') {
    if (isNaN(rawLevel)) return 0;
    return Math.max(0, Math.min(100, Math.round(rawLevel)));
  }

  if (typeof rawLevel === 'string') {
    const trimmed = rawLevel.trim().toLowerCase();
    if (trimmed === 'beginner' || trimmed === 'basic') return 30;
    if (trimmed === 'intermediate' || trimmed === 'medium') return 60;
    if (trimmed === 'advanced' || trimmed === 'expert') return 85;
    if (trimmed === 'mastered') return 100;

    const parsed = parseFloat(trimmed);
    if (!isNaN(parsed)) {
      return Math.max(0, Math.min(100, Math.round(parsed)));
    }
  }

  return 0;
}

/**
 * Calculates detailed gaps for a given role and list of user skills.
 * @param {object} roleDefinition
 * @param {Array<{ name: string, level: number }>} currentSkills
 * @returns {object} Detailed gap calculation report
 */
function calculateGapsForRole(roleDefinition, currentSkills = []) {
  if (!roleDefinition || !Array.isArray(roleDefinition.requiredSkills)) {
    throw new Error('Invalid role definition provided for gap calculation.');
  }

  // 1. Build normalized user skill lookup map
  const userSkillMap = new Map();
  const rawSkillLookup = new Map();

  if (Array.isArray(currentSkills)) {
    currentSkills.forEach(item => {
      if (!item || typeof item !== 'object') return;
      const rawName = String(item.name || item.skill || '').trim();
      if (!rawName) return;

      const normalized = normalizeSkillName(rawName);
      const level = sanitizeLevel(item.level !== undefined ? item.level : item.proficiency);

      // Keep the highest level if duplicates are passed
      const currentHighest = userSkillMap.get(normalized) || 0;
      if (level >= currentHighest) {
        userSkillMap.set(normalized, level);
        rawSkillLookup.set(normalized, rawName);
      }
    });
  }

  const gapItems = [];
  const evaluatedForReadiness = [];
  let totalMissingSkills = 0;
  let totalHighPriorityGaps = 0;

  // 2. Evaluate each required skill in role taxonomy
  for (const req of roleDefinition.requiredSkills) {
    const normReqName = normalizeSkillName(req.name);
    const currentLevel = userSkillMap.has(normReqName) ? userSkillMap.get(normReqName) : 0;
    const targetLevel = req.targetLevel || 80;
    const importance = req.importance || 1.0;
    const isCore = !!req.isCore;

    const rawGap = Math.max(0, targetLevel - currentLevel);
    const gapPercentage = Math.min(100, Math.round((rawGap / targetLevel) * 100));

    let priority = 'low';
    let status = 'proficient';

    if (rawGap === 0) {
      priority = 'none';
      status = 'mastered';
    } else if (currentLevel === 0) {
      priority = 'high';
      status = 'missing';
      totalMissingSkills++;
      totalHighPriorityGaps++;
    } else if (rawGap >= 40 || (isCore && rawGap >= 25)) {
      priority = 'high';
      status = 'needs_improvement';
      totalHighPriorityGaps++;
    } else if (rawGap >= 20) {
      priority = 'medium';
      status = 'needs_improvement';
    } else {
      priority = 'low';
      status = 'proficient';
    }

    const suggestion = generateImprovementSuggestion(
      req.name,
      currentLevel,
      targetLevel,
      priority,
      req.suggestions
    );

    const gapRecord = {
      skill: req.name,
      currentLevel,
      targetLevel,
      gap: rawGap,
      gapPercentage,
      priority,
      status,
      isCore,
      importance,
      improvementSuggestion: suggestion,
    };

    gapItems.push(gapRecord);
    evaluatedForReadiness.push({
      currentLevel,
      targetLevel,
      importance,
      isCore,
    });
  }

  // 3. Compute overall weighted readiness
  const readinessResult = calculateOverallReadiness(evaluatedForReadiness);

  // 4. Sort gaps: High priority first, then descending by gap magnitude
  const priorityWeight = { high: 3, medium: 2, low: 1, none: 0 };
  gapItems.sort((a, b) => {
    const pDiff = (priorityWeight[b.priority] || 0) - (priorityWeight[a.priority] || 0);
    if (pDiff !== 0) return pDiff;
    return b.gap - a.gap;
  });

  return {
    targetRole: roleDefinition.displayName,
    roleCategory: roleDefinition.category,
    overallReadiness: readinessResult.overallReadiness,
    readinessTier: readinessResult.readinessTier,
    statusSummary: readinessResult.statusSummary,
    coreSkillsMetrics: readinessResult.coreSkillsMetrics,
    gaps: gapItems,
    summary: {
      totalRequiredSkills: roleDefinition.requiredSkills.length,
      userProvidedSkillsCount: userSkillMap.size,
      missingSkillsCount: totalMissingSkills,
      highPriorityGapsCount: totalHighPriorityGaps,
    },
  };
}

module.exports = {
  sanitizeLevel,
  calculateGapsForRole,
};
