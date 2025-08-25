const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['Paid', 'Pending'], default: 'Pending' },
  paymentDate: { type: Date },
  paymentMethod: { type: String } // e.g., 'Online', 'Cash'
});

module.exports = mongoose.model('Fee', feeSchema);
