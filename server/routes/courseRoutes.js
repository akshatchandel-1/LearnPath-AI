const express = require('express');
const router = express.Router();
const {
  getCourses,
  getCourseById,
  enrollInCourse,
  getEnrolledCourses,
  updateCourseProgress
} = require('../controllers/courseController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getCourses);

router.route('/enrolled')
  .get(protect, getEnrolledCourses);

router.route('/:id')
  .get(getCourseById);

router.route('/:id/enroll')
  .post(protect, enrollInCourse);

router.route('/:id/progress')
  .put(protect, updateCourseProgress);

module.exports = router;
