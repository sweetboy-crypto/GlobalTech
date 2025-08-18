const mongoose = require('mongoose');

const StatusHistorySchema = new mongoose.Schema({
    package_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package',
        required: true
    },
    changed_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    old_status: {
        type: String,
        required: true
    },
    new_status: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('StatusHistory', StatusHistorySchema);
