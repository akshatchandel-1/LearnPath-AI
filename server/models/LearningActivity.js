const mongoose = require('mongoose');

const learningActivitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: [
        'quiz_submission',
        'resource_completion',
        'task_completion',
        'project_milestone',
        'study_session',
        'path_adaptation',
      ],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    skill: String,
    xpEarned: {
      type: Number,
      default: 0,
    },
    durationMinutes: {
      type: Number,
      default: 15,
    },
    activityDate: {
      type: Date,
      default: Date.now,
      index: true,
    },
    metadata: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('LearningActivity', learningActivitySchema);
