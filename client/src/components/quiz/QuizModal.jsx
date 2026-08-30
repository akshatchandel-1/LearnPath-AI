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
  const [selectedAnswers, setSelectedAnswers] = useState({});
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
  }, [isOpen, skillName, count]);

  const loadQuiz = async () => {
    try {
      setLoading(true);
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
    if (result) return;
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

        if (res.data.result.percentage >= 70) {
          try {
            confetti({
              particleCount: 80,
              spread: 70,
              origin: { y: 0.6 },
            });
          } catch (e) {}
        }

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl max-h-[90vh] flex flex-col rounded-3xl bg-[#16191E] border border-white/10 shadow-2xl overflow-hidden text-white p-6 sm:p-7">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {loading ? (
          <div className="py-16 text-center space-y-4">
            <RefreshCw className="w-8 h-8 text-[#FF6B5F] animate-spin mx-auto" />
            <p className="text-sm font-medium text-neutral-300">
              Generating dynamic checkpoint questions for {skillName}...
            </p>
          </div>
        ) : !result ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#FF6B5F]/15 text-[#FF857A] border border-[#FF6B5F]/30">
                  {skillName} Checkpoint
                </span>
                <h3 className="text-base font-bold text-white mt-1">
                  Question {currentQuestionIdx + 1} of {quiz?.questions?.length || 3}
                </h3>
              </div>
              <span className="text-xs font-mono text-neutral-400">
                Passing: {quiz?.passingScore || 70}%
              </span>
            </div>

            {quiz?.questions && quiz.questions[currentQuestionIdx] && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#0E1114] border border-white/[0.06]">
                  <p className="text-sm font-semibold text-white leading-relaxed">
                    {quiz.questions[currentQuestionIdx].question}
                  </p>
                </div>

                <div className="space-y-2.5">
                  {quiz.questions[currentQuestionIdx].options.map((opt, optIdx) => {
                    const isSelected = selectedAnswers[currentQuestionIdx] === optIdx;
                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleSelectOption(currentQuestionIdx, optIdx)}
                        className={`w-full text-left p-3.5 rounded-xl border transition-all duration-150 text-xs sm:text-sm font-medium flex items-center gap-3 ${
                          isSelected
                            ? 'bg-[#FF6B5F]/15 border-[#FF6B5F] text-white shadow-sm shadow-[#FF6B5F]/20'
                            : 'bg-[#1C2026] border-white/[0.06] text-neutral-300 hover:border-white/20 hover:bg-[#22272E]'
                        }`}
                      >
                        <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-mono font-bold shrink-0 ${
                          isSelected
                            ? 'bg-[#FF6B5F] text-white'
                            : 'bg-white/[0.06] text-neutral-400'
                        }`}>
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="leading-snug">{opt}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
              <div className="flex items-center gap-1.5">
                {(quiz?.questions || []).map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      idx === currentQuestionIdx
                        ? 'bg-[#FF6B5F] scale-125'
                        : selectedAnswers[idx] !== undefined
                        ? 'bg-[#34D399]'
                        : 'bg-white/10'
                    }`}
                  />
                ))}
              </div>

              {currentQuestionIdx < (quiz?.questions?.length || 3) - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentQuestionIdx(prev => prev + 1)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#FF6B5F] hover:bg-[#E85548] text-white shadow-md transition-all flex items-center gap-1 cursor-pointer"
                >
                  <span>Next</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmitQuiz}
                  disabled={submitting || Object.keys(selectedAnswers).length === 0}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-[#34D399] to-[#059669] hover:opacity-90 text-white shadow-lg transition-all disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>{submitting ? 'Evaluating...' : 'Submit Assessment'}</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-[#FF6B5F]/20 border border-[#FF6B5F]/40 mx-auto flex items-center justify-center shadow-xl">
              <Award className="w-8 h-8 text-[#FF6B5F]" />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/[0.06] text-neutral-300 border border-white/10">
                Assessment Evaluated
              </span>
              <h2 className="text-2xl font-black text-white mt-2">
                You Scored {result.percentage}% ({result.correctCount}/{result.totalQuestions})
              </h2>
            </div>

            <div className="p-4 rounded-xl bg-[#0E1114] border border-white/10 text-left space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-neutral-400 uppercase">
                    Skill Calibration Delta
                  </p>
                  <p className="text-sm font-semibold text-white">
                    {skillName}: {result.previousSkillLevel}% &rarr; {result.newSkillLevel}%
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-xl text-sm font-black ${
                    (result.skillDelta ?? 0) >= 0
                      ? 'bg-[#34D399]/20 text-[#34D399] border border-[#34D399]/30'
                      : 'bg-[#F87171]/20 text-[#F87171] border border-[#F87171]/30'
                  }`}
                >
                  {(result.skillDelta ?? 0) >= 0 ? `+${result.skillDelta}%` : `${result.skillDelta}%`}
                </span>
              </div>

              {result.adaptiveTriggered && (
                <div className="p-3 rounded-lg bg-[#38BDF8]/10 border border-[#38BDF8]/20 text-xs text-[#38BDF8] flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                  <span><strong>Adaptive Roadmap Triggered:</strong> {result.adaptiveMessage || 'Learning path adapted'}</span>
                </div>
              )}
            </div>

            <div className="text-left space-y-3 max-h-60 overflow-y-auto pr-1">
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Question Explanations
              </p>
              {(result.detailedAnswers || []).map((ans, i) => (
                <div
                  key={i}
                  className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                    ans.isCorrect
                      ? 'bg-[#34D399]/10 border-[#34D399]/20 text-neutral-200'
                      : 'bg-[#F87171]/10 border-[#F87171]/20 text-neutral-200'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {ans.isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-[#34D399] shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-4 h-4 text-[#F87171] shrink-0 mt-0.5" />
                    )}
                    <p className="font-semibold text-white">{ans.question}</p>
                  </div>
                  {ans.explanation && (
                    <p className="text-[11px] text-neutral-400 pl-6 leading-relaxed">
                      <strong>Explanation:</strong> {ans.explanation}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl text-sm font-bold bg-[#FF6B5F] hover:bg-[#E85548] text-white shadow-lg transition-all cursor-pointer"
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
