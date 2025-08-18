const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe, verifyEmail, acceptTerms } = require('../controllers/usersController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.get('/verifyemail/:token', verifyEmail);
router.post('/accept-terms', protect, acceptTerms);

module.exports = router;
