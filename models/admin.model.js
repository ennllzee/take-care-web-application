const mongoose = require('mongoose');

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
    Education: {
        Degree: { type: String, trim: true },
        Acadamy: { type: String, trim: true },
        Certificate: {
            type: Schema.Types.ObjectId,
            ref: 'AdminFile',
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
    IdCard: { type: String, trim: true },
    FaceWithIdCard:  {
        type: Schema.Types.ObjectId,
        ref: 'AdminFile',
        default: null
    },
    GoogleId: { type: String, required: true },
    Avatar:  {
        type: Schema.Types.ObjectId,
        ref: 'AdminFile',
        default: null
    },
    Role: { type: String, required: true, default: null },

}, {
    collection: 'Admins',
    timestamps: { createdAt: 'CreatedAt', updatedAt: 'UpdatedAt' }
});

module.exports = mongoose.model('Admin', PostSchema);
