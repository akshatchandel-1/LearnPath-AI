import React, { useState, useEffect } from 'react';
import {
  X,
  Award,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AssessmentRunnerModal({
  assessment,
  isOpen = true,
  onClose,
  onComplete,
  onAssessmentCompleted
}) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1200);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  // Reset state when assessment opens
  useEffect(() => {
    if (assessment) {
      setCurrentIdx(0);
      setSelectedAnswers({});
      setSubmitted(false);
      const minutes = parseInt(assessment.duration, 10) || 20;
      setTimeLeft(minutes * 60);
      setIsTimerRunning(true);
    }
  }, [assessment]);

  // Countdown timer effect
  useEffect(() => {
    if (!isTimerRunning || submitted || !assessment) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerRunning, submitted, assessment]);

  if (!assessment) return null;

  const questions = assessment.questions || [];
  const totalQuestions = questions.length;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optIdx) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIdx]: optIdx
    }));
  };

  const calculateResults = () => {
    let correctCount = 0;
    questions.forEach((q, idx) => {
      const correctIdx = q.correctAnswerIndex !== undefined ? q.correctAnswerIndex : q.correctAnswer;
      if (selectedAnswers[idx] === correctIdx) {
        correctCount++;
      }
    });

    const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
    const isPassed = percentage >= (assessment.passingScore || 70);

    return {
      correctCount,
      totalQuestions,
      percentage,
      isPassed
    };
  };

  const handleSubmit = () => {
    if (submitted) return;
    setIsTimerRunning(false);
    setSubmitted(true);

    const res = calculateResults();
    if (res.isPassed) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }

    const payload = {
      assessmentId: assessment.id,
      score: res.percentage,
      passed: res.isPassed,
      correctCount: res.correctCount,
      totalQuestions: res.totalQuestions,
      xpAwarded: res.isPassed ? (assessment.xpReward || 200) : 50
    };

    if (onComplete) onComplete(payload);
    if (onAssessmentCompleted) onAssessmentCompleted(payload);
  };

  const results = calculateResults();
  const currentQuestion = questions[currentIdx];
  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div className="bg-[#111418] rounded-[28px] max-w-2xl w-full shadow-2xl overflow-hidden my-8 border border-white/[0.1] text-[#F5F1E8] relative flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-white/[0.08] bg-[#0E1114] flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FF6B5F]/15 border border-[#FF6B5F]/30 flex items-center justify-center text-[#FF857A]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-[#F5F1E8] truncate max-w-sm">
                {assessment.title}
              </h2>
              <div className="flex items-center gap-2 text-[10px] text-[#8C877D] font-mono">
                <span>{assessment.skill || assessment.category}</span>
                <span>•</span>
                <span>Pass: {assessment.passingScore || 70}%</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!submitted && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#16191E] border border-white/[0.08] text-xs font-mono font-bold text-[#FF857A]">
                <Clock className="w-3.5 h-3.5" />
                <span>{formatTime(timeLeft)}</span>
              </div>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-[#8C877D] hover:text-[#F5F1E8] hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {!submitted ? (
            <>
              {/* Question Progress Tracker */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs text-[#8C877D]">
                  <span>Question <strong className="text-[#F5F1E8]">{currentIdx + 1}</strong> of {totalQuestions}</span>
                  <span className="font-mono">{answeredCount} answered</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#FF6B5F] to-[#E85548] h-full rounded-full transition-all duration-300"
                    style={{ width: `${((currentIdx + 1) / totalQuestions) * 100}%` }}
                  />
                </div>
              </div>

              {/* Current Question */}
              {currentQuestion && (
                <div className="space-y-4">
                  <h3 className="text-sm sm:text-base font-bold text-[#F5F1E8] leading-relaxed">
                    {currentQuestion.question}
                  </h3>

                  {/* Options List */}
                  <div className="space-y-2.5">
                    {currentQuestion.options?.map((opt, optIdx) => {
                      const isSelected = selectedAnswers[currentIdx] === optIdx;
                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleSelectOption(optIdx)}
                          className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center justify-between group ${
                            isSelected
                              ? 'bg-[#FF6B5F]/15 border-[#FF6B5F] text-[#F5F1E8]'
                              : 'bg-[#16191E] border-white/[0.06] text-[#C7C2B6] hover:border-white/20 hover:text-[#F5F1E8]'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-mono font-bold shrink-0 ${
                              isSelected ? 'bg-[#FF6B5F] text-white' : 'bg-white/5 text-[#8C877D]'
                            }`}>
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span className="leading-snug">{opt}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Results Screen */
            <div className="text-center space-y-6 py-4">
              <div className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center shadow-2xl ${
                results.isPassed
                  ? 'bg-[#34D399]/20 text-[#34D399] border-2 border-[#34D399]/40'
                  : 'bg-[#F87171]/20 text-[#F87171] border-2 border-[#F87171]/40'
              }`}>
                {results.isPassed ? <CheckCircle2 className="w-10 h-10" /> : <XCircle className="w-10 h-10" />}
              </div>

              <div>
                <h3 className="text-2xl font-black text-[#F5F1E8]">
                  {results.isPassed ? 'Assessment Benchmark Passed! 🎉' : 'Needs Reinforcement'}
                </h3>
                <p className="text-xs text-[#8C877D] mt-1">
                  {results.isPassed
                    ? `Congratulations! You scored ${results.percentage}% and earned +${assessment.xpReward || 200} XP.`
                    : `You scored ${results.percentage}%. Passing threshold is ${assessment.passingScore || 70}%. Review the explanations below and retake anytime.`}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[#0E1114] border border-white/[0.06] max-w-md mx-auto text-xs">
                <div>
                  <span className="text-[#8C877D] block">Your Score</span>
                  <span className="text-lg font-black font-mono text-[#FF857A]">{results.percentage}%</span>
                </div>
                <div>
                  <span className="text-[#8C877D] block">Correct</span>
                  <span className="text-lg font-black font-mono text-[#F5F1E8]">{results.correctCount}/{results.totalQuestions}</span>
                </div>
                <div>
                  <span className="text-[#8C877D] block">XP Awarded</span>
                  <span className="text-lg font-black font-mono text-[#FBBF24]">+{results.isPassed ? (assessment.xpReward || 200) : 50}</span>
                </div>
              </div>

              {/* Explanations Review */}
              <div className="space-y-3 text-left mt-6">
                <h4 className="text-xs font-bold text-[#C7C2B6] uppercase tracking-wider">
                  Detailed Answers & Explanations
                </h4>
                {questions.map((q, idx) => {
                  const correctIdx = q.correctAnswerIndex !== undefined ? q.correctAnswerIndex : q.correctAnswer;
                  const isCorrect = selectedAnswers[idx] === correctIdx;
                  return (
                    <div key={idx} className="p-3.5 rounded-xl bg-[#16191E] border border-white/[0.06] text-xs space-y-1.5">
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-bold text-[#F5F1E8]">{idx + 1}. {q.question}</span>
                        {isCorrect ? (
                          <span className="text-[#34D399] font-bold text-[10px] uppercase font-mono shrink-0">Correct ✓</span>
                        ) : (
                          <span className="text-[#F87171] font-bold text-[10px] uppercase font-mono shrink-0">Incorrect ✗</span>
                        )}
                      </div>
                      <p className="text-[#8C877D] text-[11px] leading-relaxed">
                        <strong className="text-[#34D399]">Correct Answer:</strong> {q.options[correctIdx]}
                      </p>
                      {q.explanation && (
                        <p className="text-[#C7C2B6] text-[11px] bg-[#0E1114] p-2 rounded-lg border border-white/[0.04] mt-1 leading-relaxed">
                          💡 <em>{q.explanation}</em>
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="p-4 sm:p-5 border-t border-white/[0.08] bg-[#0E1114] flex items-center justify-between gap-3 shrink-0">
          {!submitted ? (
            <>
              <button
                type="button"
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx((p) => p - 1)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-white/10 text-xs font-bold text-[#C7C2B6] hover:text-[#F5F1E8] disabled:opacity-30 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>

              <div className="flex items-center gap-2">
                {currentIdx < totalQuestions - 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentIdx((p) => p + 1)}
                    className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#FF6B5F] hover:bg-[#E85548] text-white text-xs font-bold shadow-md shadow-[#FF6B5F]/20 cursor-pointer"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex items-center gap-1.5 px-6 py-2 rounded-xl bg-gradient-to-r from-[#34D399] to-[#059669] text-white text-xs font-bold shadow-md shadow-[#34D399]/20 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Submit Assessment</span>
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center justify-between w-full">
              <button
                type="button"
                onClick={() => {
                  setSelectedAnswers({});
                  setSubmitted(false);
                  setCurrentIdx(0);
                  const minutes = parseInt(assessment.duration, 10) || 20;
                  setTimeLeft(minutes * 60);
                  setIsTimerRunning(true);
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-white/10 text-xs font-bold text-[#C7C2B6] hover:text-[#F5F1E8] cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 rounded-xl bg-[#FF6B5F] hover:bg-[#E85548] text-white text-xs font-bold cursor-pointer"
              >
                Done & Return to Checkpoints
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
