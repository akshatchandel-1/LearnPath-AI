/**
 * LearnPath AI — Assistant Career Guidance Prompt
 * Specialized prompt templates for career trajectory, role transitions, and market benchmarks.
 */

export const getCareerPrompt = ({ targetRole, currentSkills = [], learningContext = {} }) => {
  const skillsList = currentSkills.map(s => `${s.name} (${s.level || 0}%)`).join(', ') || 'None specified';
  
  return `Focus: Technical Career Guidance & Specialization Trajectory
Target Role: ${targetRole}
Verified Skill Inventory: ${skillsList}
Learning Phase: ${learningContext.currentPhase || 'Not started'}

Provide:
1. Critical high-leverage skills required for ${targetRole} in the current industry landscape.
2. An actionable competency gap analysis based on their listed skills.
3. Recommended portfolio projects that signal production readiness to hiring managers.
4. Suggested next milestone in their curriculum.`;
};
