// models/User.model.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    StrictPopulateError: false, // Disable strict population error
  }
);

module.exports = mongoose.model("User", userSchema); // ✅ Use capitalized singular model name
