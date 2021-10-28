const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema({
    ScheduleDate: {
        type: Date,
        required: true
    },
    AvailableMorning: {
        type: Boolean,
        required: true,
        default: true
    },
    AvailableAfternoon: {
        type: Boolean,
        required: true,
        default: true
    },
    Period: {
        type: String,
        required: true, 
        trim: true
    },
    WorkOnMorningAppointment: {
        type: Schema.Types.ObjectId,
        ref: 'Appointment',
        default: null
    },
    WorkOnAfternoonAppointment: {
        type: Schema.Types.ObjectId,
        ref: 'Appointment',
        default: null
    },
    Createdby: {
        type: Schema.Types.ObjectId,
        ref: 'Guide'
    },
    ScheduleMorningStatus: {
        Tag: { type: String, default: null, trim: true },
        Details: [{ type: String, default: null, trim: true }],
    },
    ScheduleAfternoonStatus: {
        Tag: { type: String, default: null, trim: true },
        Details: [{ type: String, default: null, trim: true }],
    }

}, {
    collection: 'GuideSchedules',
    timestamps: { createdAt: 'CreatedAt', updatedAt: 'UpdatedAt' }
});

module.exports = mongoose.model('GuideSchedule', PostSchema);
