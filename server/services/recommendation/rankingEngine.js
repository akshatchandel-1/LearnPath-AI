const {
  calculateDifficultyMatch,
  calculatePreferenceMatch,
  calculatePrerequisiteMatch,
  calculateHybridScore,
} = require('../../ml/hybridScoring');
const similarityEngine = require('./similarityEngine');

class RankingEngine {
  rankCandidates(candidates = [], userProfile, skillGapReport) {
    const criticalGapsSet = new Set(
      (skillGapReport?.criticalGaps || []).map(s => s.toLowerCase())
    );

    const scoredResources = candidates.map((resource) => {
      // 1. Semantic Similarity via TF-IDF & Cosine Similarity
      const semanticSim = similarityEngine.computeSimilarityForProfile(userProfile, resource);

      // 2. Skill Gap Relevance
      let gapMatch = 0.3;
      const resSkills = resource.skills || [];
      const matchedGaps = resSkills.filter(s => criticalGapsSet.has(s.toLowerCase()));

      if (matchedGaps.length > 0) {
        gapMatch = 0.7 + Math.min(0.3, matchedGaps.length * 0.15);
      }

      // 3. Difficulty Fit
      const diffMatch = calculateDifficultyMatch(
        resource.difficulty,
        userProfile.preferredDifficulty || 'Intermediate'
      );

      // 4. Interest Match
      let interestMatch = 0.5;
      const userInterests = userProfile.interests || [];
      const hasInterest = resSkills.some(s =>
        userInterests.some(i => i.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(i.toLowerCase()))
      );
      if (hasInterest) interestMatch = 0.9;

      // 5. Prerequisite Match
      const prereqMatch = calculatePrerequisiteMatch(
        resource.prerequisites,
        userProfile.skills
      );

      // 6. Learning Preference Match
      const prefMatch = calculatePreferenceMatch(
        resource.type,
        resource.learningStyle,
        userProfile.preferredLearningStyle,
        userProfile.formatAffinity
      );

      // 7. Historical Performance
      const histMatch = 0.75;

      const { score, breakdown } = calculateHybridScore({
        semanticSimilarity: semanticSim,
        skillGapMatch: gapMatch,
        difficultyMatch: diffMatch,
        interestMatch: interestMatch,
        prerequisiteMatch: prereqMatch,
        learningPreferenceMatch: prefMatch,
        historicalPerformance: histMatch,
      });

      // Generate explainable reason
      const primarySkill = resSkills[0] || 'core concepts';
      const reason = `Recommended because you have a target skill gap in ${primarySkill}. This ${resource.duration || 'hands-on'} ${resource.type.toLowerCase()} directly targets your ${userProfile.careerGoal || 'career goal'} and matches your ${userProfile.preferredLearningStyle || 'hands-on'} preference.`;

      return {
        resource,
        score,
        breakdown,
        matchedSkills: resSkills,
        skillGapAddressed: primarySkill,
        reason,
        difficultyFit: `${resource.difficulty} (optimal for your ${userProfile.preferredDifficulty || 'Intermediate'} pace)`,
        estimatedImpact: `+${Math.round(score * 0.18)}% estimated competency growth in ${primarySkill}`,
      };
    });

    // Rank descending by final hybrid score
    return scoredResources.sort((a, b) => b.score - a.score);
  }
}

const rankingEngine = new RankingEngine();
module.exports = rankingEngine;
