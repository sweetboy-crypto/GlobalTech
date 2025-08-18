const express = require('express');
const router = express.Router();
const { getAdminStats } = require('../../controllers/admin/dashboardController');
const { protect, admin } = require('../../middleware/authMiddleware');

router.get('/stats', protect, admin, getAdminStats);

module.exports = router;
