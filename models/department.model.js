const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true, 
        trim: true
    },
    Details: { type: String, default: null, trim: true },
    Room: { 
        type: Schema.Types.ObjectId,
        ref: 'Room',
        default: null
    },
    Building: {
        type: Schema.Types.ObjectId,
        ref: 'Building'
    },
    Hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital'
    },

}, {
    collection: 'Departments',
    timestamps: { createdAt: 'CreatedAt', updatedAt: 'UpdatedAt' }
});

module.exports = mongoose.model('Department', PostSchema);
