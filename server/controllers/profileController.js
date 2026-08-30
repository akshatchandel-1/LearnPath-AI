const User = require('../models/User');
const LearnerProfile = require('../models/LearnerProfile');
const adaptivePathService = require('../services/adaptive/adaptivePathService');
const recommendationEngine = require('../services/recommendation/recommendationEngine');
const { parseResumeFromBuffer } = require('../utils/resumeParser');

const CANONICAL_SKILL_MAP = {
  'javascript': 'JavaScript',
  'js': 'JavaScript',
  'java script': 'JavaScript',
  'es6': 'JavaScript',
  'react': 'React.js',
  'reactjs': 'React.js',
  'react.js': 'React.js',
  'react js': 'React.js',
  'node': 'Node.js',
  'nodejs': 'Node.js',
  'node.js': 'Node.js',
  'node js': 'Node.js',
  'express': 'Express.js',
  'expressjs': 'Express.js',
  'express.js': 'Express.js',
  'express js': 'Express.js',
  'html': 'HTML5',
  'html5': 'HTML5',
  'html 5': 'HTML5',
  'css': 'CSS3',
  'css3': 'CSS3',
  'css 3': 'CSS3',
  'mongodb': 'MongoDB',
  'mongo': 'MongoDB',
  'mongo db': 'MongoDB',
  'postgres': 'PostgreSQL',
  'postgresql': 'PostgreSQL',
  'sql': 'SQL',
  'python': 'Python',
  'python3': 'Python',
  'pandas': 'Pandas',
  'numpy': 'NumPy',
  'docker': 'Docker',
  'k8s': 'Kubernetes',
  'kubernetes': 'Kubernetes',
  'aws': 'AWS',
  'typescript': 'TypeScript',
  'ts': 'TypeScript',
  'type script': 'TypeScript',
  'tailwind': 'Tailwind CSS',
  'tailwindcss': 'Tailwind CSS',
  'tailwind css': 'Tailwind CSS',
  'machine learning': 'Machine Learning',
  'ml': 'Machine Learning',
  'deep learning': 'Deep Learning',
  'dl': 'Deep Learning',
  'power bi': 'Power BI',
  'powerbi': 'Power BI',
  'tableau': 'Tableau',
  'excel': 'Advanced Excel',
  'git': 'Git & GitHub',
  'github': 'Git & GitHub',
  'linux': 'Linux',
};

