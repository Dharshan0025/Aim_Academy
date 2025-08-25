const Razorpay = require('razorpay');
const express = require('express');
const router = express.Router();
const User = require('../models/User');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET
});

router.post('/create-order', async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount,
    currency: "INR",
    receipt: "receipt_" + Math.random().toString(36).substring(2, 8),
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error("Razorpay error:", err);
    res.status(500).json({ message: "Failed to create order" });
  }
});

router.post('/payment-success', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { email },
      { paymentStatus: "paid" },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "Payment updated to paid" });
  } catch (err) {
    console.error("Payment update error:", err);
    res.status(500).json({ message: "Failed to update status" });
  }
});

module.exports = router;
