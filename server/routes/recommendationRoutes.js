const express = require('express');
const router = express.Router();
const { getRecommendations, generateRecommendations, submitFeedback } = require('../controllers/recommendationController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);
router.get('/', getRecommendations);
router.post('/generate', generateRecommendations);
router.post('/:id/feedback', submitFeedback);

module.exports = router;
