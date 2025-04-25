const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const contactRoutes = require("./contact");
const feedbackRoutes = require("./feedback");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Static files
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname)));

// Mount routers
app.use("/contact", contactRoutes); // /contact/ and /contact/send-email
app.use("/feedback", feedbackRoutes); // /feedback/ and /feedback/send-feedback

// Catch-all route for other HTML pages
app.get("/:page", (req, res) => {
  res.sendFile(path.join(__dirname, `${req.params.page}.html`));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
