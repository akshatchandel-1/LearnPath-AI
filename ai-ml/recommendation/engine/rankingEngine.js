/**
 * LearnPath AI - Ranking & Recommendation Engine
 * Deduplication, diversity filtering, priority tagging, and transparent explainability synthesis.
 */

const { normalizeSkillName } = require('../../skill-gap/data/skillsTaxonomy');
const { scoreCourse } = require('./contentScorer');

/**
 * Generates an informative, transparent explanation for why this recommendation was selected.
 *
 * @param {object} course - Recommended course
 * @param {object} topGap - Highest priority skill gap addressed
 * @param {string} targetRole - Target career role
 * @param {number} finalScore - Composite score
 * @returns {string} Human-readable reason string
 */
function generateRecommendationReason(course, topGap, targetRole, finalScore) {
  if (topGap && topGap.gap > 0) {
    const current = topGap.currentLevel || 0;
    const target = topGap.targetLevel || 80;
    const gap = topGap.gap;

    if (current === 0) {
      return `Critical missing foundation in ${topGap.skill}. Essential for ${targetRole} to bridge a ${gap}% benchmark gap.`;
    }

    if (topGap.priority === 'high') {
      return `Directly targets your major ${gap}% gap in ${topGap.skill} (current: ${current}%, target: ${target}%). High-impact accelerator for ${targetRole}.`;
    }

    return `Strengthens your competency in ${topGap.skill} from ${current}% toward the ${targetRole} target of ${target}%.`;
  }

  if (Array.isArray(course.skills) && course.skills.length > 0) {
    return `Reinforces essential ${course.skills.join(', ')} skills to ensure high-performance execution for ${targetRole}.`;
  }

  return `Highly rated learning resource aligned with key competency benchmarks for ${targetRole}.`;
}

/**
 * Filters, scores, deduplicates, and ranks candidate courses.
 *
 * @param {object[]} allCourses - Raw courses catalog
 * @param {object} skillGapReport - Skill gap report output
 * @param {Array<string|object>} completedCourses - Completed course IDs or titles
 * @param {object} learningPreferences - Learner style/difficulty preferences
 * @param {Array<{ name: string, level: number }>} currentSkills - User current skills
 * @param {number} [limit=8] - Maximum recommendations to return
 * @returns {object[]} Ranked, deduplicated, and enriched recommendations
 */
function rankAndEnrichRecommendations(
  allCourses = [],
  skillGapReport = {},
  completedCourses = [],
  learningPreferences = {},
  currentSkills = [],
  limit = 8
) {
  // 1. Build completed courses lookup set
  const completedSet = new Set();
  (completedCourses || []).forEach(item => {
    if (!item) return;
    if (typeof item === 'string') {
      completedSet.add(item.trim().toLowerCase());
    } else if (typeof item === 'object') {
      if (item.id) completedSet.add(String(item.id).trim().toLowerCase());
      if (item.title) completedSet.add(String(item.title).trim().toLowerCase());
      if (item.url) completedSet.add(String(item.url).trim().toLowerCase());
    }
  });

  // 2. Build user skills lookup map
  const userSkillMap = new Map();
  (currentSkills || []).forEach(s => {
    if (!s || typeof s !== 'object') return;
    const name = normalizeSkillName(s.name || s.skill);
    const level = Number(s.level !== undefined ? s.level : s.proficiency) || 0;
    userSkillMap.set(name, Math.max(0, Math.min(100, level)));
  });

  // 3. Filter out completed courses
  const eligibleCandidates = (allCourses || []).filter(c => {
    if (!c || !c.id) return false;
    const idLower = String(c.id).toLowerCase();
    const titleLower = String(c.title || '').toLowerCase();
    const urlLower = String(c.url || '').toLowerCase();

    return !completedSet.has(idLower) && !completedSet.has(titleLower) && !completedSet.has(urlLower);
  });

  // 4. Score all candidates
  const scoredList = eligibleCandidates.map(course => {
    const scoreData = scoreCourse(course, skillGapReport, learningPreferences, userSkillMap);
    return {
      course,
      ...scoreData,
    };
  });

  // 5. Sort primarily by finalScore descending
  scoredList.sort((a, b) => b.finalScore - a.finalScore);

  // 6. Deduplicate & ensure diversity across distinct skills
  const finalRecommendations = [];
  const coveredSkillCounts = new Map();
  const targetRole = skillGapReport.targetRole || 'Target Career Role';

  for (const item of scoredList) {
    if (finalRecommendations.length >= limit) break;

    const primarySkill = (item.course.skills && item.course.skills[0])
      ? normalizeSkillName(item.course.skills[0])
      : 'General';

    const countForSkill = coveredSkillCounts.get(primarySkill) || 0;

    // Allow maximum 2 courses per specific skill to ensure diversity across gaps
    if (countForSkill < 2 || scoredList.length <= limit) {
      coveredSkillCounts.set(primarySkill, countForSkill + 1);

      // Determine priority level
      let priority = 'medium';
      if (item.finalScore >= 75 || (item.topAddressedGap && item.topAddressedGap.priority === 'high')) {
        priority = 'high';
      } else if (item.finalScore < 50) {
        priority = 'low';
      }

      const reason = generateRecommendationReason(
        item.course,
        item.topAddressedGap,
        targetRole,
        item.finalScore
      );

      finalRecommendations.push({
        id: item.course.id,
        title: item.course.title,
        type: item.course.type || 'course',
        provider: item.course.provider,
        reason,
        priority,
        skills: item.course.skills || [],
        difficulty: item.course.difficulty,
        estimatedHours: item.course.estimatedHours,
        rating: item.course.rating,
        url: item.course.url,
        score: item.finalScore,
        breakdown: item.breakdown,
      });
    }
  }

  // If diversity filter left slots open and we still have candidates, backfill
  if (finalRecommendations.length < limit) {
    const includedIds = new Set(finalRecommendations.map(r => r.id));
    for (const item of scoredList) {
      if (finalRecommendations.length >= limit) break;
      if (!includedIds.has(item.course.id)) {
        includedIds.add(item.course.id);
        const reason = generateRecommendationReason(
          item.course,
          item.topAddressedGap,
          targetRole,
          item.finalScore
        );
        finalRecommendations.push({
          id: item.course.id,
          title: item.course.title,
          type: item.course.type || 'course',
          provider: item.course.provider,
          reason,
          priority: item.finalScore >= 70 ? 'high' : 'medium',
          skills: item.course.skills || [],
          difficulty: item.course.difficulty,
          estimatedHours: item.course.estimatedHours,
          rating: item.course.rating,
          url: item.course.url,
          score: item.finalScore,
          breakdown: item.breakdown,
        });
      }
    }
  }

  return finalRecommendations;
}

module.exports = {
  generateRecommendationReason,
  rankAndEnrichRecommendations,
};
