// models/VideoLecture.js
const mongoose = require('mongoose');

const videoLectureSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: String,
  videoUrl: { type: String, required: true }, // link to video (YouTube or hosted)
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  uploadedOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('VideoLecture', videoLectureSchema);
