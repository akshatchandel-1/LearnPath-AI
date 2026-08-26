const express = require('express');
const router = express.Router();
const { getLearningPath, generateLearningPath, adaptLearningPath } = require('../controllers/learningPathController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);
router.get('/', getLearningPath);
router.post('/generate', generateLearningPath);
router.post('/adapt', adaptLearningPath);

module.exports = router;
