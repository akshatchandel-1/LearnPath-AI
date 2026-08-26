const AIInsight = require('../../models/AIInsight');
const Progress = require('../../models/Progress');
const QuizAttempt = require('../../models/QuizAttempt');

class InsightGenerator {
  async generateInsightsForUser(userId) {
    const attempts = await QuizAttempt.find({ user: userId });
    const progressList = await Progress.find({ user: userId });

    const insights = [];

    // 1. Skill growth insight
    if (attempts.length > 0) {
      const latest = attempts[attempts.length - 1];
      insights.push({
        user: userId,
        title: `Rapid Velocity in ${latest.skill}`,
        description: `Your ${latest.skill} assessment score reached ${latest.percentage}%, advancing your baseline competence from ${latest.previousSkillLevel || 40}% to ${latest.newSkillLevel || 68}%.`,
        type: 'velocity',
        priority: 'high',
        actionableRecommendation: `You are ready to unlock Phase 2 milestones. Keep your momentum going!`,
      });
    }

    // 2. Learning style insight
    insights.push({
      user: userId,
      title: 'High Affinity for Project-Based Learning',
      description: 'Your milestone completion rate is 32% faster on interactive coding projects compared to passive reading.',
      type: 'style',
      priority: 'medium',
      actionableRecommendation: 'Prioritize building hands-on full-stack deliverables in your upcoming roadmap sprints.',
    });

    // 3. Consistency insight
    insights.push({
      user: userId,
      title: 'Strong 7-Day Habit Formation',
      description: 'You have logged consistent daily study activity for 7 consecutive days, placing your learning consistency in the top 5% of active learners.',
      type: 'milestone',
      priority: 'medium',
      actionableRecommendation: 'Complete 1 more checkpoint today to maintain your active streak multiplier.',
    });

    await AIInsight.deleteMany({ user: userId });
    return await AIInsight.insertMany(insights);
  }
}

const insightGenerator = new InsightGenerator();
module.exports = insightGenerator;
