const express = require('express');
const router = express.Router();
const { registerUser, loginUser, demoLogin, getMe, logoutUser } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/signup', registerUser);
router.post('/register', registerUser); // Alias for compatibility
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/demo-login', demoLogin);
router.get('/me', protect, getMe);

module.exports = router;
