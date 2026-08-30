const express = require('express');
const router = express.Router();
const { getAllSkills, getSkillGapAnalysis, saveSkillGapAnalysis } = require('../controllers/skillController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getAllSkills);
router.get('/gap-analysis', protect, getSkillGapAnalysis);
router.get('/gap_analysis', protect, getSkillGapAnalysis);
router.post('/gap-analysis', protect, saveSkillGapAnalysis);
router.post('/gap_analysis', protect, saveSkillGapAnalysis);

module.exports = router;
