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

  // Simple Email Regex
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  if (emailMatch) data.email = emailMatch[0];

  // Simple Phone Regex
  const phoneMatch = text.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  if (phoneMatch) data.phone = phoneMatch[0];

  // URLs (improved to catch linkedin.com and github.com without http)
  const urlRegex = /(?:https?:\/\/)?(?:www\.)?(linkedin\.com|github\.com|[a-zA-Z0-9-]+\.[a-zA-Z]{2,})(?:\/[^\s]*)?/gi;
  const urls = text.match(urlRegex) || [];
  urls.forEach(url => {
    const lowerUrl = url.toLowerCase();
    if (lowerUrl.includes('linkedin.com')) data.linkedin = url;
    else if (lowerUrl.includes('github.com')) data.github = url;
    else if (!data.portfolio && !lowerUrl.includes('linkedin') && !lowerUrl.includes('github') && lowerUrl.includes('.')) {
      // Basic sanity check for portfolio URLs
      if (!lowerUrl.endsWith('.')) {
        data.portfolio = url;
      }
    }
  });

  // VERY basic section identification
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  
  // Try to guess name from first few lines (usually first non-empty line)
  if (lines.length > 0) {
    // Check if the first line is not an email or phone
    const firstLine = lines[0];
    if (!firstLine.includes('@') && !/\d/.test(firstLine) && firstLine.length < 50) {
      data.name = firstLine;
    }
  }

  let currentSection = null;
  const sectionKeywords = {
    education: ['education', 'academic background', 'academic profile'],
    experience: ['experience', 'work experience', 'employment history', 'professional experience'],
    skills: ['skills', 'technical skills', 'core competencies'],
    projects: ['projects', 'personal projects', 'academic projects'],
    certifications: ['certifications', 'certificates', 'licenses'],
    achievements: ['achievements', 'awards', 'honors']
  };

  const isSectionHeader = (line) => {
    const lowerLine = line.toLowerCase();
    if (line.length > 50) return null; // headers are usually short
    
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
      } else {
        data[currentSection].push(line);
      }
    }
  }

  return data;
};

/**
 * Parses resume buffer and returns structured data
 */
const parseResumeFromBuffer = async (buffer, mimetype) => {
  let rawText = '';

  try {
    if (mimetype === 'application/pdf') {
      const pdfData = await pdf(buffer);
      rawText = pdfData.text;
    } else if (
      mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
      mimetype === 'application/msword'
    ) {
      const result = await mammoth.extractRawText({ buffer: buffer });
      rawText = result.value;
    } else {
      throw new Error('Unsupported file type for parsing');
    }

    if (!rawText || rawText.trim() === '') {
      throw new Error('Could not extract text from file');
    }

    return extractStructuredData(rawText);
  } catch (error) {
    console.error('Error parsing resume:', error);
    throw error;
  }
};

module.exports = {
  parseResumeFromBuffer
};
