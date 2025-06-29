const express = require('express');
const router = express.Router();
const { createOrder, verifyPayment } = require('../controllers/paymentController');

// Create Razorpay order
router.post('/create-order', createOrder);

// Verify Razorpay payment
router.post('/verify', verifyPayment);
router.get("/test", (req, res) => {
  console.log("🧪 /api/payment/test hit");
  res.json({ message: "Test route works" });
});


module.exports = router;
