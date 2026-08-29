const LearnerProfile = require('../models/LearnerProfile');
const User = require('../models/User');
const adaptivePathService = require('../services/adaptive/adaptivePathService');
const recommendationEngine = require('../services/recommendation/recommendationEngine');
const fs = require('fs');
const { parseResumeFromBuffer } = require('../utils/resumeParser');

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
        skills: req.user.skills || [],
        preferredLearningStyle: req.user.preferredLearningStyle || 'Hands-on Projects',
        weeklyStudyHours: req.user.weeklyHours || 10,
      });
    }

    const user = await User.findById(req.user._id).select('resume resumeData');

    res.json({ 
      success: true, 
      profile: {
        ...profile.toObject(),
        resume: user.resume,
        resumeData: user.resumeData
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user learner profile
// @route   PUT /api/profile
// @access  Private
const updateProfile = async (req, res, next) => {
  try {
    const { careerGoal, skills, interests, preferredLearningStyle, weeklyStudyHours, preferredDifficulty } = req.body;

    // Validation
    if (careerGoal !== undefined && typeof careerGoal !== 'string') {
      return res.status(400).json({ success: false, message: 'careerGoal must be a string' });
    }
    
    if (skills !== undefined) {
      if (!Array.isArray(skills)) {
        return res.status(400).json({ success: false, message: 'skills must be an array' });
      }
      for (const skill of skills) {
        if (!skill.name || typeof skill.name !== 'string') {
          return res.status(400).json({ success: false, message: 'Each skill must have a valid string name' });
        }
      }
    }

    const validLearningStyles = ['Video', 'Reading', 'Hands-on Projects', 'Practice Problems', 'Mixed'];
    if (preferredLearningStyle !== undefined && !validLearningStyles.includes(preferredLearningStyle)) {
      return res.status(400).json({ success: false, message: 'Invalid preferredLearningStyle' });
    }

    if (weeklyStudyHours !== undefined && (typeof weeklyStudyHours !== 'number' || weeklyStudyHours <= 0)) {
      return res.status(400).json({ success: false, message: 'weeklyStudyHours must be a positive number' });
    }

    const validDifficulties = ['Beginner', 'Intermediate', 'Advanced'];
    if (preferredDifficulty !== undefined && !validDifficulties.includes(preferredDifficulty)) {
      return res.status(400).json({ success: false, message: 'Invalid preferredDifficulty' });
    }

    let profile = await LearnerProfile.findOne({ user: req.user._id });
    if (!profile) {
      profile = new LearnerProfile({ user: req.user._id });
    }

    if (careerGoal !== undefined) profile.careerGoal = careerGoal;
    if (skills !== undefined) profile.skills = skills;
    if (interests !== undefined) profile.interests = interests;
    if (preferredLearningStyle !== undefined) profile.preferredLearningStyle = preferredLearningStyle;
    if (weeklyStudyHours !== undefined) profile.weeklyStudyHours = weeklyStudyHours;
    if (preferredDifficulty !== undefined) profile.preferredDifficulty = preferredDifficulty;

    await profile.save();

    // Update user document
    const user = await User.findById(req.user._id).select('-password');
    if (careerGoal !== undefined) user.careerGoal = careerGoal;
    if (skills !== undefined) user.skills = skills;
    if (preferredLearningStyle !== undefined) user.preferredLearningStyle = preferredLearningStyle;
    if (weeklyStudyHours !== undefined) user.weeklyHours = weeklyStudyHours;
    await user.save();

    // Regenerate roadmap & recommendations to reflect new profile asynchronously (Fire-and-forget)
    Promise.all([
      adaptivePathService.generateLearningPath(req.user._id),
      recommendationEngine.generateRecommendationsForUser(req.user._id)
    ]).catch(err => console.error('Background AI Processing Error:', err.message));

    res.json({ success: true, profile, user });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload Resume
// @route   POST /api/profile/resume
// @access  Private
const uploadResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload a file' });
    }

    const user = await User.findById(req.user._id);
    
    // Delete old resume file if it exists
    if (user.resume && user.resume.filePath && fs.existsSync(user.resume.filePath)) {
      try {
        fs.unlinkSync(user.resume.filePath);
      } catch (err) {
        console.error('Failed to delete old resume:', err);
      }
    }

    user.resume = {
      fileName: req.file.originalname,
      filePath: req.file.path,
      uploadedAt: Date.now()
    };
    
    await user.save();

    res.json({
      success: true,
      resume: user.resume
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Parse Resume
// @route   POST /api/profile/resume/parse
// @access  Private
const parseResume = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user.resume || !user.resume.filePath) {
      return res.status(404).json({ success: false, message: 'No resume found. Please upload a resume first.' });
    }

    if (!fs.existsSync(user.resume.filePath)) {
      return res.status(404).json({ success: false, message: 'Resume file not found on server.' });
    }

    const buffer = fs.readFileSync(user.resume.filePath);
    
    // Determine mimetype based on extension
    const ext = user.resume.fileName.split('.').pop().toLowerCase();
    let mimetype = 'application/pdf';
    if (ext === 'docx' || ext === 'doc') {
      mimetype = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    }

    const parsedData = await parseResumeFromBuffer(buffer, mimetype);

    res.json({
      success: true,
      data: parsedData
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Save Confirmed Resume Data
// @route   PUT /api/profile/resume-data
// @access  Private
const saveResumeData = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    let profile = await LearnerProfile.findOne({ user: req.user._id });
    
    user.resumeData = {
      name: req.body.name || user.resumeData?.name,
      email: req.body.email || user.resumeData?.email,
      phone: req.body.phone || user.resumeData?.phone,
      location: req.body.location || user.resumeData?.location,
      linkedin: req.body.linkedin || user.resumeData?.linkedin,
      github: req.body.github || user.resumeData?.github,
      portfolio: req.body.portfolio || user.resumeData?.portfolio,
      education: req.body.education || [],
      experience: req.body.experience || [],
      skills: req.body.skills || [],
      projects: req.body.projects || [],
      certifications: req.body.certifications || [],
      achievements: req.body.achievements || []
    };

    // Auto-fill core profile details from resume
    if (req.body.name) user.name = req.body.name;
    // We intentionally do not overwrite user.email to prevent login issues.

    // Merge skills into LearnerProfile & User
    if (profile && req.body.skills && req.body.skills.length > 0) {
      const existingSkillNames = profile.skills.map(s => s.name.toLowerCase());
      req.body.skills.forEach(skillStr => {
         if (!existingSkillNames.includes(skillStr.toLowerCase())) {
            const newSkill = { name: skillStr, level: 10, category: 'Extracted' };
            profile.skills.push(newSkill);
            user.skills.push(newSkill);
         }
      });
      await profile.save();
    }

    await user.save();

    res.json({
      success: true,
      profile: {
        name: user.name,
        skills: profile ? profile.skills : user.skills,
        resumeData: user.resumeData
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
    
    if (user.resume && user.resume.filePath && fs.existsSync(user.resume.filePath)) {
      try {
        fs.unlinkSync(user.resume.filePath);
      } catch (err) {
        console.error('Failed to delete resume file:', err);
      }
    }

    user.resume = { fileName: null, filePath: null, uploadedAt: null };
    user.resumeData = {
      name: null, email: null, phone: null, location: null, 
      linkedin: null, github: null, portfolio: null,
      education: [], experience: [], skills: [], projects: [], 
      certifications: [], achievements: []
    };

    await user.save();

    res.json({
      success: true,
      message: 'Resume removed successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getProfile, updateProfile, uploadResume, parseResume, saveResumeData, deleteResume };
