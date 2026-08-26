const Resource = require('../models/Resource');

// @desc    Get all resources with filtering
// @route   GET /api/resources
// @access  Public
const getAllResources = async (req, res, next) => {
  try {
    const { skill, type, difficulty, search } = req.query;
    const query = {};

    if (skill) query.skills = { $in: [skill] };
    if (type) query.type = type;
    if (difficulty) query.difficulty = difficulty;
    if (search) query.$text = { $search: search };

    const resources = await Resource.find(query).sort({ rating: -1, likesCount: -1 });
    res.json({ success: true, count: resources.length, resources });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single resource
// @route   GET /api/resources/:id
// @access  Public
const getResourceById = async (req, res, next) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ success: false, message: 'Resource not found' });
    }
    res.json({ success: true, resource });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllResources, getResourceById };
