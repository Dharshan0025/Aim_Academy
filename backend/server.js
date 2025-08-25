const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ✅ Serve static files from frontend folder
app.use(express.static(path.join(__dirname, '../frontend')));

// Serve uploads
app.use('/uploads/notes', express.static(path.join(__dirname, 'uploads/notes')));
app.use('/uploads', express.static('uploads'));


app.get('/faculty', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/faculty.html'));
});

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/aim_academy', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected!');
})
.catch(err => {
  console.error('Connection error:', err);
  process.exit(1);
});

// Routes
const authRoutes = require('./routes/auth');
app.use('/', authRoutes);

// admin
const adminRoutes = require('./routes/admin');
app.use('/admin', adminRoutes);

// ✅ Serve login.html at /login
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/login.html'));
});

// class schedule
const classScheduleRoutes = require('./routes/classSchedule');
app.use('/class-schedule', classScheduleRoutes);

// homework
const homeworkRoutes = require('./routes/homework');
app.use('/', homeworkRoutes);

// notes
const notesRoutes = require('./routes/notes');
app.use('/', notesRoutes);

const publicRoutes = require('./routes/public');
app.use('/', publicRoutes);

const courseRoutes = require('./routes/courses');
app.use('/courses', courseRoutes);

// payment
const paymentRoutes = require('./routes/payment');
app.use("/", paymentRoutes);




// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.use((err, req, res, next) => {
  console.error('🔥 Global Error Handler:', err);
  res.status(500).json({
    success: false,
    message: 'Something went wrong on the server',
    error: err.message
  });
});
