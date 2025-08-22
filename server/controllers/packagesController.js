const Package = require('../models/Package');
const StatusHistory = require('../models/StatusHistory');
const Payment = require('../models/Payment');
const User = require('../models/User');
const Log = require('../models/Log');

const generateTrackingCode = async () => {
    let trackingCode;
    let isUnique = false;
    while (!isUnique) {
        const date = new Date();
        const year = date.getFullYear().toString().slice(-2);
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const random = Math.random().toString().slice(2, 8);
        trackingCode = `PSX-${year}${month}${day}-${random}`;
        const existingPackage = await Package.findOne({ tracking_code: trackingCode });
        if (!existingPackage) {
            isUnique = true;
        }
    }
    return trackingCode;
};

// @desc    Create a new package
// @route   POST /api/packages
// @access  Private
const createPackage = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Rate limiting
        if (user.kyc_status !== 'approved') {
            const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
            const recentPackages = await Package.countDocuments({
                user_id: req.user.id,
                created_at: { $gte: twentyFourHoursAgo }
            });

            if (recentPackages >= 3) {
                return res.status(429).json({ msg: 'You have reached the limit of 3 packages per 24 hours. Please complete KYC to remove this limit.' });
            }
        }

        // Simple check to see if user has ever paid.
        

        const {
            origin_city, origin_country, destination_city, destination_country,
            sender_name, sender_email, receiver_name, receiver_email, receiver_phone,
            package_type, transit_date, delivery_date, current_status
        } = req.body;

        const tracking_code = await generateTrackingCode();

        const newPackage = new Package({
            user_id: req.user.id,
            tracking_code,
            origin_city, origin_country, destination_city, destination_country,
            sender_name, sender_email, receiver_name, receiver_email, receiver_phone,
            package_type, transit_date, delivery_date, current_status
        });

        const savedPackage = await newPackage.save();

        const statusHistory = new StatusHistory({
            package_id: savedPackage._id,
            changed_by: req.user.id,
            old_status: 'N/A',
            new_status: current_status,
            note: 'Package created.'
        });
        await statusHistory.save();

        // Audit log
        const log = new Log({
            event_type: 'package.created',
            details: { package_id: savedPackage._id, user_id: req.user.id, tracking_code: savedPackage.tracking_code }
        });
        await log.save();

        res.status(201).json(savedPackage);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get all packages for a user
// @route   GET /api/packages
// @access  Private
const getUserPackages = async (req, res) => {
    try {
        const packages = await Package.find({ user_id: req.user.id }).sort({ created_at: -1 });
        res.json(packages);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get package by tracking code
// @route   GET /api/packages/track/:trackingCode
// @access  Public
const getPackageByTrackingCode = async (req, res) => {
    try {
        const pkg = await Package.findOne({ tracking_code: req.params.trackingCode });
        if (!pkg) {
            return res.status(404).json({ msg: 'Package not found' });
        }
        const history = await StatusHistory.find({ package_id: pkg._id }).sort({ timestamp: -1 });
        res.json({ package: pkg, history });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Update a package
// @route   PUT /api/packages/:id
// @access  Private
const updatePackage = async (req, res) => {
    try {
        let pkg = await Package.findById(req.params.id);
        if (!pkg) {
            return res.status(404).json({ msg: 'Package not found' });
        }
        if (pkg.user_id.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        pkg = await Package.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.json(pkg);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Update package status
// @route   PUT /api/packages/:id/status
// @access  Private
const updatePackageStatus = async (req, res) => {
    try {
        const { status, note } = req.body;
        let pkg = await Package.findById(req.params.id);
        if (!pkg) {
            return res.status(404).json({ msg: 'Package not found' });
        }
        if (pkg.user_id.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        const oldStatus = pkg.current_status;
        pkg.current_status = status;
        await pkg.save();

        const statusHistory = new StatusHistory({
            package_id: pkg._id,
            changed_by: req.user.id,
            old_status: oldStatus,
            new_status: status,
            note: note || 'Status updated.'
        });
        await statusHistory.save();

        // Audit log
        const log = new Log({
            event_type: 'package.status.updated',
            details: { package_id: pkg._id, user_id: req.user.id, new_status: status, note }
        });
        await log.save();

        res.json(pkg);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    createPackage,
    getUserPackages,
    getPackageByTrackingCode,
    updatePackage,
    updatePackageStatus
};
