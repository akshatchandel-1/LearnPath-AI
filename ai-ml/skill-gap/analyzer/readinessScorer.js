/**
 * LearnPath AI - Readiness Scorer
 * Calculates mathematically sound, weighted overall readiness percentage without arbitrary defaults.
 */

/**
 * Computes overall readiness score based on skill importance weights and target levels.
 *
 * Formula:
 * Overall Readiness = ( SUM( MIN(currentLevel, targetLevel) / targetLevel * importance ) / SUM(importance) ) * 100
 *
 * @param {Array<{ currentLevel: number, targetLevel: number, importance: number, isCore: boolean }>} evaluatedSkills
 * @returns {{ overallReadiness: number, readinessTier: string, statusSummary: string }}
 */
function calculateOverallReadiness(evaluatedSkills = []) {
  if (!Array.isArray(evaluatedSkills) || evaluatedSkills.length === 0) {
    return {
      overallReadiness: 0,
      readinessTier: 'Beginner',
      statusSummary: 'No skills evaluated.',
    };
  }

  let totalWeightedFulfillment = 0;
  let totalImportanceWeight = 0;
  let coreSkillsMet = 0;
  let totalCoreSkills = 0;

  for (const item of evaluatedSkills) {
    const current = Math.max(0, Math.min(100, Number(item.currentLevel) || 0));
    const target = Math.max(1, Math.min(100, Number(item.targetLevel) || 100));
    const importance = typeof item.importance === 'number' && item.importance > 0 ? item.importance : 1.0;

    // Fulfillment is capped at 1.0 (exceeding target does not inflate baseline beyond 100%)
    const fulfillmentRatio = Math.min(1.0, current / target);

    totalWeightedFulfillment += fulfillmentRatio * importance;
    totalImportanceWeight += importance;

    if (item.isCore) {
      totalCoreSkills++;
      if (current >= target * 0.8) {
        coreSkillsMet++;
      }
    }
  }

  const overallReadiness = totalImportanceWeight > 0
    ? Math.round((totalWeightedFulfillment / totalImportanceWeight) * 100)
    : 0;

  let readinessTier = 'Beginner';
  let statusSummary = 'Requires foundational preparation across key competencies.';

  if (overallReadiness >= 85) {
    readinessTier = 'Job Ready';
    statusSummary = 'Strong alignment with target role benchmarks. Ready for professional projects and technical interviews.';
  } else if (overallReadiness >= 65) {
    readinessTier = 'Intermediate / Advancing';
    statusSummary = 'Solid foundational knowledge with actionable gaps in advanced and core competencies.';
  } else if (overallReadiness >= 40) {
    readinessTier = 'Developing';
    statusSummary = 'Early proficiency established. Needs focused practice on core technical requirements.';
  } else {
    readinessTier = 'Beginner / Foundational';
    statusSummary = 'Significant skill gaps detected. Recommended to start with core prerequisite courses.';
  }

  return {
    overallReadiness,
    readinessTier,
    statusSummary,
    coreSkillsMetrics: {
      totalCoreSkills,
      coreSkillsMet,
      coreReadinessPercent: totalCoreSkills > 0 ? Math.round((coreSkillsMet / totalCoreSkills) * 100) : 0,
    },
  };
}

module.exports = {
  calculateOverallReadiness,
};
