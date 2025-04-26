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
    note,
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
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
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
    subject: "New Contact Form Submission", // subject line
    html: `
     <h2>New Contact Form Submission</h2>
     <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse; width: 100%;">
       <tr>
         <th style="background-color: #337ab7; color: white;">Fields</th>
         <th style="background-color: #337ab7; color: white;">Details</th>
       </tr>
       <tr><td><strong>Name</strong></td><td>${name}</td></tr>
       <tr><td><strong>Email</strong></td><td>${email}</td></tr>
       <tr><td><strong>Phone</strong></td><td>${phone}</td></tr>
       <tr><td><strong>Company</strong></td><td>${company}</td></tr>
       <tr><td><strong>Country</strong></td><td>${country}</td></tr>
       <tr><td><strong>Product/Service</strong></td><td>${products}</td></tr>
       <tr><td><strong>Equipment</strong></td><td>${
         Equipment == "on" ? "Yes" : "No"
       }</td></tr>
       <tr><td><strong>Aftermarket & Modernization</strong></td><td>${
         aftermarket == "on" ? "Yes" : "No"
       }</td></tr>
       <tr><td><strong>Message</strong></td><td>${note}</td></tr>
     </table>
   `,
  };

  function capitalizeName(name) {
    return name
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  const capitalizedName = capitalizeName(name);

  const mailOptionsToUser = {
    from: '"Website Contact" <website@cemtecgroup.at>',
    to: email, // the email submitted in the form
    subject: "Thank You for Contacting Us",
    html: `
      <p>Dear ${capitalizedName},</p>
      <p>Thank you for reaching out to Cemtec, We’ve received your inquiry and appreciate your interest.</p>
      <p> Our team will review your message and get back to you within 24–48 hours. </p>
      <p>For urgent matters, feel free to call us at +43 7223 83620 or email us at info@cemtecgroup.com</p>
      <p> We look forward to assisting you!</p>
      <p>Best regards,<br>
       Team CEMTEC </p>

       <hr style="margin-top:20px; margin-bottom:10px;">
    <p style="font-size: 14px;">
      <a href="https://www.cemtecgroup.at" target="_blank">www.cemtecgroup.at</a> | 
      <a href="mailto:info@cemtecgroup.com">info@cemtecgroup.com</a> | 
      <a href="tel:+43722383620">+43 7223 83620</a>
    </p>
    `,
  };

  transporter.sendMail(mailOptionsToUser, (error, info) => {
    if (error) {
      console.error("Error sending to user:", error);
    } else {
      console.log("User thank-you email sent:", info.response);
    }
  });

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
      res.send(`
        <html>
          <head>
            <style>
              body {
                background-color: #337ab7;
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100vh;
                font-family: Arial, sans-serif;
                text-align: center;
              }
            </style>
          </head>
          <body>
            <div>
              <h1>Thank You for Your Submission!</h1>
              <p>We’ll be in touch with you shortly.</p>
            </div>
          </body>
        </html>
      `);
    }
  });
});

module.exports = router;
