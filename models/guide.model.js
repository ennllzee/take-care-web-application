const mongoose = require('mongoose');
const { ReviewStatRating } = require('../Db/db.json')
const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema({
    FirstName: { type: String, required: true, trim: true },
    LastName: { type: String, required: true, trim: true },
    Gender: { type: String, required: true },
    DOB: { type: Date, required: true },
    Address: { type: String, required: true, trim: true },
    ContactAddress: { type: String, required: true, trim: true },
    PhoneNumber: { type: String, required: true, trim: true },
    Email: { type: String, required: true, trim: true },
    Gmail: { type: String, required: true, trim: true },
    IsVerified: { type: Boolean, default: false },
    Education: {
        Degree: { type: String, trim: true },
        Acadamy: { type: String, trim: true },
        Certificate: {
            type: Schema.Types.ObjectId,
            ref: 'GuideFile',
            default: null
        },
    },
    WorkExp: [{
        JobTitle: { type: String, trim: true },
        WorkPlace: { type: String, trim: true },
    }],
    LangSkill: [{
        Count: { type: Number },
        Language: { type: String, trim: true },
        Level: { type: Number },
    }],
    IdCard: { type: String, trim: true, default: null },
    FaceWithIdCard: {
        type: Schema.Types.ObjectId,
        ref: 'GuideFile',
        default: null
    },
    Workable: { type: Boolean, default: true },
    VerifyDate: { type: Date, require: true, default: null },
    GoogleId: { type: String, required: true },
    Avatar: {
        type: Schema.Types.ObjectId,
        ref: 'GuideProfileImg',
        default: null
    },
    Role: { type: String, required: true },
    Status: {
        Tag: { type: String, default: null },
        Details: [{ type: String, default: null, trim: true }],
    },
    Rating: { type: Number, default: 0 },
    Tips: { type: Number, default: ReviewStatRating[0] },

}, {
    collection: 'Guides',
    timestamps: { createdAt: 'CreatedAt', updatedAt: 'UpdatedAt' }
});

module.exports = mongoose.model('Guide', PostSchema);
