const express = require('express');
const router = express.Router();
const { getUserProgress, updateProgress } = require('../controllers/progressController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);
router.get('/', getUserProgress);
router.post('/', updateProgress);

module.exports = router;
