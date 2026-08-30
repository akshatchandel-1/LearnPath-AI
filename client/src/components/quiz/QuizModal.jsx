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
import { useTheme } from '../../context/ThemeContext';

export const QuizModal = ({ skillName, count = 3, isOpen, onClose }) => {
  const { refreshAll } = useLearningPath();
  const { user, updateUserProfile } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

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
        skill: skillName || quiz.skill || 'General',
        answers: answerPayload,
        targetRole: user?.targetRole || user?.careerGoal || 'Full Stack Developer',
      });

      if (res.data.success) {
        setResult(res.data.result);
        if (res.data.user && updateUserProfile) {
          updateUserProfile(res.data.user);
        }
        if (res.data.result.passed) {
          try {
            confetti({
              particleCount: 75,
              spread: 60,
              origin: { y: 0.6 }
            });
          } catch (e) {}
        }
        if (refreshAll) refreshAll();
      }
    } catch (err) {
      console.error('Error submitting quiz:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const currentQ = quiz?.questions?.[currentQuestionIdx];
  const totalQuestions = quiz?.questions?.length || count || 3;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div className={`rounded-[28px] max-w-xl w-full shadow-2xl overflow-hidden my-8 border relative flex flex-col max-h-[90vh] transition-colors ${
        isDark ? 'bg-[#111418] border-white/[0.1] text-[#F5F1E8]' : 'bg-white border-black/[0.1] text-[#111418]'
      }`}>
        
        {/* Header */}
        <div className={`p-5 border-b flex items-center justify-between gap-4 shrink-0 ${
          isDark ? 'border-white/[0.08] bg-[#0E1114]' : 'border-black/[0.08] bg-[#F9FAFB]'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#FF6B5F]/15 border border-[#FF6B5F]/30 text-[#FF857A] flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h3 className={`font-black text-base flex items-center gap-2 ${isDark ? 'text-[#F5F1E8]' : 'text-[#111418]'}`}>
                {skillName || 'Skill'} Diagnostic Quiz
              </h3>
              <p className="text-xs text-[#8C877D]">
                Question {currentQuestionIdx + 1} of {totalQuestions}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-xl transition-colors cursor-pointer ${
              isDark ? 'text-[#8C877D] hover:text-[#F5F1E8] hover:bg-white/5' : 'text-[#6B7280] hover:text-[#111418] hover:bg-black/5'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {loading ? (
            <div className="py-16 flex flex-col items-center justify-center gap-3 text-center">
              <div className="w-8 h-8 border-3 border-[#FF6B5F]/20 border-t-[#FF6B5F] rounded-full animate-spin" />
              <p className="text-xs text-[#8C877D]">Generating specialized questions with AI...</p>
            </div>
          ) : result ? (
            /* Result View */
            <div className="space-y-6 text-center animate-in fade-in">
              <div className={`p-6 rounded-3xl border space-y-3 ${
                result.passed
                  ? 'bg-[#34D399]/10 border-[#34D399]/30 text-[#34D399]'
                  : 'bg-[#F87171]/10 border-[#F87171]/30 text-[#F87171]'
              }`}>
                <div className="w-14 h-14 rounded-full mx-auto flex items-center justify-center bg-current/20">
                  <Award className="w-7 h-7" />
                </div>
                <h4 className="text-2xl font-black font-mono">{result.score}% Score</h4>
                <p className="text-xs font-bold">
                  {result.passed ? 'Skill Checkpoint Verified! +100 XP awarded' : 'Keep practicing this concept'}
                </p>
                <p className="text-[11px] opacity-80">
                  {result.correctCount} of {result.totalQuestions} questions correct
                </p>
              </div>

              {/* Answers breakdown */}
              <div className="space-y-3 text-left">
                {result.detailedAnswers?.map((ans, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-2xl border text-xs space-y-1.5 ${
                      ans.isCorrect
                        ? 'border-[#34D399]/30 bg-[#34D399]/5'
                        : 'border-[#F87171]/30 bg-[#F87171]/5'
                    }`}
                  >
                    <p className={`font-bold ${isDark ? 'text-[#F5F1E8]' : 'text-[#111418]'}`}>
                      {idx + 1}. {ans.question}
                    </p>
                    <p className="text-[#8C877D]">
                      <strong className="text-[#34D399]">Correct:</strong> {ans.options?.[ans.correctAnswerIndex]}
                    </p>
                    {ans.explanation && (
                      <p className={`text-[11px] border-t pt-1 mt-1 ${
                        isDark ? 'border-white/5 text-[#8C877D]' : 'border-black/5 text-[#6B7280]'
                      }`}>
                        {ans.explanation}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : currentQ ? (
            /* Active Question */
            <div className="space-y-4">
              <div className={`p-4 rounded-2xl border space-y-2 ${
                isDark ? 'bg-[#16191E] border-white/[0.06]' : 'bg-[#FAF7F2] border-black/[0.06]'
              }`}>
                <span className="text-[10px] font-mono text-[#FF857A] uppercase font-bold">
                  Question #{currentQuestionIdx + 1}
                </span>
                <p className={`text-sm font-bold leading-relaxed ${
                  isDark ? 'text-[#F5F1E8]' : 'text-[#111418]'
                }`}>
                  {currentQ.question}
                </p>
              </div>

              <div className="space-y-2.5">
                {currentQ.options?.map((opt, optIdx) => {
                  const isSelected = selectedAnswers[currentQuestionIdx] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(currentQuestionIdx, optIdx)}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-[#FF6B5F]/15 border-[#FF6B5F] text-[#FF857A]'
                          : isDark
                          ? 'bg-[#0E1114] border-white/[0.06] text-[#C7C2B6] hover:border-white/20'
                          : 'bg-white border-black/[0.08] text-[#374151] hover:border-black/20'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono text-xs font-bold ${
                          isSelected
                            ? 'bg-[#FF6B5F] text-white'
                            : isDark
                            ? 'bg-white/5 text-[#8C877D]'
                            : 'bg-black/5 text-[#6B7280]'
                        }`}>
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="text-xs font-medium leading-snug">{opt}</span>
                      </div>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-[#FF6B5F] shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <div className={`p-5 border-t flex items-center justify-between gap-4 shrink-0 ${
          isDark ? 'border-white/[0.08] bg-[#0E1114]' : 'border-black/[0.08] bg-[#F9FAFB]'
        }`}>
          {!result ? (
            <>
              <button
                type="button"
                onClick={() => setCurrentQuestionIdx((p) => Math.max(0, p - 1))}
                disabled={currentQuestionIdx === 0 || loading}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer ${
                  isDark ? 'border-white/10 text-[#C7C2B6] hover:bg-white/5' : 'border-black/10 text-[#4B5563] hover:bg-black/5'
                }`}
              >
                Previous
              </button>

              {currentQuestionIdx < totalQuestions - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentQuestionIdx((p) => Math.min(totalQuestions - 1, p + 1))}
                  disabled={loading}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FF6B5F] hover:bg-[#E85548] text-white text-xs font-bold transition-all shadow-md shadow-[#FF6B5F]/20 cursor-pointer"
                >
                  <span>Next</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmitQuiz}
                  disabled={submitting || loading}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#34D399] hover:bg-[#059669] text-white text-xs font-bold transition-all shadow-md shadow-[#34D399]/20 cursor-pointer"
                >
                  <span>{submitting ? 'Scoring...' : 'Submit Quiz'}</span>
                </button>
              )}
            </>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-[#FF6B5F] hover:bg-[#E85548] text-white text-xs font-bold transition-all shadow-md shadow-[#FF6B5F]/20 cursor-pointer"
            >
              Close & Return to Roadmap
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
