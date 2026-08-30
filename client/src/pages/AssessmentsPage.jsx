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
  const storageKeyAssessments = user?._id ? `m3_assessments_data_${user._id}` : 'm3_assessments_data_guest';
  const storageKeyHistory = user?._id ? `m3_assessment_history_${user._id}` : 'm3_assessment_history_guest';

  const [assessments, setAssessments] = useState(() => {
    if (user?._id) {
      const saved = localStorage.getItem(`m3_assessments_data_${user._id}`);
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { return INITIAL_ASSESSMENTS; }
      }
    }
    return INITIAL_ASSESSMENTS;
  });

  const [history, setHistory] = useState(() => {
    if (user?._id) {
      const saved = localStorage.getItem(`m3_assessment_history_${user._id}`);
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { return []; }
      }
    }
    return [];
  });

  const [activeAssessment, setActiveAssessment] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Re-hydrate on user change
  useEffect(() => {
    if (user?._id) {
      const savedAssessments = localStorage.getItem(`m3_assessments_data_${user._id}`);
      if (savedAssessments) {
        try { setAssessments(JSON.parse(savedAssessments)); } catch (e) { setAssessments(INITIAL_ASSESSMENTS); }
      } else {
        setAssessments(INITIAL_ASSESSMENTS);
      }

      const savedHistory = localStorage.getItem(`m3_assessment_history_${user._id}`);
      if (savedHistory) {
        try { setHistory(JSON.parse(savedHistory)); } catch (e) { setHistory([]); }
      } else {
        setHistory([]);
      }
    }
  }, [user?._id]);

  // Persist assessment updates
  useEffect(() => {
    if (user?._id) {
      localStorage.setItem(`m3_assessments_data_${user._id}`, JSON.stringify(assessments));
    }
  }, [assessments, user?._id]);

  useEffect(() => {
    if (user?._id) {
      localStorage.setItem(`m3_assessment_history_${user._id}`, JSON.stringify(history));
    }
  }, [history, user?._id]);

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

    if (result.xpEarned > 0) {
      awardXp(result.xpEarned);
    }

    if (result.passed && result.skillTested) {
      updateSkillMastery(result.skillTested, result.score);
    }

    // Add to history
    const historyEntry = {
      id: `hist_${Date.now()}`,
      title: activeAssessment?.title || 'Skill Assessment',
      score: result.score,
      passed: result.passed,
      earnedXp: result.xpEarned || 50,
      date: 'Today',
      time: completedAt,
      skillTested: result.skillTested || 'General'
    };

    setHistory((prev) => [historyEntry, ...prev]);
  };

  // Filter and sort assessments
  const filteredAssessments = useMemo(() => {
    const userRole = (user?.targetRole || user?.careerGoal || '').toLowerCase();

    return assessments.filter((a) => {
      const matchesSearch =
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (a.skillTested && a.skillTested.toLowerCase().includes(searchQuery.toLowerCase())) ||
        a.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'All' || a.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesStatus = selectedStatus === 'All' || a.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    }).sort((a, b) => {
      const aMatch = (a.targetRole && userRole.includes(a.targetRole.toLowerCase())) || (a.category && userRole.includes(a.category.toLowerCase()));
      const bMatch = (b.targetRole && userRole.includes(b.targetRole.toLowerCase())) || (b.category && userRole.includes(b.category.toLowerCase()));
      if (aMatch && !bMatch) return -1;
      if (!aMatch && bMatch) return 1;
      return 0;
    });
  }, [assessments, searchQuery, selectedCategory, selectedStatus, user?.targetRole, user?.careerGoal]);

  const totalAttempts = assessments.reduce((acc, a) => acc + (a.attemptsCount || 0), 0);
  const passedAssessments = assessments.filter((a) => a.status === 'Passed').length;
  const avgScore =
    assessments.filter((a) => a.lastScore !== null).length > 0
      ? Math.round(
          assessments
            .filter((a) => a.lastScore !== null)
            .reduce((acc, a) => acc + a.lastScore, 0) /
            assessments.filter((a) => a.lastScore !== null).length
        )
      : 0;

  const categories = ['All', 'Frontend', 'Backend', 'Data Science', 'DevOps', 'Business Analytics', 'Full Stack'];

  return (
    <MainLayout>
      <div className="space-y-8 pb-12">
        {/* Header Hero */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#16191E] via-[#1A1E24] to-[#0E1114] border border-white/[0.08] p-6 sm:p-8">
          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6B5F]/15 text-[#FF857A] border border-[#FF6B5F]/30 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Skill Gap & Assessment Benchmarks</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Skill Verification & Competency Tests
            </h1>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Validate your technical proficiency for <strong className="text-white">{user?.targetRole || user?.careerGoal || 'Engineering Professional'}</strong>.
              Every assessment dynamically randomizes questions and adapts your skill radar and learning path.
            </p>
          </div>
        </div>

        {/* Telemetry Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-[#16191E] border border-white/[0.06] flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#34D399]/15 flex items-center justify-center text-[#34D399] border border-[#34D399]/30 shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-neutral-400">Passed Benchmarks</p>
              <p className="text-xl sm:text-2xl font-black text-white font-mono mt-0.5">
                {passedAssessments} / {assessments.length}
              </p>
              <p className="text-[11px] text-[#34D399] font-semibold">Verified Competencies</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#16191E] border border-white/[0.06] flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#38BDF8]/15 flex items-center justify-center text-[#38BDF8] border border-[#38BDF8]/30 shrink-0">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-neutral-400">Average Proficiency</p>
              <p className="text-xl sm:text-2xl font-black text-white font-mono mt-0.5">
                {avgScore}%
              </p>
              <p className="text-[11px] text-[#38BDF8] font-semibold">Across Assessed Skills</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#16191E] border border-white/[0.06] flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#FBBF24]/15 flex items-center justify-center text-[#FBBF24] border border-[#FBBF24]/30 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-neutral-400">Total Attempts</p>
              <p className="text-xl sm:text-2xl font-black text-white font-mono mt-0.5">
                {totalAttempts}
              </p>
              <p className="text-[11px] text-[#FBBF24] font-semibold">Evaluations Taken</p>
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search assessments, skills, topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#16191E] border border-white/[0.08] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF6B5F]"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-[#16191E] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-neutral-300 focus:outline-none focus:border-[#FF6B5F] cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="Ready to Take">Ready to Take</option>
                <option value="Passed">Passed</option>
              </select>
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#FF6B5F]/15 border-[#FF6B5F] text-[#FF857A]'
                    : 'bg-[#16191E] border-white/[0.06] text-neutral-400 hover:border-white/20 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Assessments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredAssessments.map((item) => {
            const isRoleMatch = (item.targetRole && (user?.targetRole || user?.careerGoal || '').toLowerCase().includes(item.targetRole.toLowerCase())) ||
              (item.category && (user?.targetRole || user?.careerGoal || '').toLowerCase().includes(item.category.toLowerCase()));

            return (
              <div
                key={item.id}
                className="rounded-2xl bg-[#16191E] border border-white/[0.06] hover:border-white/20 transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-lg group"
              >
                <div className="p-5 space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/[0.06] text-neutral-300 font-mono">
                      {item.category}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {isRoleMatch && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FF6B5F]/15 text-[#FF857A] border border-[#FF6B5F]/30">
                          Role Match
                        </span>
                      )}
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                        item.status === 'Passed'
                          ? 'bg-[#34D399]/15 text-[#34D399] border border-[#34D399]/30'
                          : 'bg-white/[0.04] text-neutral-400'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-[#FF857A] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-neutral-400 mt-1">
                      <span>Tested Skill: <strong className="text-white">{item.skillTested}</strong></span>
                    </div>
                  </div>

                  {item.lastScore !== null && (
                    <div className="p-3 rounded-xl bg-[#0E1114] border border-white/[0.04] flex items-center justify-between text-xs">
                      <span className="text-neutral-400 font-medium">Last Score</span>
                      <span className={`font-mono font-bold text-sm ${
                        item.lastScore >= (item.passingScore || 70) ? 'text-[#34D399]' : 'text-[#F87171]'
                      }`}>
                        {item.lastScore}%
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-4 border-t border-white/[0.06] bg-[#0E1114]/50 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3 text-xs text-neutral-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {item.duration}
                    </span>
                    <span className="flex items-center gap-1 text-[#FBBF24]">
                      <Award className="w-3.5 h-3.5" />
                      +{item.xpReward || 150} XP
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleLaunchAssessment(item)}
                    className="px-4 py-2 rounded-xl bg-[#FF6B5F] hover:bg-[#E85548] text-white text-xs font-bold shadow-md shadow-[#FF6B5F]/20 flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <PlayCircle className="w-3.5 h-3.5" />
                    <span>{item.status === 'Passed' ? 'Retake' : 'Start'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Assessment History Section */}
        {history.length > 0 && (
          <div className="p-6 rounded-3xl bg-[#16191E] border border-white/[0.06] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-[#FF857A]" />
                <span>Recent Assessment History</span>
              </h3>
              <span className="text-xs text-neutral-400 font-mono">{history.length} attempts recorded</span>
            </div>

            <div className="divide-y divide-white/[0.04]">
              {history.slice(0, 5).map((h) => (
                <div key={h.id} className="py-3 flex items-center justify-between gap-4 text-xs">
                  <div className="space-y-0.5">
                    <p className="font-semibold text-white">{h.title}</p>
                    <span className="text-[11px] text-neutral-400 font-mono">{h.date} at {h.time}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-0.5 rounded font-mono font-bold text-xs ${
                      h.passed ? 'bg-[#34D399]/15 text-[#34D399]' : 'bg-[#F87171]/15 text-[#F87171]'
                    }`}>
                      {h.score}%
                    </span>
                    <span className="font-mono text-[#FBBF24]">+{h.earnedXp} XP</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Active Modal */}
        {activeAssessment && (
          <AssessmentRunnerModal
            assessment={activeAssessment}
            isOpen={!!activeAssessment}
            onClose={() => setActiveAssessment(null)}
            onComplete={(payload) => {
              handleAssessmentComplete(payload);
              setActiveAssessment(null);
            }}
          />
        )}
      </div>
    </MainLayout>
  );
}
