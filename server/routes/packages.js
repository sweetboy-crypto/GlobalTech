const express = require('express');
const router = express.Router();
const {
    createPackage,
    getPackageByTrackingCode,
    updatePackage,
    updatePackageStatus,
    getUserPackages
} = require('../controllers/packagesController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createPackage);
router.get('/', protect, getUserPackages);
router.get('/track/:trackingCode', getPackageByTrackingCode);
router.put('/:id', protect, updatePackage);
router.put('/:id/status', protect, updatePackageStatus);

module.exports = router;
