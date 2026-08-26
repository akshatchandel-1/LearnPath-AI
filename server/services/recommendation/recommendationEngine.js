const Resource = require('../../models/Resource');
const LearnerProfile = require('../../models/LearnerProfile');
const Recommendation = require('../../models/Recommendation');
const User = require('../../models/User');
const similarityEngine = require('./similarityEngine');
const skillGapEngine = require('./skillGapEngine');
const rankingEngine = require('./rankingEngine');

class RecommendationEngine {
  async generateRecommendationsForUser(userId, limit = 8) {
    const user = await User.findById(userId);
    let profile = await LearnerProfile.findOne({ user: userId });

    if (!profile && user) {
      profile = {
        careerGoal: user.careerGoal || 'Full Stack MERN Developer',
        skills: user.skills || [],
        interests: user.interests || [],
        preferredLearningStyle: user.preferredLearningStyle || 'Hands-on Projects',
        preferredDifficulty: user.preferredDifficulty || 'Intermediate',
      };
    }

    const allResources = await Resource.find({});
    similarityEngine.initialize(allResources);

    const skillGapReport = skillGapEngine.calculateSkillGap(
      profile.skills,
      profile.careerGoal
    );

    const completedIds = (user.completedResources || []).map(id => id.toString());
    const candidateResources = allResources.filter(
      r => !completedIds.includes(r._id.toString())
    );

    const ranked = rankingEngine.rankCandidates(
      candidateResources,
      profile,
      skillGapReport
    );

    const topRecommendations = ranked.slice(0, limit);

    // Persist recommendations
    await Recommendation.deleteMany({ user: userId });
    const inserted = await Recommendation.insertMany(
      topRecommendations.map(rec => ({
        user: userId,
        resource: rec.resource._id,
        score: rec.score,
        matchedSkills: rec.matchedSkills,
        skillGapAddressed: rec.skillGapAddressed,
        reason: rec.reason,
        difficultyFit: rec.difficultyFit,
        estimatedImpact: rec.estimatedImpact,
        breakdown: rec.breakdown,
      }))
    );

    return {
      recommendations: topRecommendations,
      skillGapReport,
      totalEvaluated: candidateResources.length,
    };
  }

  async getStoredRecommendations(userId) {
    let recs = await Recommendation.find({ user: userId, dismissed: false })
      .populate('resource')
      .sort({ score: -1 });

    if (!recs || recs.length === 0) {
      const result = await this.generateRecommendationsForUser(userId);
      recs = await Recommendation.find({ user: userId, dismissed: false })
        .populate('resource')
        .sort({ score: -1 });
    }

    return recs;
  }
}

const recommendationEngine = new RecommendationEngine();
module.exports = recommendationEngine;
