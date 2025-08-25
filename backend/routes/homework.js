const express = require('express');
const router = express.Router();
const Homework = require('../models/Homework');

// ✅ Faculty/Admin: Add Homework
router.post('/homework/add', async (req, res) => {
  try {
    const homework = new Homework(req.body);
    await homework.save();
    res.status(200).json({ message: 'Homework created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create homework', error: err.message });
  }
});

// ✅ Student: Get Homework List
router.get('/homework/all', async (req, res) => {
  try {
    const homeworks = await Homework.find();
    res.status(200).json(homeworks);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch homework', error: err.message });
  }
});

// ✅ Student: Submit Homework
router.post('/homework/submit/:id', async (req, res) => {
  try {
    const { studentName, studentId, answerText } = req.body;
    const submission = {
      studentName,
      studentId,
      answerText,
      submittedOn: new Date().toLocaleString()
    };

    await Homework.findByIdAndUpdate(req.params.id, {
      $push: { submissions: submission }
    });

    res.status(200).json({ message: 'Homework submitted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Submission failed', error: err.message });
  }
});

module.exports = router;
