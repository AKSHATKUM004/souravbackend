const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Membership = require("../models/Membership");

router.get("/members", async (req, res) => {
  try {
    const members = await User.find({ role: "client" });
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: "Error fetching members" });
  }
});

router.post("/membership", async (req, res) => {
  const { userId, goal, dietPlan, startDate, endDate, billingStatus, progress } = req.body;
  try {
    const existing = await Membership.findOne({ userId });
    if (existing) {
      await Membership.updateOne({ userId }, { goal, dietPlan, startDate, endDate, billingStatus, progress });
      res.json({ message: "Membership updated" });
    } else {
      const newMembership = new Membership({ userId, goal, dietPlan, startDate, endDate, billingStatus, progress });
      await newMembership.save();
      res.status(201).json({ message: "Membership created" });
    }
  } catch (err) {
    res.status(500).json({ error: "Error saving membership" });
  }
});

router.get("/expired", async (req, res) => {
  try {
    const today = new Date();
    const expired = await Membership.find({ endDate: { $lt: today } }).populate("userId");
    res.json(expired);
  } catch (err) {
    res.status(500).json({ error: "Error fetching expired members" });
  }
});

module.exports = router;