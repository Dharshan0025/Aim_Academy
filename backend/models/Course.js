const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  description: String,
  grade_level: String,    // e.g., "10th", "12th", "B.Sc", etc.
  duration: String,       // e.g., "6 months"
  fee: Number,
  category: String        // e.g., school, higher, engineering, competitive
});

module.exports = mongoose.model('Course', courseSchema);
