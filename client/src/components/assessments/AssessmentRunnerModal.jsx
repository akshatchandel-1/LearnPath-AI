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
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  const initQuestions = (rawAssessment) => {
    if (!rawAssessment || !rawAssessment.questions) return;
    
    // Deep clone and shuffle options while preserving correct answer index
    const prepared = (rawAssessment.questions || []).map((q) => {
      const originalCorrectIdx = q.correctAnswerIndex !== undefined ? q.correctAnswerIndex : (q.correctAnswer || 0);
      const optionsWithIdx = (q.options || []).map((opt, idx) => ({
        opt,
        isCorrect: idx === originalCorrectIdx,
      }));
      // Fisher-Yates shuffle options
      for (let i = optionsWithIdx.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [optionsWithIdx[i], optionsWithIdx[j]] = [optionsWithIdx[j], optionsWithIdx[i]];
      }
      return {
        ...q,
        options: optionsWithIdx.map(o => o.opt),
        correctAnswerIndex: optionsWithIdx.findIndex(o => o.isCorrect),
      };
    });

    // Fisher-Yates shuffle questions list
    for (let i = prepared.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [prepared[i], prepared[j]] = [prepared[j], prepared[i]];
    }

    setShuffledQuestions(prepared);
    setCurrentIdx(0);
    setSelectedAnswers({});
    setSubmitted(false);
    const minutes = parseInt(rawAssessment.duration, 10) || 15;
    setTimeLeft(minutes * 60);
    setIsTimerRunning(true);
  };

  useEffect(() => {
    if (assessment) {
      initQuestions(assessment);
    }
  }, [assessment]);

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
  }, [isTimerRunning, submitted, assessment, shuffledQuestions, selectedAnswers]);

  if (!assessment) return null;

  const totalQuestions = shuffledQuestions.length;
  const currentQ = shuffledQuestions[currentIdx];

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
    shuffledQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswerIndex) {
        correctCount++;
      }
    });

    const total = totalQuestions > 0 ? totalQuestions : 1;
    const percentage = Math.round((correctCount / total) * 100);
    const isPassed = percentage >= (assessment.passingScore || 70);

    return {
      correctCount,
      totalQuestions: total,
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
      skillTested: assessment.skillTested || assessment.category,
      xpEarned: res.isPassed ? (assessment.xpReward || 150) : 50
    };

    if (onComplete) onComplete(payload);
    if (onAssessmentCompleted) onAssessmentCompleted(payload);
  };

  const results = submitted ? calculateResults() : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl bg-[#16191E] border border-white/10 shadow-2xl overflow-hidden text-white">
        
        {/* Header */}
        <div className="p-5 border-b border-white/[0.08] flex items-center justify-between gap-4 bg-[#0E1114]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF6B5F]/15 flex items-center justify-center text-[#FF6B5F] border border-[#FF6B5F]/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white leading-tight">
                {assessment.title}
              </h2>
              <div className="flex items-center gap-2 text-xs text-neutral-400 mt-0.5">
                <span className="px-2 py-0.5 rounded-full bg-white/[0.06] text-neutral-300 font-mono text-[11px]">
                  {assessment.category}
                </span>
                <span>•</span>
                <span>Target: {assessment.passingScore || 70}% to Pass</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!submitted && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[#FF857A]">
                <Clock className="w-3.5 h-3.5" />
                <span>{formatTime(timeLeft)}</span>
              </div>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {!submitted ? (
            <>
              {/* Progress Indicator */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-neutral-400 font-medium">
                  <span>Question {currentIdx + 1} of {totalQuestions}</span>
                  <span className="font-mono text-neutral-300">
                    {Math.round(((currentIdx + 1) / (totalQuestions || 1)) * 100)}%
                  </span>
                </div>
                <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#FF6B5F] to-[#FFA07A] transition-all duration-300 rounded-full"
                    style={{ width: `${((currentIdx + 1) / (totalQuestions || 1)) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Text */}
              {currentQ && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-[#0E1114] border border-white/[0.06]">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#FF6B5F]/15 text-[#FF857A] text-[10px] font-bold uppercase tracking-wider mb-2">
                      {currentQ.skillSubtopic || 'Competency Benchmark'}
                    </span>
                    <h3 className="text-sm sm:text-base font-semibold text-white leading-relaxed">
                      {currentQ.question}
                    </h3>
                  </div>

                  {/* Options */}
                  <div className="space-y-2.5">
                    {(currentQ.options || []).map((opt, optIdx) => {
                      const isSelected = selectedAnswers[currentIdx] === optIdx;
                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleSelectOption(optIdx)}
                          className={`w-full text-left p-3.5 rounded-xl border transition-all duration-150 text-xs sm:text-sm font-medium flex items-center justify-between ${
                            isSelected
                              ? 'bg-[#FF6B5F]/15 border-[#FF6B5F] text-white shadow-sm shadow-[#FF6B5F]/20'
                              : 'bg-[#1C2026] border-white/[0.06] text-neutral-300 hover:border-white/20 hover:bg-[#22272E]'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-mono font-bold shrink-0 ${
                              isSelected
                                ? 'bg-[#FF6B5F] text-white'
                                : 'bg-white/[0.06] text-neutral-400'
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
                <h3 className="text-2xl font-black text-white">
                  {results.isPassed ? 'Assessment Benchmark Passed!' : 'Needs Reinforcement'}
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  {results.isPassed
                    ? `Congratulations! You scored ${results.percentage}% and earned +${assessment.xpReward || 150} XP.`
                    : `You scored ${results.percentage}%. Passing threshold is ${assessment.passingScore || 70}%. Review the explanations below and retake anytime.`}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[#0E1114] border border-white/[0.06] max-w-md mx-auto text-xs">
                <div>
                  <span className="text-neutral-400 block">Your Score</span>
                  <span className="text-lg font-black font-mono text-[#FF857A]">{results.percentage}%</span>
                </div>
                <div>
                  <span className="text-neutral-400 block">Correct</span>
                  <span className="text-lg font-black font-mono text-white">{results.correctCount}/{results.totalQuestions}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block">XP Awarded</span>
                  <span className="text-lg font-black font-mono text-[#FBBF24]">+{results.isPassed ? (assessment.xpReward || 150) : 50}</span>
                </div>
              </div>

              {/* Explanations Review */}
              <div className="space-y-3 text-left mt-6">
                <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                  Detailed Answers & Explanations
                </h4>
                {shuffledQuestions.map((q, idx) => {
                  const isCorrect = selectedAnswers[idx] === q.correctAnswerIndex;
                  return (
                    <div key={idx} className="p-3.5 rounded-xl bg-[#1C2026] border border-white/[0.06] text-xs space-y-1.5">
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-bold text-white">{idx + 1}. {q.question}</span>
                        {isCorrect ? (
                          <span className="text-[#34D399] font-bold text-[10px] uppercase font-mono shrink-0">Correct</span>
                        ) : (
                          <span className="text-[#F87171] font-bold text-[10px] uppercase font-mono shrink-0">Incorrect</span>
                        )}
                      </div>
                      <p className="text-neutral-400 text-[11px] leading-relaxed">
                        <strong className="text-[#34D399]">Correct Answer:</strong> {q.options[q.correctAnswerIndex]}
                      </p>
                      {q.explanation && (
                        <p className="text-neutral-300 text-[11px] bg-[#0E1114] p-2 rounded-lg border border-white/[0.04] mt-1 leading-relaxed">
                          <em>{q.explanation}</em>
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
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-white/10 text-xs font-bold text-neutral-300 hover:text-white disabled:opacity-30 cursor-pointer"
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
                onClick={() => initQuestions(assessment)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-white/10 text-xs font-bold text-neutral-300 hover:text-white cursor-pointer"
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
