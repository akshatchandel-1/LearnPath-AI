import React, { useState, useEffect, useMemo } from 'react';
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
  const { user, awardXp, updateSkillMastery } = useAuth();
  const storageKeyAssessments = user?._id ? `m3_assessments_data_${user._id}` : 'm3_assessments_data';
  const storageKeyHistory = user?._id ? `m3_assessment_history_${user._id}` : 'm3_assessment_history';

  const [assessments, setAssessments] = useState(() => {
    const saved = localStorage.getItem(storageKeyAssessments) || localStorage.getItem('m3_assessments_data');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return INITIAL_ASSESSMENTS; }
    }
    return INITIAL_ASSESSMENTS;
  });

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem(storageKeyHistory) || localStorage.getItem('m3_assessment_history');
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
    localStorage.setItem(storageKeyAssessments, JSON.stringify(assessments));
  }, [assessments, storageKeyAssessments]);

  useEffect(() => {
    localStorage.setItem(storageKeyHistory, JSON.stringify(history));
  }, [history, storageKeyHistory]);

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

    if (result.earnedXp > 0) {
      awardXp(result.earnedXp);
    }

    if (result.passed && result.skillTested) {
      updateSkillMastery(result.skillTested, result.score);
    }

    // Add to history
    const historyEntry = {
      id: `hist_${Date.now()}`,
      title: result.title,
      score: result.score,
      passed: result.passed,
      earnedXp: result.earnedXp,
      date: 'Today',
      time: completedAt
    };
    setHistory((prev) => [historyEntry, ...prev]);
  };

  const activeRole = user?.targetRole || user?.careerGoal || 'Full Stack Developer';

  // Sort & prioritize assessments for active target role
  const sortedAssessments = useMemo(() => {
    const roleLower = activeRole.toLowerCase();
    return [...assessments].sort((a, b) => {
      const aMatch = (a.targetRole && a.targetRole.toLowerCase().includes(roleLower)) ||
        (a.category && roleLower.includes(a.category.toLowerCase())) ||
        (a.skillTested && roleLower.includes(a.skillTested.toLowerCase()));
      const bMatch = (b.targetRole && b.targetRole.toLowerCase().includes(roleLower)) ||
        (b.category && roleLower.includes(b.category.toLowerCase())) ||
        (b.skillTested && roleLower.includes(b.skillTested.toLowerCase()));
      if (aMatch && !bMatch) return -1;
      if (!aMatch && bMatch) return 1;
      return 0;
    });
  }, [assessments, activeRole]);

  // Filter assessments
  const filteredAssessments = sortedAssessments.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.skillTested.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || a.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesStatus =
      selectedStatus === 'All' || a.status.toLowerCase() === selectedStatus.toLowerCase();

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const completedCount = assessments.filter((a) => a.status === 'Passed').length;
  const totalPassedAttempts = history.filter((h) => h.passed).length;
  const avgScore = history.length > 0
    ? Math.round(history.reduce((acc, h) => acc + h.score, 0) / history.length)
    : 0;

  return (
    <MainLayout>
      <div className="space-y-8 animate-in fade-in duration-200 max-w-7xl mx-auto pb-10">

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs sm:text-sm font-semibold text-[#FF857A]">
                Skill Calibration & Tests 🎯
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#F5F1E8] tracking-tight">
              Assessments & Certification Benchmarks
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-[#8C877D] max-w-3xl leading-relaxed">
              Verify competencies against industry standards for {activeRole}. Quizzes dynamically adapt and award verified XP.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/skill-gaps')}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-[#16191E] text-[#F5F1E8] border border-white/[0.08] hover:bg-white/5 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Target className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Skill Gap View</span>
            </button>
          </div>
        </div>

        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          <div className="p-4 sm:p-5 rounded-2xl bg-[#111418] border border-white/[0.08] flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#FF6B5F]/15 border border-[#FF6B5F]/30 flex items-center justify-center text-[#FF857A] shrink-0">
              <ClipboardCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#8C877D]">Available Tests</p>
              <p className="text-xl sm:text-2xl font-black text-[#F5F1E8] font-mono mt-0.5">
                {assessments.length}
              </p>
              <p className="text-[11px] text-[#FF857A] font-semibold">Active Benchmarks</p>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#111418] border border-white/[0.08] flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#34D399]/15 border border-[#34D399]/30 flex items-center justify-center text-[#34D399] shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#8C877D]">Passed Tests</p>
              <p className="text-xl sm:text-2xl font-black text-[#F5F1E8] font-mono mt-0.5">
                {completedCount}
              </p>
              <p className="text-[11px] text-[#34D399] font-semibold">Verified Badges</p>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#111418] border border-white/[0.08] flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#38BDF8]/15 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8] shrink-0">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#8C877D]">Average Score</p>
              <p className="text-xl sm:text-2xl font-black text-[#F5F1E8] font-mono mt-0.5">
                {avgScore > 0 ? `${avgScore}%` : 'Unassessed'}
              </p>
              <p className="text-[11px] text-[#38BDF8] font-semibold">Across Attempts</p>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#111418] border border-white/[0.08] flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#FBBF24]/15 border border-[#FBBF24]/30 flex items-center justify-center text-[#FBBF24] shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#8C877D]">Total Attempts</p>
              <p className="text-xl sm:text-2xl font-black text-[#F5F1E8] font-mono mt-0.5">
                {history.length}
              </p>
              <p className="text-[11px] text-[#FBBF24] font-semibold">Completed Sessions</p>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-4 rounded-2xl bg-[#111418] border border-white/[0.08] space-y-4">
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-[#8C877D] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tests by skill or topic..."
                className="w-full bg-[#16191E] border border-white/[0.08] text-xs sm:text-sm text-[#F5F1E8] rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:border-[#FF6B5F] placeholder:text-[#8C877D]"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-[#16191E] border border-white/[0.08] text-xs font-semibold text-[#F5F1E8] rounded-xl px-3 py-2 focus:outline-none focus:border-[#FF6B5F] shrink-0 cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="Ready to Take">Ready to Take</option>
                <option value="Passed">Passed</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-1">
            <span className="text-[11px] font-bold text-[#8C877D] mr-2 uppercase tracking-wider shrink-0">
              Domains:
            </span>
            {['All', 'Frontend', 'Backend', 'Database', 'Cloud & DevOps', 'AI & Data Science', 'Security'].map(
              (cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#FF6B5F]/15 text-[#FF857A] border border-[#FF6B5F]/30 font-bold'
                      : 'bg-[#16191E] text-[#8C877D] border border-white/[0.04] hover:text-[#F5F1E8] hover:border-white/10'
                  }`}
                >
                  {cat}
                </button>
              )
            )}
          </div>
        </div>

        {/* Assessment Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssessments.map((a) => (
            <div
              key={a.id}
              className="p-5 rounded-2xl bg-[#111418] border border-white/[0.08] hover:border-[#FF6B5F]/40 transition-all flex flex-col justify-between space-y-4 shadow-sm"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FF6B5F]/15 text-[#FF857A] border border-[#FF6B5F]/30 uppercase font-mono">
                    {a.category}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                      a.status === 'Passed'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-white/5 text-[#8C877D] border border-white/10'
                    }`}
                  >
                    {a.status}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#F5F1E8] leading-snug">
                    {a.title}
                  </h3>
                  <p className="text-xs text-[#8C877D] mt-1 line-clamp-2 leading-relaxed">
                    {a.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#8C877D] font-medium pt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {a.durationMinutes} mins
                  </span>
                  <span>•</span>
                  <span>{a.questionsCount || a.questions?.length || 5} Questions</span>
                  <span>•</span>
                  <span className="text-[#FBBF24]">+{a.xpReward} XP</span>
                </div>

                {a.lastScore !== null && a.lastScore !== undefined && (
                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between text-xs">
                    <span className="text-[#8C877D]">Last Score:</span>
                    <span className="font-bold text-[#F5F1E8] font-mono">{a.lastScore}%</span>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => handleLaunchAssessment(a)}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#FF6B5F] to-[#E85548] hover:from-[#FF857A] hover:to-[#FF6B5F] text-white text-xs font-bold transition-all shadow-md shadow-[#FF6B5F]/20 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <PlayCircle className="w-4 h-4" />
                <span>{a.status === 'Passed' ? 'Retake Checkpoint' : 'Launch Assessment'}</span>
              </button>
            </div>
          ))}
        </div>

        {/* Assessment Runner Modal */}
        {activeAssessment && (
          <AssessmentRunnerModal
            assessment={activeAssessment}
            onClose={() => setActiveAssessment(null)}
            onComplete={handleAssessmentComplete}
          />
        )}

      </div>
    </MainLayout>
  );
}
