const mongoose = require("mongoose");

const NameSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
    },
    where: {
      type: String,
      required: true,
      minlength: 3,
    },
    unique: {
      type: String,
      required: true,
      minlength: 5,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Name", NameSchema);
