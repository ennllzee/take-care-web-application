const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true, 
        trim: true
    },
    Address: { type: String, required: true, trim: true },
    Building: [{
        type: Schema.Types.ObjectId,
        ref: 'Building'
    }],
    Department: [{
        type: Schema.Types.ObjectId,
        ref: 'Department'
    }]

}, {
    collection: 'Hospitals',
    timestamps: { createdAt: 'CreatedAt', updatedAt: 'UpdatedAt' }
});

module.exports = mongoose.model('Hospital', PostSchema);
