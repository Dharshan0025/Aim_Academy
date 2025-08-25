const express = require('express');
const router = express.Router();
const Course = require('../models/Course'); // Assuming you have a Mongoose model

// POST: Add a course
router.post('/add', async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json({ message: 'Course added successfully', course });
  } catch (error) {
    res.status(400).json({ error: 'Failed to add course' });
  }
});

// GET: Get all courses
router.get('/all', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});


router.post('/select-course', async (req, res) => {
  const { email, course } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { email },
      { course, paymentStatus: "pending" },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Course selected successfully" });
  } catch (err) {
    console.error("Course selection error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
