/**
 * 7-Factor Hybrid Recommendation Scoring Formula:
 * finalScore =
 *   0.30 * semanticSimilarity +
 *   0.20 * skillGapMatch +
 *   0.15 * difficultyMatch +
 *   0.10 * interestMatch +
 *   0.10 * prerequisiteMatch +
 *   0.10 * learningPreferenceMatch +
 *   0.05 * historicalPerformance
 *
 * Normalized score: 0 to 100.
 */

const WEIGHTS = {
  SEMANTIC: 0.30,
  SKILL_GAP: 0.20,
  DIFFICULTY: 0.15,
  INTEREST: 0.10,
  PREREQUISITE: 0.10,
  PREFERENCE: 0.10,
  HISTORICAL: 0.05,
};

function calculateDifficultyMatch(resourceDifficulty, userLevel) {
  const difficultyRanks = { Beginner: 1, Intermediate: 2, Advanced: 3 };
  const resRank = difficultyRanks[resourceDifficulty] || 2;
  const userRank = difficultyRanks[userLevel] || 1;

  const diff = Math.abs(resRank - userRank);
  if (diff === 0) return 1.0;
  if (diff === 1) return 0.75;
  return 0.40;
}

function calculatePreferenceMatch(resourceType, resourceStyle, userStyle, userFormatAffinity = {}) {
  let score = 0.5;

  if (userStyle && (resourceStyle === userStyle || resourceType.toLowerCase().includes(userStyle.toLowerCase()))) {
    score += 0.35;
  }

  // Adjust using behavioral format affinities
  if (resourceType === 'Video' && userFormatAffinity.video !== undefined) {
    score = score * 0.6 + userFormatAffinity.video * 0.4;
  } else if (resourceType === 'Project' && userFormatAffinity.project !== undefined) {
    score = score * 0.6 + userFormatAffinity.project * 0.4;
  } else if (resourceType === 'Article' && userFormatAffinity.reading !== undefined) {
    score = score * 0.6 + userFormatAffinity.reading * 0.4;
  }

  return Math.min(1.0, Math.max(0.1, score));
}

function calculatePrerequisiteMatch(resourcePrereqs = [], userSkills = []) {
  if (!resourcePrereqs || resourcePrereqs.length === 0) return 1.0;

  const userSkillMap = new Map(
    userSkills.map(s => [s.name.toLowerCase(), s.level || 0])
  );

  let satisfiedCount = 0;
  for (const prereq of resourcePrereqs) {
    const level = userSkillMap.get(prereq.toLowerCase()) || 0;
    if (level >= 60) {
      satisfiedCount += 1.0;
    } else if (level >= 30) {
      satisfiedCount += 0.5;
    }
  }

  return satisfiedCount / resourcePrereqs.length;
}

function calculateHybridScore(factors) {
  const {
    semanticSimilarity = 0.5,
    skillGapMatch = 0.5,
    difficultyMatch = 0.8,
    interestMatch = 0.5,
    prerequisiteMatch = 1.0,
    learningPreferenceMatch = 0.8,
    historicalPerformance = 0.7,
  } = factors;

  const rawScore =
    WEIGHTS.SEMANTIC * semanticSimilarity +
    WEIGHTS.SKILL_GAP * skillGapMatch +
    WEIGHTS.DIFFICULTY * difficultyMatch +
    WEIGHTS.INTEREST * interestMatch +
    WEIGHTS.PREREQUISITE * prerequisiteMatch +
    WEIGHTS.PREFERENCE * learningPreferenceMatch +
    WEIGHTS.HISTORICAL * historicalPerformance;

  const normalized = Math.round(Math.min(100, Math.max(0, rawScore * 100)));

  return {
    score: normalized,
    breakdown: {
      semanticSimilarity: Math.round(semanticSimilarity * 100),
      skillGapMatch: Math.round(skillGapMatch * 100),
      difficultyMatch: Math.round(difficultyMatch * 100),
      interestMatch: Math.round(interestMatch * 100),
      prerequisiteMatch: Math.round(prerequisiteMatch * 100),
      learningPreferenceMatch: Math.round(learningPreferenceMatch * 100),
      historicalPerformance: Math.round(historicalPerformance * 100),
    },
  };
}

module.exports = {
  WEIGHTS,
  calculateDifficultyMatch,
  calculatePreferenceMatch,
  calculatePrerequisiteMatch,
  calculateHybridScore,
};
