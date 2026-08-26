const Skill = require('../../models/Skill');

/**
 * Skill Gap Analysis Engine:
 * Formula: Required Skills - Current Skills = Skill Gap
 */

const ROLE_TAXONOMY_MAP = {
  'mern stack developer': [
    { name: 'HTML & CSS', targetLevel: 90, importance: 0.9 },
    { name: 'JavaScript', targetLevel: 85, importance: 1.0 },
    { name: 'React.js', targetLevel: 85, importance: 1.0 },
    { name: 'Node.js', targetLevel: 80, importance: 0.95 },
    { name: 'Express.js', targetLevel: 80, importance: 0.9 },
    { name: 'MongoDB', targetLevel: 75, importance: 0.85 },
    { name: 'REST APIs', targetLevel: 80, importance: 0.9 },
    { name: 'Authentication & Security', targetLevel: 75, importance: 0.85 },
    { name: 'Git & GitHub', targetLevel: 70, importance: 0.75 },
    { name: 'Docker & Deployment', targetLevel: 65, importance: 0.7 },
  ],
  'full stack developer': [
    { name: 'HTML & CSS', targetLevel: 90, importance: 0.9 },
    { name: 'JavaScript', targetLevel: 85, importance: 1.0 },
    { name: 'React.js', targetLevel: 85, importance: 1.0 },
    { name: 'Node.js', targetLevel: 80, importance: 0.95 },
    { name: 'Express.js', targetLevel: 80, importance: 0.9 },
    { name: 'MongoDB', targetLevel: 75, importance: 0.85 },
    { name: 'REST APIs', targetLevel: 80, importance: 0.9 },
    { name: 'Docker & Deployment', targetLevel: 65, importance: 0.7 },
  ],
  'frontend developer': [
    { name: 'HTML & CSS', targetLevel: 95, importance: 1.0 },
    { name: 'JavaScript', targetLevel: 90, importance: 1.0 },
    { name: 'React.js', targetLevel: 90, importance: 1.0 },
    { name: 'Tailwind CSS', targetLevel: 85, importance: 0.85 },
    { name: 'TypeScript', targetLevel: 80, importance: 0.85 },
    { name: 'Web Performance & Accessibility', targetLevel: 75, importance: 0.8 },
  ],
  'backend developer': [
    { name: 'JavaScript', targetLevel: 85, importance: 0.9 },
    { name: 'Node.js', targetLevel: 90, importance: 1.0 },
    { name: 'Express.js', targetLevel: 90, importance: 1.0 },
    { name: 'MongoDB', targetLevel: 85, importance: 0.9 },
    { name: 'PostgreSQL & SQL', targetLevel: 80, importance: 0.85 },
    { name: 'REST APIs', targetLevel: 90, importance: 1.0 },
    { name: 'Authentication & Security', targetLevel: 85, importance: 0.9 },
    { name: 'Docker & Deployment', targetLevel: 75, importance: 0.8 },
  ],
  'ai engineer': [
    { name: 'Python Programming', targetLevel: 90, importance: 1.0 },
    { name: 'Data Structures & Algorithms', targetLevel: 85, importance: 0.9 },
    { name: 'Machine Learning Algorithms', targetLevel: 85, importance: 1.0 },
    { name: 'LLM Engineering & RAG', targetLevel: 90, importance: 1.0 },
    { name: 'FastAPI & Microservices', targetLevel: 75, importance: 0.8 },
  ],
};

class SkillGapEngine {
  getRequiredSkillsForRole(careerGoal = '') {
    const normalizedGoal = careerGoal.toLowerCase();
    for (const [roleKey, skills] of Object.entries(ROLE_TAXONOMY_MAP)) {
      if (normalizedGoal.includes(roleKey) || roleKey.includes(normalizedGoal)) {
        return skills;
      }
    }
    return ROLE_TAXONOMY_MAP['full stack developer'];
  }

  calculateSkillGap(userSkills = [], careerGoal = 'Full Stack MERN Developer') {
    const requiredSkills = this.getRequiredSkillsForRole(careerGoal);
    const userSkillMap = new Map();

    userSkills.forEach((s) => {
      userSkillMap.set(s.name.toLowerCase(), s.level || 0);
    });

    const gapDetails = [];
    let totalWeightedGap = 0;
    let totalWeight = 0;

    requiredSkills.forEach((req) => {
      const currentLevel = userSkillMap.get(req.name.toLowerCase()) || 0;
      const targetLevel = req.targetLevel;
      const gapPercent = Math.max(0, targetLevel - currentLevel);
      const gapScore = Math.min(100, Math.round((gapPercent / targetLevel) * 100));

      gapDetails.push({
        skill: req.name,
        currentLevel,
        targetLevel,
        gapPercent,
        gapScore,
        importance: req.importance,
        priority: gapScore > 50 ? 'High' : gapScore > 20 ? 'Medium' : 'Low',
      });

      totalWeightedGap += gapScore * req.importance;
      totalWeight += req.importance;
    });

    // Sort by gap score descending (biggest gaps first)
    gapDetails.sort((a, b) => b.gapScore - a.gapScore);

    const overallGapIndex = totalWeight > 0 ? Math.round(totalWeightedGap / totalWeight) : 50;

    return {
      targetRole: careerGoal,
      overallGapIndex,
      readinessScore: 100 - overallGapIndex,
      gaps: gapDetails,
      criticalGaps: gapDetails.filter(g => g.gapScore > 40).map(g => g.skill),
    };
  }
}

const skillGapEngine = new SkillGapEngine();
module.exports = skillGapEngine;
