const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema({
    AppointTime: {
        type: Date,
        default: null
    },
    BeginTime: {
        type: Date,
        default: null
    },
    EndTime: {
        type: Date,
        default: null
    },
    Customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        default: null
    },
    Guide: {
        type: Schema.Types.ObjectId,
        ref: 'Guide',
        default: null
    },
    Hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        default: null
    },
    Department: {
        type: Schema.Types.ObjectId,
        ref: 'Department',
        default: null
    },
    Review: {
        Star: { type: Number, default: null },
        Comment: { type: String, default: null, trim: true },
    },
    Record: [{
        At: { type: Date, default: null },
        Title: { type: String, default: null },
        Description: { type: String, default: null, trim: true },

    }],
    OpenLink: {
        type: String,
        default: null
    },
    Note: {
        type: String,
        default: null
    },
    Status: {
        Tag: { type: String, default: null },
        Details: [{ type: String, default: null, trim: true }],
    },
    Period: {
        //ใช้จองช่วงเวลา
        type: String,
        required: true,
        trim: true
    },
    Price: { type: Number, default: 0 }
}, {
    collection: 'Appointments',
    timestamps: { createdAt: 'CreatedAt', updatedAt: 'UpdatedAt' }
});

module.exports = mongoose.model('Appointment', PostSchema);
