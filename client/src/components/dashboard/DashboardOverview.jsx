import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useLearningPath } from '../../context/LearningPathContext';
import { INITIAL_COURSES } from '../../data/coursesAndAssessmentsData';
import {
  Flame,
  BookOpen,
  FolderCheck,
  Award,
  Clock,
  Calendar,
  CheckCircle2,
  Star,
  ChevronRight,
  Code2,
  Sparkles,
  X,
  Target,
  ArrowRight,
  PlayCircle
} from 'lucide-react';

export default function DashboardOverview() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const { learningPath } = useLearningPath();
  const navigate = useNavigate();
  const isDark = theme === 'dark';

  const userName = user?.name ? user.name.split(' ')[0] : 'Learner';
  const targetRole = user?.targetRole || user?.careerGoal || learningPath?.goal || 'Full Stack Developer';
  const userStreak = user?.streakDays ?? user?.streak ?? 0;
  const userXp = user?.points ?? user?.totalXp ?? 0;

  const [activeModal, setActiveModal] = useState(null); // 'milestone' | 'course' | null
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [courses, setCourses] = useState(() => {
    try {
      const saved = localStorage.getItem('m3_courses_data');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_COURSES;
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem('m3_courses_data');
      if (saved) setCourses(JSON.parse(saved));
    } catch (e) {}
  }, []);

  const inProgressCourses = courses.filter((c) => c.enrolled);
  const activeCoursesCount = inProgressCourses.length;
  const milestonesDoneCount = user?.completedMilestonesCount || 0;

  const skillsData = (user?.skills && user.skills.length > 0) ? user.skills : [];

  // Real Learning Path Telemetry
  const overallProgress = learningPath?.overallProgress ?? 0;
  const activePhase = learningPath?.phases?.find(p => p.status === 'in-progress') || learningPath?.phases?.[0];
  const activePhaseTitle = activePhase ? `Phase ${activePhase.phaseNumber}: ${activePhase.title}` : 'Phase 1: Foundations';
  const activeMilestone = activePhase?.milestone;
  const milestoneTitle = activeMilestone?.title || 'Hands-on Phase Milestone';
  const milestoneDesc = activeMilestone?.description || 'Complete the foundational lessons and code checkpoints to unlock this milestone.';
  const milestoneProgress = activePhase?.completionPercentage ?? 0;

  const handleOpenCourse = (course) => {
    setSelectedCourse(course);
    setActiveModal('course');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-8 animate-in fade-in duration-200">
      {/* Header Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className={`text-2xl sm:text-3xl font-black tracking-tight flex items-center gap-2 ${isDark ? 'text-[#F5F1E8]' : 'text-[#111418]'}`}>
            Welcome back, {userName} 👋
          </h1>
          <p className="text-xs sm:text-sm text-[#8C877D] mt-1">
            Track your personalized engineering roadmap for <strong className="text-[#FF857A]">{targetRole}</strong>.
          </p>
        </div>

        <button
          onClick={() => navigate('/learning-path')}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FF6B5F] hover:bg-[#E85548] text-white text-xs font-bold transition-all shadow-md shadow-[#FF6B5F]/20 cursor-pointer self-start sm:self-auto"
        >
          <span>View Active Roadmap</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Top 4 Quick Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Streak */}
        <div className={`p-5 rounded-2xl border transition-all shadow-sm hover:shadow-md ${
          isDark ? 'bg-[#111418] border-white/[0.08]' : 'bg-white border-black/[0.08]'
        }`}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#FF6B5F]/15 border border-[#FF6B5F]/30 text-[#FF857A] flex items-center justify-center shrink-0">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#8C877D] uppercase tracking-wider">Current Streak</p>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className={`text-2xl font-black font-mono ${isDark ? 'text-[#F5F1E8]' : 'text-[#111418]'}`}>
                  {userStreak}
                </span>
                <span className="text-xs font-medium text-[#8C877D]">days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Active Courses */}
        <div className={`p-5 rounded-2xl border transition-all shadow-sm hover:shadow-md ${
          isDark ? 'bg-[#111418] border-white/[0.08]' : 'bg-white border-black/[0.08]'
        }`}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#34D399]/15 border border-[#34D399]/30 text-[#34D399] flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#8C877D] uppercase tracking-wider">Courses Active</p>
              <span className={`text-2xl font-black font-mono block mt-0.5 ${isDark ? 'text-[#F5F1E8]' : 'text-[#111418]'}`}>
                {activeCoursesCount}
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: Milestones Done */}
        <div className={`p-5 rounded-2xl border transition-all shadow-sm hover:shadow-md ${
          isDark ? 'bg-[#111418] border-white/[0.08]' : 'bg-white border-black/[0.08]'
        }`}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#38BDF8]/15 border border-[#38BDF8]/30 text-[#38BDF8] flex items-center justify-center shrink-0">
              <FolderCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#8C877D] uppercase tracking-wider">Milestones Done</p>
              <span className={`text-2xl font-black font-mono block mt-0.5 ${isDark ? 'text-[#F5F1E8]' : 'text-[#111418]'}`}>
                {milestonesDoneCount}
              </span>
            </div>
          </div>
        </div>

        {/* Card 4: Total XP */}
        <div className={`p-5 rounded-2xl border transition-all shadow-sm hover:shadow-md ${
          isDark ? 'bg-[#111418] border-white/[0.08]' : 'bg-white border-black/[0.08]'
        }`}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#FBBF24]/15 border border-[#FBBF24]/30 text-[#FBBF24] flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#8C877D] uppercase tracking-wider">Total XP Earned</p>
              <span className={`text-2xl font-black font-mono block mt-0.5 ${isDark ? 'text-[#F5F1E8]' : 'text-[#111418]'}`}>
                +{userXp} XP
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Row: Your Learning Path & Next Milestone */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Your Learning Path Card */}
        <div className={`p-6 rounded-2xl border flex flex-col justify-between space-y-5 ${
          isDark ? 'bg-[#111418] border-white/[0.08]' : 'bg-white border-black/[0.08]'
        }`}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#8C877D] uppercase tracking-wider">
                Your Learning Path
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FF6B5F]/15 text-[#FF857A] border border-[#FF6B5F]/30 font-mono">
                Active Roadmap
              </span>
            </div>
            <h3 className={`text-lg font-black mb-4 ${isDark ? 'text-[#F5F1E8]' : 'text-[#111418]'}`}>
              {targetRole}
            </h3>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs text-[#8C877D]">
                <span>Overall Curriculum Progress</span>
                <span className="font-bold text-[#FF857A] font-mono">{overallProgress}% Complete</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#FF6B5F] to-[#E85548] h-full rounded-full transition-all duration-500"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-white/[0.06]">
              <p className="text-xs text-[#8C877D] font-medium">Current Milestone Phase</p>
              <p className={`text-sm font-bold mt-0.5 ${isDark ? 'text-[#F5F1E8]' : 'text-[#111418]'}`}>
                {activePhaseTitle}
              </p>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => navigate('/learning-path')}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#FF6B5F] hover:bg-[#E85548] text-white text-xs font-bold transition-all shadow-md shadow-[#FF6B5F]/20 cursor-pointer flex items-center justify-center gap-2"
            >
              <PlayCircle className="w-4 h-4" />
              <span>Continue Learning</span>
            </button>
          </div>
        </div>

        {/* Next Milestone Card */}
        <div className={`p-6 rounded-2xl border flex flex-col justify-between space-y-5 ${
          isDark ? 'bg-[#111418] border-white/[0.08]' : 'bg-white border-black/[0.08]'
        }`}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#8C877D] uppercase tracking-wider">
                Upcoming Milestone
              </span>
              <span className="flex items-center gap-1 text-xs font-bold text-[#FBBF24] font-mono">
                <Calendar className="w-3.5 h-3.5" />
                Target: Next Phase
              </span>
            </div>
            <h3 className={`text-lg font-black mb-2 ${isDark ? 'text-[#F5F1E8]' : 'text-[#111418]'}`}>
              {milestoneTitle}
            </h3>
            <p className="text-xs text-[#8C877D] leading-relaxed mb-4">
              {milestoneDesc}
            </p>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs text-[#8C877D]">
                <span>Milestone Tasks Completed</span>
                <span className="font-bold text-[#34D399] font-mono">
                  {milestoneProgress > 0 ? `${milestoneProgress}% Complete` : '0% (Not Started)'}
                </span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#34D399] to-[#059669] h-full rounded-full transition-all duration-500"
                  style={{ width: `${milestoneProgress}%` }}
                />
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => setActiveModal('milestone')}
              className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                isDark ? 'border-white/10 bg-[#16191E] text-[#F5F1E8] hover:bg-white/5' : 'border-black/10 bg-[#F5F1E8] text-[#111418] hover:bg-black/5'
              }`}
            >
              View Milestone Details
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Row: In-Progress Modules & Verified Skill Competency */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* In-Progress Modules (2 cols) */}
        <div className={`lg:col-span-2 p-6 rounded-2xl border space-y-4 ${
          isDark ? 'bg-[#111418] border-white/[0.08]' : 'bg-white border-black/[0.08]'
        }`}>
          <div className="flex items-center justify-between">
            <h3 className={`text-base font-black tracking-tight ${isDark ? 'text-[#F5F1E8]' : 'text-[#111418]'}`}>
              Enrolled Learning Modules
            </h3>
            <button
              onClick={() => navigate('/courses')}
              className="text-xs font-bold text-[#FF857A] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Explore All Catalog Tracks</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {inProgressCourses.length === 0 ? (
            <div className="p-8 text-center rounded-xl bg-white/[0.02] border border-white/[0.04] space-y-3">
              <BookOpen className="w-8 h-8 mx-auto text-[#8C877D]" />
              <p className="text-xs font-bold text-[#C7C2B6]">No courses enrolled yet.</p>
              <p className="text-[11px] text-[#8C877D]">Visit the Courses catalog to enroll in curated modules matched to your target role.</p>
              <button
                onClick={() => navigate('/courses')}
                className="px-4 py-2 rounded-xl bg-[#FF6B5F] text-white text-xs font-bold hover:bg-[#E85548] transition-all cursor-pointer inline-flex items-center gap-1.5"
              >
                <span>Browse Courses</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {inProgressCourses.slice(0, 3).map((course) => (
                <div
                  key={course.id}
                  onClick={() => handleOpenCourse(course)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group ${
                    isDark
                      ? 'bg-[#16191E] border-white/[0.06] hover:border-white/20 hover:bg-[#1D2128]'
                      : 'bg-[#F9FAFB] border-black/[0.06] hover:border-black/20 hover:bg-[#F3F4F6]'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FF6B5F]/15 text-[#FF857A] font-mono">
                        {course.category}
                      </span>
                      <span className="text-xs text-[#8C877D] font-mono">
                        {course.duration || '4 hours'}
                      </span>
                    </div>
                    <h4 className={`text-sm font-bold group-hover:text-[#FF857A] transition-colors ${
                      isDark ? 'text-[#F5F1E8]' : 'text-[#111418]'
                    }`}>
                      {course.title}
                    </h4>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-[#FF857A]">
                        {course.progress || 0}%
                      </span>
                      <div className="w-20 bg-white/10 rounded-full h-1.5 mt-1 overflow-hidden">
                        <div
                          className="bg-[#FF6B5F] h-full rounded-full"
                          style={{ width: `${course.progress || 0}%` }}
                        />
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#8C877D] group-hover:text-[#F5F1E8] transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Verified Skill Competency (1 col) */}
        <div className={`p-6 rounded-2xl border space-y-4 ${
          isDark ? 'bg-[#111418] border-white/[0.08]' : 'bg-white border-black/[0.08]'
        }`}>
          <div className="flex items-center justify-between">
            <h3 className={`text-base font-black tracking-tight ${isDark ? 'text-[#F5F1E8]' : 'text-[#111418]'}`}>
              Skill Competency
            </h3>
            <button
              onClick={() => navigate('/skill-gaps')}
              className="text-xs font-bold text-[#FF857A] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Skill Matrix</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-4">
            {skillsData.length === 0 ? (
              <div className="p-6 text-center rounded-xl bg-white/[0.02] border border-white/[0.04] space-y-2">
                <Target className="w-7 h-7 mx-auto text-[#8C877D]" />
                <p className="text-xs font-bold text-[#C7C2B6]">No skills verified yet.</p>
                <p className="text-[11px] text-[#8C877D]">Upload your resume or take checkpoint quizzes to plot your competency radar.</p>
              </div>
            ) : (
              skillsData.slice(0, 5).map((skill, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className={`font-semibold ${isDark ? 'text-[#F5F1E8]' : 'text-[#111418]'}`}>
                      {skill.name || skill.skill}
                    </span>
                    <span className="font-mono text-[#8C877D] font-bold">
                      {skill.level ?? skill.progress ?? 0}%
                    </span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#FF6B5F] to-[#E85548] h-full rounded-full transition-all duration-300"
                      style={{ width: `${skill.level ?? skill.progress ?? 0}%` }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="pt-2">
            <button
              onClick={() => navigate('/assessments')}
              className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all border cursor-pointer flex items-center justify-center gap-2 ${
                isDark
                  ? 'border-white/10 bg-[#16191E] text-[#F5F1E8] hover:bg-white/5'
                  : 'border-black/10 bg-[#F5F1E8] text-[#111418] hover:bg-black/5'
              }`}
            >
              <Code2 className="w-4 h-4 text-[#FF857A]" />
              <span>Take Checkpoint Assessment</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal: Milestone Details */}
      {activeModal === 'milestone' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className={`rounded-2xl max-w-lg w-full p-6 border shadow-2xl space-y-4 ${
            isDark ? 'bg-[#111418] border-white/10 text-[#F5F1E8]' : 'bg-white border-black/10 text-[#111418]'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#FF857A] uppercase tracking-wider">
                Active Phase Milestone
              </span>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1 rounded-lg hover:bg-white/10 text-[#8C877D] hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h3 className="text-lg font-black">{milestoneTitle}</h3>
            <p className="text-xs text-[#8C877D] leading-relaxed">
              {milestoneDesc}
            </p>

            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-2">
              <p className="text-xs font-bold text-[#C7C2B6]">Key Deliverables</p>
              <ul className="text-xs text-[#8C877D] space-y-1.5 list-disc list-inside">
                {activeMilestone?.deliverables && activeMilestone.deliverables.length > 0 ? (
                  activeMilestone.deliverables.map((d, i) => <li key={i}>{d}</li>)
                ) : (
                  <>
                    <li>Modular code architecture and test coverage</li>
                    <li>Clean interface with async error boundaries</li>
                    <li>Live deployment repository link</li>
                  </>
                )}
              </ul>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold border border-white/10 hover:bg-white/5 cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setActiveModal(null);
                  navigate('/learning-path');
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#FF6B5F] hover:bg-[#E85548] text-white cursor-pointer"
              >
                Go to Learning Path
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Course Details */}
      {activeModal === 'course' && selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className={`rounded-2xl max-w-lg w-full p-6 border shadow-2xl space-y-4 ${
            isDark ? 'bg-[#111418] border-white/10 text-[#F5F1E8]' : 'bg-white border-black/10 text-[#111418]'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#FF857A] uppercase tracking-wider">
                {selectedCourse.category}
              </span>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1 rounded-lg hover:bg-white/10 text-[#8C877D] hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h3 className="text-lg font-black">{selectedCourse.title}</h3>
            <p className="text-xs text-[#8C877D] leading-relaxed">
              {selectedCourse.description}
            </p>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs text-[#8C877D]">
                <span>Progress</span>
                <span className="font-mono font-bold text-[#FF857A]">{selectedCourse.progress || 0}%</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-[#FF6B5F] h-full rounded-full"
                  style={{ width: `${selectedCourse.progress || 0}%` }}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold border border-white/10 hover:bg-white/5 cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setActiveModal(null);
                  navigate('/courses');
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#FF6B5F] hover:bg-[#E85548] text-white cursor-pointer"
              >
                Open Course Page
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
