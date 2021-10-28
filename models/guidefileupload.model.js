const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const fileSchema = new Schema({
  filename: String,
  mimetype: String,
  data: Buffer,
},{
    collection: 'GuideFiles',
    timestamps: { createdAt: 'CreatedAt', updatedAt: 'UpdatedAt' }
});

module.exports = mongoose.model('GuideFile', fileSchema);