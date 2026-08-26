const mongoose = require('mongoose');

const resourceItemSchema = new mongoose.Schema({
  resource: { type: mongoose.Schema.Types.ObjectId, ref: 'Resource' },
  title: String,
  type: { type: String, default: 'Course' },
  url: String,
  duration: String,
  difficulty: String,
  completed: { type: Boolean, default: false },
}, { _id: false });

const phaseSchema = new mongoose.Schema({
  phaseNumber: { type: Number, required: true },
  title: { type: String, required: true },
  description: String,
  estimatedWeeks: { type: Number, default: 2 },
  skills: [String],
  resources: [resourceItemSchema],
  prerequisites: [String],
  milestone: {
    title: String,
    description: String,
    deliverables: [String],
  },
  quiz: {
    title: String,
    skill: String,
    minPassingScore: { type: Number, default: 70 },
  },
  status: {
    type: String,
    enum: ['locked', 'available', 'in-progress', 'completed', 'reinforce'],
    default: 'locked',
  },
  completionPercentage: { type: Number, default: 0 },
}, { _id: false });

const learningPathSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    goal: {
      type: String,
      required: true,
    },
    targetRole: String,
    totalEstimatedWeeks: { type: Number, default: 12 },
    currentPhase: { type: Number, default: 1 },
    phases: [phaseSchema],
    adaptationHistory: [
      {
        timestamp: { type: Date, default: Date.now },
        trigger: String,
        actionTaken: String,
        reason: String,
      },
    ],
    overallProgress: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
    adaptationCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('LearningPath', learningPathSchema);
