const pdf = require('pdf-parse');
const mammoth = require('mammoth');

/**
 * Heuristics to extract structured data from raw resume text
 */
const extractStructuredData = (text) => {
  const data = {
    name: null,
    email: null,
    phone: null,
    location: null,
    linkedin: null,
    github: null,
    portfolio: null,
    education: [],
    experience: [],
    skills: [],
    projects: [],
    certifications: [],
    achievements: []
  };

  if (!text || typeof text !== 'string') return data;

  // Simple Email Regex
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  if (emailMatch) data.email = emailMatch[0];

  // Simple Phone Regex
  const phoneMatch = text.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  if (phoneMatch) data.phone = phoneMatch[0];

  // URLs
  const urlRegex = /(?:https?:\/\/)?(?:www\.)?(linkedin\.com|github\.com|[a-zA-Z0-9-]+\.[a-zA-Z]{2,})(?:\/[^\s]*)?/gi;
  const urls = text.match(urlRegex) || [];
  urls.forEach(url => {
    const lowerUrl = url.toLowerCase();
    if (lowerUrl.includes('linkedin.com')) data.linkedin = url;
    else if (lowerUrl.includes('github.com')) data.github = url;
    else if (!data.portfolio && !lowerUrl.includes('linkedin') && !lowerUrl.includes('github') && lowerUrl.includes('.')) {
      if (!lowerUrl.endsWith('.')) {
        data.portfolio = url;
      }
    }
  });

  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  
  // Name heuristic
  if (lines.length > 0) {
    const firstLine = lines[0];
    if (!firstLine.includes('@') && !/\d/.test(firstLine) && firstLine.length < 50) {
      data.name = firstLine;
    }
  }

  let currentSection = null;
  const sectionKeywords = {
    education: ['education', 'academic background', 'academic profile'],
    experience: ['experience', 'work experience', 'employment history', 'professional experience'],
    skills: ['skills', 'technical skills', 'core competencies', 'technologies'],
    projects: ['projects', 'personal projects', 'academic projects'],
    certifications: ['certifications', 'certificates', 'licenses'],
    achievements: ['achievements', 'awards', 'honors']
  };

  const isSectionHeader = (line) => {
    const lowerLine = line.toLowerCase();
    if (line.length > 50) return null;
    
    for (const [section, keywords] of Object.entries(sectionKeywords)) {
      if (keywords.some(k => lowerLine === k || lowerLine === `${k}:`)) {
        return section;
      }
    }
    return null;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const detectedSection = isSectionHeader(line);
    
    if (detectedSection) {
      currentSection = detectedSection;
      continue;
    }

    if (currentSection) {
      if (currentSection === 'skills') {
        if (line.includes(',')) {
          const splitSkills = line.split(',').map(s => s.trim()).filter(s => s.length > 0);
          data.skills.push(...splitSkills);
        } else {
          data.skills.push(line);
        }
      } else if (Array.isArray(data[currentSection])) {
        data[currentSection].push(line);
      }
    }
  }

  // Canonical Tech Keywords Scan across entire text
  const KNOWN_SKILL_KEYWORDS = [
    'JavaScript', 'TypeScript', 'React.js', 'React', 'Node.js', 'Node', 'Express.js', 'Express',
    'HTML5', 'HTML', 'CSS3', 'CSS', 'Tailwind CSS', 'Tailwind', 'Bootstrap',
    'MongoDB', 'PostgreSQL', 'Postgres', 'MySQL', 'SQL', 'Redis', 'GraphQL', 'REST API',
    'Python', 'Django', 'Flask', 'FastAPI', 'Pandas', 'NumPy', 'Scikit-Learn', 'TensorFlow', 'PyTorch',
    'Machine Learning', 'Deep Learning', 'Data Science', 'Data Analysis', 'Power BI', 'Tableau', 'Excel',
    'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'CI/CD', 'Git', 'GitHub', 'Linux',
    'Java', 'Spring Boot', 'C++', 'C#', '.NET', 'Go', 'Rust', 'Next.js', 'Redux'
  ];

  const lowerRawText = text.toLowerCase();
  const detectedSkillsSet = new Set(data.skills.map(s => s.trim()));

  KNOWN_SKILL_KEYWORDS.forEach(keyword => {
    const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(?:^|[^a-zA-Z0-9])${escaped}(?:$|[^a-zA-Z0-9])`, 'i');
    if (regex.test(lowerRawText)) {
      detectedSkillsSet.add(keyword);
    }
  });

  data.skills = Array.from(detectedSkillsSet).filter(s => s && s.length > 1);

  // If no location detected, default to India
  if (!data.location) {
    const locMatch = text.match(/(?:Location|Address|City|Country|Based in)[\s:]+([A-Za-z\s,]+)/i);
    data.location = locMatch ? locMatch[1].split('\n')[0].trim() : 'India';
  }

  return data;
};

/**
 * Parses resume buffer and returns structured data
 */
const parseResumeFromBuffer = async (buffer, mimetype) => {
  let rawText = '';

  try {
    if (mimetype === 'text/plain') {
      rawText = buffer.toString('utf8');
    } else if (mimetype === 'application/pdf') {
      const pdfData = await pdf(buffer);
      rawText = pdfData.text;
    } else if (
      mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
      mimetype === 'application/msword'
    ) {
      const result = await mammoth.extractRawText({ buffer: buffer });
      rawText = result.value;
    } else {
      // Fallback attempt with utf8 if buffer
      rawText = buffer.toString('utf8');
    }

    if (!rawText || rawText.trim() === '') {
      return {
        name: null,
        email: null,
        phone: null,
        location: 'India',
        skills: [],
        education: [],
        experience: []
      };
    }

    return extractStructuredData(rawText);
  } catch (error) {
    console.error('Error parsing resume buffer:', error);
    return {
      name: null,
      email: null,
      phone: null,
      location: 'India',
      skills: [],
      education: [],
      experience: []
    };
  }
};

module.exports = {
  parseResumeFromBuffer
};
