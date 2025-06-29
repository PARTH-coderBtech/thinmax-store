// controllers/paymentController.js
const nodemailer = require("nodemailer");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/Order");
require("dotenv").config();
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

// ✅ Create Razorpay order
exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount,
      currency: "INR",
      receipt: `order_rcptid_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json({ order });
  } catch (err) {
    console.error("❌ Error creating Razorpay order:", err);
    res.status(500).json({ message: "Failed to create Razorpay order" });
  }
};

// ✅ Unified verifyPayment for both flows
exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
      cart,
      customer,
      productId,
      quantity,
      weight,
      name,
      email,
      phone,
      address,
      pincode,
    } = req.body;
     const trackUrl = `${process.env.CLIENT_URL}/track-order/${orderId}`;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      console.error("❌ Invalid Razorpay signature");
      return res.status(400).json({ message: "Invalid Razorpay signature" });
    }

    const orderData = {
      orderId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      paymentStatus: "Paid",
      createdAt: new Date(),
    };

    let customerEmail = "", customerName = "", summaryHTML = "";

    // Handle static or cart order
    if (cart && Array.isArray(cart)) {
      orderData.cart = cart;
      orderData.customer = customer;
      customerEmail = customer.email;
      customerName = customer.name;
      summaryHTML = `
        <h4>Your Order Summary:</h4>
        <ul>${cart.map(
        item => `<li>${item.name} (${item.weight}) x ${item.quantity} - ₹${item.pricePerUnit}</li>`
      ).join("")}</ul>
        <p>Total Items: ${cart.length}</p>
      `;
    } else {
      orderData.productId = productId;
      orderData.quantity = quantity;
      orderData.weight = weight;
      orderData.name = name;
      orderData.email = email;
      orderData.phone = phone;
      orderData.address = address;
      orderData.pincode = pincode;
      customerEmail = email;
      customerName = name;
      summaryHTML = `
        <h4>Your Order Summary:</h4>
        <ul>
          <li>Product: Thinmax Waterproofing</li>
          <li>Quantity: ${quantity}</li>
          <li>Weight: ${weight}</li>
        </ul>
      `;
    }

    let savedOrder;
    try {
      savedOrder = await Order.create(orderData);
    } catch (orderErr) {
      console.error("❌ Failed to save order:", orderErr);
      return res.status(500).json({ message: "Could not save order" });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Innodeeps Chemical" <${process.env.SENDER_EMAIL}>`,
      to: customerEmail,
      subject: "✅ Your Order is Confirmed - Thinmax",
      html: `
        <p>Hi ${customerName},</p>
        <p>Thank you for your order. Your payment has been successfully verified.</p>
        <p><strong>Order ID:</strong> ${orderId}</p>
        ${summaryHTML}
        <p>You can track your order at: <a href="${trackUrl}">Track Order</a></p>

        <p>We’ll notify you as it moves forward. <br />– Innodeeps Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);


    res.json({
      message: "Payment verified and email sent successfully",
      order: savedOrder,
    });

  } catch (err) {
    console.error("🔥 Full error stack:", err.stack);
    console.error("❌ Payment verification failed:", err);
    res.status(500).json({ message: "Server error during payment verification" });
  }
};
