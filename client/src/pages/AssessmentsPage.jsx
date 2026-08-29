import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AssessmentRunnerModal from '../components/assessments/AssessmentRunnerModal';
import { INITIAL_ASSESSMENTS } from '../data/coursesAndAssessmentsData';
import { useAuth } from '../context/AuthContext';
import {
  ClipboardCheck,
  Search,
  Filter,
  Sparkles,
  Award,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  RotateCcw,
  Zap,
  PlayCircle,
  ShieldCheck,
  Star,
  ChevronRight,
  BookOpen,
  Target
} from 'lucide-react';

export default function AssessmentsPage() {
  const navigate = useNavigate();
  const { awardXp, updateSkillMastery } = useAuth();

  const [assessments, setAssessments] = useState(() => {
    const saved = localStorage.getItem('m3_assessments_data');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return INITIAL_ASSESSMENTS; }
    }
    return INITIAL_ASSESSMENTS;
  });

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('m3_assessment_history');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [];
  });

  const [activeAssessment, setActiveAssessment] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Persist assessment updates
  useEffect(() => {
    localStorage.setItem('m3_assessments_data', JSON.stringify(assessments));
  }, [assessments]);

  useEffect(() => {
    localStorage.setItem('m3_assessment_history', JSON.stringify(history));
  }, [history]);

  const handleLaunchAssessment = (assessment) => {
    setActiveAssessment(assessment);
  };

  const handleAssessmentComplete = (result) => {
    const completedAt = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setAssessments((prev) =>
      prev.map((a) => {
        if (a.id === result.assessmentId) {
          return {
            ...a,
            lastScore: result.score,
            status: result.passed ? 'Passed' : 'Ready to Take',
            attemptsCount: (a.attemptsCount || 0) + 1,
            lastAttemptDate: 'Just now'
          };
        }
        return a;
      })
    );

    // Save to history
    const historyItem = {
      id: `hist-${Date.now()}`,
      assessmentId: result.assessmentId,
      assessmentTitle: activeAssessment?.title || 'Skill Assessment',
      score: result.score,
      passed: result.passed,
      time: completedAt,
      date: new Date().toLocaleDateString(),
      xpEarned: result.xpAwarded || 150
    };

    setHistory((prev) => [historyItem, ...prev]);

    // Update global user state (XP & verified skill mastery)
    if (result.passed && awardXp) {
      awardXp(result.xpAwarded || 200);
    }
    if (activeAssessment?.skill && updateSkillMastery) {
      updateSkillMastery(activeAssessment.skill, result.score);
    }
  };

  // Filter logic
  const categories = ['All', 'Frontend', 'Backend', 'Database', 'Languages', 'Cloud & DevOps', 'Architecture'];
  const statuses = ['All', 'Ready to Take', 'Passed', 'Locked'];

  const filteredAssessments = assessments.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.skill?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.tagline?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || a.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || a.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Calculate dynamic metrics (no hardcoding)
  const passedAssessments = assessments.filter((a) => a.status === 'Passed');
  const passRate = assessments.length > 0 ? Math.round((passedAssessments.length / assessments.length) * 100) : 0;
  const averageScore = passedAssessments.length > 0
    ? Math.round(passedAssessments.reduce((acc, a) => acc + (a.lastScore || 0), 0) / passedAssessments.length)
    : 0;
  const totalEarnedXp = history.reduce((acc, h) => acc + (h.xpEarned || 0), 0);

  return (
    <MainLayout>
      <div className="space-y-8 animate-in fade-in duration-200 max-w-7xl mx-auto pb-10">

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-gray-200 dark:border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs sm:text-sm font-semibold text-[#FF857A]">
                Skill Checkpoints & Quizzes 👋
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 dark:text-[#F5F1E8] tracking-tight">
              Assessments & Competency Verification
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-[#8C877D] max-w-3xl leading-relaxed">
              Verify your technical skills with timed adaptive quizzes, calibrate competency levels, and unlock advanced stages in your personalized roadmap.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => navigate('/skill-gaps')}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-gray-50 dark:bg-[#16191E] text-gray-900 dark:text-[#F5F1E8] border border-gray-200 dark:border-white/[0.08] hover:bg-gray-100 dark:hover:bg-white/5 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Target className="w-3.5 h-3.5 text-[#FF6B5F]" />
              <span>View Skill Gaps</span>
            </button>
          </div>
        </div>

        {/* Dynamic Metric Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#111418] border border-gray-200 dark:border-white/[0.08] flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#FF6B5F]/15 border border-[#FF6B5F]/30 flex items-center justify-center text-[#FF857A] shrink-0 shadow-sm">
              <ClipboardCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-[#8C877D]">Total Checkpoints</p>
              <p className="text-xl sm:text-2xl font-black text-gray-900 dark:text-[#F5F1E8] font-mono mt-0.5">
                {assessments.length}
              </p>
              <p className="text-[11px] text-[#FF857A] font-semibold">Verified Tests</p>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#111418] border border-gray-200 dark:border-white/[0.08] flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#34D399]/15 border border-[#34D399]/30 flex items-center justify-center text-[#34D399] shrink-0 shadow-sm">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-[#8C877D]">Passed Tests</p>
              <p className="text-xl sm:text-2xl font-black text-gray-900 dark:text-[#F5F1E8] font-mono mt-0.5">
                {passedAssessments.length}
              </p>
              <p className="text-[11px] text-[#34D399] font-semibold">{passRate}% Pass Rate</p>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#111418] border border-gray-200 dark:border-white/[0.08] flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#38BDF8]/15 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8] shrink-0 shadow-sm">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-[#8C877D]">Average Score</p>
              <p className="text-xl sm:text-2xl font-black text-gray-900 dark:text-[#F5F1E8] font-mono mt-0.5">
                {averageScore}%
              </p>
              <p className="text-[11px] text-[#38BDF8] font-semibold">Mastery Benchmark</p>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#111418] border border-gray-200 dark:border-white/[0.08] flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#FBBF24]/15 border border-[#FBBF24]/30 flex items-center justify-center text-[#FBBF24] shrink-0 shadow-sm">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-[#8C877D]">Total Earned XP</p>
              <p className="text-xl sm:text-2xl font-black text-gray-900 dark:text-[#F5F1E8] font-mono mt-0.5">
                +{totalEarnedXp} XP
              </p>
              <p className="text-[11px] text-[#FBBF24] font-semibold">Quiz Rewards</p>
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-gray-500 dark:text-[#8C877D] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search assessments, skills, topics..."
                className="w-full bg-white dark:bg-[#111418] border border-gray-200 dark:border-white/[0.08] text-xs text-gray-900 dark:text-[#F5F1E8] rounded-xl pl-9 pr-4 py-2 focus:outline-none focus:border-[#FF6B5F] placeholder:text-gray-500 dark:text-[#8C877D]"
              />
            </div>

            {/* Status Filter Tabs */}
            <div className="flex bg-white dark:bg-[#111418] p-1 rounded-xl border border-gray-200 dark:border-white/[0.08] overflow-x-auto">
              {statuses.map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedStatus(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    selectedStatus === st
                      ? 'bg-[#FF6B5F] text-white shadow-md shadow-[#FF6B5F]/20'
                      : 'text-gray-500 dark:text-[#8C877D] hover:text-gray-900 dark:hover:text-[#F5F1E8]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap border ${
                  selectedCategory === cat
                    ? 'bg-[#FF6B5F]/15 text-[#FF857A] border-[#FF6B5F]/40'
                    : 'bg-white dark:bg-[#111418] text-gray-500 dark:text-[#8C877D] border-gray-200 dark:border-white/[0.06] hover:text-gray-900 dark:hover:text-[#F5F1E8]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Assessments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssessments.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-[24px] bg-white dark:bg-[#111418] border border-gray-200 dark:border-white/[0.08] hover:border-[#FF6B5F]/40 transition-all flex flex-col justify-between shadow-sm relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-[#FF6B5F]/15 text-[#FF857A] uppercase font-mono border border-[#FF6B5F]/30">
                    {item.category}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                    item.status === 'Passed'
                      ? 'bg-[#34D399]/15 text-[#34D399] border border-[#34D399]/30'
                      : 'bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-[#8C877D]'
                  }`}>
                    {item.status}
                  </span>
                </div>

                <h3 className="text-base font-bold text-gray-900 dark:text-[#F5F1E8] leading-snug mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-[#8C877D] line-clamp-2 leading-relaxed mb-4">
                  {item.tagline}
                </p>

                {item.lastScore !== null && (
                  <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#0E1114] border border-gray-200 dark:border-white/[0.04] mb-4 flex items-center justify-between text-xs">
                    <span className="text-gray-500 dark:text-[#8C877D]">Latest Score:</span>
                    <span className={`font-mono font-bold ${item.lastScore >= item.passingScore ? 'text-[#34D399]' : 'text-[#FF857A]'}`}>
                      {item.lastScore}% {item.lastScore >= item.passingScore ? '(Passed)' : '(Failed)'}
                    </span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-white/[0.06] flex items-center justify-between mt-2">
                <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-[#8C877D]">
                  <span className="flex items-center gap-1 font-mono">
                    <Clock className="w-3.5 h-3.5 text-[#FF6B5F]" />
                    {item.duration}
                  </span>
                  <span className="flex items-center gap-1 font-mono text-[#FBBF24]">
                    <Award className="w-3.5 h-3.5" />
                    +{item.xpReward || 200} XP
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleLaunchAssessment(item)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    item.status === 'Passed'
                      ? 'bg-white/10 text-gray-900 dark:text-[#F5F1E8] hover:bg-white/15'
                      : 'bg-gradient-to-r from-[#FF6B5F] to-[#E85548] text-white shadow-md shadow-[#FF6B5F]/20 hover:from-[#FF857A]'
                  }`}
                >
                  <PlayCircle className="w-3.5 h-3.5" />
                  <span>{item.status === 'Passed' ? 'Retake Quiz' : 'Start Test'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Active Quiz Runner Modal */}
        {activeAssessment && (
          <AssessmentRunnerModal
            assessment={activeAssessment}
            isOpen={true}
            onClose={() => setActiveAssessment(null)}
            onComplete={handleAssessmentComplete}
          />
        )}

      </div>
    </MainLayout>
  );
}
