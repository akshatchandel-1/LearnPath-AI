import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import CourseDetailsModal from '../components/courses/CourseDetailsModal';
import AssessmentRunnerModal from '../components/assessments/AssessmentRunnerModal';
import { INITIAL_COURSES, INITIAL_ASSESSMENTS } from '../data/coursesAndAssessmentsData';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
  BookOpen,
  Search,
  Filter,
  Sparkles,
  Zap,
  Award,
  Clock,
  CheckCircle2,
  BookmarkCheck,
  TrendingUp,
  Layers,
  GraduationCap,
  Plus,
  PlayCircle,
  Star,
  ChevronRight,
  X,
  Target,
  ArrowRight
} from 'lucide-react';

export default function CoursesPage() {
  const navigate = useNavigate();
  const { user, awardXp } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const storageKeyCourses = user?._id ? `m3_courses_data_${user._id}` : 'm3_courses_data_guest';
  const storageKeyAssessments = user?._id ? `m3_assessments_data_${user._id}` : 'm3_assessments_data_guest';

  const [courses, setCourses] = useState(() => {
    if (user?._id) {
      const saved = localStorage.getItem(`m3_courses_data_${user._id}`);
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { return INITIAL_COURSES; }
      }
    }
    return INITIAL_COURSES;
  });

  const [assessments, setAssessments] = useState(() => {
    if (user?._id) {
      const saved = localStorage.getItem(`m3_assessments_data_${user._id}`);
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { return INITIAL_ASSESSMENTS; }
      }
    }
    return INITIAL_ASSESSMENTS;
  });

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeAssessment, setActiveAssessment] = useState(null);
  const [isModuleScopeOpen, setIsModuleScopeOpen] = useState(false);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [enrollmentFilter, setEnrollmentFilter] = useState('All'); // 'All' | 'Enrolled' | 'Available'
  
  // Custom AI Curriculum Synthesizer
  const [customSkillPrompt, setCustomSkillPrompt] = useState('');
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [synthesizedSuccess, setSynthesizedSuccess] = useState(false);

  // Re-hydrate on user change
  useEffect(() => {
    if (user?._id) {
      const savedCourses = localStorage.getItem(`m3_courses_data_${user._id}`);
      if (savedCourses) {
        try { setCourses(JSON.parse(savedCourses)); } catch (e) { setCourses(INITIAL_COURSES); }
      } else {
        setCourses(INITIAL_COURSES);
      }

      const savedAssessments = localStorage.getItem(`m3_assessments_data_${user._id}`);
      if (savedAssessments) {
        try { setAssessments(JSON.parse(savedAssessments)); } catch (e) { setAssessments(INITIAL_ASSESSMENTS); }
      } else {
        setAssessments(INITIAL_ASSESSMENTS);
      }
    }
  }, [user?._id]);

  // Persist course updates
  useEffect(() => {
    if (user?._id) {
      localStorage.setItem(`m3_courses_data_${user._id}`, JSON.stringify(courses));
    }
  }, [courses, user?._id]);

  useEffect(() => {
    if (user?._id) {
      localStorage.setItem(`m3_assessments_data_${user._id}`, JSON.stringify(assessments));
    }
  }, [assessments, user?._id]);

  // Toggle enrollment
  const handleEnrollToggle = (courseId) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id === courseId) {
          const newEnrolled = !c.enrolled;
          return {
            ...c,
            enrolled: newEnrolled,
            progress: newEnrolled ? (c.progress || 0) : 0,
            completedLessons: newEnrolled ? (c.completedLessons || 0) : 0,
          };
        }
        return c;
      })
    );

    if (selectedCourse && selectedCourse.id === courseId) {
      setSelectedCourse((prev) => ({
        ...prev,
        enrolled: !prev.enrolled,
        progress: !prev.enrolled ? (prev.progress || 0) : 0,
        completedLessons: !prev.enrolled ? (prev.completedLessons || 0) : 0,
      }));
    }
  };

  // Toggle Lesson Completion
  const handleToggleLesson = (courseId, lessonId) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id === courseId) {
          let total = 0;
          let completed = 0;
          const updatedModules = c.modules.map((m) => {
            const updatedLessons = m.lessons.map((l) => {
              total++;
              if (l.id === lessonId) {
                const nextState = !l.completed;
                if (nextState) completed++;
                return { ...l, completed: nextState };
              }
              if (l.completed) completed++;
              return l;
            });
            return { ...m, lessons: updatedLessons };
          });

          const newProgress = Math.round((completed / (total || 1)) * 100);
          return {
            ...c,
            enrolled: true,
            modules: updatedModules,
            progress: newProgress,
            completedLessons: completed,
          };
        }
        return c;
      })
    );

    if (selectedCourse && selectedCourse.id === courseId) {
      setSelectedCourse((prev) => {
        let total = 0;
        let completed = 0;
        const updatedModules = prev.modules.map((m) => {
          const updatedLessons = m.lessons.map((l) => {
            total++;
            if (l.id === lessonId) {
              const nextState = !l.completed;
              if (nextState) completed++;
              return { ...l, completed: nextState };
            }
            if (l.completed) completed++;
            return l;
          });
          return { ...m, lessons: updatedLessons };
        });

        const newProgress = Math.round((completed / (total || 1)) * 100);
        return {
          ...prev,
          enrolled: true,
          modules: updatedModules,
          progress: newProgress,
          completedLessons: completed,
        };
      });
    }
  };

  // Launch AI Synthesized Course
  const handleSynthesizeCustomCourse = (e) => {
    e.preventDefault();
    if (!customSkillPrompt.trim()) return;

    setIsSynthesizing(true);
    setTimeout(() => {
      const newCourse = {
        id: `custom-course-${Date.now()}`,
        title: `Mastering ${customSkillPrompt.trim()}`,
        tagline: `AI-synthesized fast-track curriculum targeting ${customSkillPrompt.trim()} mastery with practical lessons.`,
        category: 'AI Synthesized',
        difficulty: 'Intermediate',
        platform: 'LearnPath AI Custom Lab',
        instructor: 'LearnPath AI Engine',
        duration: '4.5 Hours',
        rating: 5.0,
        reviewsCount: 1,
        enrolled: true,
        progress: 0,
        completedLessons: 0,
        totalLessons: 4,
        xpReward: 350,
        skillsCovered: [customSkillPrompt.trim(), 'Deep Practice', 'System Design'],
        targetRole: user?.targetRole || user?.careerGoal || 'Full Stack Developer',
        thumbnailGradient: 'from-amber-500/20 via-orange-600/10 to-slate-900/30',
        resources: {
          officialDocs: { title: 'Official Documentation & Guides', url: 'https://developer.mozilla.org/' },
          youtubeVideo: { title: `${customSkillPrompt.trim()} Crash Course`, url: 'https://www.youtube.com' },
          youtubeChannel: { title: 'freeCodeCamp.org', url: 'https://www.youtube.com/@freecodecamp' },
          learningPlatform: { title: 'Hands-on Practice Sandbox', url: 'https://github.com' },
        },
        modules: [
          {
            title: `Module 1: Core Fundamentals of ${customSkillPrompt.trim()}`,
            duration: '2.0 hrs',
            lessons: [
              { id: `c_l1_${Date.now()}`, title: 'Architecture & Mental Models', duration: '40 mins', completed: false },
              { id: `c_l2_${Date.now()}`, title: 'Core Syntax & Paradigm Deep Dive', duration: '50 mins', completed: false },
            ]
          },
          {
            title: 'Module 2: Production Applications & Best Practices',
            duration: '2.5 hrs',
            lessons: [
              { id: `c_l3_${Date.now()}`, title: 'Applied Project Implementation', duration: '60 mins', completed: false },
              { id: `c_l4_${Date.now()}`, title: 'Performance Optimization & Benchmarks', duration: '55 mins', completed: false },
            ]
          }
        ]
      };

      setCourses((prev) => [newCourse, ...prev]);
      setCustomSkillPrompt('');
      setIsSynthesizing(false);
      setSynthesizedSuccess(true);
      setTimeout(() => setSynthesizedSuccess(false), 4000);
    }, 900);
  };

  // Filter and Sort Courses
  const filteredCourses = useMemo(() => {
    const userRole = (user?.targetRole || user?.careerGoal || '').toLowerCase();

    return courses.filter((c) => {
      const matchesSearch =
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.skillsCovered.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategory === 'All' || c.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesDifficulty = selectedDifficulty === 'All' || c.difficulty === selectedDifficulty;
      const matchesEnrollment =
        enrollmentFilter === 'All'
          ? true
          : enrollmentFilter === 'Enrolled'
          ? c.enrolled
          : !c.enrolled;

      return matchesSearch && matchesCategory && matchesDifficulty && matchesEnrollment;
    }).sort((a, b) => {
      const aMatch = (a.targetRole && userRole.includes(a.targetRole.toLowerCase())) || (a.category && userRole.includes(a.category.toLowerCase()));
      const bMatch = (b.targetRole && userRole.includes(b.targetRole.toLowerCase())) || (b.category && userRole.includes(b.category.toLowerCase()));
      if (aMatch && !bMatch) return -1;
      if (!aMatch && bMatch) return 1;
      return 0;
    });
  }, [courses, searchQuery, selectedCategory, selectedDifficulty, enrollmentFilter, user?.targetRole, user?.careerGoal]);

  const enrolledCourses = courses.filter((c) => c.enrolled);
  const enrolledCount = enrolledCourses.length;
  const totalCompletedLessons = courses.reduce((acc, c) => acc + (c.completedLessons || 0), 0);
  const userEarnedCourseXp = user?.points ?? user?.totalXp ?? 0;

  const categories = ['All', 'Frontend', 'Backend', 'Data Science', 'DevOps', 'Business Analytics', 'Full Stack'];

  return (
    <MainLayout>
      <div className="space-y-8 pb-12">
        {/* Header Hero */}
        <div className={`relative rounded-3xl overflow-hidden border p-6 sm:p-8 transition-colors ${isDark ? "bg-gradient-to-r from-[#16191E] via-[#1A1E24] to-[#0E1114] border-white/[0.08]" : "bg-gradient-to-r from-white via-[#FAF7F2] to-[#F5F1E8] border-black/[0.08]"}`}>
          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6B5F]/15 text-[#FF857A] border border-[#FF6B5F]/30 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Personalized Role Curriculum</span>
            </div>
            <h1 className={`text-2xl sm:text-4xl font-black tracking-tight ${isDark ? "text-white" : "text-[#111418]"}`}>
              Course Catalog & Skill Learning Paths
            </h1>
            <p className={`text-sm leading-relaxed ${isDark ? "text-neutral-400" : "text-[#4B5563]"}`}>
              Curated, production-grade learning modules tailored for your objective as{' '}
              <strong className={isDark ? "text-white" : "text-[#111418]"}>{user?.targetRole || user?.careerGoal || 'Engineering Professional'}</strong>.
              Track your lesson completions, earn verified XP, and unlock assessment checkpoints.
            </p>
          </div>
        </div>

        {/* Telemetry Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className={`p-5 rounded-2xl border flex items-center gap-4 transition-colors ${isDark ? "bg-[#16191E] border-white/[0.06]" : "bg-white border-black/[0.08]"}`}>
            <div className="w-12 h-12 rounded-xl bg-[#38BDF8]/15 flex items-center justify-center text-[#38BDF8] border border-[#38BDF8]/30 shrink-0">
              <BookmarkCheck className="w-6 h-6" />
            </div>
            <div>
              <p className={`text-xs font-semibold ${isDark ? "text-neutral-400" : "text-[#6B7280]"}`}>Active Enrolled</p>
              <p className={`text-xl sm:text-2xl font-black font-mono mt-0.5 ${isDark ? "text-white" : "text-[#111418]"}`}>
                {enrolledCount}
              </p>
              <p className="text-[11px] text-[#38BDF8] font-semibold">Courses In Progress</p>
            </div>
          </div>

          <div className={`p-5 rounded-2xl border flex items-center gap-4 transition-colors ${isDark ? "bg-[#16191E] border-white/[0.06]" : "bg-white border-black/[0.08]"}`}>
            <div className="w-12 h-12 rounded-xl bg-[#34D399]/15 flex items-center justify-center text-[#34D399] border border-[#34D399]/30 shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className={`text-xs font-semibold ${isDark ? "text-neutral-400" : "text-[#6B7280]"}`}>Lessons Completed</p>
              <p className={`text-xl sm:text-2xl font-black font-mono mt-0.5 ${isDark ? "text-white" : "text-[#111418]"}`}>
                {totalCompletedLessons}
              </p>
              <p className="text-[11px] text-[#34D399] font-semibold">Mastery Units Finished</p>
            </div>
          </div>

          <div className={`p-5 rounded-2xl border flex items-center gap-4 transition-colors ${isDark ? "bg-[#16191E] border-white/[0.06]" : "bg-white border-black/[0.08]"}`}>
            <div className="w-12 h-12 rounded-xl bg-[#FBBF24]/15 flex items-center justify-center text-[#FBBF24] border border-[#FBBF24]/30 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <p className={`text-xs font-semibold ${isDark ? "text-neutral-400" : "text-[#6B7280]"}`}>Course XP Earned</p>
              <p className={`text-xl sm:text-2xl font-black font-mono mt-0.5 ${isDark ? "text-white" : "text-[#111418]"}`}>
                +{userEarnedCourseXp} XP
              </p>
              <p className="text-[11px] text-[#FBBF24] font-semibold">Verified Skill Points</p>
            </div>
          </div>
        </div>

        {/* AI Custom Course Synthesizer Bar */}
        <form onSubmit={handleSynthesizeCustomCourse} className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-center gap-3 transition-colors ${
          isDark ? "bg-[#16191E] border-white/[0.06]" : "bg-white border-black/[0.08] shadow-sm"
        }`}>
          <div className="flex items-center gap-2 text-xs font-bold text-[#FF857A] shrink-0">
            <Sparkles className="w-4 h-4" />
            <span>AI Fast-Track Synthesizer:</span>
          </div>
          <input
            type="text"
            placeholder="Type any skill (e.g., GraphQL, Rust, Terraform, Pandas, PyTorch)..."
            value={customSkillPrompt}
            onChange={(e) => setCustomSkillPrompt(e.target.value)}
            className={`flex-1 w-full rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-[#FF6B5F] ${
              isDark ? "bg-[#0E1114] border border-white/10 text-white placeholder-neutral-500" : "bg-[#FAF7F2] border border-black/[0.08] text-[#111418] placeholder-neutral-400"
            }`}
          />
          <button
            type="submit"
            disabled={isSynthesizing || !customSkillPrompt.trim()}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#FF6B5F] hover:bg-[#E85548] text-white text-xs font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>{isSynthesizing ? 'Synthesizing...' : 'Generate Curriculum'}</span>
          </button>
        </form>

        {synthesizedSuccess && (
          <div className="p-3 rounded-xl bg-[#34D399]/15 border border-[#34D399]/30 text-xs text-[#34D399] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>New AI-synthesized course added and enrolled at the top of your catalog!</span>
          </div>
        )}

        {/* Search & Filters */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search courses, skills, topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-[#FF6B5F] ${isDark ? "bg-[#16191E] border border-white/[0.08] text-white placeholder-neutral-500" : "bg-white border border-black/[0.1] text-[#111418] placeholder-neutral-400"}`}
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
              <div className={`flex items-center gap-1 p-1 rounded-xl border shrink-0 ${isDark ? "bg-[#16191E] border-white/[0.06]" : "bg-white border-black/[0.08]"}`}>
                {['All', 'Enrolled', 'Available'].map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setEnrollmentFilter(mode)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      enrollmentFilter === mode
                        ? 'bg-[#FF6B5F] text-white shadow-sm'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>

              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className={`rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#FF6B5F] cursor-pointer ${isDark ? "bg-[#16191E] border border-white/[0.08] text-neutral-300" : "bg-white border border-black/[0.1] text-[#111418]"}`}
              >
                <option value="All">All Difficulties</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
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
                    : isDark ? 'bg-[#16191E] border-white/[0.06] text-neutral-400 hover:border-white/20 hover:text-white' : 'bg-white border-black/[0.08] text-[#4B5563] hover:border-black/20 hover:text-[#111418]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCourses.map((course) => {
            const isRoleMatch = (course.targetRole && (user?.targetRole || user?.careerGoal || '').toLowerCase().includes(course.targetRole.toLowerCase())) ||
              (course.category && (user?.targetRole || user?.careerGoal || '').toLowerCase().includes(course.category.toLowerCase()));

            return (
              <div
                key={course.id}
                className={`rounded-2xl border transition-all duration-200 flex flex-col justify-between overflow-hidden group shadow-md ${isDark ? "bg-[#16191E] border-white/[0.06] hover:border-white/20" : "bg-white border-black/[0.08] hover:border-[#FF6B5F]/40"}`}
              >
                <div className="p-5 space-y-4">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider font-mono ${isDark ? "bg-white/[0.06] text-neutral-300" : "bg-black/[0.05] text-[#374151]"}`}>
                      {course.category}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {isRoleMatch && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FF6B5F]/15 text-[#FF857A] border border-[#FF6B5F]/30">
                          Role Match
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/[0.04] text-neutral-400">
                        {course.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* Course Title & Tagline */}
                  <div>
                    <h3
                      onClick={() => setSelectedCourse(course)}
                      className={`text-base font-bold group-hover:text-[#FF857A] transition-colors cursor-pointer leading-snug line-clamp-2 ${isDark ? "text-white" : "text-[#111418]"}`}
                    >
                      {course.title}
                    </h3>
                    <p className={`text-xs mt-1 line-clamp-2 leading-relaxed ${isDark ? "text-neutral-400" : "text-[#4B5563]"}`}>
                      {course.tagline}
                    </p>
                  </div>

                  {/* Skills Covered Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {course.skillsCovered.slice(0, 3).map((skill, idx) => (
                      <span
                        key={idx}
                        className={`px-2 py-0.5 rounded-md text-[11px] font-mono ${isDark ? "bg-[#0E1114] border border-white/[0.04] text-neutral-300" : "bg-[#FAF7F2] border border-black/[0.06] text-[#374151]"}`}
                      >
                        {skill}
                      </span>
                    ))}
                    {course.skillsCovered.length > 3 && (
                      <span className="px-1.5 py-0.5 text-[11px] text-neutral-500 font-mono">
                        +{course.skillsCovered.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Progress bar if enrolled */}
                  {course.enrolled && (
                    <div className="space-y-1.5 pt-1">
                      <div className="flex justify-between text-[11px] font-semibold">
                        <span className={isDark ? "text-neutral-400" : "text-[#6B7280]"}>Track Progress</span>
                        <span className={`font-mono ${isDark ? "text-white" : "text-[#111418]"}`}>{course.progress || 0}%</span>
                      </div>
                      <div className={`h-1.5 w-full rounded-full overflow-hidden ${isDark ? "bg-white/[0.06]" : "bg-black/[0.06]"}`}>
                          <div
                            className="h-full bg-[#34D399] rounded-full transition-all duration-300"
                          style={{ width: `${course.progress || 0}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Footer */}
                <div className={`p-4 border-t flex items-center justify-between gap-2 ${isDark ? "border-white/[0.06] bg-[#0E1114]/50" : "border-black/[0.06] bg-white"}`}>
                    <div className={`flex items-center gap-3 text-xs font-mono ${isDark ? "text-neutral-400" : "text-[#6B7280]"}`}>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1 text-[#FBBF24]">
                      <Award className="w-3.5 h-3.5" />
                      +{course.xpReward || 300} XP
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedCourse(course)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${isDark ? "border-white/10 text-neutral-300 hover:text-white hover:bg-white/[0.04]" : "border-black/10 text-[#374151] hover:text-[#111418] hover:bg-black/[0.04]"}`}
                    >
                      View
                    </button>
                    <button
                      type="button"
                      onClick={() => handleEnrollToggle(course.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        course.enrolled
                          ? 'bg-[#34D399]/15 text-[#34D399] border border-[#34D399]/30'
                          : 'bg-[#FF6B5F] hover:bg-[#E85548] text-white shadow-md shadow-[#FF6B5F]/20'
                      }`}
                    >
                      {course.enrolled ? 'Enrolled' : 'Enroll'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredCourses.length === 0 && (
          <div className={`p-12 text-center rounded-3xl border space-y-3 ${isDark ? "bg-[#16191E] border-white/[0.06]" : "bg-white border-black/[0.08]"}`}>
              <BookOpen className="w-10 h-10 text-neutral-500 mx-auto" />
            <h3 className={`text-base font-bold ${isDark ? "text-white" : "text-[#111418]"}`}>No courses match your active filter</h3>
            <p className={`text-xs max-w-sm mx-auto ${isDark ? "text-neutral-400" : "text-[#6B7280]"}`}>
              Try adjusting your search query, difficulty, or category filter to explore other engineering tracks.
            </p>
          </div>
        )}

        {/* Modal for Details */}
        {selectedCourse && (
          <CourseDetailsModal
            course={selectedCourse}
            isOpen={!!selectedCourse}
            onClose={() => setSelectedCourse(null)}
            onEnrollToggle={() => handleEnrollToggle(selectedCourse.id)}
            onToggleLesson={(lessonId) => handleToggleLesson(selectedCourse.id, lessonId)}
            onLaunchAssessment={(assessmentId) => {
              const matched = assessments.find((a) => a.id === assessmentId) || assessments[0];
              setActiveAssessment(matched);
            }}
          />
        )}

        {/* Modal for Assessment */}
        {activeAssessment && (
          <AssessmentRunnerModal
            assessment={activeAssessment}
            isOpen={!!activeAssessment}
            onClose={() => setActiveAssessment(null)}
            onComplete={(payload) => {
              if (payload.passed && payload.xpEarned) {
                awardXp(payload.xpEarned);
              }
              setActiveAssessment(null);
            }}
          />
        )}
      </div>
    </MainLayout>
  );
}
