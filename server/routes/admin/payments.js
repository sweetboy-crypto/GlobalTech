const express = require('express');
const router = express.Router();
const { getAllPayments } = require('../../controllers/admin/paymentsController');
const { protect, admin } = require('../../middleware/authMiddleware');

router.get('/', protect, admin, getAllPayments);

module.exports = router;
