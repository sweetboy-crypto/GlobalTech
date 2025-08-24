const Payment = require('../../models/Payment');

// @desc    Get all payments
// @route   GET /api/admin/payments
// @access  Private/Admin
const getAllPayments = async (req, res) => {
    try {
        // Sort by most recent first
        const payments = await Payment.find().sort({ created_at: -1 }).populate('user_id', 'name email');
        res.json(payments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    getAllPayments
};
