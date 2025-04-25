const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
require("dotenv").config();
const path = require("path");

const app = express();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Serve static files from the "assets" folder
app.use("/assets", express.static(path.join(__dirname, "assets")));

// ✅ Optional: Serve static files from root (like .js or .html in root)
app.use(express.static(path.join(__dirname)));

// Serve default "contact.html"
app.get("/feedback", (req, res) => {
  res.sendFile(path.join(__dirname, "customer-feedback-survery.html"));
});

// Serve any other HTML page dynamically
app.get("/:page", (req, res) => {
  res.sendFile(path.join(__dirname, `${req.params.page}.html`));
});

// Handle form submission
app.post("/send-feedback", (req, res) => {
  const {
    work_status,
    work_status_label,
    _,
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

  const data = JSON.stringify(req.body);
  console.log("Form data received:", req.body);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  //
  const mailOptions = {
    from: "CEMTEC Cement & Mining Technology",
    to: ["uzaidmohd@gmail.com", "uzaid@obtechnos.com"],
    subject: "New Contact Form Submission",
    text: `
      from feedback form  

       a. Have we worked together in the past 12 months? *: ${work_status},

   b. Which industry sector best describes your company? * industry_sector: ${industry_sector},
   c. How satisfied are you with our overall performance? * ${overall_performance},    
    
  
d. How would you rate the quality of the delivered equipment/services? *: ${quality},
  e. How satisfied were you with communication and support? *${communication},
  f. How would you rate delivery time and adherence to deadlines? * ${delivery},
    g. How likely are you to work with us again? *: ${future_work},
   h. What did we do well?: ${done_well},
  i. What could we improve?: ${improve},
   j. Any further comments or suggestions? ${comments},

   k.Will your feedback be anonymous? *: ${anonymous},
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

//feedback form

// Serve any other HTML page dynamically

// Start server
app.listen(9000, () => {
  console.log("Server running at http://localhost:9000");
});
