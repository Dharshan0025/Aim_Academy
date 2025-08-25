const mongoose = require('mongoose');

const classScheduleSchema = new mongoose.Schema({
  subject: String,
  day: String,
  time: String,
  zoomLink: String,
});

module.exports = mongoose.model('ClassSchedule', classScheduleSchema);
