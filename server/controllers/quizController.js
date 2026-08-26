const Quiz = require('../models/Quiz');
const QuizAttempt = require('../models/QuizAttempt');
const User = require('../models/User');
const LearnerProfile = require('../models/LearnerProfile');
const quizGenerator = require('../services/ai/quizGenerator');
const adaptivePathService = require('../services/adaptive/adaptivePathService');
const statisticsService = require('../services/statisticsService');

// @desc    Generate or fetch quiz for a skill
// @route   POST /api/quiz/generate
// @access  Private
const generateQuiz = async (req, res, next) => {
  try {
    const { skill, difficulty } = req.body;
    if (!skill) {
      return res.status(400).json({ success: false, message: 'Please specify a skill' });
    }

    const quiz = await quizGenerator.generateQuizForSkill(skill, difficulty || 'Intermediate');
    res.status(201).json({ success: true, quiz });
  } catch (error) {
    next(error);
  }
};

// @desc    Submit quiz attempt & calibrate skill level
// @route   POST /api/quiz/submit
// @access  Private
const submitQuiz = async (req, res, next) => {
  try {
    const { quizId, answers = [] } = req.body;
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ success: false, message: 'Quiz not found' });
    }

    let correctCount = 0;
    const evaluatedAnswers = (quiz.questions || []).map((q, idx) => {
      const userAns = answers.find(a => a.questionIndex === idx);
      const selected = userAns !== undefined ? userAns.selectedOption : -1;
      const isCorrect = selected === q.correctAnswerIndex;
      if (isCorrect) correctCount++;

      return {
        questionIndex: idx,
        selectedOption: selected,
        isCorrect,
      };
    });

    const totalQuestions = quiz.questions.length || 1;
    const percentage = Math.round((correctCount / totalQuestions) * 100);
    const passed = percentage >= (quiz.passingScore || 70);

    // Update user skill confidence
    const user = await User.findById(req.user._id);
    let previousLevel = 50;
    let newLevel = 50;

    const skillIndex = (user.skills || []).findIndex(
      s => s.name.toLowerCase() === quiz.skill.toLowerCase()
    );

    if (skillIndex > -1) {
      previousLevel = user.skills[skillIndex].level || 40;
      const delta = percentage >= 70 ? Math.round((percentage - 50) * 0.3) : -Math.round((70 - percentage) * 0.2);
      newLevel = Math.max(10, Math.min(98, previousLevel + delta));
      user.skills[skillIndex].level = newLevel;
    } else {
      newLevel = Math.min(90, Math.max(30, percentage));
      user.skills.push({ name: quiz.skill, level: newLevel, category: quiz.category || 'Technical' });
    }

    await user.save();

    // Update profile
    await LearnerProfile.findOneAndUpdate(
      { user: req.user._id },
      {
        $set: { skills: user.skills },
        $push: {
          assessmentScores: { skill: quiz.skill, score: percentage, date: new Date() },
          learningHistory: {
            activity: `Completed Assessment: ${quiz.title}`,
            skill: quiz.skill,
            score: percentage,
            details: `${correctCount}/${totalQuestions} correct (${percentage}%)`,
          },
        },
      }
    );

    // Record activity and award XP
    const earnedPoints = passed ? 100 : 50;
    await statisticsService.recordActivity(req.user._id, {
      type: 'quiz_submission',
      title: `Completed ${quiz.skill} Assessment`,
      skill: quiz.skill,
      xpEarned: earnedPoints,
      durationMinutes: quiz.estimatedMinutes || 10,
    });

    // Check if adaptive learning path recalibration should be triggered
    let adaptiveTriggered = false;
    if (percentage < 60 || percentage >= 90) {
      await adaptivePathService.adaptLearningPath(req.user._id, {
        skill: quiz.skill,
        percentage,
      });
      adaptiveTriggered = true;
    }

    const attempt = await QuizAttempt.create({
      user: req.user._id,
      quiz: quiz._id,
      skill: quiz.skill,
      score: correctCount * 20,
      percentage,
      totalQuestions,
      correctCount,
      answers: evaluatedAnswers,
      previousSkillLevel: previousLevel,
      newSkillLevel: newLevel,
      feedback: passed
        ? `Outstanding mastery! Your skill level in ${quiz.skill} increased to ${newLevel}%.`
        : `Keep practicing. Review key concepts in ${quiz.skill} before retaking.`,
      adaptiveActionTriggered: adaptiveTriggered,
    });

    const updatedStats = await statisticsService.calculateUserStatistics(req.user._id);

    res.status(201).json({
      success: true,
      result: {
        passed,
        percentage,
        correctCount,
        totalQuestions,
        earnedPoints,
        previousSkillLevel: previousLevel,
        newSkillLevel: newLevel,
        adaptiveTriggered,
        attemptId: attempt._id,
      },
      user: {
        points: updatedStats.xp,
        streak: updatedStats.streak,
        skills: user.skills,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user quiz history
// @route   GET /api/quiz/history
// @access  Private
const getQuizHistory = async (req, res, next) => {
  try {
    const history = await QuizAttempt.find({ user: req.user._id })
      .populate('quiz')
      .sort({ createdAt: -1 });
    res.json({ success: true, count: history.length, history });
  } catch (error) {
    next(error);
  }
};

module.exports = { generateQuiz, submitQuiz, getQuizHistory };
