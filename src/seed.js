const mongoose = require("mongoose");
const Activity = require("./models/Activity.model");

mongoose.connect("mongodb://localhost:27017/leaderboard", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function seedData() {
  await Activity.deleteMany();

  const userNames = ["Alex Benjamin", "Joe Hendry", "Samoa Joe"];

  const now = new Date();
  const activities = [];

  userNames.forEach((name) => {
    if (name === "Alex Benjamin") {
      for (let i = 0; i < 5; i++) {
        activities.push({
          userName: name,
          activityTime: new Date(),
          points: 20,
        });
      }
    }

    if (name === "Joe Hendry") {
      const daysThisMonth = [2, 5, 10];
      daysThisMonth.forEach((day) => {
        activities.push({
          userName: name,
          activityTime: new Date(now.getFullYear(), now.getMonth() - 1, day),
          points: 30,
        });
      });
    }

    if (name === "Samoa Joe") {
      const monthsThisYear = [0, 1, 2];
      monthsThisYear.forEach((month) => {
        activities.push({
          userName: name,
          activityTime: new Date(now.getFullYear(), month, 15),
          points: 40,
        });
      });
    }
  });

  await Activity.insertMany(activities);

  console.log(
    "🌱 Seeded data for daily, monthly, and yearly leaderboard logic."
  );
  mongoose.disconnect();
}

seedData();
