// models/User.js
const mongoose = require("mongoose");

const nameSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  uniqueDetail: { type: String, required: true },
});

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  names: [nameSchema], // Store multiple name entries per user
});

module.exports = mongoose.model("User", userSchema);
