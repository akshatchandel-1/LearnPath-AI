const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    recommendation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recommendation',
    },
    resource: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resource',
    },
    helpful: {
      type: Boolean,
      required: true,
    },
    difficultyRating: {
      type: String,
      enum: ['Too Easy', 'Just Right', 'Too Difficult'],
    },
    comment: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Feedback', feedbackSchema);
