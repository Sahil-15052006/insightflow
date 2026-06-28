const cron = require("node-cron")
const Users = require('../models/userModel')

const startCleanupJob = () => {

  cron.schedule("0 * * * *", async () => {
    try {
      const twelveHoursAgo = new Date(
        Date.now() - 12 * 60 * 60 * 1000
      );

      const result = await Users.deleteMany({
        isVerified: false,
        createdAt: {
          $lt: twelveHoursAgo,
        },
      });

      console.log(
        `[CRON] Deleted ${result.deletedCount} unverified users`
      );
    } catch (error) {
      console.error("[CRON ERROR]", error);
    }
  });
};

module.exports = startCleanupJob
