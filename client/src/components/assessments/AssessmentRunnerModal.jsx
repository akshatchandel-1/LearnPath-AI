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
  Zap,
  ShieldCheck,
  HelpCircle,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AssessmentRunnerModal({
  assessment,
  isOpen,
  onClose,
  onAssessmentCompleted
}) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { [idx]: optionIndex }
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1200); // 20 mins default
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  // Reset state when assessment opens
  useEffect(() => {
    if (isOpen && assessment) {
      setCurrentIdx(0);
      setSelectedAnswers({});
      setSubmitted(false);
      const minutes = parseInt(assessment.duration, 10) || 20;
      setTimeLeft(minutes * 60);
      setIsTimerRunning(true);
    }
  }, [isOpen, assessment]);

  // Countdown timer effect
  useEffect(() => {
    if (!isTimerRunning || submitted || !isOpen) return;

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
  }, [isTimerRunning, submitted, isOpen]);

  if (!isOpen || !assessment) return null;

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
    const details = questions.map((q, idx) => {
      const userSelected = selectedAnswers[idx];
      const isCorrect = userSelected === q.correctAnswerIndex;
      if (isCorrect) correctCount++;
      return {
        question: q.question,
        options: q.options,
        userSelected,
        correctAnswerIndex: q.correctAnswerIndex,
        isCorrect,
        explanation: q.explanation
      };
    });

    const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
    const passed = percentage >= (assessment.passingScore || 70);
    const earnedXp = passed ? (assessment.xpReward || 150) : Math.round((assessment.xpReward || 150) * 0.4);

    return {
      correctCount,
      totalQuestions,
      percentage,
      passed,
      earnedXp,
      details
    };
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setIsTimerRunning(false);

    const result = calculateResults();

    if (result.passed) {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#E05A47', '#D99A8A', '#3F8F68', '#C48A3A', '#202124']
      });
    }

    if (onAssessmentCompleted) {
      onAssessmentCompleted(assessment.id, result);
    }
  };

  const handleRetake = () => {
    setCurrentIdx(0);
    setSelectedAnswers({});
    setSubmitted(false);
    const minutes = parseInt(assessment.duration, 10) || 20;
    setTimeLeft(minutes * 60);
    setIsTimerRunning(true);
  };

  const resultData = submitted ? calculateResults() : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="m3-theme-scope relative w-full max-w-3xl max-h-[92vh] overflow-y-auto m3-modal-dialog p-6 sm:p-8 text-[#202124]">

        {/* Top Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E6E0D7]">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider m3-badge-coral flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#E05A47]" />
              {assessment.skill} • {assessment.difficulty}
            </span>
            <span className="text-xs text-[#8A8F98] font-mono hidden sm:inline">
              Passing: {assessment.passingScore || 70}%
            </span>
          </div>

          <div className="flex items-center gap-3">
            {!submitted && (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#F6F2EA] border border-[#E6E0D7] text-xs font-mono text-[#202124]">
                <Clock className="w-3.5 h-3.5 text-[#E05A47]" />
                <span>{formatTime(timeLeft)}</span>
              </div>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#5F6368] hover:text-[#202124] hover:bg-[#F6F2EA] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {!submitted ? (
          /* Active Question Step UI */
          <div className="mt-6 space-y-6">
            <div>
              <h1 className="text-lg sm:text-xl font-black text-[#202124]">
                {assessment.title}
              </h1>
              <p className="text-xs text-[#5F6368] mt-1">
                Question {currentIdx + 1} of {totalQuestions} • Select the single best technical answer.
              </p>
            </div>

            {/* Question Card Box */}
            {questions[currentIdx] && (
              <div className="space-y-4">
                <div className="p-4 sm:p-5 rounded-2xl bg-[#F6F2EA] border border-[#E6E0D7] text-sm sm:text-base font-semibold text-[#202124] leading-snug">
                  {questions[currentIdx].question}
                </div>

                {/* Options List */}
                <div className="space-y-2.5">
                  {questions[currentIdx].options.map((opt, optIdx) => {
                    const isSelected = selectedAnswers[currentIdx] === optIdx;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(optIdx)}
                        className={`w-full p-3.5 sm:p-4 rounded-2xl text-left text-xs sm:text-sm font-medium transition-all flex items-start gap-3.5 border cursor-pointer ${
                          isSelected
                            ? 'bg-[#FDF0EE] border-[#E05A47] text-[#202124] shadow-sm ring-1 ring-[#E05A47]'
                            : 'bg-[#FFFDF8] border-[#E6E0D7] text-[#3F4247] hover:bg-[#F6F2EA] hover:border-[#D99A8A]'
                        }`}
                      >
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-[#E05A47] text-white font-black'
                              : 'bg-[#F1ECE3] border border-[#E6E0D7] text-[#5F6368]'
                          }`}
                        >
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="mt-0.5 leading-relaxed">{opt}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Question Jumper & Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#E6E0D7]">
              <button
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx((prev) => prev - 1)}
                className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold m3-btn-secondary disabled:opacity-30 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>

              {/* Question Dots */}
              <div className="flex items-center gap-2">
                {questions.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIdx(idx)}
                    className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                      idx === currentIdx
                        ? 'bg-[#E05A47] scale-125 shadow-sm'
                        : selectedAnswers[idx] !== undefined
                        ? 'bg-[#D99A8A]'
                        : 'bg-[#E6E0D7] hover:bg-[#D6D1C8]'
                    }`}
                    title={`Question ${idx + 1}`}
                  />
                ))}
              </div>

              {currentIdx < totalQuestions - 1 ? (
                <button
                  onClick={() => setCurrentIdx((prev) => prev + 1)}
                  className="w-full sm:w-auto px-5 py-2 rounded-xl text-xs font-bold m3-btn-primary cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={Object.keys(selectedAnswers).length === 0}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold bg-[#E05A47] hover:bg-[#C94A38] text-white shadow-sm disabled:opacity-40 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4 text-amber-300" />
                  <span>Submit & Calibrate Skill</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Results Evaluation Screen */
          <div className="mt-6 space-y-6 text-center animate-in zoom-in-95 duration-200">
            {/* Celebration / Alert Icon */}
            <div
              className={`w-16 h-16 rounded-3xl mx-auto flex items-center justify-center shadow-md border ${
                resultData.passed
                  ? 'bg-[#EDF7F2] text-[#3F8F68] border-[#C6E7D6]'
                  : 'bg-[#FDF0F0] text-[#C94A4A] border-[#F7D2D2]'
              }`}
            >
              {resultData.passed ? <Award className="w-8 h-8" /> : <AlertCircle className="w-8 h-8" />}
            </div>

            <div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                  resultData.passed
                    ? 'm3-badge-emerald'
                    : 'bg-[#FDF0F0] text-[#C94A4A] border-[#F7D2D2]'
                }`}
              >
                {resultData.passed ? '✓ Assessment Passed' : 'Needs Practice (Under 70%)'}
              </span>

              <h1 className="text-2xl sm:text-3xl font-black text-[#202124] mt-2">
                Score: {resultData.percentage}% ({resultData.correctCount}/{resultData.totalQuestions} Correct)
              </h1>
              <p className="text-xs text-[#5F6368] mt-1">
                You earned <strong className="text-[#E05A47]">+{resultData.earnedXp} XP</strong> towards your Full Stack MERN track!
              </p>
            </div>

            {/* Calibration Delta Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#F6F2EA] border border-[#E6E0D7] text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#E05A47]">
                  <TrendingUp className="w-3.5 h-3.5 text-[#E05A47]" />
                  <span>Adaptive Skill Level Calibrated</span>
                </div>
                <p className="text-sm font-semibold text-[#202124] mt-0.5">
                  {assessment.skill}: Calibrated to <span className="text-[#E05A47] font-bold">{Math.min(98, (assessment.lastScore || 65) + (resultData.passed ? 15 : 5))}%</span>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-xl text-xs font-black m3-badge-coral">
                  {resultData.passed ? '+15% Gain' : '+5% Practice XP'}
                </span>
              </div>
            </div>

            {/* Answer Explanations Review List */}
            <div className="text-left space-y-3 max-h-64 overflow-y-auto pr-1">
              <p className="text-xs font-bold uppercase tracking-wider text-[#202124]">
                Detailed Question Review & Explanations:
              </p>

              {resultData.details.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl border text-xs space-y-2 ${
                    item.isCorrect
                      ? 'bg-[#EDF7F2] border-[#C6E7D6] text-[#245D42]'
                      : 'bg-[#FDF0F0] border-[#F7D2D2] text-[#8C2E2E]'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {item.isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-[#3F8F68] shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-4 h-4 text-[#C94A4A] shrink-0 mt-0.5" />
                    )}
                    <p className="font-semibold text-[#202124]">
                      Q{idx + 1}: {item.question}
                    </p>
                  </div>

                  <p className="text-[11px] text-[#5F6368] pl-6 leading-relaxed">
                    <strong className="text-[#202124]">Explanation: </strong>
                    {item.explanation}
                  </p>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleRetake}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold m3-btn-secondary cursor-pointer flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Assessment</span>
              </button>

              <button
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold m3-btn-primary cursor-pointer"
              >
                Done & View Assessments
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
