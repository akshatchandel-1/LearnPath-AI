import React, { useState } from 'react';
import { mockAssessments as initialAssessments } from '../../utils/mockData';
import {
  ClipboardCheck,
  CheckCircle2,
  Clock,
  Timer,
  ShieldCheck,
  AlertTriangle,
  PlayCircle,
  RotateCcw,
  Sparkles,
  BarChart3,
  X,
  ArrowRight,
  Flame,
  Award,
  BookOpen
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AssessmentsList() {
  const navigate = useNavigate();
  const [assessments, setAssessments] = useState(initialAssessments);
  const [activeQuizModal, setActiveQuizModal] = useState(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(null);
  const [filterCategory, setFilterCategory] = useState('All');

  const sampleQuestions = [
    {
      question: 'What is the primary difference between useEffect and useLayoutEffect in React?',
      options: [
        'useEffect runs synchronously before DOM mutations; useLayoutEffect runs asynchronously.',
        'useLayoutEffect runs synchronously after all DOM mutations before painting; useEffect runs asynchronously after paint.',
        'useEffect can only be used on the server, whereas useLayoutEffect is client-only.',
        'useLayoutEffect replaces componentDidMount completely while useEffect replaces componentDidUpdate.',
      ],
      correctIndex: 1,
    },
    {
      question: 'In Node.js event loop architecture, which phase executes setImmediate() callbacks?',
      options: [
        'Timers phase',
        'Pending callbacks phase',
        'Check phase',
        'Close callbacks phase',
      ],
      correctIndex: 2,
    },
    {
      question: 'In MongoDB, which index type provides optimal performance for compound query lookups?',
      options: [
        'Single-field hashed index',
        'Compound Index adhering to Equality-Sort-Range (ESR) rule',
        'Geospatial 2dsphere index',
        'TTL Index',
      ],
      correctIndex: 1,
    },
    {
      question: 'In Transformer neural networks, what is the computational complexity of standard Self-Attention with respect to sequence length N?',
      options: [
        'O(N)',
        'O(N log N)',
        'O(N^2)',
        'O(1)',
      ],
      correctIndex: 2,
    }
  ];

  const handleStartQuiz = (assessment) => {
    setActiveQuizModal(assessment);
    setCurrentQuestionIdx(0);
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setQuizScore(null);
  };

  const handleSelectOption = (optIdx) => {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIdx]: optIdx,
    }));
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    sampleQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });

    const percentage = Math.round((correctCount / sampleQuestions.length) * 100);
    const scoreResult = {
      correctCount,
      totalCount: sampleQuestions.length,
      percentage,
      passed: percentage >= 50,
    };
    setQuizScore(scoreResult);
    setQuizSubmitted(true);

    if (activeQuizModal) {
      setAssessments((prev) =>
        prev.map((item) =>
          item.id === activeQuizModal.id
            ? { ...item, status: 'Passed', lastScore: `${percentage}%` }
            : item
        )
      );
    }
  };

  const filteredAssessments = assessments.filter((a) => {
    if (filterCategory === 'All') return true;
    return a.category === filterCategory;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner: Overall Score & Verified Badges */}
      <div className="bg-[#111418] border border-white/[0.08] rounded-[28px] p-6 sm:p-7 text-[#F5F1E8] shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF6B5F] to-[#E85548] flex items-center justify-center text-white shadow-xl shadow-[#FF6B5F]/25 shrink-0">
            <ClipboardCheck className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF857A]">
                Verified Competency Score
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#34D399]/15 text-[#34D399]">
                Live Benchmark
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#F5F1E8] tracking-tight flex items-baseline gap-2">
              72% <span className="text-xs font-semibold text-[#8C877D]">Overall Score</span>
            </h2>
            <p className="text-xs text-[#C7C2B6] font-medium mt-0.5">
              4 of 6 assessments passed. Take recommended tests to upgrade your skill verification.
            </p>
          </div>
        </div>

        <button
          onClick={() => handleStartQuiz(assessments[0])}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl text-xs sm:text-sm font-bold bg-gradient-to-r from-[#FF6B5F] to-[#E85548] hover:from-[#FF857A] text-white shadow-xl shadow-[#FF6B5F]/30 hover:scale-105 transition-all shrink-0 cursor-pointer"
        >
          <span>Take Benchmark Quiz</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {['All', 'Frontend', 'Backend', 'AI/ML'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-colors cursor-pointer ${
                filterCategory === cat
                  ? 'bg-[#FF6B5F] text-white shadow-xs'
                  : 'bg-[#111418] text-[#8C877D] hover:text-[#F5F1E8] border border-white/[0.06]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <span className="text-xs text-[#8C877D] font-mono hidden sm:inline">
          {filteredAssessments.length} Available Quizzes
        </span>
      </div>

      {/* Assessments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssessments.map((assessment) => {
          const isPassed = assessment.status === 'Passed';
          return (
            <div
              key={assessment.id}
              onClick={() => handleStartQuiz(assessment)}
              className="bg-[#111418] border border-white/[0.08] hover:border-[#FF6B5F]/40 rounded-[24px] p-6 shadow-xl hover:shadow-[#FF6B5F]/10 transition-all flex flex-col justify-between cursor-pointer group hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold text-[#FF857A] bg-[#FF6B5F]/10 px-2.5 py-0.5 rounded-full border border-[#FF6B5F]/20">
                    {assessment.category}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isPassed
                      ? 'bg-[#34D399]/15 text-[#34D399] border border-[#34D399]/30'
                      : 'bg-white/5 text-[#8C877D] border border-white/10'
                  }`}>
                    {assessment.status}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#F5F1E8] group-hover:text-[#FF857A] transition-colors mb-1.5">
                  {assessment.title}
                </h3>

                <p className="text-xs text-[#C7C2B6] line-clamp-2 mb-4 font-medium">
                  {assessment.description || 'Test your foundational and advanced engineering concepts.'}
                </p>

                <div className="flex items-center gap-4 text-xs text-[#8C877D] mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#FF6B5F]" />
                    {assessment.duration || '15 mins'}
                  </span>
                  <span className="flex items-center gap-1">
                    <ClipboardCheck className="w-3.5 h-3.5 text-[#FF6B5F]" />
                    {assessment.totalQuestions || '20'} Questions
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#8C877D] block">Last Score</span>
                  <span className="text-xs font-bold text-[#F5F1E8]">{assessment.lastScore || 'Not Attempted'}</span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStartQuiz(assessment);
                  }}
                  className="px-4 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#FF6B5F] to-[#E85548] text-white shadow-xs group-hover:from-[#FF857A] transition-all cursor-pointer"
                >
                  {isPassed ? 'Retake Quiz' : 'Start Test'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Timed Quiz Runner Modal */}
      {activeQuizModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div
            className="bg-[#111418] rounded-[28px] max-w-2xl w-full border border-white/10 shadow-2xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto animate-in zoom-in-95 text-[#F5F1E8]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FF6B5F]/15 text-[#FF857A] border border-[#FF6B5F]/30">
                  {activeQuizModal.title}
                </span>
                <span className="text-xs text-[#8C877D]">•</span>
                <span className="text-xs font-medium text-[#8C877D]">
                  Timed Assessment
                </span>
              </div>

              <div className="flex items-center gap-2">
                {!quizSubmitted && (
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#FF6B5F]/10 border border-[#FF6B5F]/20 text-[#FF857A] text-xs font-bold">
                    <Timer className="w-3.5 h-3.5 text-[#FF6B5F]" />
                    <span>02:00</span>
                  </div>
                )}
                <button
                  onClick={() => setActiveQuizModal(null)}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#8C877D] hover:text-[#F5F1E8] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quiz Body */}
            {!quizSubmitted ? (
              <div className="py-6 space-y-6">
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#8C877D]">
                    <span>
                      Question {currentQuestionIdx + 1} of {sampleQuestions.length}
                    </span>
                    <span className="text-[#FF857A]">
                      {Math.round(((currentQuestionIdx + 1) / sampleQuestions.length) * 100)}% Complete
                    </span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#FF6B5F] to-[#E85548] h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${((currentQuestionIdx + 1) / sampleQuestions.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Question */}
                <div className="bg-[#16191E] border border-white/[0.06] rounded-2xl p-5">
                  <h4 className="text-sm sm:text-base font-bold text-[#F5F1E8] leading-relaxed">
                    {sampleQuestions[currentQuestionIdx]?.question}
                  </h4>
                </div>

                {/* Options */}
                <div className="space-y-3">
                  {sampleQuestions[currentQuestionIdx]?.options.map((option, optIdx) => {
                    const isSelected = selectedAnswers[currentQuestionIdx] === optIdx;
                    const letters = ['A', 'B', 'C', 'D'];

                    return (
                      <label
                        key={optIdx}
                        onClick={() => handleSelectOption(optIdx)}
                        className={`flex items-start gap-3.5 p-4 rounded-2xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#FF6B5F]/15 border-[#FF6B5F] ring-1 ring-[#FF6B5F]'
                            : 'bg-[#16191E] border-white/[0.06] hover:border-white/20'
                        }`}
                      >
                        <span
                          className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                            isSelected
                              ? 'bg-[#FF6B5F] text-white shadow-xs'
                              : 'bg-white/10 text-[#C7C2B6]'
                          }`}
                        >
                          {letters[optIdx]}
                        </span>
                        <span className="text-xs sm:text-sm font-medium text-[#F5F1E8] leading-relaxed">
                          {option}
                        </span>
                      </label>
                    );
                  })}
                </div>

                {/* Navigation Controls */}
                <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                  <button
                    disabled={currentQuestionIdx === 0}
                    onClick={() => setCurrentQuestionIdx((prev) => prev - 1)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-[#8C877D] hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>

                  <div className="flex items-center gap-2">
                    {currentQuestionIdx < sampleQuestions.length - 1 ? (
                      <button
                        onClick={() => setCurrentQuestionIdx((prev) => prev + 1)}
                        className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#FF6B5F] to-[#E85548] hover:from-[#FF857A] shadow-md shadow-[#FF6B5F]/20 transition-all cursor-pointer"
                      >
                        Next Question
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmitQuiz}
                        className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#34D399] to-[#059669] hover:from-[#34D399] shadow-md shadow-[#34D399]/20 transition-all cursor-pointer"
                      >
                        Submit Assessment
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              /* Results */
              <div className="py-6 space-y-6 text-center animate-in zoom-in-95">
                <div className="w-16 h-16 rounded-3xl bg-[#34D399]/15 border border-[#34D399]/30 text-[#34D399] flex items-center justify-center mx-auto shadow-lg">
                  <ShieldCheck className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="text-xl font-black text-[#F5F1E8]">
                    Assessment Completed!
                  </h3>
                  <p className="text-xs text-[#8C877D] mt-1">
                    Your score has been verified and recorded to your skill gap profile.
                  </p>
                </div>

                <div className="bg-[#16191E] rounded-2xl p-5 border border-white/[0.06] max-w-sm mx-auto">
                  <div className="text-4xl font-black text-[#FF857A] mb-1">
                    {quizScore?.percentage}%
                  </div>
                  <span className="text-xs font-bold text-[#34D399]">
                    Target Benchmark: Passed (+50 XP)
                  </span>
                </div>

                <div className="flex items-center justify-center gap-3 pt-4 border-t border-white/[0.08]">
                  <button
                    onClick={() => setActiveQuizModal(null)}
                    className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#FF6B5F] to-[#E85548] hover:from-[#FF857A] shadow-md shadow-[#FF6B5F]/20 cursor-pointer"
                  >
                    Done & Return
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
