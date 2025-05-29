require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const twilio = require("twilio");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

// Email Transporter Setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Handle order confirmation
app.post("/send-message", async (req, res) => {
  const { contact, contactType, totalPrice, cartItems } = req.body;
  const orderDetails = cartItems.map(item => `${item.title} (x${item.quantity})`).join(", ");

  if (contactType === "email") {
    // Send Email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: contact,
      subject: "Order Confirmation",
      text: `Thank you for your order! Total: $${totalPrice}. Items: ${orderDetails}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.json({ success: true, message: "Email sent!" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to send email" });
    }
  } else if (contactType === "sms") {
    // Send SMS
    try {
      await twilioClient.messages.create({
        body: `Thank you for your order! Total: $${totalPrice}. Items: ${orderDetails}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: contact,
      });
      res.json({ success: true, message: "SMS sent!" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to send SMS" });
    }
  } else {
    res.status(400).json({ success: false, message: "Invalid contact type" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
