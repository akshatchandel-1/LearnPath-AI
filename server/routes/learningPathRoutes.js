const express = require('express');
const router = express.Router();
const { getLearningPath, createLearningPath, updateLearningPath, generateLearningPath, adaptLearningPath } = require('../controllers/learningPathController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);
router.get('/', getLearningPath);
router.post('/', createLearningPath);
router.put('/', updateLearningPath);
router.post('/generate', generateLearningPath);
router.post('/adapt', adaptLearningPath);

module.exports = router;
