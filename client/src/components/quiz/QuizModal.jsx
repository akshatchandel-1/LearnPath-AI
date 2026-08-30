import React, { useState, useEffect } from 'react';
import {
  X,
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Zap,
} from 'lucide-react';
import api from '../../services/api';
import confetti from 'canvas-confetti';
import { useLearningPath } from '../../context/LearningPathContext';
import { useAuth } from '../../context/AuthContext';

export const QuizModal = ({ skillName, count = 3, isOpen, onClose }) => {
  const { refreshAll } = useLearningPath();
  const { user, updateUserProfile } = useAuth();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { [questionIdx]: selectedOptionIdx }
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (isOpen && skillName) {
      loadQuiz();
    } else {
      setQuiz(null);
      setResult(null);
      setSelectedAnswers({});
      setCurrentQuestionIdx(0);
    }
  }, [isOpen, skillName]);

  const loadQuiz = async () => {
    try {
      setLoading(true);
      // Fetch or generate quiz
      const res = await api.post('/quiz/generate', {
        skill: skillName || 'JavaScript',
        difficulty: 'Intermediate',
        count: count || 3,
      });
      if (res.data.success) {
        setQuiz(res.data.quiz);
      }
    } catch (err) {
      console.error('Error loading quiz:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (qIdx, optIdx) => {
    if (result) return; // Locked once submitted
    setSelectedAnswers(prev => ({
      ...prev,
      [qIdx]: optIdx,
    }));
  };

  const handleSubmitQuiz = async () => {
    if (!quiz) return;
    try {
      setSubmitting(true);
      const answerPayload = Object.entries(selectedAnswers).map(([qIdx, optIdx]) => ({
        questionIndex: parseInt(qIdx, 10),
        selectedOption: optIdx,
      }));

      const res = await api.post('/quiz/submit', {
        quizId: quiz._id,
        answers: answerPayload,
      });

      if (res.data.success) {
        setResult(res.data.result);
        await refreshAll();

        // If score >= 70%, trigger celebratory confetti
        if (res.data.result.percentage >= 70) {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
          });
        }

        // Update user XP & streak from API response
        if (res.data.user) {
          updateUserProfile(res.data.user);
        } else if (user && res.data.result.earnedPoints) {
          updateUserProfile({
            points: (user.points || 0) + res.data.result.earnedPoints,
          });
        }
      }
    } catch (err) {
      console.error('Error submitting quiz:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl glass-panel border border-brand-500/40 p-6 sm:p-8 shadow-2xl text-slate-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {loading ? (
          <div className="py-16 text-center space-y-4">
            <RefreshCw className="w-10 h-10 text-brand-400 animate-spin mx-auto" />
            <p className="text-sm font-semibold text-slate-200">
              Generating AI Adaptive Checkpoint for {skillName}...
            </p>
            <p className="text-xs text-slate-400">Calibrating question difficulty to your learner profile</p>
          </div>
        ) : !result ? (
          /* Active Question Step UI */
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-brand-500/20 text-brand-300 border border-brand-500/30">
                  {quiz?.skill} Checkpoint
                </span>
                <span className="text-xs text-slate-400">
                  Question {currentQuestionIdx + 1} of {quiz?.questions?.length}
                </span>
              </div>
              <h2 className="text-xl font-bold text-white font-display">
                {quiz?.title}
              </h2>
            </div>

            {/* Question Card */}
            {quiz?.questions && quiz.questions[currentQuestionIdx] && (
              <div className="space-y-4">
                <p className="text-base sm:text-lg font-medium text-slate-100 leading-snug">
                  {quiz.questions[currentQuestionIdx].question}
                </p>

                {/* Options List */}
                <div className="space-y-2.5 pt-2">
                  {quiz.questions[currentQuestionIdx].options.map((opt, optIdx) => {
                    const isSelected = selectedAnswers[currentQuestionIdx] === optIdx;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(currentQuestionIdx, optIdx)}
                        className={`w-full p-4 rounded-xl text-left text-sm font-medium transition-all flex items-start gap-3 border ${
                          isSelected
                            ? 'bg-brand-600/30 border-brand-400 text-white shadow-md shadow-brand-500/20'
                            : 'bg-white/[0.03] border-white/10 text-slate-300 hover:bg-white/[0.07] hover:text-white'
                        }`}
                      >
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 border ${
                            isSelected
                              ? 'bg-brand-500 border-brand-300 text-white'
                              : 'bg-slate-800 border-slate-700 text-slate-400'
                          }`}
                        >
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="mt-0.5">{opt}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step Navigation Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <button
                disabled={currentQuestionIdx === 0}
                onClick={() => setCurrentQuestionIdx(prev => prev - 1)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-300 disabled:opacity-40"
              >
                Previous
              </button>

              <div className="flex items-center gap-1.5">
                {quiz?.questions?.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      idx === currentQuestionIdx
                        ? 'bg-brand-400 scale-125'
                        : selectedAnswers[idx] !== undefined
                        ? 'bg-cyan-500'
                        : 'bg-slate-700'
                    }`}
                  />
                ))}
              </div>

              {currentQuestionIdx < (quiz?.questions?.length || 5) - 1 ? (
                <button
                  onClick={() => setCurrentQuestionIdx(prev => prev + 1)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-500 text-white shadow-md transition-all flex items-center gap-1"
                >
                  <span>Next</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={handleSubmitQuiz}
                  disabled={submitting || Object.keys(selectedAnswers).length === 0}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-brand-600 to-cyan-500 hover:from-brand-500 hover:to-cyan-400 text-white shadow-lg shadow-brand-500/30 transition-all disabled:opacity-50 flex items-center gap-1.5"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>{submitting ? 'Evaluating...' : 'Submit Assessment'}</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Result Summary & Skill Calibration Screen */
          <div className="space-y-6 text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-brand-600 to-cyan-400 mx-auto flex items-center justify-center shadow-xl shadow-brand-500/30">
              <Award className="w-8 h-8 text-white" />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-500/20 text-brand-300 border border-brand-500/30">
                Assessment Evaluated
              </span>
              <h2 className="text-2xl font-black text-white mt-2 font-display">
                You Scored {result.percentage}% ({result.correctCount}/{result.totalQuestions})
              </h2>
            </div>

            {/* Skill Level Delta Calibration Box */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-brand-950/60 to-cyan-950/60 border border-white/10 text-left space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-brand-300 uppercase">
                    Skill Calibration Delta
                  </p>
                  <p className="text-sm font-semibold text-white">
                    {skillName}: {result.previousSkillLevel}% &rarr; {result.newSkillLevel}%
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-xl text-sm font-black ${
                    result.skillDelta >= 0
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  }`}
                >
                  {result.skillDelta >= 0 ? `+${result.skillDelta}%` : `${result.skillDelta}%`}
                </span>
              </div>

              {/* Adaptive Action Notification */}
              {result.adaptiveTriggered && (
                <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-200 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span><strong>Adaptive Roadmap Triggered:</strong> {result.adaptiveMessage}</span>
                </div>
              )}
            </div>

            {/* Detailed Explanations Accordion */}
            <div className="text-left space-y-3 max-h-60 overflow-y-auto pr-1">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Question Explanations
              </p>
              {result.detailedAnswers.map((ans, i) => (
                <div
                  key={i}
                  className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                    ans.isCorrect
                      ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-100'
                      : 'bg-rose-500/5 border-rose-500/20 text-rose-100'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {ans.isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    )}
                    <p className="font-semibold text-slate-200">{ans.question}</p>
                  </div>
                  <p className="text-[11px] text-slate-300 pl-6 leading-relaxed">
                    <strong>Explanation:</strong> {ans.explanation}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl text-sm font-bold bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-600/30 transition-all"
            >
              Continue to Roadmap
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizModal;


