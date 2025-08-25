const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
  title: String,
  subject: String,
  fileUrl: String,
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Notes', notesSchema);
