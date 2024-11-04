// routes/names.js
const express = require("express");
const authMiddleware = require("./authMiddleware");
const mongoose = require("mongoose");
const User = require("../models/User");
const router = express.Router();

// POST: Save new name entry
router.post("/", authMiddleware, async (req, res) => {
  const { name, location, uniqueDetail } = req.body;
  try {
    const user = await User.findById(req.user);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.names.push({ name, location, uniqueDetail });
    await user.save();
    res.status(201).json({ message: "Name saved successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET: Retrieve all names with optional search query
router.get("/", authMiddleware, async (req, res) => {
  const searchQuery = req.query.search ? req.query.search.toLowerCase() : "";
  try {
    const user = await User.findById(req.user);
    if (!user) return res.status(404).json({ message: "User not found" });

    let names = user.names;
    if (searchQuery) {
      names = names.filter((name) =>
        [name.name, name.location, name.uniqueDetail].some((field) =>
          field.toLowerCase().includes(searchQuery)
        )
      );
    }
    res.json({ names });
  } catch (err) {
    console.error("Error fetching names:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// PUT: Update existing name entry
router.put("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { name, location, uniqueDetail } = req.body;
  try {
    const user = await User.findById(req.user);
    if (!user) return res.status(404).json({ message: "User not found" });

    const nameEntry = user.names.id(id);
    if (!nameEntry) return res.status(404).json({ message: "Name not found" });

    nameEntry.name = name;
    nameEntry.location = location;
    nameEntry.uniqueDetail = uniqueDetail;
    await user.save();

    res.json({ message: "Name updated successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// DELETE: Delete name entry
router.delete("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const user = await User.findById(req.user);
    if (!user) return res.status(404).json({ message: "User not found" });

    const nameEntry = user.names.id(id);
    if (!nameEntry) return res.status(404).json({ message: "Name not found" });

    user.names = user.names.filter((name) => name._id.toString() !== id);
    await user.save();

    res.json({ message: "Name deleted successfully!" });
  } catch (err) {
    console.error("Error deleting name entry:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
