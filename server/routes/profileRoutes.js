const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, uploadResume, parseResume, saveResumeData, deleteResume } = require('../controllers/profileController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

router.route('/')
  .get(protect, getProfile)
  .put(protect, updateProfile);

router.post('/resume', protect, upload.single('resume'), uploadResume);
router.post('/resume/parse', protect, parseResume);
router.put('/resume-data', protect, saveResumeData);
router.delete('/resume', protect, deleteResume);

module.exports = router;
