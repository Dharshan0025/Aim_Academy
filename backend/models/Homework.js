const mongoose = require('mongoose');

const homeworkSchema = new mongoose.Schema({
  title: String,
  description: String,
  subject: String,
  dueDate: String,
  createdBy: String, // faculty/admin name
  submissions: [
    {
      studentName: String,
      studentId: String,
      submittedOn: String,
      answerText: String,
      marks: Number
    }
  ]
});

module.exports = mongoose.model('Homework', homeworkSchema);
