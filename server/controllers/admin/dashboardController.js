const User = require('../../models/User');
const Payment = require('../../models/Payment');
const Package = require('../../models/Package');

// @desc    Get admin dashboard stats
// @route   GET /api/admin/dashboard/stats
// @access  Private/Admin
const getAdminStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalPayments = await Payment.aggregate([
            { $match: { status: 'paid' } },
            { $group: { _id: null, total: { $sum: '$amount_minor' } } }
        ]);
        const totalPackages = await Package.countDocuments();

        res.json({
            totalUsers,
            totalPayments: totalPayments.length > 0 ? totalPayments[0].total / 100 : 0,
            totalPackages
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    getAdminStats
};
