const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    full_name: String,
    phone: String,
    role: String,
    grade: String,
    school: String,
    student_id: String,
    qualification: String,
    subjects: [String],

    // 👇 New fields
    course: {
        type: String,
        default: null
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "paid"],
        default: "pending"
    }
});

module.exports = mongoose.model('User', userSchema);
