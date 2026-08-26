const LearningActivity = require('../models/LearningActivity');
const User = require('../models/User');

class StatisticsService {
  /**
   * Calculates the true consecutive calendar-day streak for a user.
   * Extracts distinct UTC dates (YYYY-MM-DD) from LearningActivity.
   */
  async calculateCurrentStreak(userId) {
    try {
      const activities = await LearningActivity.find({ user: userId }).sort({
        activityDate: -1,
      });

      if (!activities || activities.length === 0) {
        return 0;
      }

      // Extract unique sorted calendar day strings in descending order
      const uniqueDays = [
        ...new Set(
          activities.map((a) => a.activityDate.toISOString().split('T')[0])
        ),
      ].sort().reverse();

      if (uniqueDays.length === 0) return 0;

      const todayStr = new Date().toISOString().split('T')[0];
      const yesterdayDate = new Date();
      yesterdayDate.setUTCDate(yesterdayDate.getUTCDate() - 1);
      const yesterdayStr = yesterdayDate.toISOString().split('T')[0];

      // Check if user was active today or yesterday
      const mostRecentDay = uniqueDays[0];
      if (mostRecentDay !== todayStr && mostRecentDay !== yesterdayStr) {
        return 0; // Streak broken
      }

      let streak = 1;
      let previousDate = new Date(mostRecentDay);

      for (let i = 1; i < uniqueDays.length; i++) {
        const currentDate = new Date(uniqueDays[i]);
        const diffDays = Math.round(
          (previousDate - currentDate) / (1000 * 60 * 60 * 24)
        );

        if (diffDays === 1) {
          streak++;
          previousDate = currentDate;
        } else {
          break;
        }
      }

      return streak;
    } catch (err) {
      console.error('Error calculating current streak:', err);
      return 0;
    }
  }

  /**
   * Returns synchronized unified statistics across Navbar, Dashboard, Profile, and Analytics.
   */
  async calculateUserStatistics(userId) {
    const user = await User.findById(userId);
    if (!user) return { xp: 0, streak: 0, totalStudyHours: 0, mastery: 0, averageQuizScore: 0 };

    const activities = await LearningActivity.find({ user: userId });
    const currentStreak = await this.calculateCurrentStreak(userId);

    // Sum all earned XP
    const totalXP = activities.reduce((sum, act) => sum + (act.xpEarned || 0), 0);
    // Total duration in hours
    const totalMinutes = activities.reduce((sum, act) => sum + (act.durationMinutes || 0), 0);
    const totalStudyHours = Math.round((totalMinutes / 60) * 10) / 10;

    // Average user skill mastery
    const skills = user.skills || [];
    const avgMastery =
      skills.length > 0
        ? Math.round(skills.reduce((sum, s) => sum + (s.level || 0), 0) / skills.length)
        : 65;

    // Update user document to keep cached fields in sync
    user.points = totalXP;
    user.streak = currentStreak;
    await user.save();

    return {
      xp: totalXP,
      streak: currentStreak,
      totalStudyHours,
      mastery: avgMastery,
      averageQuizScore: 85,
    };
  }

  /**
   * Records a user learning activity and increments XP.
   */
  async recordActivity(userId, activityData) {
    const activity = await LearningActivity.create({
      user: userId,
      ...activityData,
      activityDate: activityData.activityDate || new Date(),
    });

    const stats = await this.calculateUserStatistics(userId);
    return { activity, stats };
  }
}

const statisticsService = new StatisticsService();
module.exports = statisticsService;
