// routes/admin.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { auth, roleAuth } = require('../middleware/auth');
const Material = require('../models/Material');
const Course = require('../models/Course');
const Performance = require('../models/Performance');
const multer = require('multer');
const path = require('path');

// Set up storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // folder to store files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // unique name
  }
});

const upload = multer({ storage: storage });


router.get('/dashboard', async (req, res) => {
  res.send('Welcome to the Admin Dashboard');
});

// View all users by role
router.get('/users', async (req, res) => {
  try {
    const students = await User.find({ role: 'student' });
    const faculty = await User.find({ role: 'faculty' });
    const parents = await User.find({ role: 'parent' });

    res.json({ students, faculty, parents });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create student
router.post('/students', async (req, res) => {
  try {
    const { username, email, password, full_name, grade, school } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already in use" });

    const hashedPassword = await require('bcrypt').hash(password, 10);

    const student = new User({
      username,
      email,
      password: hashedPassword,
      full_name,
      grade,
      school,
      role: 'student'
    });

    await student.save();
    res.status(201).json({ message: 'Student added', student });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update student
router.put('/students/:id', async (req, res) => {
  try {
    const updatedStudent = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Student updated', student: updatedStudent });
  } catch (err) {
    res.status(500).json({ message: 'Update failed' });
  }
});

// Delete student
router.delete('/students/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed' });
  }
});

// Create faculty
router.post('/faculty', async (req, res) => {
  try {
    const { username, email, password, full_name, qualification, subjects } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already in use" });

    const hashedPassword = await require('bcrypt').hash(password, 10);

    const faculty = new User({
      username,
      email,
      password: hashedPassword,
      full_name,
      qualification,
      subjects,
      role: 'faculty'
    });

    await faculty.save();
    res.status(201).json({ message: 'Faculty added', faculty });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update faculty
router.put('/faculty/:id', async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Faculty updated', faculty: updated });
  } catch (err) {
    res.status(500).json({ message: 'Update failed' });
  }
});

// Delete faculty
router.delete('/faculty/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Faculty deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed' });
  }
});


// Assign subjects to a student
router.put('/students/:id/assign-subjects', async (req, res) => {
  try {
    const { subjects } = req.body; // array: ['Math', 'Science']
    const student = await User.findByIdAndUpdate(
      req.params.id,
      { subjects },
      { new: true }
    );
    res.json({ message: 'Subjects assigned to student', student });
  } catch (err) {
    res.status(500).json({ message: 'Error assigning subjects' });
  }
});

// Assign subjects to a faculty
router.put('/faculty/:id/assign-subjects', async (req, res) => {
  try {
    const { subjects } = req.body;
    const faculty = await User.findByIdAndUpdate(
      req.params.id,
      { subjects },
      { new: true }
    );
    res.json({ message: 'Subjects assigned to faculty', faculty });
  } catch (err) {
    res.status(500).json({ message: 'Error assigning subjects' });
  }
});




// Upload material
router.post('/materials', async (req, res) => {
  try {
    const { title, description, subject, fileUrl, uploadedBy } = req.body;

    const material = new Material({
      title,
      description,
      subject,
      fileUrl,
      uploadedBy
    });

    await material.save();
    res.status(201).json({ message: 'Material uploaded', material });
  } catch (err) {
    res.status(500).json({ message: 'Upload failed' });
  }
});

// Get materials by subject
router.get('/materials/:subject', async (req, res) => {
  try {
    const materials = await Material.find({ subject: req.params.subject });
    res.json(materials);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching materials' });
  }
});

const Fee = require('../models/Fee');

// Add fee payment record
router.post('/fees', async (req, res) => {
  try {
    const { student, course, amount, status, paymentDate, paymentMethod } = req.body;
    const fee = new Fee({ student, course, amount, status, paymentDate, paymentMethod });
    await fee.save();
    res.status(201).json({ message: 'Fee record saved', fee });
  } catch (err) {
    res.status(500).json({ message: 'Error saving fee' });
  }
});

// View all fee records
router.get('/fees', async (req, res) => {
  try {
    const fees = await Fee.find().populate('student', 'full_name email');
    res.json(fees);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching fees' });
  }
});

// View fee records for a specific student
router.get('/fees/:studentId', async (req, res) => {
  try {
    const fees = await Fee.find({ student: req.params.studentId }).populate('student', 'full_name email');
    res.json(fees);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching student fees' });
  }
});



// Add or update performance
router.post('/performance', async (req, res) => {
  try {
    const { student, subject, testName, score, total, date } = req.body;

    const record = new Performance({
      student,
      subject,
      testName,
      score,
      total,
      date
    });

    await record.save();
    res.status(201).json({ message: 'Performance recorded', record });
  } catch (err) {
    res.status(500).json({ message: 'Error recording performance' });
  }
});

// Get all performance of a student
router.get('/performance/:studentId', async (req, res) => {
  try {
    const results = await Performance.find({ student: req.params.studentId });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching performance' });
  }
});




// 🔽 Get all courses
router.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching courses' });
  }
});

// ➕ Add a course
router.post('/courses', async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json({ message: 'Course added successfully', course });
  } catch (err) {
    res.status(500).json({ message: 'Error adding course' });
  }
});

// 📝 Update a course
router.put('/courses/:id', async (req, res) => {
  try {
    const updated = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Course updated', course: updated });
  } catch (err) {
    res.status(500).json({ message: 'Error updating course' });
  }
});

// ❌ Delete a course
router.delete('/courses/:id', async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting course' });
  }
});

module.exports = router;
