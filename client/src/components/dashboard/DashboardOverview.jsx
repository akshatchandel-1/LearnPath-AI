import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
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
  const navigate = useNavigate();
  const isDark = theme === 'dark';

  const userName = user?.name ? user.name.split(' ')[0] : 'Learner';
  const targetRole = user?.targetRole || user?.careerGoal || 'Full Stack Developer';
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

  const skillsData = user?.skills || [
    { name: 'HTML & CSS', progress: 85 },
    { name: 'JavaScript ES6+', progress: 75 },
    { name: 'React.js', progress: 60 },
    { name: 'Node.js & Express', progress: 50 },
    { name: 'MongoDB', progress: 45 },
  ];

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
            Welcome back, {userName} ðŸ‘‹
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

      {/* Top 4 Stat Metric Cards (Dynamic - Zero Inventions) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Current Streak */}
        <div className={`p-5 rounded-2xl border transition-all shadow-sm hover:shadow-md ${
          isDark ? 'bg-[#111418] border-white/[0.08]' : 'bg-white border-black/[0.08]'
        }`}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#FF6B5F]/15 border border-[#FF6B5F]/30 text-[#FF857A] flex items-center justify-center shrink-0">
              <Flame className="w-6 h-6 fill-current" />
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
                <span className="font-bold text-[#FF857A] font-mono">65% Complete</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#FF6B5F] to-[#E85548] h-full rounded-full transition-all duration-500"
                  style={{ width: '65%' }}
                />
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-white/[0.06]">
              <p className="text-xs text-[#8C877D] font-medium">Current Milestone Phase</p>
              <p className={`text-sm font-bold mt-0.5 ${isDark ? 'text-[#F5F1E8]' : 'text-[#111418]'}`}>
                Phase 2: Core Engineering Architecture & APIs
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
                Target: Next Week
              </span>
            </div>
            <h3 className={`text-lg font-black mb-2 ${isDark ? 'text-[#F5F1E8]' : 'text-[#111418]'}`}>
              Production Architecture Project Milestone
            </h3>
            <p className="text-xs text-[#8C877D] leading-relaxed mb-4">
              Construct a multi-service system with live data feeds and containerization to verify Phase 2 readiness.
            </p>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs text-[#8C877D]">
                <span>Milestone Tasks Completed</span>
                <span className="font-bold text-[#34D399] font-mono">2 of 3 tasks (68%)</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#34D399] to-[#059669] h-full rounded-full transition-all duration-500"
                  style={{ width: '68%' }}
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

      {/* Courses in Progress Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`text-lg font-black ${isDark ? 'text-[#F5F1E8]' : 'text-[#111418]'}`}>
              Active Courses in Progress
            </h3>
            <p className="text-xs text-[#8C877D]">Pick up where you left off in your modules</p>
          </div>
          <button
            onClick={() => navigate('/courses')}
            className="text-xs font-bold text-[#FF857A] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All Courses</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {inProgressCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {inProgressCourses.slice(0, 3).map((course) => (
              <div
                key={course.id}
                onClick={() => handleOpenCourse(course)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer group hover:border-[#FF6B5F]/40 ${
                  isDark ? 'bg-[#111418] border-white/[0.08]' : 'bg-white border-black/[0.08]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-[#FF6B5F]/15 text-[#FF857A] uppercase font-mono">
                    {course.category}
                  </span>
                  <span className="text-xs font-bold text-[#FF857A] font-mono">
                    {course.progress || 0}%
                  </span>
                </div>

                <h4 className={`text-sm font-bold line-clamp-1 mb-1 group-hover:text-[#FF857A] transition-colors ${
                  isDark ? 'text-[#F5F1E8]' : 'text-[#111418]'
                }`}>
                  {course.title}
                </h4>
                <p className="text-xs text-[#8C877D] line-clamp-1 mb-3">
                  {course.tagline || 'Curated module track'}
                </p>

                <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden mb-3">
                  <div
                    className="bg-gradient-to-r from-[#FF6B5F] to-[#E85548] h-full rounded-full"
                    style={{ width: `${course.progress || 0}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#8C877D] pt-1">
                  <span>{course.completedLessons || 0}/{course.totalLessons || 8} lessons</span>
                  <span className="font-mono">{course.duration}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-[#111418] border border-white/[0.08] text-center space-y-3">
            <BookOpen className="w-8 h-8 text-[#8C877D] mx-auto opacity-50" />
            <p className="text-xs text-[#8C877D]">No courses currently enrolled. Start a learning track matched to your goals!</p>
            <button
              onClick={() => navigate('/courses')}
              className="px-4 py-2 rounded-xl bg-[#FF6B5F] hover:bg-[#E85548] text-white text-xs font-bold transition-all cursor-pointer"
            >
              Browse Course Catalog
            </button>
          </div>
        )}
      </div>

      {/* Bottom Grid: Skill Competency Progress & Weekly Goal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Skill Competency Bars */}
        <div className={`p-6 rounded-2xl border lg:col-span-2 space-y-4 ${
          isDark ? 'bg-[#111418] border-white/[0.08]' : 'bg-white border-black/[0.08]'
        }`}>
          <div className="flex items-center justify-between">
            <h3 className={`text-base font-bold ${isDark ? 'text-[#F5F1E8]' : 'text-[#111418]'}`}>
              Verified Skill Competency
            </h3>
            <button
              onClick={() => navigate('/skill-gaps')}
              className="text-xs font-bold text-[#FF857A] hover:underline cursor-pointer"
            >
              Analyze Gaps â†’
            </button>
          </div>

          <div className="space-y-3.5">
            {skillsData.map((skill, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className={`font-semibold ${isDark ? 'text-[#F5F1E8]' : 'text-[#111418]'}`}>
                    {skill.name}
                  </span>
                  <span className="text-[#8C877D] font-mono font-bold">{skill.progress}%</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#FF6B5F] to-[#E85548] h-full rounded-full"
                    style={{ width: `${skill.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Goal Progress */}
        <div className={`p-6 rounded-2xl border space-y-4 flex flex-col justify-between ${
          isDark ? 'bg-[#111418] border-white/[0.08]' : 'bg-white border-black/[0.08]'
        }`}>
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-[#FF6B5F]" />
              <h3 className={`text-base font-bold ${isDark ? 'text-[#F5F1E8]' : 'text-[#111418]'}`}>
                Weekly Study Goal
              </h3>
            </div>
            <div className={`text-3xl font-black font-mono my-2 ${isDark ? 'text-[#F5F1E8]' : 'text-[#111418]'}`}>
              {user?.completedHours || 0} / 12 hrs
            </div>
            <p className="text-xs text-[#8C877D] leading-relaxed mb-4">
              Maintain your daily study cadence to keep milestone pacing optimal!
            </p>

            <div className="w-full bg-white/5 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#FF6B5F] to-[#E85548] h-full rounded-full"
                style={{ width: `${Math.min(100, Math.round(((user?.completedHours || 0) / 12) * 100))}%` }}
              />
            </div>
          </div>

          <button
            onClick={() => navigate('/progress')}
            className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
              isDark ? 'border-white/10 bg-[#16191E] text-[#F5F1E8] hover:bg-white/5' : 'border-black/10 bg-[#F5F1E8] text-[#111418] hover:bg-black/5'
            }`}
          >
            View Detailed Analytics
          </button>
        </div>
      </div>

      {/* Interactive Modal for Milestone / Course Details */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className={`w-full max-w-lg p-6 sm:p-8 rounded-[28px] border shadow-2xl relative ${
            isDark ? 'bg-[#111418] border-white/10 text-[#F5F1E8]' : 'bg-white border-black/10 text-[#111418]'
          }`}>
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-[#8C877D] hover:text-[#F5F1E8] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {activeModal === 'milestone' && (
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-[#FF6B5F]/15 text-[#FF857A] flex items-center justify-center">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-black">Production Architecture Project</h3>
                <p className="text-xs text-[#8C877D] leading-relaxed">
                  This milestone tests component hierarchy, custom hooks, and server-side state synchronization with MongoDB.
                </p>
                <div className="p-3.5 rounded-xl bg-[#0E1114] border border-white/[0.06] space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-[#34D399]">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>State Management Setup (Complete)</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#34D399]">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>REST API Service Consumption (Complete)</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#FF857A]">
                    <Clock className="w-4 h-4" />
                    <span>Live Telemetry & Unit Tests (In Progress)</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setActiveModal(null);
                    navigate('/courses');
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#FF6B5F] text-white text-xs font-bold hover:bg-[#E85548] cursor-pointer"
                >
                  Continue to Course Syllabus
                </button>
              </div>
            )}

            {activeModal === 'course' && selectedCourse && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-[#FF6B5F]/15 text-[#FF857A] uppercase font-mono">
                    {selectedCourse.category}
                  </span>
                  <span className="text-xs font-bold text-[#FBBF24] font-mono">â˜… {selectedCourse.rating || 4.9}</span>
                </div>
                <h3 className="text-xl font-black">{selectedCourse.title}</h3>
                <p className="text-xs text-[#8C877D] leading-relaxed">
                  {selectedCourse.tagline || selectedCourse.description}
                </p>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-[#8C877D]">
                    <span>Progress</span>
                    <span className="font-mono font-bold text-[#FF857A]">{selectedCourse.progress || 0}%</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#FF6B5F] to-[#E85548] h-full rounded-full"
                      style={{ width: `${selectedCourse.progress || 0}%` }}
                    />
                  </div>
                </div>
                <button
                  onClick={() => {
                    setActiveModal(null);
                    navigate('/courses');
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#FF6B5F] text-white text-xs font-bold hover:bg-[#E85548] cursor-pointer"
                >
                  Launch Full Course Details
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

