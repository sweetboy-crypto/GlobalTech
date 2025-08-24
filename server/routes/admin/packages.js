const express = require('express');
const router = express.Router();
const { getAllPackages } = require('../../controllers/admin/packagesController');
const { protect, admin } = require('../../middleware/authMiddleware');

router.get('/', protect, admin, getAllPackages);

module.exports = router;
