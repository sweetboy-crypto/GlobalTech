const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
    event_type: {
        type: String,
        required: true
    },
    details: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: false }
});

module.exports = mongoose.model('Log', LogSchema);
