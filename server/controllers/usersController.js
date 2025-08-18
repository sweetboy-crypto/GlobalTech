const crypto = require('crypto');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Log = require('../models/Log');
const sendEmail = require('../utils/sendEmail');

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
    const { name, email, phone, password, secret_key } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Create a new user
        user = new User({
            name,
            email,
            phone,
        });

        if (secret_key && secret_key === process.env.ADMIN_SECRET_KEY) {
            user.role = 'admin';
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        user.password_hash = await bcrypt.hash(password, salt);

        // Create verification token
        const verificationToken = crypto.randomBytes(32).toString('hex');
        user.email_verification_token = crypto
            .createHash('sha256')
            .update(verificationToken)
            .digest('hex');
        user.email_verification_expires = Date.now() + 10 * 60 * 1000; // 10 minutes

        await user.save();

        // Audit log
        const log = new Log({
            event_type: 'user.registered',
            details: { user_id: user._id, email: user.email }
        });
        await log.save();

        // Send verification email
        const verificationUrl = `${req.protocol}://${req.get('host')}/api/users/verifyemail/${verificationToken}`;
        const message = `Thank you for registering. Please verify your email by clicking on this link: \n\n ${verificationUrl} \n\n This link will expire in 10 minutes.`;

        try {
            await sendEmail({
                email: user.email,
                subject: 'Email Verification',
                message
            });

            res.status(200).json({ success: true, data: 'Email sent' });

        } catch (err) {
            console.error(err);
            user.email_verification_token = undefined;
            user.email_verification_expires = undefined;
            await user.save();
            return res.status(500).send('Email could not be sent');
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


// @desc    Authenticate user & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Create and return a JWT
        const payload = {
            user: {
                id: user.id
            }
        };

        // Audit log
        const log = new Log({
            event_type: 'user.login.success',
            details: { user_id: user._id, email: user.email }
        });
        await log.save();

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '5d' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password_hash');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


// @desc    Verify email
// @route   GET /api/users/verifyemail/:token
// @access  Public
const verifyEmail = async (req, res) => {
    // Get hashed token
    const email_verification_token = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');

    try {
        const user = await User.findOne({
            email_verification_token,
            email_verification_expires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid or expired token' });
        }

        user.email_verified = true;
        user.email_verification_token = undefined;
        user.email_verification_expires = undefined;
        await user.save();

        res.status(200).json({ success: true, msg: 'Email verified successfully. You can now log in.' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Accept terms of use
// @route   POST /api/users/accept-terms
// @access  Private
const acceptTerms = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        user.terms_acceptance.accepted = true;
        user.terms_acceptance.timestamp = Date.now();
        user.terms_acceptance.ip_address = req.ip;
        await user.save();
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    registerUser,
    loginUser,
    getMe,
    verifyEmail,
    acceptTerms
};
