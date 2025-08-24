const Package = require('../../models/Package');

// @desc    Get all packages
// @route   GET /api/admin/packages
// @access  Private/Admin
const getAllPackages = async (req, res) => {
    try {
        // Sort by most recent first
        const packages = await Package.find().sort({ created_at: -1 }).populate('user_id', 'name email');
        res.json(packages);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    getAllPackages
};
