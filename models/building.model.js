const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true, 
        trim: true
    },
    Department: [{
        type: Schema.Types.ObjectId,
        ref: 'Department'
    }],
    Hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital'
    }

}, {
    collection: 'Buildings',
    timestamps: { createdAt: 'CreatedAt', updatedAt: 'UpdatedAt' }
});

module.exports = mongoose.model('Building', PostSchema);
