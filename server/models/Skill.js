const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Frontend', 'Backend', 'Database', 'DevOps & Cloud', 'AI & Data Science', 'System Design', 'Fundamentals'],
    },
    description: String,
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Intermediate',
    },
    prerequisites: [String],
    relatedSkills: [String],
    rolesTargeted: [String],
    importanceWeight: {
      type: Number,
      default: 1.0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Skill', skillSchema);
