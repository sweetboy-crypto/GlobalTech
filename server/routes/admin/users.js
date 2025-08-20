const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../../controllers/admin/usersController');
const { protect, admin } = require('../../middleware/authMiddleware');

// @route   GET /api/admin/users
// @desc    Get all users
// @access  Private/Admin
router.get('/', protect, admin, getAllUsers);

module.exports = router;
