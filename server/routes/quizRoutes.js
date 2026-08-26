const express = require('express');
const router = express.Router();
const { generateQuiz, submitQuiz, getQuizHistory } = require('../controllers/quizController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);
router.post('/generate', generateQuiz);
router.post('/submit', submitQuiz);
router.get('/history', getQuizHistory);

module.exports = router;
