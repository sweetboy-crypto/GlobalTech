const express = require('express');
const router = express.Router();
const { getAllUsers, deleteUser, updateUser } = require('../../controllers/admin/usersController');
const { protect, admin } = require('../../middleware/authMiddleware');

// @route   GET /api/admin/users
// @desc    Get all users
// @access  Private/Admin
router.get('/', protect, admin, getAllUsers);

// @route   DELETE /api/admin/users/:id
// @desc    Delete a user
// @access  Private/Admin
router.delete('/:id', protect, admin, deleteUser);

// @route   PUT /api/admin/users/:id
// @desc    Update a user
// @access  Private/Admin
router.put('/:id', protect, admin, updateUser);

module.exports = router;
