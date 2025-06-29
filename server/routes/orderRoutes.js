// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// GET order by ID
router.get('/:orderId', async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
