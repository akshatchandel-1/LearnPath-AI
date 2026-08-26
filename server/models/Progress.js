const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema(
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
    learningPath: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'LearningPath',
    },
    pathPhaseNumber: Number,
    status: {
      type: String,
      enum: ['not-started', 'in-progress', 'completed', 'skipped'],
      default: 'in-progress',
    },
    progressPercent: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    timeSpentMinutes: {
      type: Number,
      default: 0,
    },
    notes: String,
    completedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Progress', progressSchema);
