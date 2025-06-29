const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderId: String,
  razorpay_order_id: String,
  razorpay_payment_id: String,
  razorpay_signature: String,

  // For ThinmaxProductDetails
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: Number,
  weight: String,
  name: String,
  email: String,
  phone: String,
  address: String,
  pincode: String,

  // For ProductDetails cart
  cart: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      name: String,
      quantity: Number,
      weight: String,
      pricePerUnit: Number,
    }
  ],
  customer: {
    name: String,
    email: String,
    phone: String,
    address: String,
    pincode: String,
  },

  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
