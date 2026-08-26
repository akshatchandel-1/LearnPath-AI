const llmService = require('./llmService');

class SkillAnalyzer {
  async extractSkillsFromText(naturalLanguageText) {
    const prompt = `Extract skills with estimated proficiency (0-100) from this statement. Output strictly valid JSON:
Text: "${naturalLanguageText}"

JSON format:
{
  "skills": [
    { "name": "string", "level": number, "category": "Frontend|Backend|Database|DevOps & Cloud|AI & Data Science" }
  ]
}`;

    const raw = await llmService.generateContent(prompt);
    if (raw) {
      try {
        const cleaned = raw.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(cleaned);
        if (Array.isArray(parsed.skills)) return parsed.skills;
      } catch (e) {
        // Fallback
      }
    }

    const t = (naturalLanguageText || '').toLowerCase();
    const skills = [];

    if (t.includes('html') || t.includes('css')) {
      skills.push({ name: 'HTML & CSS', level: 75, category: 'Frontend' });
    }
    if (t.includes('js') || t.includes('javascript')) {
      skills.push({ name: 'JavaScript', level: t.includes('basic') ? 45 : 65, category: 'Frontend' });
    }
    if (t.includes('react')) {
      skills.push({ name: 'React.js', level: t.includes('no') || t.includes('learn') ? 20 : 50, category: 'Frontend' });
    }
    if (t.includes('node')) {
      skills.push({ name: 'Node.js', level: 25, category: 'Backend' });
    }
    if (t.includes('express')) {
      skills.push({ name: 'Express.js', level: 20, category: 'Backend' });
    }
    if (t.includes('mongo') || t.includes('database')) {
      skills.push({ name: 'MongoDB', level: 15, category: 'Database' });
    }

    if (skills.length === 0) {
      skills.push(
        { name: 'HTML & CSS', level: 70, category: 'Frontend' },
        { name: 'JavaScript', level: 50, category: 'Frontend' },
        { name: 'React.js', level: 20, category: 'Frontend' },
        { name: 'Node.js', level: 10, category: 'Backend' }
      );
    }

    return skills;
  }
}

const skillAnalyzer = new SkillAnalyzer();
module.exports = skillAnalyzer;
