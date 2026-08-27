import React, { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import EmptyState from '../components/common/EmptyState';
import AssessmentsList from '../components/assessments/AssessmentsList';
import AssessmentRunnerModal from '../components/assessments/AssessmentRunnerModal';
import Button from '../components/common/Button';
import { INITIAL_ASSESSMENTS, INITIAL_ASSESSMENT_HISTORY } from '../data/coursesAndAssessmentsData';
import '../styles/m3-theme.css';
import {
  ClipboardCheck,
  Search,
  Filter,
  Sparkles,
  Zap,
  Award,
  Clock,
  CheckCircle2,
  TrendingUp,
  History,
  ShieldCheck,
  RotateCcw,
  Target
} from 'lucide-react';

export default function AssessmentsPage() {
  const [assessments, setAssessments] = useState(() => {
    const saved = localStorage.getItem('m3_assessments_data');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return INITIAL_ASSESSMENTS; }
    }
    return INITIAL_ASSESSMENTS;
  });

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('m3_assessments_history');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return INITIAL_ASSESSMENT_HISTORY; }
    }
    return INITIAL_ASSESSMENT_HISTORY;
  });

  const [activeAssessment, setActiveAssessment] = useState(null);
  const [viewMode, setViewMode] = useState('preview'); // 'preview' | 'spec'

  // Filters & Generator State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All'); // 'All' | 'Ready to Take' | 'Passed' | 'Locked'
  const [customSkillPrompt, setCustomSkillPrompt] = useState('');
  const [isGeneratingAiQuiz, setIsGeneratingAiQuiz] = useState(false);

  // Persist assessment updates
  useEffect(() => {
    localStorage.setItem('m3_assessments_data', JSON.stringify(assessments));
  }, [assessments]);

  useEffect(() => {
    localStorage.setItem('m3_assessments_history', JSON.stringify(history));
  }, [history]);

  // Handle Assessment Completion
  const handleAssessmentCompleted = (assessmentId, result) => {
    const targetAssessment = assessments.find((a) => a.id === assessmentId);
    const skillName = targetAssessment ? targetAssessment.skill : 'Skill';

    // Update assessment in list
    setAssessments((prev) =>
      prev.map((item) => {
        if (item.id === assessmentId) {
          return {
            ...item,
            lastScore: result.percentage,
            status: result.passed ? 'Passed' : 'Ready to Take',
            attemptsCount: (item.attemptsCount || 0) + 1,
          };
        }
        return item;
      })
    );

    // Add to history log
    const historyItem = {
      id: `hist-${Date.now()}`,
      assessmentTitle: targetAssessment ? targetAssessment.title : `${skillName} Assessment`,
      skill: skillName,
      score: result.percentage,
      passed: result.passed,
      date: 'Just now',
      xpEarned: result.earnedXp,
      previousSkillLevel: targetAssessment?.lastScore || 65,
      newSkillLevel: Math.min(98, (targetAssessment?.lastScore || 65) + (result.passed ? 15 : 5)),
      delta: result.passed ? '+15%' : '+5%',
    };

    setHistory((prev) => [historyItem, ...prev]);
  };

  // Instant AI Quiz Generator
  const handleGenerateAiQuiz = (e) => {
    e.preventDefault();
    if (!customSkillPrompt.trim()) return;

    setIsGeneratingAiQuiz(true);
    const skillName = customSkillPrompt.trim();

    setTimeout(() => {
      const generatedQuiz = {
        id: `assess-ai-${Date.now()}`,
        title: `${skillName} Mastery Checkpoint`,
        tagline: `Technical assessment evaluating your understanding of ${skillName} core principles and architecture.`,
        skill: skillName,
        category: 'AI Generated',
        duration: '15 mins',
        questionsCount: 5,
        difficulty: 'Intermediate',
        lastScore: null,
        passingScore: 70,
        status: 'Ready to Take',
        xpReward: 200,
        badgeText: 'AI Generated',
        attemptsCount: 0,
        questions: [
          {
            question: `What is the primary architectural advantage of utilizing ${skillName} in modern cloud applications?`,
            options: [
              `It improves developer velocity, enhances modularity, and reduces latency.`,
              `It forces code to run on a single CPU core.`,
              `It eliminates the need for database backups.`,
              `It turns HTML into machine assembly directly.`
            ],
            correctAnswerIndex: 0,
            explanation: `${skillName} provides industry-standard abstractions that optimize developer ergonomics, reduce runtime overhead, and improve system maintainability.`
          },
          {
            question: `Which common anti-pattern should be avoided when implementing ${skillName} in production?`,
            options: [
              `Tight coupling, lack of unit test coverage, and ignoring asynchronous error boundaries.`,
              `Using TypeScript for compile-time safety.`,
              `Enabling gzip/brotli compression.`,
              `Adding structured telemetry logs.`
            ],
            correctAnswerIndex: 0,
            explanation: `Tightly coupling components and ignoring error handling in ${skillName} leads to cascade failures and difficult debugging in production environments.`
          },
          {
            question: `How does ${skillName} handle state synchronization and lifecycle management under heavy loads?`,
            options: [
              `By utilizing immutable data structures, declarative contracts, and event-driven updates.`,
              `By storing everything in temporary text files on disk.`,
              `By blocking all other network ports.`,
              `It resets all memory every 5 seconds.`
            ],
            correctAnswerIndex: 0,
            explanation: `Modern ${skillName} patterns rely on immutability and event-driven updates to prevent race conditions and ensure thread/loop safety.`
          },
          {
            question: `What is the recommended approach for monitoring and debugging performance bottlenecks in ${skillName}?`,
            options: [
              `Using specialized profilers, tracing spans, and observing memory allocation graphs.`,
              `Deleting all console logs without measuring.`,
              `Overriding global JavaScript prototype objects.`,
              `Restarting the server on every request.`
            ],
            correctAnswerIndex: 0,
            explanation: `Telemetry tracing and performance profilers give exact visibility into CPU time and memory hotspots in ${skillName}.`
          },
          {
            question: `When migrating legacy code to modern ${skillName} standards, what is the safest incremental rollout strategy?`,
            options: [
              `Strangler fig pattern with automated regression tests and feature flags.`,
              `Rewriting the entire application from scratch over a weekend with no tests.`,
              `Disabling all linters and type checkers.`,
              `Downgrading to Node.js 10.`
            ],
            correctAnswerIndex: 0,
            explanation: `The strangler fig pattern allows piece-by-piece migration backed by feature flags to ensure zero downtime and minimal regression risks.`
          }
        ]
      };

      setAssessments((prev) => [generatedQuiz, ...prev]);
      setCustomSkillPrompt('');
      setIsGeneratingAiQuiz(false);
      setActiveAssessment(generatedQuiz);
    }, 700);
  };

  // Filter logic
  const categories = ['All', 'Frontend', 'Backend', 'Database', 'Languages', 'Cloud & DevOps'];
  const statuses = ['All', 'Ready to Take', 'Passed', 'Locked'];

  const filteredAssessments = assessments.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.skill.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.tagline?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || a.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || a.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Calculate metrics
  const passedAssessments = assessments.filter((a) => a.status === 'Passed');
  const passRate = assessments.length > 0 ? Math.round((passedAssessments.length / assessments.length) * 100) : 0;
  const averageScore = passedAssessments.length > 0
    ? Math.round(passedAssessments.reduce((acc, a) => acc + (a.lastScore || 0), 0) / passedAssessments.length)
    : 0;
  const totalEarnedXp = history.reduce((acc, h) => acc + (h.xpEarned || 0), 0);

  return (
    <MainLayout>
      <div className="m3-theme-scope space-y-8 animate-in fade-in duration-200">

        {/* Page Header with Welcome Greeting */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-[#E6E0D7]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs sm:text-sm font-semibold text-[#E05A47]">
                Welcome back, Learner 👋
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FDF0EE] text-[#E05A47] border border-[#F9D5CD]">
                Member 3
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#202124] tracking-tight">
              Assessments & Skill Checkpoints
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-[#5F6368] max-w-3xl leading-relaxed">
              Verify your skills with timed adaptive quizzes, calibrate competency levels, and unlock advanced stages in your personalized roadmap.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setViewMode('preview')}
              className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                viewMode === 'preview'
                  ? 'bg-[#E05A47] text-white shadow-md shadow-[#E05A47]/20'
                  : 'bg-[#FFFDF8] text-[#202124] border border-[#E6E0D7] hover:bg-[#F6F2EA]'
              }`}
            >
              Interactive Hub
            </button>
            <button
              onClick={() => setViewMode('spec')}
              className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                viewMode === 'spec'
                  ? 'bg-[#E05A47] text-white shadow-md shadow-[#E05A47]/20'
                  : 'bg-[#FFFDF8] text-[#202124] border border-[#E6E0D7] hover:bg-[#F6F2EA]'
              }`}
            >
              Module Scope
            </button>
          </div>
        </div>

        {viewMode === 'preview' ? (
          <>
            {/* KPI Metric Summary Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              <div className="m3-stat-box p-4 sm:p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FDF0EE] border border-[#F9D5CD] flex items-center justify-center text-[#E05A47] shrink-0 shadow-sm">
                  <ClipboardCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#5F6368]">Total Checkpoints</p>
                  <p className="text-xl sm:text-2xl font-black text-[#202124] font-mono mt-0.5">
                    {assessments.length}
                  </p>
                  <p className="text-[11px] text-[#E05A47] font-semibold">Available Tests</p>
                </div>
              </div>

              <div className="m3-stat-box p-4 sm:p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#EDF7F2] border border-[#C6E7D6] flex items-center justify-center text-[#3F8F68] shrink-0 shadow-sm">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#5F6368]">Passed Checkpoints</p>
                  <p className="text-xl sm:text-2xl font-black text-[#202124] font-mono mt-0.5">
                    {passedAssessments.length}
                  </p>
                  <p className="text-[11px] text-[#3F8F68] font-semibold">{passRate}% Pass Rate</p>
                </div>
              </div>

              <div className="m3-stat-box p-4 sm:p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#EFF5FB] border border-[#CFE0F5] flex items-center justify-center text-[#4A7BC7] shrink-0 shadow-sm">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#5F6368]">Avg Benchmark Score</p>
                  <p className="text-xl sm:text-2xl font-black text-[#202124] font-mono mt-0.5">
                    {averageScore > 0 ? `${averageScore}%` : 'N/A'}
                  </p>
                  <p className="text-[11px] text-[#4A7BC7] font-semibold">High Competency</p>
                </div>
              </div>

              <div className="m3-stat-box p-4 sm:p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FAF3E8] border border-[#F0DEC0] flex items-center justify-center text-[#C48A3A] shrink-0 shadow-sm">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#5F6368]">Assessment XP</p>
                  <p className="text-xl sm:text-2xl font-black text-[#202124] font-mono mt-0.5">
                    +{totalEarnedXp + 350}
                  </p>
                  <p className="text-[11px] text-[#C48A3A] font-semibold">Points Calibrated</p>
                </div>
              </div>
            </div>

            {/* AI Dynamic Question Engine Banner */}
            <div className="p-6 sm:p-7 m3-banner-panel flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-1.5 z-10">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-[#D99A8A] border border-white/15 flex items-center gap-1.5 w-fit">
                  <Zap className="w-3.5 h-3.5 text-[#E05A47]" />
                  Instant AI Question Engine
                </span>
                <h2 className="text-lg sm:text-2xl font-bold text-white tracking-tight">
                  Generate Instant Assessment on ANY Technical Skill
                </h2>
                <p className="text-xs sm:text-sm text-[#D6D8DC] max-w-xl leading-relaxed">
                  Type any skill (e.g. Next.js App Router, Redux Toolkit, Docker Compose, PostgreSQL Indexing) to generate a 5-question test.
                </p>
              </div>

              <form onSubmit={handleGenerateAiQuiz} className="flex items-center gap-2 w-full md:w-auto z-10">
                <input
                  type="text"
                  value={customSkillPrompt}
                  onChange={(e) => setCustomSkillPrompt(e.target.value)}
                  placeholder="e.g. Redux, Docker, SQL..."
                  className="px-4 py-2.5 rounded-xl text-xs bg-white/10 border border-white/20 text-white placeholder-[#8A8F98] focus:bg-white/15 focus:outline-none focus:border-[#E05A47] w-full sm:w-64"
                />
                <button
                  type="submit"
                  disabled={!customSkillPrompt.trim() || isGeneratingAiQuiz}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#E05A47] hover:bg-[#C94A38] text-white shadow-lg shadow-[#E05A47]/20 cursor-pointer disabled:opacity-40 shrink-0 flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>{isGeneratingAiQuiz ? 'Generating...' : 'Launch Quiz'}</span>
                </button>
              </form>
            </div>

            {/* Filter & Search Bar */}
            <div className="p-5 m3-filter-panel space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                {/* Search */}
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-[#8A8F98] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search assessments, skills..."
                    className="w-full pl-10 pr-4 py-2.5 text-xs m3-input"
                  />
                </div>

                {/* Status Tabs */}
                <div className="flex items-center gap-1 bg-[#F1ECE3] p-1 rounded-xl border border-[#E6E0D7] w-full sm:w-auto overflow-x-auto">
                  {statuses.map((st) => (
                    <button
                      key={st}
                      onClick={() => setSelectedStatus(st)}
                      className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        selectedStatus === st
                          ? 'bg-[#E05A47] text-white font-bold shadow-sm'
                          : 'text-[#5F6368] hover:text-[#202124]'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-[#E6E0D7]">
                <span className="text-xs text-[#202124] font-semibold mr-1 flex items-center gap-1">
                  <Filter className="w-3 h-3 text-[#E05A47]" /> Category:
                </span>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-[#FDF0EE] text-[#E05A47] border border-[#F9D5CD] font-bold shadow-sm'
                        : 'bg-[#F1ECE3] text-[#5F6368] border border-[#E6E0D7] hover:text-[#202124]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Assessments Cards Grid */}
            <AssessmentsList
              assessments={filteredAssessments}
              onStartAssessment={(assessment) => setActiveAssessment(assessment)}
            />

            {/* Assessment History & Recalibration Section */}
            {history.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-[#E6E0D7]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <History className="w-4 h-4 text-[#E05A47]" />
                    <h2 className="text-base sm:text-lg font-bold text-[#202124]">
                      Recent Assessment History & Calibrations
                    </h2>
                  </div>
                  <span className="text-xs text-[#5F6368] font-medium">
                    {history.length} attempts recorded
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {history.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-[#FFFDF8] border border-[#E6E0D7] shadow-sm flex items-center justify-between gap-3"
                    >
                      <div>
                        <p className="text-xs font-bold text-[#202124]">{item.assessmentTitle}</p>
                        <p className="text-[11px] text-[#5F6368] mt-0.5 font-mono">
                          {item.skill}: {item.previousSkillLevel}% → <span className="text-[#E05A47] font-bold">{item.newSkillLevel}%</span>
                        </p>
                        <p className="text-[10px] text-[#8A8F98] mt-0.5">{item.date}</p>
                      </div>

                      <div className="text-right shrink-0">
                        <span
                          className={`px-2.5 py-1 rounded-xl text-xs font-black block text-center ${
                            item.score >= 70
                              ? 'm3-badge-emerald'
                              : 'bg-[#FDF0F0] text-[#C94A4A] border border-[#F7D2D2]'
                          }`}
                        >
                          {item.score}%
                        </span>
                        <span className="text-[10px] text-[#E05A47] font-bold mt-1 block">
                          +{item.xpEarned} XP
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Assessment Runner Modal */}
            <AssessmentRunnerModal
              assessment={activeAssessment}
              isOpen={Boolean(activeAssessment)}
              onClose={() => setActiveAssessment(null)}
              onAssessmentCompleted={handleAssessmentCompleted}
            />
          </>
        ) : (
          <EmptyState
            title="Assessments Module Specification"
            description="Complete interactive assessment and competency calibration hub developed for Member 3."
            memberBadge="Ownership: Member 3"
            branchName="frontend"
            icon={ClipboardCheck}
            plannedFeatures={[
              'Topic quizzes with difficulty grading (Passed / Ready to Take / Locked)',
              'Interactive quiz runner with countdown timer and instant option review',
              'Score calculation, XP points trigger, and skill level calibration delta',
              'Post-quiz question explanation breakdown and confetti celebrations',
              'AI Assessment Engine to generate targeted quizzes on any technology skill',
            ]}
            onActionClick={() => setViewMode('preview')}
            actionText="Switch to Interactive Hub"
          />
        )}
      </div>
    </MainLayout>
  );
}
