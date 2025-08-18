const mongoose = require('mongoose');

const PackageSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tracking_code: {
        type: String,
        required: true,
        unique: true
    },
    origin_city: { type: String, required: true },
    origin_country: { type: String, required: true },
    destination_city: { type: String, required: true },
    destination_country: { type: String, required: true },
    sender_name: { type: String, required: true },
    sender_email: { type: String },
    receiver_name: { type: String, required: true },
    receiver_email: { type: String },
    receiver_phone: { type: String, required: true },
    package_type: {
        type: String,
        enum: ['Document', 'Small Parcel', 'Medium Parcel', 'Large Parcel', 'Other'],
        required: true
    },
    transit_date: { type: Date },
    delivery_date: { type: Date },
    current_status: {
        type: String,
        enum: ['NotYetInTransit', 'InTransit', 'Delivered', 'EncounteredIssue', 'Delayed'],
        default: 'NotYetInTransit'
    },
    visibility: {
        type: String,
        enum: ['public', 'private'],
        default: 'public'
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Package', PackageSchema);
