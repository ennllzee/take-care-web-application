const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema({
    FirstName: { type: String, required: true, trim: true },
    LastName: { type: String, required: true, trim: true },
    Gender: { type: String, required: true, trim: true },
    DOB: { type: Date, required: true },
    PhoneNumber: { type: String, required: true, trim: true },
    Email: { type: String, required: true, trim: true },
    Gmail: { type: String, required: true, trim: true },
    EmergencyTel: { type: String, trim: true },
    GoogleId: { type: String, required: true },
    Avatar: {
        type: Schema.Types.ObjectId,
        ref: 'CustomerProfileImg',
        default: null
    },
    CongenitalDisorders: { type: String, default: null, trim: true },
    Role: { type: String, required: true, default: null, trim: true }

}, {
    collection: 'Customers',
    timestamps: { createdAt: 'CreatedAt', updatedAt: 'UpdatedAt' }
});

module.exports = mongoose.model('Customer', PostSchema);
