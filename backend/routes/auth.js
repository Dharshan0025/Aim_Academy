const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already registered" });

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    // respond with redirect path
    res.status(200).json({
      message: "User registered successfully",
      redirectTo: "/login"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    // Send success with user info
    res.status(200).json({
      message: "Login successful",
      role: user.role,
      course: user.course,             // ✅ for course selection check
      paymentStatus: user.paymentStatus, // ✅ for payment check
      redirectTo: `/dashboard/${user.role}`
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;
