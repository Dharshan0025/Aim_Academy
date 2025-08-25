const express = require('express');
const router = express.Router();
const ClassSchedule = require('../models/ClassSchedule');

// Add new class schedule (faculty/admin only)
router.post('/add', async (req, res) => {
  try {
    const { subject, day, time, zoomLink } = req.body;
    const schedule = new ClassSchedule({ subject, day, time, zoomLink });
    await schedule.save();
    res.json({ message: 'Class schedule added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error adding schedule' });
  }
});

// Get all class schedules for student
router.get('/all', async (req, res) => {
  try {
    const schedules = await ClassSchedule.find();
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching schedules' });
  }
});

module.exports = router;
