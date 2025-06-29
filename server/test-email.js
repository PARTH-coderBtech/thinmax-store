// test-email.js
const nodemailer = require("nodemailer");
require("dotenv").config();

async function testSMTP() {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"Innodeeps Test" <${process.env.EMAIL_USER}>`,
      to: "yourgmail@gmail.com",
      subject: "Test Email from Innodeeps",
      text: "This is a test email",
    });

    console.log("✅ Test Email Sent:", info.response);
  } catch (err) {
    console.error("❌ SMTP Test Failed:", err);
  }
}

testSMTP();
