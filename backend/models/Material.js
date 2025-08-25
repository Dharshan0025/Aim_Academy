const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,

  subject: {
    type: String,
    required: true
  },

  grade: {
    type: String, // e.g., "Grade 10"
    default: "General"
  },

  fileType: {
    type: String, // e.g., "pdf", "video"
    enum: ['pdf', 'video', 'doc', 'ppt', 'image'],
    default: 'pdf'
  },

  fileUrl: {
    type: String,
    required: true
  },

  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  uploadDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Material', materialSchema);
