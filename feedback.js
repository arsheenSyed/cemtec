const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();
const path = require("path");

const router = express.Router();

// Serve feedback form
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "customer-feedback-survery.html"));
});

// Handle feedback form submission
router.post("/send-feedback", (req, res) => {
  const {
    name,
    email,
    phone,
    work_status,
    industry_sector,
    other_sector,
    overall_performance,
    quality,
    communication,
    delivery,
    future_work,
    done_well,
    improve,
    comments,
    anonymous,
  } = req.body;

  // Use `other_sector` if user selected "other"
  const selectedSector =
    industry_sector === "other" && other_sector
      ? other_sector
      : industry_sector;

  /*const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  */

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

  const mailOptions = {
    from: '"Website Contact" <website@cemtecgroup.at>', // sender address
    to: [
      "e.freinhofer@cemtec.at",
      "arsheenstrong@gmail.com",
      "uzaid@obtechnos.com",
    ],
    subject: "New Feedback Form Submission",
    html: `
    <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif;">
      <tr style="background-color: #337ab7; color: white;">
        <th colspan="2"> <h2> Customer Feedback Summary </h2></th>
      </tr>
      <tr><td><strong>Name</strong></td><td>${name}</td></tr>
      <tr><td><strong>Email</strong></td><td>${email}</td></tr>
      <tr><td><strong>Phone</strong></td><td>${phone}</td></tr>
      <tr><td><strong>a. Worked in past 12 months</strong></td><td>${work_status}</td></tr>
      <tr><td><strong>b. Industry Sector</strong></td><td> ${selectedSector}</td></tr>
      
      <tr><td><strong>c. Overall Performance</strong></td><td>${overall_performance}</td></tr>
      <tr><td><strong>d. Quality</strong></td><td>${quality}</td></tr>
      <tr><td><strong>e. Communication</strong></td><td>${communication}</td></tr>
      <tr><td><strong>f. Delivery</strong></td><td>${delivery}</td></tr>
      <tr><td><strong>g. Future Work</strong></td><td>${future_work}</td></tr>
      <tr><td><strong>h. What went well</strong></td><td>${done_well}</td></tr>
      <tr><td><strong>i. What to improve</strong></td><td>${improve}</td></tr>
      <tr><td><strong>j. Comments</strong></td><td>${comments}</td></tr>
      <tr><td><strong>k. Anonymous</strong></td><td>${anonymous}</td></tr>
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
    subject: "Thank You for your Feedback",
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
      console.log("User thank-you feedback sent:", info.response);
    }
  });

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
