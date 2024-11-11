const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

// Initialize Express App
const app = express();

app.use(express.static(path.join(__dirname, "../frontend")));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 5000,
});

// Routes
const namesRoute = require("./routes/names");
const authRoute = require("./routes/auth"); // Import auth routes

app.use("/api/names", namesRoute);
app.use("/api/auth", authRoute); // Use auth routes

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/register.html"));
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
