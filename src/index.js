const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./routes/user.route.js");
const activityRouter = require("./routes/activity.route.js");

const app = express();
dotenv.config();
app.use(cors());

app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/activity", activityRouter);

const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/leaderboard";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  });
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
