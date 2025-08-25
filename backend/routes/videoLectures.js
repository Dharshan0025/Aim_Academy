const express = require('express');
const router = express.Router();
const VideoLecture = require('../models/VideoLecture');
const { auth, roleAuth } = require('../middleware/auth');

// Add video lecture (only faculty/admin)
router.post('/video-lectures/add', auth, roleAuth(['faculty', 'admin']), async (req, res) => {
  try {
    const videoLecture = new VideoLecture({ ...req.body, uploadedBy: req.user._id });
    await videoLecture.save();
    res.status(200).json({ message: 'Video lecture added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add video lecture', error: err.message });
  }
});

// Get all video lectures (any authenticated user)
router.get('/video-lectures/all', auth, async (req, res) => {
  try {
    const videos = await VideoLecture.find().populate('uploadedBy', 'name email');
    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch video lectures', error: err.message });
  }
});

module.exports = router;
