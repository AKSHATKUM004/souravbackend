const express = require("express");
const router = express.Router();
const Membership = require("../models/Membership");

router.get("/:userId", async (req, res) => {
  try {
    const data = await Membership.findOne({ userId: req.params.userId });
    if (!data) return res.status(404).json({ error: "No membership found" });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Error fetching data" });
  }
});

module.exports = router;