require("dotenv").config(); // ⬅️ Load environment variables
const twilio = require("twilio");

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

client.messages
  .create({
    from: process.env.TWILIO_PHONE_WHATSAPP,
    to: process.env.ADMIN_PHONE,
    body: "✅ Test message from Twilio WhatsApp using .env",
  })
  .then(message => console.log("✅ Message sent! SID:", message.sid))
  .catch(err => console.error("❌ Error:", err));
