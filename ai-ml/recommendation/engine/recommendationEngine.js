/**
 * LearnPath AI — Recommendation Engine
 * Deterministic multi-factor scoring model that prioritizes educational tracks based on
 * skill gap severity, role criticality, prerequisite satisfaction, and roadmap phase alignment.
 */

import { RECOMMENDATION_CATALOG, normalizeCatalogSkill } from '../data/recommendationCatalog.js';

export class RecommendationEngine {
  /**
   * Generates prioritized educational recommendations.
   *
   * @param {Object} input
   * @param {string} [input.targetRole] - Career specialization
   * @param {Array<{name: string, level: number}>} [input.currentSkills] - Verified user skills
   * @param {Array<Object>} [input.skillGaps] - Computed skill gaps
   * @param {Object} [input.learningContext] - Current phase and pacing telemetry
   * @param {Object} [input.roadmap] - Active learning roadmap
   * @returns {Object} Structured recommendations payload
   */
  generate(input = {}) {
    const rawRole = input && typeof input.targetRole === 'string' ? input.targetRole.trim() : 'Full Stack Developer';
    const targetRole = rawRole || 'Full Stack Developer';

    // 1. Build a fast skill level lookup map from currentSkills
    const skillLevelMap = new Map();
    if (input && Array.isArray(input.currentSkills)) {
      for (const item of input.currentSkills) {
        if (!item) continue;
        const name = item.name || item.skill || '';
        if (typeof name !== 'string' || !name.trim()) continue;

        const canonical = normalizeCatalogSkill(name);
        const rawLevel = item.level !== undefined ? item.level : (item.progress !== undefined ? item.progress : item.score);
        const parsed = Number(rawLevel);
        const validLevel = isNaN(parsed) ? 0 : Math.max(0, Math.min(100, Math.round(parsed)));

        const existing = skillLevelMap.get(canonical) || 0;
        skillLevelMap.set(canonical, Math.max(existing, validLevel));
      }
    }

    // 2. Also incorporate any pre-calculated skillGaps passed in
    const precomputedGaps = new Map();
    if (input && Array.isArray(input.skillGaps)) {
      for (const gapItem of input.skillGaps) {
        if (!gapItem) continue;
        const skillName = gapItem.skill || gapItem.name || '';
        if (typeof skillName === 'string' && skillName.trim()) {
          const canonical = normalizeCatalogSkill(skillName);
          const gapVal = Number(gapItem.gap);
          if (!isNaN(gapVal)) {
            precomputedGaps.set(canonical, Math.max(0, Math.min(100, gapVal)));
          }
        }
      }
    }

    const currentPhase = input && input.learningContext && Number(input.learningContext.currentPhase) || 1;

    // 3. Score all available catalog items
    const scoredList = [];

    for (const item of RECOMMENDATION_CATALOG) {
      const canonicalSkill = normalizeCatalogSkill(item.skill);
      const currentLevel = skillLevelMap.get(canonicalSkill) !== undefined
        ? skillLevelMap.get(canonicalSkill)
        : (skillLevelMap.get(item.skill) || 0);

      // Derive gap value
      let gap = precomputedGaps.get(canonicalSkill) !== undefined
        ? precomputedGaps.get(canonicalSkill)
        : Math.max(0, 80 - currentLevel); // Default benchmark 80%

      // Role Relevance Multiplier
      let roleWeight = 1.0;
      const lowerRole = targetRole.toLowerCase();
      if (lowerRole.includes('mern') && ['javascript', 'react', 'node.js', 'mongodb'].includes(canonicalSkill.toLowerCase())) {
        roleWeight = 1.4;
      } else if (lowerRole.includes('frontend') && ['javascript', 'react', 'typescript', 'html & css'].includes(canonicalSkill.toLowerCase())) {
        roleWeight = 1.4;
      } else if (lowerRole.includes('backend') && ['node.js', 'sql & relational databases', 'mongodb'].includes(canonicalSkill.toLowerCase())) {
        roleWeight = 1.4;
      } else if (lowerRole.includes('data') && ['python', 'pandas & numpy', 'machine learning (scikit-learn)'].includes(canonicalSkill.toLowerCase())) {
        roleWeight = 1.4;
      } else if (lowerRole.includes('machine learning') && ['python', 'deep learning (pytorch/tensorflow)', 'machine learning (scikit-learn)'].includes(canonicalSkill.toLowerCase())) {
        roleWeight = 1.4;
      } else if (lowerRole.includes('cloud') && ['aws (or azure/gcp)', 'docker & containerization', 'kubernetes cluster management'].includes(canonicalSkill.toLowerCase())) {
        roleWeight = 1.4;
      }

      // Check prerequisites readiness
      let prereqsSatisfied = true;
      let missingPrereqNames = [];
      if (Array.isArray(item.prerequisites) && item.prerequisites.length > 0) {
        for (const prereq of item.prerequisites) {
          const normPrereq = normalizeCatalogSkill(prereq);
          const prereqLevel = skillLevelMap.get(normPrereq) || 0;
          if (prereqLevel < 50) { // Prerequisite requires at least foundational mastery (50%)
            prereqsSatisfied = false;
            missingPrereqNames.push(prereq);
          }
        }
      }

      // Multi-factor Deterministic Priority Score:
      // - Gap severity (x1.4)
      // - Role relevance weight (x25)
      // - Prerequisite readiness bonus (+15 if met, -30 if blocked by foundational missing skills)
      // - Mastery penalty if already high mastery (currentLevel >= 80)
      const gapScore = gap * 1.4;
      const roleScore = roleWeight * 25;
      const prereqScore = prereqsSatisfied ? 15 : -30;
      const masteryPenalty = currentLevel >= 80 ? 50 : (currentLevel >= 60 ? 20 : 0);

      const priorityScore = Math.round(gapScore + roleScore + prereqScore - masteryPenalty);

      // Determine Priority Tier
      let priority = 'MEDIUM';
      if (priorityScore >= 80 && prereqsSatisfied) {
        priority = 'CRITICAL';
      } else if (priorityScore >= 55) {
        priority = 'HIGH';
      } else if (priorityScore < 25 || currentLevel >= 80) {
        priority = 'LOW';
      }

      // Generate explainable reason
      let reason = '';
      if (!prereqsSatisfied) {
        reason = `Recommended track for ${targetRole}, but prioritize foundational prerequisite (${missingPrereqNames.join(', ')}) first.`;
      } else if (gap >= 40 && roleWeight > 1.0) {
        reason = `Large competency gap of ${gap}% in core ${targetRole} requirement (${item.skill}). Highest impact for Phase ${currentPhase}.`;
      } else if (gap > 0 && roleWeight > 1.0) {
        reason = `Core specialization requirement for ${targetRole}. Recommended to reach production benchmark.`;
      } else if (currentLevel >= 80) {
        reason = `Competency target achieved (${currentLevel}%). Recommended for advanced architectural reference and best practices.`;
      } else {
        reason = `Broadens engineering competencies for ${targetRole} with hands-on practice.`;
      }

      scoredList.push({
        id: item.id,
        title: item.title,
        type: item.type || 'COURSE',
        skill: item.skill,
        category: item.category || 'General',
        difficulty: item.difficulty || 'Intermediate',
        estimatedHours: item.estimatedHours || 10,
        currentMastery: currentLevel,
        gap,
        priority,
        priorityScore,
        prerequisites: item.prerequisites || [],
        prerequisitesSatisfied: prereqsSatisfied,
        reason,
        suggestedAction: {
          type: 'ADD_TO_PATH',
          skill: item.skill,
          estimatedHours: item.estimatedHours || 10,
          action: 'ENROLL_MODULE'
        },
        resources: Array.isArray(item.resources) ? item.resources : []
      });
    }

    // 4. Sort strictly by priorityScore descending
    scoredList.sort((a, b) => b.priorityScore - a.priorityScore);

    return {
      targetRole,
      totalRecommendations: scoredList.length,
      recommendations: scoredList
    };
  }
}
