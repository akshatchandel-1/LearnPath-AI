const express = require('express');
const router = express.Router();
const { getAllSkills, getSkillGapAnalysis } = require('../controllers/skillController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getAllSkills);
router.get('/gap-analysis', protect, getSkillGapAnalysis);

module.exports = router;