function normalizeSkillName(rawName) {
  if (!rawName || typeof rawName !== 'string') return '';
  const trimmed = rawName.trim();
  const lower = trimmed.toLowerCase();
  const alphaNumericKey = lower.replace(/[^a-z0-9]/g, '');

  if (CANONICAL_SKILL_MAP[lower]) return CANONICAL_SKILL_MAP[lower];
  if (CANONICAL_SKILL_MAP[alphaNumericKey]) return CANONICAL_SKILL_MAP[alphaNumericKey];

  return trimmed.split(/\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

// @desc    Get user learner profile
// @route   GET /api/profile
// @access  Private
const getProfile = async (req, res, next) => {
  try {
    let profile = await LearnerProfile.findOne({ user: req.user._id });

    if (!profile) {
      profile = await LearnerProfile.create({
        user: req.user._id,
        careerGoal: req.user.careerGoal || 'Full Stack MERN Developer',
        targetRole: req.user.careerGoal || 'Full Stack MERN Developer',
        location: req.user.location || 'India',
        skills: req.user.skills || [],
        preferredLearningStyle: req.user.preferredLearningStyle || 'Hands-on Projects',
        weeklyStudyHours: req.user.weeklyHours || 10,
      });
    }

    res.json({
      success: true,
      profile: {
        ...profile.toObject(),
        location: profile.location || req.user.location || 'India',
      },
      user: {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        location: req.user.location || profile.location || 'India',
        careerGoal: req.user.careerGoal,
        targetRole: req.user.targetRole || req.user.careerGoal,
        experienceLevel: req.user.experienceLevel,
        streak: req.user.streak,
        points: req.user.points,
        skills: req.user.skills,
        resume: req.user.resume,
        resumeData: req.user.resumeData,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update learner profile & trigger adaptive recalibration
// @route   PUT /api/profile
// @access  Private
const updateProfile = async (req, res, next) => {
  try {
    const {
      careerGoal,
      targetRole,
      skills,
      interests,
      preferredLearningStyle,
      preferredDifficulty,
      weeklyStudyHours,
      name,
      location,
    } = req.body;

    if (skills !== undefined && !Array.isArray(skills)) {
      return res.status(400).json({ success: false, message: 'skills must be an array' });
    }

    if (weeklyStudyHours !== undefined && (typeof weeklyStudyHours !== 'number' || weeklyStudyHours <= 0)) {
      return res.status(400).json({ success: false, message: 'weeklyStudyHours must be a positive number' });
    }

    let profile = await LearnerProfile.findOne({ user: req.user._id });

    if (!profile) {
      profile = new LearnerProfile({ user: req.user._id });
    }

    const effectiveGoal = careerGoal || targetRole;

    if (effectiveGoal) {
      profile.careerGoal = effectiveGoal;
      profile.targetRole = effectiveGoal;
    }
    if (location !== undefined) profile.location = location;
    if (skills) profile.skills = skills;
    if (interests) profile.interests = interests;
    if (preferredLearningStyle) profile.preferredLearningStyle = preferredLearningStyle;
    if (preferredDifficulty) profile.preferredDifficulty = preferredDifficulty;
    if (weeklyStudyHours) profile.weeklyStudyHours = weeklyStudyHours;

    await profile.save();

    const user = await User.findById(req.user._id);
    if (name) user.name = name;
    if (location !== undefined) user.location = location;
    if (effectiveGoal) {
      user.careerGoal = effectiveGoal;
      user.targetRole = effectiveGoal;
    }
    if (skills) user.skills = skills;
    if (preferredLearningStyle) user.preferredLearningStyle = preferredLearningStyle;
    if (weeklyStudyHours) user.weeklyHours = weeklyStudyHours;
    await user.save();

    if (effectiveGoal || skills) {
      const activeGoal = effectiveGoal || user.careerGoal;
      Promise.all([
        adaptivePathService.generateLearningPath(req.user._id, activeGoal),
        recommendationEngine.generateRecommendationsForUser(req.user._id)
      ]).catch(err => console.error('Background AI Processing Error:', err.message));
    }

    res.json({
      success: true,
      profile: {
        ...profile.toObject(),
        location: user.location || profile.location || 'India',
      },
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        location: user.location || 'India',
        careerGoal: user.careerGoal,
        targetRole: user.targetRole || user.careerGoal,
        experienceLevel: user.experienceLevel,
        streak: user.streak,
        points: user.points,
        skills: user.skills,
        resume: user.resume,
        resumeData: user.resumeData,
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload Resume File (In-memory Serverless Safe)
// @route   POST /api/profile/resume
// @access  Private
const uploadResume = async (req, res, next) => {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ success: false, message: 'Please upload a valid document (PDF, DOCX, TXT)' });
    }

    const user = await User.findById(req.user._id);
    
    // In-memory structured resume parsing
    let parsedData = null;
    try {
      parsedData = await parseResumeFromBuffer(req.file.buffer, req.file.mimetype || 'application/pdf');
    } catch (parseErr) {
      console.warn('Initial in-memory parse warning:', parseErr.message);
      parsedData = {
        name: user.name,
        email: user.email,
        location: user.location || 'India',
        skills: [],
        education: [],
        experience: []
      };
    }

    user.resume = {
      fileName: req.file.originalname,
      filePath: null, // No disk path needed in serverless
      fileSize: req.file.size,
      mimetype: req.file.mimetype,
      uploadedAt: new Date()
    };

    if (parsedData) {
      user.resumeData = parsedData;
    }

    await user.save();

    res.json({
      success: true,
      message: 'Resume uploaded and parsed successfully',
      resume: user.resume,
      parsedData: user.resumeData
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Parse Uploaded Resume and Extract Structured Skills & Metadata
// @route   POST /api/profile/resume/parse
// @access  Private
const parseResume = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user.resume || !user.resume.fileName) {
      return res.status(400).json({ success: false, message: 'No uploaded resume found to parse' });
    }

    if (user.resumeData && (user.resumeData.skills?.length > 0 || user.resumeData.name)) {
      return res.json({
        success: true,
        data: user.resumeData
      });
    }

    // Default structured template if re-parsing empty
    const fallbackData = {
      name: user.name,
      email: user.email,
      location: user.location || 'India',
      skills: (user.skills || []).map(s => s.name),
      education: [],
      experience: []
    };

    res.json({
      success: true,
      data: fallbackData
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Save Confirmed Resume Data & Merge Skills into Profile
// @route   PUT /api/profile/resume-data
// @access  Private
const saveResumeData = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    let profile = await LearnerProfile.findOne({ user: req.user._id });
    
    if (!profile) {
      profile = await LearnerProfile.create({
        user: user._id,
        careerGoal: user.careerGoal || 'Full Stack Developer',
        targetRole: user.careerGoal || 'Full Stack Developer',
        skills: user.skills || [],
        preferredLearningStyle: user.preferredLearningStyle || 'Hands-on Projects',
        weeklyStudyHours: user.weeklyHours || 10,
      });
    }

    user.resumeData = {
      name: req.body.name || user.resumeData?.name,
      email: req.body.email || user.resumeData?.email,
      phone: req.body.phone || user.resumeData?.phone,
      location: req.body.location || user.resumeData?.location,
      linkedin: req.body.linkedin || user.resumeData?.linkedin,
      github: req.body.github || user.resumeData?.github,
      portfolio: req.body.portfolio || user.resumeData?.portfolio,
      education: req.body.education || user.resumeData?.education || [],
      experience: req.body.experience || user.resumeData?.experience || [],
      skills: req.body.skills || user.resumeData?.skills || [],
      projects: req.body.projects || user.resumeData?.projects || [],
      certifications: req.body.certifications || user.resumeData?.certifications || [],
      achievements: req.body.achievements || user.resumeData?.achievements || []
    };

    if (req.body.name && req.body.name.trim().length > 1) {
      user.name = req.body.name.trim();
    }

    if (req.body.education) {
      if (Array.isArray(req.body.education) && req.body.education.length > 0) {
        user.education = typeof req.body.education[0] === 'string' ? req.body.education[0] : (req.body.education[0].degree || req.body.education[0].institution || user.education);
      } else if (typeof req.body.education === 'string') {
        user.education = req.body.education;
      }
    }

    if (req.body.experience && Array.isArray(req.body.experience) && req.body.experience.length > 0) {
      profile.experience = req.body.experience.length > 2 ? 'Advanced' : 'Intermediate';
      user.experienceLevel = profile.experience;
    }

    // Merge skills with normalization & deduplication
    const incomingSkills = Array.isArray(req.body.skills) ? req.body.skills : [];
    if (incomingSkills.length > 0) {
      const existingMap = new Map();
      (user.skills || []).forEach(s => {
        const norm = normalizeSkillName(s.name || s.skill || '');
        if (norm) {
          existingMap.set(norm.toLowerCase().replace(/[^a-z0-9]/g, ''), {
            name: norm,
            level: s.level || s.progress || 30,
            category: s.category || 'Technical',
          });
        }
      });

      incomingSkills.forEach(sk => {
        const rawName = typeof sk === 'string' ? sk : (sk?.name || sk?.skill || '');
        const norm = normalizeSkillName(rawName);
        if (!norm) return;

        const key = norm.toLowerCase().replace(/[^a-z0-9]/g, '');
        const incomingLevel = (typeof sk === 'object' && sk.level) ? sk.level : 40;
        const incomingCategory = (typeof sk === 'object' && sk.category) ? sk.category : 'Technical';

        if (existingMap.has(key)) {
          const current = existingMap.get(key);
          current.level = Math.max(current.level, incomingLevel);
        } else {
          existingMap.set(key, {
            name: norm,
            level: incomingLevel,
            category: incomingCategory,
          });
        }
      });

      const mergedSkills = Array.from(existingMap.values());
      user.skills = mergedSkills;
      profile.skills = mergedSkills;
      await profile.save();
    }

    await user.save();

    // Trigger AI background recalculation
    const activeGoal = user.targetRole || user.careerGoal || 'Full Stack Developer';
    Promise.all([
      adaptivePathService.generateLearningPath(req.user._id, activeGoal),
      recommendationEngine.generateRecommendationsForUser(req.user._id)
    ]).catch(err => console.error('Background AI Sync Error:', err.message));

    res.json({
      success: true,
      profile: {
        name: user.name,
        skills: profile.skills,
        resumeData: user.resumeData
      },
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        careerGoal: user.careerGoal,
        targetRole: user.targetRole || user.careerGoal,
        experienceLevel: user.experienceLevel,
        streak: user.streak,
        points: user.points,
        skills: user.skills,
        resume: user.resume,
        resumeData: user.resumeData,
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete Resume
// @route   DELETE /api/profile/resume
// @access  Private
const deleteResume = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user.resume || (!user.resume.fileName && !user.resume.filePath)) {
      return res.status(400).json({ success: false, message: 'No resume found to delete' });
    }

    if (user.resume.filePath) {
      try {
        const fs = require('fs');
        if (fs.existsSync(user.resume.filePath)) {
          fs.unlinkSync(user.resume.filePath);
        }
      } catch (err) {
        console.warn('Resume file cleanup skipped:', err.message);
      }
    }

    user.resume = null;
    user.resumeData = null;
    await user.save();

    res.json({
      success: true,
      message: 'Resume deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
  updateProfile,
  uploadResume,
  parseResume,
  saveResumeData,
  deleteResume
};