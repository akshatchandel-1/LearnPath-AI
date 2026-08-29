/**
 * LearnPath AI - Content Scorer
 * Multi-factor mathematical scoring for evaluating candidate course relevance against learner gaps and preferences.
 */

const { normalizeSkillName } = require('../../skill-gap/data/skillsTaxonomy');

const SCORING_WEIGHTS = {
  SKILL_GAP: 0.35,
  ROLE_ALIGNMENT: 0.25,
  PREREQUISITES: 0.15,
  DIFFICULTY: 0.10,
  PREFERENCE: 0.10,
  QUALITY: 0.05,
};

/**
 * Calculates candidate course score against user skill gap report and preferences.
 *
 * @param {object} course - Candidate course item
 * @param {object} skillGapReport - Output from Skill Gap Analysis
 * @param {object} [learningPreferences] - User preferences (style, difficulty, maxDurationHours)
 * @param {Map<string, number>} [userSkillMap] - Map of user's normalized current skills
 * @returns {{ finalScore: number, gapCoverage: number, topAddressedGap: object|null, breakdown: object }}
 */
function scoreCourse(course, skillGapReport = {}, learningPreferences = {}, userSkillMap = new Map()) {
  const gaps = Array.isArray(skillGapReport.gaps) ? skillGapReport.gaps : [];
  const targetRole = String(skillGapReport.targetRole || '').toLowerCase();

  // 1. Skill Gap Match Factor (0.0 to 1.0)
  let skillGapScore = 0.0;
  let topAddressedGap = null;
  let highestGapFound = -1;
  let matchingGapsCount = 0;

  const courseSkillsNorm = (course.skills || []).map(s => normalizeSkillName(s));

  for (const skillName of courseSkillsNorm) {
    const matchedGap = gaps.find(g => normalizeSkillName(g.skill) === skillName);
    if (matchedGap) {
      matchingGapsCount++;
      const gapVal = matchedGap.gap || 0;
      const isHighPriority = matchedGap.priority === 'high';
      const isMediumPriority = matchedGap.priority === 'medium';

      let itemScore = (gapVal / 100) * 0.7;
      if (isHighPriority) itemScore += 0.3;
      else if (isMediumPriority) itemScore += 0.15;

      skillGapScore += itemScore;

      if (gapVal > highestGapFound) {
        highestGapFound = gapVal;
        topAddressedGap = matchedGap;
      }
    }
  }

  // Normalize gap score across matched skills
  if (courseSkillsNorm.length > 0) {
    skillGapScore = Math.min(1.0, skillGapScore / Math.max(1, courseSkillsNorm.length * 0.8));
  }

  // 2. Role Alignment Factor (0.0 to 1.0)
  let roleAlignmentScore = 0.4;
  if (Array.isArray(course.targetRoles)) {
    const isTargeted = course.targetRoles.some(r => {
      const rLower = r.toLowerCase();
      return targetRole.includes(rLower) || rLower.includes(targetRole);
    });
    if (isTargeted) {
      roleAlignmentScore = 1.0;
    }
  }

  // 3. Prerequisite Fulfillment Factor (0.0 to 1.0)
  const prereqs = course.prerequisites || [];
  let prereqScore = 1.0;

  if (prereqs.length > 0) {
    let satisfied = 0;
    prereqs.forEach(p => {
      const normP = normalizeSkillName(p);
      const userLevel = userSkillMap.get(normP) || 0;
      if (userLevel >= 50) {
        satisfied += 1.0;
      } else if (userLevel >= 25) {
        satisfied += 0.6;
      } else {
        satisfied += 0.2; // Lacks prerequisite
      }
    });
    prereqScore = satisfied / prereqs.length;
  }

  // 4. Difficulty Calibration Factor (0.0 to 1.0)
  const prefDiff = (learningPreferences.difficulty || '').toLowerCase();
  const courseDiff = (course.difficulty || '').toLowerCase();
  let diffScore = 0.75;

  if (prefDiff) {
    if (prefDiff === courseDiff) {
      diffScore = 1.0;
    } else if ((prefDiff === 'beginner' && courseDiff === 'intermediate') || (prefDiff === 'intermediate' && courseDiff === 'advanced')) {
      diffScore = 0.7;
    } else {
      diffScore = 0.4;
    }
  } else {
    // If no preference specified, match based on user's current skill level for these skills
    let avgSkillLevel = 0;
    if (courseSkillsNorm.length > 0) {
      const sum = courseSkillsNorm.reduce((acc, s) => acc + (userSkillMap.get(s) || 0), 0);
      avgSkillLevel = sum / courseSkillsNorm.length;
    }

    if (courseDiff === 'beginner' && avgSkillLevel < 40) diffScore = 1.0;
    else if (courseDiff === 'intermediate' && avgSkillLevel >= 30 && avgSkillLevel <= 75) diffScore = 1.0;
    else if (courseDiff === 'advanced' && avgSkillLevel > 65) diffScore = 1.0;
    else diffScore = 0.7;
  }

  // 5. Learning Preference Factor (0.0 to 1.0)
  let prefScore = 0.6;
  const prefStyle = (learningPreferences.style || learningPreferences.learningStyle || '').toLowerCase();
  if (prefStyle && course.learningStyle) {
    if (course.learningStyle.toLowerCase().includes(prefStyle) || prefStyle.includes(course.learningStyle.toLowerCase())) {
      prefScore = 1.0;
    }
  }

  if (learningPreferences.maxDurationHours && course.estimatedHours) {
    if (course.estimatedHours <= Number(learningPreferences.maxDurationHours)) {
      prefScore = Math.min(1.0, prefScore + 0.1);
    }
  }

  // 6. Quality Factor (0.0 to 1.0)
  const rating = Number(course.rating) || 4.5;
  const qualityScore = Math.min(1.0, Math.max(0.5, (rating - 3.5) / 1.5));

  // Compute final weighted composite score (0 to 100)
  const rawScore =
    SCORING_WEIGHTS.SKILL_GAP * skillGapScore +
    SCORING_WEIGHTS.ROLE_ALIGNMENT * roleAlignmentScore +
    SCORING_WEIGHTS.PREREQUISITES * prereqScore +
    SCORING_WEIGHTS.DIFFICULTY * diffScore +
    SCORING_WEIGHTS.PREFERENCE * prefScore +
    SCORING_WEIGHTS.QUALITY * qualityScore;

  const finalScore = Math.round(Math.min(100, Math.max(0, rawScore * 100)));

  return {
    finalScore,
    gapCoverage: matchingGapsCount,
    topAddressedGap,
    breakdown: {
      skillGapMatch: Math.round(skillGapScore * 100),
      roleAlignment: Math.round(roleAlignmentScore * 100),
      prerequisites: Math.round(prereqScore * 100),
      difficulty: Math.round(diffScore * 100),
      preference: Math.round(prefScore * 100),
      quality: Math.round(qualityScore * 100),
    },
  };
}

module.exports = {
  SCORING_WEIGHTS,
  scoreCourse,
};
