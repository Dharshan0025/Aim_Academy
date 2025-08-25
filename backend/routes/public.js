const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// GET all courses (public access)
router.get('/public/courses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load courses' });
  }
});

module.exports = router;
