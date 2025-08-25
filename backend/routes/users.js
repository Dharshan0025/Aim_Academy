const express = require('express');
const router = express.Router();
const { auth, roleAuth } = require('../middleware/auth');
const User = require('../models/User');

// Get current user profile
router.get('/me', auth, async (req, res) => {
  res.send(req.user);
});

// Get all users (admin only)
router.get('/', auth, roleAuth(['admin']), async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;