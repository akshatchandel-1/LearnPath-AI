/**
 * LearnPath AI - Suggestion Engine
 * Generates actionable, role-tailored improvement steps for identified skill gaps.
 */

/**
 * Produces actionable learning advice for a skill gap.
 * @param {string} skillName
 * @param {number} currentLevel
 * @param {number} targetLevel
 * @param {string} priority
 * @param {string} [roleDefaultSuggestion]
 * @returns {string} Actionable recommendation string
 */
function generateImprovementSuggestion(skillName, currentLevel, targetLevel, priority, roleDefaultSuggestion) {
  if (roleDefaultSuggestion && currentLevel < targetLevel * 0.5) {
    return roleDefaultSuggestion;
  }

  const gap = Math.max(0, targetLevel - currentLevel);

  if (gap === 0) {
    return `Proficiency target achieved (${currentLevel}%). Maintain competency through practical projects.`;
  }

  if (currentLevel === 0) {
    return `Begin with core foundational courses and hands-on exercises in ${skillName} to establish initial baseline.`;
  }

  if (currentLevel < 35) {
    return `Build strong fundamental syntax, patterns, and practical code exercises in ${skillName} to bridge the ${gap}% gap.`;
  }

  if (currentLevel < 65) {
    return `Work on intermediate end-to-end projects, architectural patterns, and real-world debugging in ${skillName}.`;
  }

  return `Focus on advanced optimization, edge-case hardening, and production-level architecture in ${skillName} to reach ${targetLevel}%.`;
}

module.exports = {
  generateImprovementSuggestion,
};
