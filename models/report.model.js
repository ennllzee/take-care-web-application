const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema({
    Title: { type: String, required: true, trim: true },
    Description: { type: String, trim: true },
    Reporter: mongoose.ObjectId,
    ResponseText: String,
    ResponseByAdmin: {
        type: Schema.Types.ObjectId,
        ref: 'Admin',
        default: null
    },

}, {
    collection: 'Reports',
    timestamps: { createdAt: 'CreatedAt', updatedAt: 'UpdatedAt' }
});

module.exports = mongoose.model('Report', PostSchema);
