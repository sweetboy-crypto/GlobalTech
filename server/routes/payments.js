const express = require('express');
const router = express.Router();
const { initiatePayment, verifyPaymentWebhook } = require('../controllers/paymentsController');
const { protect } = require('../middleware/authMiddleware');

// This route is protected, only logged in users can initiate a payment
router.post('/initiate', protect, initiatePayment);

// This route is not protected, it's for Paystack to call
router.post('/webhook', express.raw({type: 'application/json'}), verifyPaymentWebhook);

module.exports = router;
