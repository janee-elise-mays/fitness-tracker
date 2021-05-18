const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const activitySchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: "Enter a name for activity"
  },
  value: {
    type: Number,
    required: "Enter duration"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;
