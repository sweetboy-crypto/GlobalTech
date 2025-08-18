const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    gateway: {
        type: String,
        enum: ['Paystack', 'Flutterwave'],
        required: true
    },
    amount_currency: {
        type: String,
        required: true
    },
    amount_minor: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'paid', 'failed', 'refunded'],
        default: 'pending'
    },
    gateway_reference: {
        type: String,
        required: true
    },
    meta: {
        receipt_url: { type: String },
        screenshot_link: { type: String }
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Payment', PaymentSchema);
