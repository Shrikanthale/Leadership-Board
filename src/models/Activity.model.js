// models/Activity.model.js
const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    activityTime: {
      type: Date,
      required: true,
      default: Date.now,
    },
    points: {
      type: Number,
      required: true,
      default: 20,
    },
  },
  {
    timestamps: true,
    StrictPopulateError: false, // Disable strict population error
  }
);

module.exports = mongoose.model("Activity", activitySchema); // Also use capitalized model name here
