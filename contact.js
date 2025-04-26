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
  "Form data:", req.body;

  // Log the form data for debugging
  // const transporter = nodemailer.createTransport({
  //   service: "gmail",
  //   auth: {
  //     user: process.env.EMAIL_USER,
  //     pass: process.env.EMAIL_PASS,
  //   },
  // });

  const transporter = nodemailer.createTransport({
    host: "smtp.world4you.com", // SMTP server
    port: 587, // Port for STARTTLS
    secure: false, // Use false for STARTTLS
    auth: {
      user: "website@cemtecgroup.at", // SMTP username
      pass: "cansIs-musdig-3xejze", // SMTP password
    },
    tls: {
      rejectUnauthorized: false, // Optional, allows self-signed certs
    },
  });

  /*
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
*/

  const mailOptions = {
    from: '"Website Contact" <website@cemtecgroup.at>', // sender address
    to: [
      "e.freinhofer@cemtec.at",
      "arsheenstrong@gmail.com",
      "uzaid@obtechnos.com",
    ], // recipient
    subject: "New Website Submission", // subject line
    text: "You received a new message from the website! please ignore this message as this is only for testing", // plain text body
    // html: "<p>You received a new message from the website!</p>" // Optional HTML
  };

  // const mailOptions = {
  //   from: '"Website Contact" <website@cemtecgroup.at>',
  //   to: "e.freinhofer@cemtec.at", // hardcoded!
  //   subject: "Test Email",
  //   text: "Testing correct recipient",
  // };

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
