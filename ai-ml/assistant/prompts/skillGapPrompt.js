/**
 * LearnPath AI — Assistant Skill Gap Prompt
 * Specialized prompt templates for analyzing weak skills, gap remediation, and topic sequencing.
 */

export const getSkillGapPrompt = ({ skill = 'JavaScript', targetRole = 'Software Engineer', userLevel = null, learningContext = {} }) => {
  const levelInfo = userLevel !== null ? `Current Verified Level: ${userLevel}%` : 'Current Level: Not yet calibrated via assessment';
  const phaseInfo = learningContext.currentPhase ? `Roadmap Phase: Phase ${learningContext.currentPhase}` : 'Roadmap Phase: Foundational Phase';

  return `Focus: Skill Gap Remediation & Topic Sequencing
Target Role: ${targetRole}
Focus Skill: ${skill}
${levelInfo}
${phaseInfo}

Provide:
1. Role Relevance: Why ${skill} is critical for ${targetRole} and where it fits in the roadmap.
2. Prioritized Subtopics: 4-5 high-impact topics ordered logically from foundational to advanced.
3. Recommended Learning Order: Step-by-step progression with conceptual checkpoints.
4. Hands-on Practice: A targeted micro-project (30-60 mins) to build real competency.
5. Resources & Next Steps: Direct links/references to official documentation and LearnPath courses.`;
};
