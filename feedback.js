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
    work_status,
    industry_sector,
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
    subject: "New Feedback Form Submission",
    text: `
      a. Worked in past 12 months: ${work_status}
      b. Industry Sector: ${industry_sector}
      c. Overall Performance: ${overall_performance}
      d. Quality: ${quality}
      e. Communication: ${communication}
      f. Delivery: ${delivery}
      g. Future Work: ${future_work}
      h. What went well: ${done_well}
      i. What to improve: ${improve}
      j. Comments: ${comments}
      k. Anonymous: ${anonymous}
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Email error:", error);
      res.send("Error occurred while sending email.");
    } else {
      console.log("Email sent:", info.response);
      res.send("Feedback sent successfully!");
    }
  });
});

module.exports = router;
