// controllers/paymentController.js
const nodemailer = require("nodemailer");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/Order");
const twilio = require("twilio");
require("dotenv").config();
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

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
    let totalItems = 0;
    let totalPrice = 0;

    if (cart && Array.isArray(cart)) {
      orderData.cart = cart;
      orderData.customer = customer;
      customerEmail = customer.email;
      customerName = customer.name;

      summaryHTML = `
        <h4>Your Order Summary:</h4>
        <ul>
          ${cart.map(item => {
            const adjustedPrice = item.weight === '1kg'
              ? item.pricePerUnit
              : item.pricePerUnit;

            const itemTotal = adjustedPrice * item.quantity;
            totalItems += item.quantity;
            totalPrice += itemTotal;

            return `
              <li>${item.name} (${item.weight}) x ${item.quantity}</li>
              <li>Price Per Unit: ₹${adjustedPrice}</li>
              <li>Subtotal: ₹${itemTotal}</li>
            `;
          }).join("")}
        </ul>
        <p><strong>Total Items:</strong> ${totalItems}</p>
        <p><strong>Total Payable Amount:</strong> ₹${totalPrice}</p>
      `;

      orderData.totalItems = totalItems;
      orderData.totalPrice = totalPrice;

    } else {
      // Single product order (not cart-based)
      const adjustedPrice = weight === '1kg' ? 499 * 2 - 98 : 499;
      totalItems = quantity;
      totalPrice = adjustedPrice * quantity;

      orderData.productId = productId;
      orderData.quantity = quantity;
      orderData.weight = weight;
      orderData.name = name;
      orderData.email = email;
      orderData.phone = phone;
      orderData.address = address;
      orderData.pincode = pincode;
      orderData.totalItems = totalItems;
      orderData.totalPrice = totalPrice;

      customerEmail = email;
      customerName = name;

      summaryHTML = `
        <h4>Your Order Summary:</h4>
        <ul>
          <li>Product: Thinmax Waterproofing</li>
          <li>Quantity: ${quantity}</li>
          <li>Weight: ${weight}</li>
          <li>Price Per Unit: ₹${adjustedPrice}</li>
          <li>Total: ₹${totalPrice}</li>
        </ul>
      `;
    }

    const savedOrder = await Order.create(orderData);

    // Email
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

    // WhatsApp alert to admin
    const adminMsg = `
📦 *New Order Received*
👤 Name: ${customerName}
📞 Phone: ${phone}
🏠 Address: ${address}, ${pincode}
💳 Payment ID: ${razorpay_payment_id}
📄 Order:
${
  cart && Array.isArray(cart)
    ? cart.map(item => `${item.name} (${item.weight}) x${item.quantity}`).join(", ")
    : `Thinmax (${weight}) x${quantity}`
}
💰 Total: ₹${totalPrice}
🟢 Payment: Paid
🔗 Track: ${trackUrl}
`;

    await twilioClient.messages.create({
      from: process.env.TWILIO_PHONE_WHATSAPP,
      to: process.env.ADMIN_PHONE,
      body: adminMsg,
    });

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
