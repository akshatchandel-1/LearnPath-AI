import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
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
  const { theme } = useTheme();
  const isDark = theme === 'dark';

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
          handleSubmitAssessment();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isTimerRunning, submitted, assessment]);

  if (!isOpen || !assessment) return null;

  const currentQ = shuffledQuestions[currentIdx];
  const totalQuestions = shuffledQuestions.length || 1;
  const progressPercent = Math.round(((currentIdx + 1) / totalQuestions) * 100);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSelectOption = (optIdx) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIdx]: optIdx,
    }));
  };

  const handleSubmitAssessment = () => {
    setIsTimerRunning(false);
    setSubmitted(true);

    let correctCount = 0;
    shuffledQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswerIndex) {
        correctCount++;
      }
    });

    const scorePercentage = Math.round((correctCount / totalQuestions) * 100);
    const isPassed = scorePercentage >= (assessment.passingScore || 70);

    if (isPassed) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }

    if (onComplete) {
      onComplete({
        score: scorePercentage,
        passed: isPassed,
        correctCount,
        totalQuestions,
        xpEarned: isPassed ? (assessment.xpReward || 100) : 25,
        skillTested: assessment.skillTested || 'Technical Skill'
      });
    }

    if (onAssessmentCompleted) {
      onAssessmentCompleted(assessment.id, scorePercentage, isPassed);
    }
  };

  const calculateFinalResult = () => {
    let correctCount = 0;
    shuffledQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswerIndex) {
        correctCount++;
      }
    });
    const score = Math.round((correctCount / totalQuestions) * 100);
    const passed = score >= (assessment.passingScore || 70);
    return { score, passed, correctCount, total: totalQuestions };
  };

  const finalResult = submitted ? calculateFinalResult() : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div className={`rounded-[28px] max-w-2xl w-full shadow-2xl overflow-hidden my-8 border relative flex flex-col max-h-[90vh] transition-colors ${
        isDark ? 'bg-[#111418] border-white/[0.1] text-[#F5F1E8]' : 'bg-white border-black/[0.1] text-[#111418]'
      }`}>
        
        {/* Header */}
        <div className={`p-6 border-b flex items-center justify-between gap-4 shrink-0 ${
          isDark ? 'border-white/[0.08] bg-[#0E1114]' : 'border-black/[0.08] bg-[#F9FAFB]'
        }`}>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-[#FF6B5F]/15 text-[#FF857A] uppercase font-mono border border-[#FF6B5F]/30">
                {assessment.category || 'Skill Benchmark'}
              </span>
              <span className="text-xs font-mono text-[#8C877D]">
                Question {currentIdx + 1} of {totalQuestions}
              </span>
            </div>
            <h2 className={`text-lg font-black tracking-tight flex items-center gap-2 ${
              isDark ? 'text-[#F5F1E8]' : 'text-[#111418]'
            }`}>
              {assessment.title}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {!submitted && (
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs font-bold border ${
                timeLeft < 180 ? 'bg-[#F87171]/15 text-[#F87171] border-[#F87171]/30 animate-pulse' : 'bg-white/5 text-[#FBBF24] border-white/10'
              }`}>
                <Clock className="w-3.5 h-3.5" />
                <span>{formatTime(timeLeft)}</span>
              </div>
            )}
            <button
              onClick={onClose}
              className={`p-2 rounded-xl transition-colors cursor-pointer ${
                isDark ? 'text-[#8C877D] hover:text-[#F5F1E8] hover:bg-white/5' : 'text-[#6B7280] hover:text-[#111418] hover:bg-black/5'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className={`w-full h-1.5 overflow-hidden ${isDark ? 'bg-white/5' : 'bg-black/5'}`}>
          <div
            className="h-full bg-gradient-to-r from-[#FF6B5F] to-[#E85548] transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {!submitted && currentQ ? (
            <div className="space-y-5">
              {/* Question Text */}
              <div className={`p-5 rounded-2xl border space-y-2 ${
                isDark ? 'bg-[#16191E] border-white/[0.06]' : 'bg-[#FAF7F2] border-black/[0.06]'
              }`}>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#FF6B5F]" />
                  <span className="text-[10px] font-mono text-[#8C877D] uppercase font-bold">
                    Question #{currentIdx + 1}
                  </span>
                </div>
                <h3 className={`text-sm sm:text-base font-bold leading-relaxed ${
                  isDark ? 'text-[#F5F1E8]' : 'text-[#111418]'
                }`}>
                  {currentQ.question}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {currentQ.options?.map((opt, optIdx) => {
                  const isSelected = selectedAnswers[currentIdx] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-[#FF6B5F]/15 border-[#FF6B5F] text-[#FF857A] shadow-md shadow-[#FF6B5F]/10'
                          : isDark
                          ? 'bg-[#0E1114] border-white/[0.06] text-[#C7C2B6] hover:border-white/20 hover:bg-white/[0.02]'
                          : 'bg-white border-black/[0.08] text-[#374151] hover:border-black/20 hover:bg-black/[0.02]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                          isSelected
                            ? 'bg-[#FF6B5F] text-white'
                            : isDark
                            ? 'bg-white/5 text-[#8C877D]'
                            : 'bg-black/5 text-[#6B7280]'
                        }`}>
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="text-xs sm:text-sm font-medium leading-snug">
                          {opt}
                        </span>
                      </div>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-[#FF6B5F] shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : submitted && finalResult ? (
            /* Results Screen */
            <div className="space-y-6 animate-in fade-in">
              <div className={`p-6 rounded-3xl border text-center space-y-4 ${
                finalResult.passed
                  ? 'bg-[#34D399]/10 border-[#34D399]/30 text-[#34D399]'
                  : 'bg-[#F87171]/10 border-[#F87171]/30 text-[#F87171]'
              }`}>
                <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center bg-current/20">
                  {finalResult.passed ? (
                    <Award className="w-8 h-8 text-[#34D399]" />
                  ) : (
                    <AlertCircle className="w-8 h-8 text-[#F87171]" />
                  )}
                </div>
                <div>
                  <h3 className="text-2xl font-black font-mono">
                    {finalResult.score}%
                  </h3>
                  <p className="text-sm font-bold mt-1">
                    {finalResult.passed ? 'Benchmark Passed & Verified!' : 'Needs Reinforcement'}
                  </p>
                  <p className="text-xs opacity-80 mt-0.5">
                    {finalResult.correctCount} of {finalResult.total} questions answered correctly
                  </p>
                </div>
              </div>

              {/* Review Questions Breakdown */}
              <div className="space-y-4">
                <h4 className={`text-xs font-bold uppercase tracking-wider font-mono ${
                  isDark ? 'text-[#8C877D]' : 'text-[#6B7280]'
                }`}>
                  Detailed Review & Explanations:
                </h4>
                {shuffledQuestions.map((q, idx) => {
                  const userAns = selectedAnswers[idx];
                  const isCorrect = userAns === q.correctAnswerIndex;
                  return (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl border space-y-2 ${
                        isCorrect
                          ? 'border-[#34D399]/30 bg-[#34D399]/5'
                          : 'border-[#F87171]/30 bg-[#F87171]/5'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className={`text-xs font-bold leading-relaxed ${isDark ? 'text-[#F5F1E8]' : 'text-[#111418]'}`}>
                          {idx + 1}. {q.question}
                        </p>
                        {isCorrect ? (
                          <span className="text-[10px] font-bold text-[#34D399] font-mono px-2 py-0.5 rounded bg-[#34D399]/20 shrink-0">
                            +Correct
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-[#F87171] font-mono px-2 py-0.5 rounded bg-[#F87171]/20 shrink-0">
                            Incorrect
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#8C877D] leading-relaxed">
                        <strong className="text-[#34D399]">Correct:</strong> {q.options?.[q.correctAnswerIndex]}
                      </p>
                      {q.explanation && (
                        <p className={`text-[11px] leading-relaxed border-t pt-1.5 mt-1 ${
                          isDark ? 'border-white/5 text-[#8C877D]' : 'border-black/5 text-[#6B7280]'
                        }`}>
                          {q.explanation}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>

        {/* Footer Navigation */}
        <div className={`p-6 border-t flex items-center justify-between gap-4 shrink-0 ${
          isDark ? 'border-white/[0.08] bg-[#0E1114]' : 'border-black/[0.08] bg-[#F9FAFB]'
        }`}>
          {!submitted ? (
            <>
              <button
                type="button"
                onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
                disabled={currentIdx === 0}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer ${
                  isDark ? 'border-white/10 text-[#C7C2B6] hover:bg-white/5' : 'border-black/10 text-[#4B5563] hover:bg-black/5'
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>

              {currentIdx < totalQuestions - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentIdx((prev) => Math.min(totalQuestions - 1, prev + 1))}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF6B5F] hover:bg-[#E85548] text-white text-xs font-bold transition-all shadow-md shadow-[#FF6B5F]/20 cursor-pointer"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmitAssessment}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#34D399] to-[#059669] text-white text-xs font-bold transition-all shadow-lg shadow-[#34D399]/25 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Submit Benchmark</span>
                </button>
              )}
            </>
          ) : (
            <div className="w-full flex items-center justify-between">
              <button
                type="button"
                onClick={() => initQuestions(assessment)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                  isDark ? 'border-white/10 text-[#C7C2B6] hover:bg-white/5' : 'border-black/10 text-[#4B5563] hover:bg-black/5'
                }`}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Assessment</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-[#FF6B5F] hover:bg-[#E85548] text-white text-xs font-bold transition-all shadow-md shadow-[#FF6B5F]/20 cursor-pointer"
              >
                Complete & Return
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
