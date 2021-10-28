const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    Title: { type: String, required: true, trim: true },
}, {
    collection: 'RecTitleKeywords',
});

module.exports = mongoose.model('RecordTitle', PostSchema);
