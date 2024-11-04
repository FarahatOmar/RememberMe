// routes/profile.js
const express = require("express");
const User = require("../models/User"); // Assuming a User model exists
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// GET Profile (Fetch User Data)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// PUT Update Profile (Modify User Data)
router.put("/", authMiddleware, async (req, res) => {
  const { name, email } = req.body;

  try {
    let user = await User.findById(req.user);
    if (!user) return res.status(404).json({ msg: "User not found" });

    // Update user fields
    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();
    res.json({ msg: "Profile updated", user });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
