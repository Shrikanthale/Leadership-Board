const ActivityModel = require("../models/Activity.model");

const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    console.log("Fetching activity data...");
    const activityData = await ActivityModel.find();
    res.status(200).json(activityData);
  } catch (error) {
    console.error("Error fetching activity data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = router;
