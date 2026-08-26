const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswerIndex: { type: Number, required: true },
  explanation: String,
  skillSubtopic: String,
});

const quizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    skill: { type: String, required: true },
    category: String,
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Intermediate',
    },
    totalPoints: { type: Number, default: 100 },
    passingScore: { type: Number, default: 70 },
    estimatedMinutes: { type: Number, default: 10 },
    questions: [questionSchema],
    createdBy: {
      type: String,
      enum: ['System', 'AI_Generator'],
      default: 'System',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Quiz', quizSchema);
