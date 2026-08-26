const llmService = require('./llmService');

class GoalAnalyzer {
  async analyzeGoal(naturalLanguageInput) {
    const prompt = `Analyze this user's learning goal and respond with ONLY valid JSON:
User: "${naturalLanguageInput}"

JSON schema:
{
  "careerGoal": "string (e.g. Full Stack MERN Developer)",
  "targetRole": "string",
  "suggestedDifficulty": "Beginner | Intermediate | Advanced",
  "estimatedMonths": number,
  "keyDomains": ["string"]
}`;

    const raw = await llmService.generateContent(prompt);
    if (raw) {
      try {
        const cleaned = raw.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(cleaned);
      } catch (e) {
        // Fallback
      }
    }

    const inputLower = (naturalLanguageInput || '').toLowerCase();
    if (inputLower.includes('frontend') || inputLower.includes('react')) {
      return {
        careerGoal: 'Frontend React Developer',
        targetRole: 'Frontend Developer',
        suggestedDifficulty: 'Intermediate',
        estimatedMonths: 3,
        keyDomains: ['HTML & CSS', 'JavaScript', 'React.js', 'Tailwind CSS'],
      };
    } else if (inputLower.includes('backend') || inputLower.includes('node')) {
      return {
        careerGoal: 'Backend Node.js Engineer',
        targetRole: 'Backend Engineer',
        suggestedDifficulty: 'Intermediate',
        estimatedMonths: 4,
        keyDomains: ['JavaScript', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
      };
    } else if (inputLower.includes('ai') || inputLower.includes('ml') || inputLower.includes('machine learning')) {
      return {
        careerGoal: 'AI / Machine Learning Engineer',
        targetRole: 'AI Engineer',
        suggestedDifficulty: 'Advanced',
        estimatedMonths: 6,
        keyDomains: ['Python Programming', 'Machine Learning', 'LLMs', 'RAG'],
      };
    }

    return {
      careerGoal: 'Full Stack MERN Developer',
      targetRole: 'Full Stack Developer',
      suggestedDifficulty: 'Intermediate',
      estimatedMonths: 4,
      keyDomains: ['Frontend', 'Backend', 'Database', 'REST APIs', 'Deployment'],
    };
  }
}

const goalAnalyzer = new GoalAnalyzer();
module.exports = goalAnalyzer;
