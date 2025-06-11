const mongoose = require("mongoose");

const MembershipSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  goal: String,
  dietPlan: String,
  startDate: Date,
  endDate: Date,
  progress: String,
  billingStatus: String,
});

module.exports = mongoose.model("Membership", MembershipSchema);