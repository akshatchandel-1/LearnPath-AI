const Skill = require('../../models/Skill');

/**
 * Skill Gap Analysis Engine:
 * Formula: Required Skills - Current Skills = Skill Gap
 */

const ROLE_TAXONOMY_MAP = {
  'business analyst': [
    { name: 'Business Analysis Fundamentals', targetLevel: 85, importance: 1.0 },
    { name: 'SQL & Relational Databases', targetLevel: 85, importance: 0.95 },
    { name: 'Excel & Advanced Analytics', targetLevel: 85, importance: 1.0 },
    { name: 'Data Visualization & BI', targetLevel: 80, importance: 0.9 },
    { name: 'Agile & Requirements Engineering', targetLevel: 80, importance: 0.85 },
    { name: 'Business Metrics & Forecasting', targetLevel: 75, importance: 0.8 },
  ],
  'research engineer': [
    { name: 'Python Programming', targetLevel: 90, importance: 1.0 },
    { name: 'Applied Statistics & Probability', targetLevel: 90, importance: 1.0 },
    { name: 'Linear Algebra & Optimization', targetLevel: 85, importance: 0.95 },
    { name: 'Machine Learning Algorithms', targetLevel: 90, importance: 1.0 },
    { name: 'Deep Learning & Neural Networks', targetLevel: 85, importance: 0.95 },
    { name: 'Research Methodology & Benchmarking', targetLevel: 80, importance: 0.85 },
  ],
  'data scientist': [
    { name: 'Python Programming', targetLevel: 85, importance: 1.0 },
    { name: 'Machine Learning Algorithms', targetLevel: 85, importance: 1.0 },
    { name: 'Pandas & Data Wrangling', targetLevel: 85, importance: 0.95 },
    { name: 'Applied Statistics & Probability', targetLevel: 80, importance: 0.9 },
    { name: 'SQL & Relational Databases', targetLevel: 75, importance: 0.85 },
    { name: 'Data Visualization & BI', targetLevel: 75, importance: 0.8 },
    { name: 'Deep Learning & Neural Networks', targetLevel: 70, importance: 0.75 },
    { name: 'Git & Version Control', targetLevel: 70, importance: 0.7 },
  ],
  'data analyst': [
    { name: 'SQL & Relational Databases', targetLevel: 85, importance: 1.0 },
    { name: 'Pandas & Data Wrangling', targetLevel: 80, importance: 0.95 },
    { name: 'Data Visualization & BI', targetLevel: 85, importance: 1.0 },
    { name: 'Applied Statistics & Probability', targetLevel: 75, importance: 0.9 },
    { name: 'Excel & Advanced Analytics', targetLevel: 80, importance: 0.85 },
    { name: 'Python Programming', targetLevel: 70, importance: 0.75 },
  ],
  'cloud engineer': [
    { name: 'Linux & Bash Scripting', targetLevel: 85, importance: 0.95 },
    { name: 'Docker & Containerization', targetLevel: 85, importance: 1.0 },
    { name: 'Kubernetes & Orchestration', targetLevel: 80, importance: 0.95 },
    { name: 'AWS Cloud Fundamentals', targetLevel: 85, importance: 1.0 },
    { name: 'Terraform & IaC', targetLevel: 80, importance: 0.9 },
    { name: 'CI/CD & GitHub Actions', targetLevel: 80, importance: 0.85 },
    { name: 'Prometheus & Monitoring', targetLevel: 75, importance: 0.8 },
  ],
  'devops engineer': [
    { name: 'Linux & Bash Scripting', targetLevel: 85, importance: 0.95 },
    { name: 'Docker & Containerization', targetLevel: 85, importance: 1.0 },
    { name: 'Kubernetes & Orchestration', targetLevel: 85, importance: 1.0 },
    { name: 'CI/CD & GitHub Actions', targetLevel: 85, importance: 1.0 },
    { name: 'Terraform & IaC', targetLevel: 80, importance: 0.9 },
    { name: 'Cloud Infrastructure (AWS/GCP)', targetLevel: 80, importance: 0.9 },
  ],
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
  'cybersecurity engineer': [
    { name: 'Computer Networking & Protocols', targetLevel: 85, importance: 0.95 },
    { name: 'Linux Security & Hardening', targetLevel: 85, importance: 1.0 },
    { name: 'OWASP Web Security', targetLevel: 90, importance: 1.0 },
    { name: 'Cryptography & PKI', targetLevel: 80, importance: 0.9 },
    { name: 'SIEM & Threat Monitoring', targetLevel: 75, importance: 0.85 },
  ],
  'software engineer': [
    { name: 'Data Structures & Algorithms', targetLevel: 90, importance: 1.0 },
    { name: 'Object-Oriented Design & Patterns', targetLevel: 85, importance: 0.95 },
    { name: 'Concurrency & Multithreading', targetLevel: 80, importance: 0.9 },
    { name: 'Database Systems & SQL', targetLevel: 80, importance: 0.85 },
    { name: 'Distributed Systems & Scalability', targetLevel: 80, importance: 0.9 },
  ],
};

class SkillGapEngine {
  getRequiredSkillsForRole(careerGoal = '') {
    const normalizedGoal = (careerGoal || '').toLowerCase();
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

    (userSkills || []).forEach((s) => {
      if (s && (s.name || s.skill)) {
        userSkillMap.set((s.name || s.skill).toLowerCase(), s.level ?? s.currentLevel ?? s.progress ?? 0);
      }
    });

    const gapDetails = [];
    let totalWeightedGap = 0;
    let totalWeight = 0;

    requiredSkills.forEach((req) => {
      let currentLevel = 0;
      const reqLower = req.name.toLowerCase();
      for (const [sName, sLevel] of userSkillMap.entries()) {
        if (sName === reqLower || reqLower.includes(sName) || sName.includes(reqLower)) {
          currentLevel = Math.max(currentLevel, sLevel);
        }
      }

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
        priority: gapScore > 40 ? 'High' : gapScore > 15 ? 'Medium' : 'Low',
      });

      totalWeightedGap += gapScore * req.importance;
      totalWeight += req.importance;
    });

    const overallGap = totalWeight > 0 ? Math.round(totalWeightedGap / totalWeight) : 0;
    const overallReadiness = Math.max(0, Math.min(100, 100 - overallGap));

    const criticalGaps = gapDetails
      .filter((g) => g.priority === 'High')
      .map((g) => g.skill);

    return {
      targetRole: careerGoal,
      overallReadiness,
      overallGap,
      criticalGaps,
      skills: gapDetails,
      readinessTier:
        overallReadiness >= 85
          ? 'Job Ready'
          : overallReadiness >= 60
          ? 'Intermediate Proficiency'
          : overallReadiness >= 30
          ? 'Developing Foundations'
          : 'Early Learner / Unassessed',
    };
  }

  async analyzeUser(userId, careerGoal) {
    const User = require('../../models/User');
    const user = await User.findById(userId);
    const goal = careerGoal || user?.careerGoal || user?.targetRole || 'Full Stack MERN Developer';
    return this.calculateSkillGap(user?.skills || [], goal);
  }
}

const skillGapEngine = new SkillGapEngine();
module.exports = skillGapEngine;
