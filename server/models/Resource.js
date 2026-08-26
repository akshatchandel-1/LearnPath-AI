const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['Course', 'Video', 'Article', 'Documentation', 'Project', 'Quiz', 'Coding Practice', 'Assessment'],
    },
    url: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      default: 'LearnPath AI Academy',
    },
    skills: [
      {
        type: String,
        required: true,
      },
    ],
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      required: true,
    },
    duration: {
      type: String,
      default: '2 hours',
    },
    estimatedHours: {
      type: Number,
      default: 2,
    },
    rating: {
      type: Number,
      default: 4.8,
      min: 1.0,
      max: 5.0,
    },
    tags: [String],
    prerequisites: [String],
    learningStyle: {
      type: String,
      enum: ['Video', 'Reading', 'Hands-on Projects', 'Practice Problems', 'Mixed'],
      default: 'Hands-on Projects',
    },
    projectBased: {
      type: Boolean,
      default: false,
    },
    free: {
      type: Boolean,
      default: true,
    },
    likesCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

resourceSchema.index({ title: 'text', description: 'text', skills: 'text', tags: 'text' });

module.exports = mongoose.model('Resource', resourceSchema);
