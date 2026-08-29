const express = require('express');
const router = express.Router();
const { getAllSkills, getSkillGapAnalysis, saveSkillGapAnalysis } = require('../controllers/skillController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getAllSkills);
router.get('/gap-analysis', protect, getSkillGapAnalysis);
router.post('/gap-analysis', protect, saveSkillGapAnalysis);

module.exports = router;
