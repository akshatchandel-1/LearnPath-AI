const Project = require('../models/Project');

// @desc    Get all recommended projects
// @route   GET /api/projects
// @access  Public
const getAllProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({}).sort({ difficulty: 1 });
    res.json({ success: true, count: projects.length, projects });
  } catch (error) {
    next(error);
  }
};

// @desc    Get project by ID
// @route   GET /api/projects/:id
// @access  Public
const getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.json({ success: true, project });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllProjects, getProjectById };
