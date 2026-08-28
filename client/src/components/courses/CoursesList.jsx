import React, { useState } from 'react';
import { mockCourses as initialCourses, mockAssessments as initialAssessments } from '../../utils/mockData';
import {
  BookOpen,
  Star,
  Clock,
  PlayCircle,
  Search,
  CheckCircle2,
  Sparkles,
  BarChart3,
  X,
  ChevronRight,
  Brain,
  Network,
  Cpu,
  Database,
  ArrowRight,
  Flame,
  Send,
  ClipboardCheck,
  ShieldCheck,
  Timer
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CoursesList() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState(initialCourses);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeCourseModal, setActiveCourseModal] = useState(null);
  const [activeQuizModal, setActiveQuizModal] = useState(null);

  // Question banks for interactive quiz runner
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
    }
  ];

  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(null);

  const handleStartQuiz = (assessment, e) => {
    e?.stopPropagation();
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
  };

  const courseItems = [
    {
      id: 'c1',
      title: 'Introduction to AI & Deep Learning',
      subtitle: 'Understand core architectures, prompt embeddings, and transformers',
      progress: 80,
      icon: Brain,
      actionText: 'Continue',
      category: 'AI/ML',
    },
    {
      id: 'c2',
      title: 'Machine Learning & Neural Networks',
      subtitle: 'Learn supervised & unsupervised modeling with PyTorch',
      progress: 60,
      icon: Network,
      actionText: 'Continue',
      category: 'AI/ML',
    },
    {
      id: 'c3',
      title: 'Node.js Microservices & Distributed APIs',
      subtitle: 'Dive into event loops, Kafka queues, and high-scale backends',
      progress: 40,
      icon: Cpu,
      actionText: 'Start',
      category: 'Backend',
    },
    {
      id: 'c4',
      title: 'React 18 & Enterprise State Architecture',
      subtitle: 'Master concurrent rendering, Redux Toolkit, and performance audits',
      progress: 20,
      icon: BarChart3,
      actionText: 'Start',
      category: 'Frontend',
    },
  ];

  const recentAssessments = [
    {
      id: 'a1',
      title: 'AI Basics & Prompting Quiz',
      date: '20 Aug 2026',
      questionsCount: '20 Questions',
      score: '85%',
      scoreColor: 'text-[#34D399] bg-[#34D399]/15 border-[#34D399]/30',
    },
    {
      id: 'a2',
      title: 'ML Algorithms Benchmark Test',
      date: '18 Aug 2026',
      questionsCount: '25 Questions',
      score: '72%',
      scoreColor: 'text-[#FBBF24] bg-[#FBBF24]/15 border-[#FBBF24]/30',
    },
    {
      id: 'a3',
      title: 'Distributed Systems & Microservices',
      date: '15 Aug 2026',
      questionsCount: '20 Questions',
      score: '60%',
      scoreColor: 'text-[#FF857A] bg-[#FF6B5F]/15 border-[#FF6B5F]/30',
    },
  ];

  const filteredCourses = courseItems.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || c.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      {/* Search & Category Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#111418] border border-white/[0.08] p-4 rounded-2xl">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C877D]" />
          <input
            type="text"
            placeholder="Search courses and topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#16191E] border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-[#F5F1E8] placeholder:text-[#8C877D] focus:outline-none focus:border-[#FF6B5F]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 text-xs">
          {['All', 'AI/ML', 'Frontend', 'Backend'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-colors shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#FF6B5F] text-white shadow-xs'
                  : 'bg-white/5 text-[#8C877D] hover:text-[#F5F1E8] hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Left 8-Cols (COURSES + ASSESSMENT) + Right 4-Cols (YOUR PROGRESS + AI ASSISTANT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 8 Cols: Dual Cards */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: COURSES */}
          <div className="bg-[#111418] border border-white/[0.08] rounded-[28px] p-6 shadow-xl flex flex-col justify-between">
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-4">
                <div>
                  <h2 className="text-xs font-black tracking-widest text-[#FF857A] uppercase">
                    COURSES
                  </h2>
                  <p className="text-[11px] text-[#8C877D] mt-0.5 font-medium">
                    Build your AI knowledge step by step
                  </p>
                </div>

                <button
                  onClick={() => {
                    const firstCourse = courses[0];
                    setActiveCourseModal(firstCourse);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-[#FF857A] bg-[#FF6B5F]/10 hover:bg-[#FF6B5F]/20 transition-colors cursor-pointer"
                >
                  <span>View All</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Course Items List */}
              <div className="space-y-4">
                {filteredCourses.map((course, idx) => {
                  const Icon = course.icon;
                  return (
                    <div
                      key={course.id}
                      onClick={() => {
                        const fullCourse = courses.find((c) => c.id === course.id) || courses[0];
                        setActiveCourseModal(fullCourse);
                      }}
                      className="flex items-center justify-between gap-3 p-2 hover:bg-white/[0.03] rounded-2xl transition-all cursor-pointer group"
                    >
                      {/* Left: Icon Box */}
                      <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#FF6B5F] to-[#E85548] flex items-center justify-center text-white shrink-0 shadow-lg shadow-[#FF6B5F]/20 group-hover:scale-105 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>

                      {/* Middle: Title, Subtitle, Progress */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="w-4 h-4 rounded bg-white/10 text-[#F5F1E8] text-[9px] font-extrabold flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <h3 className="text-xs font-bold text-[#F5F1E8] group-hover:text-[#FF857A] transition-colors truncate">
                            {course.title}
                          </h3>
                        </div>

                        <p className="text-[10px] text-[#8C877D] truncate font-medium">
                          {course.subtitle}
                        </p>

                        {/* Progress Bar */}
                        <div className="flex items-center gap-2 mt-1.5">
                          <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-[#FF6B5F] to-[#E85548]"
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                          <span className="text-[10px] font-bold text-[#8C877D] shrink-0">
                            {course.progress}%
                          </span>
                        </div>
                      </div>

                      {/* Right: Action Button & Chevron */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const fullCourse = courses.find((c) => c.id === course.id) || courses[0];
                            setActiveCourseModal(fullCourse);
                          }}
                          className="px-3 py-1 rounded-xl text-xs font-bold bg-[#FF6B5F] hover:bg-[#FF857A] text-white shadow-xs transition-all cursor-pointer"
                        >
                          {course.actionText}
                        </button>
                        <ChevronRight className="w-3.5 h-3.5 text-[#8C877D] group-hover:text-[#FF6B5F] group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Card 2: ASSESSMENT */}
          <div className="bg-[#111418] border border-white/[0.08] rounded-[28px] p-6 shadow-xl flex flex-col justify-between">
            <div>
              {/* Card Header */}
              <div className="pb-3 border-b border-white/[0.08] mb-3">
                <h2 className="text-xs font-black tracking-widest text-[#FF857A] uppercase">
                  ASSESSMENT
                </h2>
                <p className="text-[11px] text-[#8C877D] mt-0.5 font-medium">
                  Test your knowledge and track your scores
                </p>
              </div>

              {/* Overall Score Top Dark Banner */}
              <div className="my-3 p-4 rounded-2xl bg-[#16191E] border border-[#FF6B5F]/20 text-white shadow-lg flex items-center justify-between relative overflow-hidden">
                <div className="flex items-center gap-3.5 relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-[#FF6B5F]/10 border border-[#FF6B5F]/20 flex items-center justify-center text-[#FF857A] shadow-md">
                    <ClipboardCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-medium text-[#8C877D] block">
                      Overall Score
                    </span>
                    <div className="text-2xl font-black text-[#F5F1E8] tracking-tight leading-tight">
                      72%
                    </div>
                    <span className="text-[10px] text-[#FF857A] font-semibold flex items-center gap-1">
                      Good Job! Keep Improving ✨
                    </span>
                  </div>
                </div>

                {/* Glowing Coral Waveform Graphic */}
                <div className="w-24 h-10 relative z-10">
                  <svg
                    className="w-full h-full text-[#FF6B5F]"
                    viewBox="0 0 100 35"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      d="M0,22 Q12,5 25,18 T50,12 T75,24 T100,8"
                      className="stroke-[#FF6B5F] drop-shadow-[0_0_8px_rgba(255,107,95,0.8)]"
                    />
                  </svg>
                </div>

                <div className="absolute right-0 top-0 w-36 h-full bg-[#FF6B5F]/10 rounded-full blur-xl pointer-events-none" />
              </div>

              {/* Recent Assessments Subheading */}
              <div className="pt-2 pb-1">
                <span className="text-xs font-bold text-[#F5F1E8]">
                  Recent Assessments
                </span>
              </div>

              {/* Assessments List Rows */}
              <div className="divide-y divide-white/[0.04]">
                {recentAssessments.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      const fullAssess = initialAssessments.find((a) => a.id === item.id) || initialAssessments[0];
                      handleStartQuiz(fullAssess);
                    }}
                    className="py-3 flex items-center justify-between gap-3 hover:bg-white/[0.02] -mx-2 px-2 rounded-xl transition-all cursor-pointer group"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-[#F5F1E8] group-hover:text-[#FF857A] transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-[#8C877D] font-medium">
                        {item.date} • {item.questionsCount}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-lg text-xs font-extrabold border ${item.scoreColor}`}>
                        {item.score}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const fullAssess = initialAssessments.find((a) => a.id === item.id) || initialAssessments[0];
                          handleStartQuiz(fullAssess);
                        }}
                        className="px-3 py-1 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#FF6B5F] to-[#E85548] hover:from-[#FF857A] shadow-xs cursor-pointer"
                      >
                        Start
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom View All Link */}
            <div className="pt-3 border-t border-white/[0.08] text-center">
              <button
                onClick={() => navigate('/assessments')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF857A] hover:underline transition-colors cursor-pointer"
              >
                <span>Take Benchmark Quiz</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: YOUR PROGRESS + AI ASSISTANT */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card 1: YOUR PROGRESS */}
          <div className="bg-[#111418] border border-white/[0.08] rounded-[28px] p-6 shadow-xl text-[#F5F1E8]">
            <h3 className="text-xs font-black tracking-widest text-[#FF857A] uppercase mb-3">
              YOUR PROGRESS
            </h3>

            {/* Circular Progress Ring Donut */}
            <div className="flex justify-center my-2">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="rgba(245,241,232,0.06)"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="url(#progress-coral-gradient)"
                    strokeWidth="8"
                    strokeDasharray={2 * Math.PI * 40}
                    strokeDashoffset={2 * Math.PI * 40 * (1 - 0.65)}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                  <defs>
                    <linearGradient id="progress-coral-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FF6B5F" />
                      <stop offset="100%" stopColor="#E85548" />
                    </linearGradient>
                  </defs>
                </svg>

                <div className="absolute text-center">
                  <span className="text-2xl font-black tracking-tight text-[#F5F1E8] block leading-none">
                    65%
                  </span>
                  <span className="text-[10px] text-[#8C877D] font-medium">
                    Completed
                  </span>
                </div>
              </div>
            </div>

            {/* Stats List */}
            <div className="space-y-2.5 pt-3 border-t border-white/[0.08] text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#C7C2B6]">
                  <BookOpen className="w-3.5 h-3.5 text-[#FF6B5F]" />
                  <span>Courses Completed</span>
                </div>
                <span className="font-bold text-[#F5F1E8]">2 / 4</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#C7C2B6]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#34D399]" />
                  <span>Assessments Taken</span>
                </div>
                <span className="font-bold text-[#F5F1E8]">3 / 6</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#C7C2B6]">
                  <Clock className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>Hours Learned</span>
                </div>
                <span className="font-bold text-[#F5F1E8]">18.5 hrs</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#C7C2B6]">
                  <Flame className="w-3.5 h-3.5 text-[#FF6B5F]" />
                  <span>Current Streak</span>
                </div>
                <span className="font-bold text-[#F5F1E8]">12 days</span>
              </div>
            </div>
          </div>

          {/* Card 2: AI ASSISTANT */}
          <div className="bg-[#111418] border border-white/[0.08] rounded-[28px] p-6 shadow-xl text-[#F5F1E8]">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-[#FF6B5F]" />
              <h3 className="text-xs font-black tracking-widest text-[#FF857A] uppercase">
                AI ASSISTANT
              </h3>
            </div>

            <div className="bg-[#16191E] rounded-2xl p-3 text-xs text-[#C7C2B6] leading-relaxed mb-3 border border-white/[0.06]">
              Hi Akshat! I'm your AI tutor. Need help with any course topic?
            </div>

            {/* Quick Action Pills */}
            <div className="space-y-2 mb-3">
              <button
                onClick={() => navigate('/ai-assistant')}
                className="w-full text-left px-3.5 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] text-xs font-medium text-[#F5F1E8] flex items-center justify-between transition-colors border border-white/[0.06] cursor-pointer"
              >
                <span>Explain ML Algorithms</span>
                <ArrowRight className="w-3 h-3 text-[#8C877D]" />
              </button>
              <button
                onClick={() => navigate('/ai-assistant')}
                className="w-full text-left px-3.5 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] text-xs font-medium text-[#F5F1E8] flex items-center justify-between transition-colors border border-white/[0.06] cursor-pointer"
              >
                <span>Help with Neural Networks</span>
                <ArrowRight className="w-3 h-3 text-[#8C877D]" />
              </button>
              <button
                onClick={() => navigate('/ai-assistant')}
                className="w-full text-left px-3.5 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] text-xs font-medium text-[#F5F1E8] flex items-center justify-between transition-colors border border-white/[0.06] cursor-pointer"
              >
                <span>Recommend Next Topic</span>
                <ArrowRight className="w-3 h-3 text-[#8C877D]" />
              </button>
            </div>

            {/* Chat Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Ask me anything..."
                onClick={() => navigate('/ai-assistant')}
                className="w-full bg-[#16191E] border border-white/10 text-xs text-[#F5F1E8] rounded-xl pl-3.5 pr-10 py-2.5 placeholder:text-[#8C877D] focus:outline-none focus:border-[#FF6B5F]"
                readOnly
              />
              <button
                onClick={() => navigate('/ai-assistant')}
                className="w-7 h-7 rounded-lg bg-gradient-to-r from-[#FF6B5F] to-[#E85548] text-white flex items-center justify-center absolute right-1.5 top-1/2 -translate-y-1/2 shadow-xs cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Motivation Banner: Keep Learning, Keep Growing! */}
      <div className="bg-[#111418] border border-[#FF6B5F]/25 rounded-[28px] p-6 sm:p-7 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 flex items-center justify-center">
            <div className="absolute inset-0 bg-[#FF6B5F]/20 rounded-full blur-xl animate-pulse" />
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#FF6B5F]/20 to-[#E85548]/30 border border-[#FF6B5F]/40 flex items-center justify-center relative shadow-[0_0_30px_rgba(255,107,95,0.3)]">
              <Brain className="w-8 h-8 text-[#FF857A]" />
            </div>
          </div>

          <div>
            <h3 className="text-base sm:text-xl font-black text-[#F5F1E8] tracking-tight flex items-center gap-2">
              Keep Learning, Keep Growing! 🚀
            </h3>
            <p className="text-xs sm:text-sm text-[#C7C2B6] mt-1 font-medium max-w-xl">
              You're 65% closer to achieving mastery in your target competencies. Complete the next lesson today!
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate('/learning-path')}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl text-xs sm:text-sm font-bold bg-gradient-to-r from-[#FF6B5F] to-[#E85548] hover:from-[#FF857A] text-white shadow-xl shadow-[#FF6B5F]/30 hover:scale-105 transition-all shrink-0 cursor-pointer"
        >
          <span>Continue Learning</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Course Details Modal */}
      {activeCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div
            className="bg-[#111418] rounded-[28px] max-w-xl w-full border border-white/10 shadow-2xl p-6 sm:p-8 relative text-[#F5F1E8]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <h3 className="text-lg font-bold text-[#F5F1E8]">{activeCourseModal.title}</h3>
              <button
                onClick={() => setActiveCourseModal(null)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#8C877D]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="py-4 space-y-3 text-xs text-[#C7C2B6]">
              <p>Duration: <strong>{activeCourseModal.duration || '4.5 hours'}</strong> • Platform: <strong>{activeCourseModal.platform || 'LearnPath Engine'}</strong></p>
              <div className="p-3 bg-[#FF6B5F]/10 border border-[#FF6B5F]/20 rounded-xl text-[#FF857A]">
                🎯 Core syllabus covers theory, algorithmic complexity, hands-on implementations, and benchmark assessments.
              </div>
            </div>
            <div className="pt-3 border-t border-white/[0.08] flex justify-end gap-2">
              <button
                onClick={() => setActiveCourseModal(null)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#FF6B5F] to-[#E85548] text-white shadow-md cursor-pointer"
              >
                Start Learning Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Quiz Modal */}
      {activeQuizModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div
            className="bg-[#111418] rounded-[28px] max-w-2xl w-full border border-white/10 shadow-2xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto text-[#F5F1E8]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FF6B5F]/15 text-[#FF857A] border border-[#FF6B5F]/30">
                {activeQuizModal.title}
              </span>
              <button
                onClick={() => setActiveQuizModal(null)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#8C877D]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {!quizSubmitted ? (
              <div className="py-6 space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#8C877D]">
                    <span>Question {currentQuestionIdx + 1} of {sampleQuestions.length}</span>
                    <span className="text-[#FF857A]">{Math.round(((currentQuestionIdx + 1) / sampleQuestions.length) * 100)}% Complete</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#FF6B5F] to-[#E85548] h-full rounded-full"
                      style={{ width: `${((currentQuestionIdx + 1) / sampleQuestions.length) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="bg-[#16191E] border border-white/[0.06] rounded-2xl p-5">
                  <h4 className="text-sm sm:text-base font-bold text-[#F5F1E8] leading-relaxed">
                    {sampleQuestions[currentQuestionIdx]?.question}
                  </h4>
                </div>

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
                            isSelected ? 'bg-[#FF6B5F] text-white' : 'bg-white/10 text-[#C7C2B6]'
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

                <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                  <button
                    disabled={currentQuestionIdx === 0}
                    onClick={() => setCurrentQuestionIdx((p) => p - 1)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-[#8C877D] hover:bg-white/5 disabled:opacity-30"
                  >
                    Previous
                  </button>
                  {currentQuestionIdx < sampleQuestions.length - 1 ? (
                    <button
                      onClick={() => setCurrentQuestionIdx((p) => p + 1)}
                      className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#FF6B5F] to-[#E85548] hover:from-[#FF857A]"
                    >
                      Next Question
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmitQuiz}
                      className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#34D399] to-[#059669]"
                    >
                      Submit Assessment
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="py-6 space-y-6 text-center animate-in zoom-in-95">
                <div className="w-16 h-16 rounded-3xl bg-[#34D399]/15 border border-[#34D399]/30 text-[#34D399] flex items-center justify-center mx-auto shadow-lg">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#F5F1E8]">Assessment Completed!</h3>
                  <p className="text-xs text-[#8C877D] mt-1">Your competency score has been recorded.</p>
                </div>
                <div className="bg-[#16191E] rounded-2xl p-5 border border-white/[0.06] max-w-sm mx-auto">
                  <div className="text-4xl font-black text-[#FF857A] mb-1">{quizScore?.percentage}%</div>
                  <span className="text-xs font-bold text-[#34D399]">Target Benchmark: Passed (+50 XP)</span>
                </div>
                <button
                  onClick={() => setActiveQuizModal(null)}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#FF6B5F] to-[#E85548]"
                >
                  Done & Return
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
