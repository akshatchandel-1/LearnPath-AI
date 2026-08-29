const express = require('express');
const router = express.Router();
const { getQuizzes, getQuizById, generateQuiz, submitQuiz, getQuizHistory } = require('../controllers/quizController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);
router.get('/', getQuizzes);
router.get('/history', getQuizHistory);
router.get('/:id', getQuizById);
router.post('/generate', generateQuiz);
router.post('/submit', submitQuiz);

module.exports = router;
