const Resource = require('../models/Resource');
const Progress = require('../models/Progress');
const User = require('../models/User');
const statisticsService = require('../services/statisticsService');

// @desc    Get all courses (Resources with type === 'Course')
// @route   GET /api/courses
// @access  Public
const getCourses = async (req, res, next) => {
  try {
    const { search, skill, difficulty } = req.query;
    const query = { type: 'Course' };

    if (search) query.$text = { $search: search };
    if (skill) query.skills = { $in: [skill] };
    if (difficulty) query.difficulty = difficulty;

    const courses = await Resource.find(query).sort({ rating: -1, likesCount: -1 });
    res.json({ success: true, count: courses.length, courses });
  } catch (error) {
    next(error);
  }
};

// @desc    Get course by ID
// @route   GET /api/courses/:id
// @access  Public
const getCourseById = async (req, res, next) => {
  try {
    const course = await Resource.findOne({ _id: req.params.id, type: 'Course' });
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    res.json({ success: true, course });
  } catch (error) {
    // Return 400 for CastError (invalid Object ID)
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid course ID' });
    }
    next(error);
  }
};

// @desc    Enroll in a course
// @route   POST /api/courses/:id/enroll
// @access  Private
const enrollInCourse = async (req, res, next) => {
  try {
    const course = await Resource.findOne({ _id: req.params.id, type: 'Course' });
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    // Check if already enrolled
    let progress = await Progress.findOne({ user: req.user._id, resource: course._id });
    
    if (progress) {
      return res.json({ success: true, message: 'Already enrolled in this course', progress });
    }

    // Create new enrollment progress
    progress = await Progress.create({
      user: req.user._id,
      resource: course._id,
      status: 'not-started',
      progressPercent: 0,
      timeSpentMinutes: 0
    });

    res.status(201).json({ success: true, message: 'Successfully enrolled', progress });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid course ID' });
    }
    next(error);
  }
};

// @desc    Get enrolled courses for the current user
// @route   GET /api/courses/enrolled
// @access  Private
const getEnrolledCourses = async (req, res, next) => {
  try {
    const progressRecords = await Progress.find({ user: req.user._id }).populate('resource');
    
    // Filter to only return resources that are 'Course' type (since progress is shared for other resource types)
    const courseProgressRecords = progressRecords.filter(p => p.resource && p.resource.type === 'Course');
    
    res.json({ success: true, count: courseProgressRecords.length, enrolledCourses: courseProgressRecords });
  } catch (error) {
    next(error);
  }
};

// @desc    Update course progress
// @route   PUT /api/courses/:id/progress
// @access  Private
const updateCourseProgress = async (req, res, next) => {
  try {
    const { progressPercent, status, timeSpentMinutes } = req.body;

    const course = await Resource.findOne({ _id: req.params.id, type: 'Course' });
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    // Validation
    if (progressPercent !== undefined && (typeof progressPercent !== 'number' || progressPercent < 0 || progressPercent > 100)) {
      return res.status(400).json({ success: false, message: 'progressPercent must be a number between 0 and 100' });
    }

    const validStatuses = ['not-started', 'in-progress', 'completed', 'skipped'];
    if (status !== undefined && !validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    if (timeSpentMinutes !== undefined && (typeof timeSpentMinutes !== 'number' || timeSpentMinutes < 0)) {
      return res.status(400).json({ success: false, message: 'timeSpentMinutes must be a non-negative number' });
    }

    let progress = await Progress.findOne({ user: req.user._id, resource: course._id });

    if (!progress) {
      return res.status(404).json({ success: false, message: 'Not enrolled in this course' });
    }

    if (status) progress.status = status;
    if (progressPercent !== undefined) progress.progressPercent = progressPercent;
    if (timeSpentMinutes !== undefined) progress.timeSpentMinutes += timeSpentMinutes; // Increment time

    if (status === 'completed' && !progress.completedAt) {
      progress.completedAt = new Date();
      progress.progressPercent = 100;

      await User.findByIdAndUpdate(req.user._id, {
        $addToSet: { completedResources: course._id },
      });

      await statisticsService.recordActivity(req.user._id, {
        type: 'resource_completion',
        title: `Completed Course: ${course.title}`,
        xpEarned: 100, // Or dynamic based on course
        durationMinutes: progress.timeSpentMinutes || 60,
      });
    }

    await progress.save();
    
    // We can also fetch the updated stats to return them, similar to progressController.js
    const stats = await statisticsService.calculateUserStatistics(req.user._id);

    res.json({ success: true, progress, stats });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid course ID' });
    }
    next(error);
  }
};

module.exports = {
  getCourses,
  getCourseById,
  enrollInCourse,
  getEnrolledCourses,
  updateCourseProgress
};
