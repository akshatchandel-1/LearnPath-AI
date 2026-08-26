const express = require('express');
const router = express.Router();
const {
  chatWithMentor,
  getMentorConversation,
  analyzeGoal,
  analyzeSkills,
  getInsights,
} = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

router.post('/analyze-goal', analyzeGoal);
router.post('/analyze-skills', analyzeSkills);
router.post('/chat', protect, chatWithMentor);
router.get('/conversation', protect, getMentorConversation);
router.get('/insights', protect, getInsights);

module.exports = router;
