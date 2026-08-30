const mongoose = require('mongoose');

const learnerProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    careerGoal: {
      type: String,
      required: true,
      default: 'Full Stack MERN Developer',
    },
    targetRole: {
      type: String,
      default: 'Full Stack Developer',
    },
    location: {
      type: String,
      default: 'India',
    },
    skills: [
      {
        name: { type: String, required: true },
        level: { type: Number, default: 0, min: 0, max: 100 },
        category: String,
        confidence: { type: Number, default: 50 },
        lastAssessed: { type: Date, default: Date.now },
      },
    ],
    interests: [String],
    experience: {
      type: String,
      default: 'Beginner',
    },
    completedCourses: [String],
    completedProjects: [String],
    preferredLearningStyle: {
      type: String,
      default: 'Hands-on Projects',
    },
    weeklyStudyHours: {
      type: Number,
      default: 10,
    },
    preferredDifficulty: {
      type: String,
      default: 'Intermediate',
    },
    learningHistory: [
      {
        activity: String,
        timestamp: { type: Date, default: Date.now },
        skill: String,
        score: Number,
        details: String,
      },
    ],
    assessmentScores: [
      {
        skill: String,
        score: Number,
        date: { type: Date, default: Date.now },
      },
    ],
    strengths: [String],
    weaknesses: [String],
    formatAffinity: {
      video: { type: Number, default: 0.5 },
      reading: { type: Number, default: 0.5 },
      project: { type: Number, default: 0.8 },
      practice: { type: Number, default: 0.6 },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('LearnerProfile', learnerProfileSchema);
