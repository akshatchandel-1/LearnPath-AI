const mongoose = require('mongoose');

const skillGapSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    targetRole: {
      type: String,
    },
    currentSkills: [
      {
        name: String,
        level: Number,
        category: String,
      },
    ],
    missingSkills: {
      type: Array, // Flexible array to support diverse AI payloads
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('SkillGap', skillGapSchema);
