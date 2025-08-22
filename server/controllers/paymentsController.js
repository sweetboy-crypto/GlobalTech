const crypto = require('crypto');
const axios = require('axios');
const Payment = require('../models/Payment');
const User = require('../models/User');
const Log = require('../models/Log');

const PAYSTACK_API_URL = 'https://api.paystack.co';

// @desc    Initiate a new payment
// @route   POST /api/payments/initiate
// @access  Private
const initiatePayment = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const amount = 20000 * 100; // 20,000 NGN in kobo
        const currency = 'NGN';

        const response = await axios.post(`${PAYSTACK_API_URL}/transaction/initialize`, {
            email: user.email,
            amount: amount,
            currency: currency,
            callback_url: `${process.env.FRONTEND_URL}/payment/callback` // You'll need to set FRONTEND_URL in .env
        }, {
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
            }
        });

        const { authorization_url, access_code, reference } = response.data.data;

        const payment = new Payment({
            user_id: user._id,
            gateway: 'Paystack',
            amount_currency: currency,
            amount_minor: amount,
            status: 'pending',
            gateway_reference: reference,
        });

        await payment.save();

        res.status(200).json({ authorization_url });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


// @desc    Verify Paystack webhook
// @route   POST /api/payments/webhook
// @access  Public
const verifyPaymentWebhook = async (req, res) => {
    const secret = process.env.PAYSTACK_SECRET_KEY;
    const hash = crypto.createHmac('sha512', secret).update(req.body).digest('hex');

    if (hash == req.headers['x-paystack-signature']) {
        const event = JSON.parse(req.body.toString());

        if (event.event === 'charge.success') {
        const reference = event.data.reference;
        const payment = await Payment.findOne({ gateway_reference: reference });
        if (payment) {
            payment.status = 'paid';
            await payment.save();

            const log = new Log({
                event_type: 'payment.success',
                details: {
                    payment_id: payment._id,
                    user_id: payment.user_id,
                    gateway: 'Paystack',
                    reference: reference
                }
            });
            await log.save();
            
            const user = await User.findById(payment.user_id);
            if (user) {
                const sendEmail = require('../utils/sendEmail');
                await sendEmail({
                    email: user.email,
                    subject: 'Payment Received!',
                    message: `Hi ${user.name},\n\nWe have successfully received your payment of NGN ${payment.amount_minor / 100}.\n\nYou can now proceed to create a new package.\n\nThank you for using ParcelSim Express.`
                });
            }
        }
    res.sendStatus(200);
} catch (err) {
    console.error("Webhook processing error:", err.message);
    res.sendStatus(400); // Send a bad request status if parsing fails
}
};


module.exports = {
    initiatePayment,
    verifyPaymentWebhook
};
