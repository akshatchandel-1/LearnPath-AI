const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    resource: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resource',
      required: true,
    },
    score: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    matchedSkills: [String],
    skillGapAddressed: String,
    reason: String,
    difficultyFit: String,
    estimatedImpact: String,
    breakdown: {
      semanticSimilarity: Number,
      skillGapMatch: Number,
      difficultyMatch: Number,
      interestMatch: Number,
      prerequisiteMatch: Number,
      learningPreferenceMatch: Number,
      historicalPerformance: Number,
    },
    feedback: {
      helpful: Boolean,
      difficultyFeedback: String,
      timestamp: Date,
    },
    dismissed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Recommendation', recommendationSchema);
