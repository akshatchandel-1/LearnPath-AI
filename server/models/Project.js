const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: String,
    requiredSkills: [String],
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Intermediate',
    },
    estimatedHours: { type: Number, default: 20 },
    features: [String],
    learningOutcomes: [String],
    starterRepoUrl: String,
    deliverables: [String],
    rubric: [
      {
        criteria: String,
        points: Number,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
