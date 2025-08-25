const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const Notes = require('../models/Notes');
// POST /notes/add
router.post('/notes/add', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const { title, subject } = req.body;

    const newNote = new Notes({
      title,
      subject,
      fileUrl: `/uploads/notes/${req.file.filename}`
    });

    await newNote.save();

    res.status(200).json({ success: true, message: 'Note uploaded successfully' });
  } catch (error) {
    console.error('❌ /notes/add error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all notes

router.get('/notes/all', async (req, res) => {
  try {
    const notes = await Notes.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (err) {
    console.error("Error fetching notes:", err);  // 👈 ADD THIS
    res.status(500).json({ message: 'Failed to fetch notes' });
  }
});


module.exports = router;
