const User = require('../models/User');
const LearnerProfile = require('../models/LearnerProfile');
const adaptivePathService = require('../services/adaptive/adaptivePathService');
const recommendationEngine = require('../services/recommendation/recommendationEngine');
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
        targetRole: req.user.careerGoal || 'Full Stack MERN Developer',
        skills: req.user.skills || [],
        preferredLearningStyle: req.user.preferredLearningStyle || 'Hands-on Projects',
        weeklyStudyHours: req.user.weeklyHours || 10,
      });
    }

    res.json({
      success: true,
      profile,
      user: {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        careerGoal: req.user.careerGoal,
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
    if (skills) profile.skills = skills;
    if (interests) profile.interests = interests;
    if (preferredLearningStyle) profile.preferredLearningStyle = preferredLearningStyle;
    if (preferredDifficulty) profile.preferredDifficulty = preferredDifficulty;
    if (weeklyStudyHours) profile.weeklyStudyHours = weeklyStudyHours;

    await profile.save();

    const user = await User.findById(req.user._id);
    if (name) user.name = name;
    if (effectiveGoal) {
      user.careerGoal = effectiveGoal;
      user.targetRole = effectiveGoal;
    }
    if (skills) user.skills = skills;
    if (preferredLearningStyle) user.preferredLearningStyle = preferredLearningStyle;
    if (weeklyStudyHours) user.weeklyHours = weeklyStudyHours;
    await user.save();

    // Trigger AI background recalibration only if goal or skills changed
    if (effectiveGoal || skills) {
      const activeGoal = effectiveGoal || user.careerGoal;
      Promise.all([
        adaptivePathService.generateLearningPath(req.user._id, activeGoal),
        recommendationEngine.generateRecommendationsForUser(req.user._id)
      ]).catch(err => console.error('Background AI Processing Error:', err.message));
    }

    res.json({ success: true, profile, user });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload Resume File
// @route   POST /api/profile/resume
// @access  Private
const uploadResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload a valid document (PDF, DOCX, TXT)' });
    }

    const user = await User.findById(req.user._id);
    user.resume = {
      fileName: req.file.originalname,
      filePath: req.file.path,
      fileSize: req.file.size,
      mimetype: req.file.mimetype,
      uploadedAt: new Date()
    };
    await user.save();

    res.json({
      success: true,
      message: 'Resume uploaded successfully',
      resume: user.resume
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
    if (!user.resume || !user.resume.filePath) {
      return res.status(400).json({ success: false, message: 'No uploaded resume found to parse' });
    }

    const fs = require('fs');
    if (!fs.existsSync(user.resume.filePath)) {
      return res.status(404).json({ success: false, message: 'Resume file not found on disk' });
    }

    const buffer = fs.readFileSync(user.resume.filePath);
    const mimetype = user.resume.mimetype || 'application/pdf';

    const parsedData = await parseResumeFromBuffer(buffer, mimetype);

    res.json({
      success: true,
      data: parsedData
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
      education: req.body.education || [],
      experience: req.body.experience || [],
      skills: req.body.skills || [],
      projects: req.body.projects || [],
      certifications: req.body.certifications || [],
      achievements: req.body.achievements || []
    };

    if (req.body.name && req.body.name.trim().length > 1) {
      user.name = req.body.name.trim();
    }

    // Merge skills into LearnerProfile & User with normalization
    const incomingSkills = Array.isArray(req.body.skills) ? req.body.skills : [];
    if (incomingSkills.length > 0) {
      const existingSkillNames = new Set(
        (user.skills || []).map(s => (s.name || s.skill || '').toLowerCase().trim())
      );

      incomingSkills.forEach(sk => {
        const skillName = typeof sk === 'string' ? sk.trim() : (sk?.name || sk?.skill || '').trim();
        if (skillName && !existingSkillNames.has(skillName.toLowerCase())) {
          existingSkillNames.add(skillName.toLowerCase());
          const newSkill = {
            name: skillName,
            level: (typeof sk === 'object' && sk.level) ? sk.level : 30,
            category: (typeof sk === 'object' && sk.category) ? sk.category : 'Technical',
          };
          user.skills.push(newSkill);
          profile.skills.push(newSkill);
        }
      });
      await profile.save();
    }

    await user.save();

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
    if (!user.resume || !user.resume.filePath) {
      return res.status(400).json({ success: false, message: 'No resume found to delete' });
    }

    const fs = require('fs');
    if (fs.existsSync(user.resume.filePath)) {
      try {
        fs.unlinkSync(user.resume.filePath);
      } catch (err) {
        console.error('Failed to unlink resume file:', err.message);
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
