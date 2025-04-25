const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();
const path = require("path");

const router = express.Router();

// Serve contact.html
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "contact.html"));
});

// Handle form submission
router.post("/send-email", (req, res) => {
  const {
    name,
    email,
    phone,
    company,
    country,
    products,
    Equipment,
    aftermarket,
  } = req.body;

  console.log;
  "Form data:", req.body; // Log the form data for debugging
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: "CEMTEC Cement & Mining Technology",
    to: ["uzaidmohd@gmail.com", "uzaid@obtechnos.com"],
    subject: "New Contact Form Submission",
    text: `
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Company: ${company}
      Country: ${country}
      Product/Service: ${products}
      Equipment: ${Equipment}
      Aftermarket: ${aftermarket}
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Email error:", error);
      res.send("Error occurred while sending email.");
    } else {
      console.log("Email sent:", info.response);
      res.send("Email sent successfully!");
    }
  });
});

module.exports = router;
