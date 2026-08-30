import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import CourseDetailsModal from '../components/courses/CourseDetailsModal';
import AssessmentRunnerModal from '../components/assessments/AssessmentRunnerModal';
import { INITIAL_COURSES, INITIAL_ASSESSMENTS } from '../data/coursesAndAssessmentsData';
import { useAuth } from '../context/AuthContext';
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
  const storageKeyCourses = user?._id ? `m3_courses_data_${user._id}` : 'm3_courses_data';
  const storageKeyAssessments = user?._id ? `m3_assessments_data_${user._id}` : 'm3_assessments_data';

  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem(storageKeyCourses) || localStorage.getItem('m3_courses_data');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return INITIAL_COURSES; }
    }
    return INITIAL_COURSES;
  });

  const [assessments, setAssessments] = useState(() => {
    const saved = localStorage.getItem(storageKeyAssessments) || localStorage.getItem('m3_assessments_data');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return INITIAL_ASSESSMENTS; }
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

  // Persist course updates
  useEffect(() => {
    localStorage.setItem(storageKeyCourses, JSON.stringify(courses));
  }, [courses, storageKeyCourses]);

  useEffect(() => {
    localStorage.setItem(storageKeyAssessments, JSON.stringify(assessments));
  }, [assessments, storageKeyAssessments]);

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

  // Toggle individual lesson
  const handleStartLesson = (courseId, lessonId) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id === courseId) {
          const updatedModules = c.modules.map((m) => ({
            ...m,
            lessons: m.lessons.map((l) =>
              l.id === lessonId ? { ...l, completed: !l.completed } : l
            ),
          }));

          const total = updatedModules.reduce((acc, m) => acc + m.lessons.length, 0);
          const completed = updatedModules.reduce(
            (acc, m) => acc + m.lessons.filter((l) => l.completed).length,
            0
          );
          const newProgress = Math.round((completed / total) * 100);

          if (completed > (c.completedLessons || 0)) {
            awardXp(25);
          }

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
        const updatedModules = prev.modules.map((m) => ({
          ...m,
          lessons: m.lessons.map((l) =>
            l.id === lessonId ? { ...l, completed: !l.completed } : l
          ),
        }));

        const total = updatedModules.reduce((acc, m) => acc + m.lessons.length, 0);
        const completed = updatedModules.reduce(
          (acc, m) => acc + m.lessons.filter((l) => l.completed).length,
          0
        );
        const newProgress = Math.round((completed / total) * 100);

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

  const handleLaunchAssessment = (assessmentId) => {
    const target = assessments.find((a) => a.id === assessmentId);
    if (target) {
      setActiveAssessment(target);
      if (selectedCourse) setSelectedCourse(null);
    }
  };

  const handleAssessmentComplete = (result) => {
    setAssessments((prev) =>
      prev.map((a) => {
        if (a.id === result.assessmentId) {
          return {
            ...a,
            lastScore: result.score,
            status: result.passed ? 'Passed' : 'Ready to Take',
            attemptsCount: (a.attemptsCount || 0) + 1,
            lastAttemptDate: 'Just now',
          };
        }
        return a;
      })
    );

    if (result.earnedXp > 0) {
      awardXp(result.earnedXp);
    }
  };

  const handleSynthesizeCurriculum = (e) => {
    e.preventDefault();
    if (!customSkillPrompt.trim()) return;

    setIsSynthesizing(true);
    setTimeout(() => {
      const generatedId = `course-ai-${Date.now()}`;
      const newCourse = {
        id: generatedId,
        title: `AI Deep Dive: ${customSkillPrompt.trim()}`,
        tagline: `Accelerated modular track dynamically generated for ${customSkillPrompt.trim()} mastery.`,
        category: 'Advanced Web',
        difficulty: 'Intermediate',
        platform: 'LearnPath AI Engine',
        instructor: 'LearnPath Neural Tutor',
        duration: '4.5 Hours',
        rating: 5.0,
        reviewsCount: 1,
        enrolled: true,
        progress: 0,
        completedLessons: 0,
        totalLessons: 4,
        xpReward: 350,
        skillsCovered: [customSkillPrompt.trim(), 'Architectural Patterns', 'Production Best Practices'],
        targetRole: user?.careerGoal || 'Full Stack Developer',
        thumbnailGradient: 'from-brand-600/30 via-coral-600/20 to-slate-900/40',
        resources: {
          officialDocs: {
            title: `${customSkillPrompt.trim()} Official Standards`,
            url: 'https://developer.mozilla.org',
          },
          youtubeVideo: {
            title: `${customSkillPrompt.trim()} Architecture Guide`,
            url: 'https://youtube.com',
          },
          youtubeChannel: {
            title: 'Modern Software Engineering',
            url: 'https://youtube.com',
          },
          learningPlatform: {
            title: 'Interactive Code Playground',
            url: 'https://github.com',
          },
        },
        modules: [
          {
            title: 'Module 1: Foundations & Architecture',
            duration: '2.0 hrs',
            lessons: [
              { id: `l_${Date.now()}_1`, title: 'Core Principles & Paradigm Overview', duration: '60 mins', completed: false },
              { id: `l_${Date.now()}_2`, title: 'Memory Model, Lifecycles & Flow', duration: '60 mins', completed: false },
            ],
          },
          {
            title: 'Module 2: Real-World Implementation',
            duration: '2.5 hrs',
            lessons: [
              { id: `l_${Date.now()}_3`, title: 'Production Scalability & Edge Cases', duration: '75 mins', completed: false },
              { id: `l_${Date.now()}_4`, title: 'Hands-On Benchmark Capstone Challenge', duration: '75 mins', completed: false },
            ],
          },
        ],
      };

      setCourses((prev) => [newCourse, ...prev]);
      setCustomSkillPrompt('');
      setIsSynthesizing(false);
      setSynthesizedSuccess(true);
      setTimeout(() => setSynthesizedSuccess(false), 4000);
    }, 900);
  };

  const activeRole = user?.targetRole || user?.careerGoal || 'Full Stack Developer';

  // Sort & prioritize courses for the user's active role
  const sortedCourses = useMemo(() => {
    const roleLower = activeRole.toLowerCase();
    return [...courses].sort((a, b) => {
      const aMatch = (a.targetRole && a.targetRole.toLowerCase().includes(roleLower)) ||
        (a.category && roleLower.includes(a.category.toLowerCase())) ||
        (a.skillsCovered && a.skillsCovered.some(sk => roleLower.includes(sk.toLowerCase())));
      const bMatch = (b.targetRole && b.targetRole.toLowerCase().includes(roleLower)) ||
        (b.category && roleLower.includes(b.category.toLowerCase())) ||
        (b.skillsCovered && b.skillsCovered.some(sk => roleLower.includes(sk.toLowerCase())));
      if (aMatch && !bMatch) return -1;
      if (!aMatch && bMatch) return 1;
      return 0;
    });
  }, [courses, activeRole]);

  // Filtered courses
  const filteredCourses = sortedCourses.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.skillsCovered?.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'All' || c.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesDifficulty =
      selectedDifficulty === 'All' || c.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();

    const matchesEnrollment =
      enrollmentFilter === 'All'
        ? true
        : enrollmentFilter === 'Enrolled'
        ? c.enrolled
        : !c.enrolled;

    return matchesSearch && matchesCategory && matchesDifficulty && matchesEnrollment;
  });

  const enrolledCourses = courses.filter((c) => c.enrolled);
  const enrolledCount = enrolledCourses.length;
  const totalCompletedLessons = courses.reduce((acc, c) => acc + (c.completedLessons || 0), 0);
  const totalXpAvailable = courses.reduce((acc, c) => acc + (c.xpReward || 300), 0);

  return (
    <MainLayout>
      <div className="space-y-8 animate-in fade-in duration-200 max-w-7xl mx-auto pb-10">

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs sm:text-sm font-semibold text-[#FF857A]">
                Curated Skill Tracks 📚
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#F5F1E8] tracking-tight">
              Courses & Educational Resources
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-[#8C877D] max-w-3xl leading-relaxed">
              Smart, prioritized curriculum modules and curated educational resources matched to your active engineering goals ({activeRole}).
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsModuleScopeOpen(true)}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-[#16191E] text-[#F5F1E8] border border-white/[0.08] hover:bg-white/5 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Layers className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Module Scope</span>
            </button>
          </div>
        </div>

        {/* Dynamic Metric Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          <div className="p-4 sm:p-5 rounded-2xl bg-[#111418] border border-white/[0.08] flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#FF6B5F]/15 border border-[#FF6B5F]/30 flex items-center justify-center text-[#FF857A] shrink-0 shadow-sm">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#8C877D]">Total Courses</p>
              <p className="text-xl sm:text-2xl font-black text-[#F5F1E8] font-mono mt-0.5">
                {courses.length}
              </p>
              <p className="text-[11px] text-[#FF857A] font-semibold">Catalog Tracks</p>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#111418] border border-white/[0.08] flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#38BDF8]/15 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8] shrink-0 shadow-sm">
              <BookmarkCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#8C877D]">Active Enrolled</p>
              <p className="text-xl sm:text-2xl font-black text-[#F5F1E8] font-mono mt-0.5">
                {enrolledCount}
              </p>
              <p className="text-[11px] text-[#38BDF8] font-semibold">In Progress</p>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#111418] border border-white/[0.08] flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#34D399]/15 border border-[#34D399]/30 flex items-center justify-center text-[#34D399] shrink-0 shadow-sm">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#8C877D]">Completed Lessons</p>
              <p className="text-xl sm:text-2xl font-black text-[#F5F1E8] font-mono mt-0.5">
                {totalCompletedLessons}
              </p>
              <p className="text-[11px] text-[#34D399] font-semibold">Logged Units</p>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#111418] border border-white/[0.08] flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#FBBF24]/15 border border-[#FBBF24]/30 flex items-center justify-center text-[#FBBF24] shrink-0 shadow-sm">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#8C877D]">Total XP Available</p>
              <p className="text-xl sm:text-2xl font-black text-[#F5F1E8] font-mono mt-0.5">
                +{totalXpAvailable} XP
              </p>
              <p className="text-[11px] text-[#FBBF24] font-semibold">Track Rewards</p>
            </div>
          </div>
        </div>

        {/* AI Custom Curriculum Generator Input Banner */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#1A1E24] via-[#16191E] to-[#111418] border border-[#FF6B5F]/20 relative overflow-hidden shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-1.5 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FF6B5F]/20 text-[#FF857A] border border-[#FF6B5F]/30 uppercase tracking-wider font-mono flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> AI Curriculum Engine
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#F5F1E8]">
                Need a tailored module for your target role ({activeRole})?
              </h3>
              <p className="text-xs text-[#8C877D] leading-relaxed">
                Enter any framework or technology to generate a structured curriculum with lessons and checkpoints.
              </p>
            </div>

            <form onSubmit={handleSynthesizeCurriculum} className="flex-1 max-w-md">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customSkillPrompt}
                  onChange={(e) => setCustomSkillPrompt(e.target.value)}
                  placeholder="e.g., PyTorch, GraphQL, Kubernetes..."
                  className="flex-1 bg-[#0E1114] border border-white/[0.1] text-xs sm:text-sm text-[#F5F1E8] rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#FF6B5F] placeholder:text-[#8C877D] font-medium"
                />
                <button
                  type="submit"
                  disabled={isSynthesizing || !customSkillPrompt.trim()}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FF6B5F] to-[#E85548] hover:from-[#FF857A] hover:to-[#FF6B5F] text-white text-xs font-bold transition-all disabled:opacity-50 shrink-0 cursor-pointer shadow-md shadow-[#FF6B5F]/25 flex items-center gap-1.5"
                >
                  {isSynthesizing ? (
                    <span>Generating...</span>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Synthesize</span>
                    </>
                  )}
                </button>
              </div>
              {synthesizedSuccess && (
                <p className="text-xs text-[#34D399] font-medium mt-1.5 flex items-center gap-1 animate-in fade-in">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Module synthesized and added to top of catalog!
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-4 rounded-2xl bg-[#111418] border border-white/[0.08] space-y-4">
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-[#8C877D] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tracks, topics, concepts..."
                className="w-full bg-[#16191E] border border-white/[0.08] text-xs sm:text-sm text-[#F5F1E8] rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:border-[#FF6B5F] placeholder:text-[#8C877D]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C877D] hover:text-[#F5F1E8]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
              <div className="flex items-center gap-1 bg-[#16191E] p-1 rounded-xl border border-white/[0.06] shrink-0">
                {['All', 'Enrolled', 'Available'].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setEnrollmentFilter(mode)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      enrollmentFilter === mode
                        ? 'bg-[#FF6B5F] text-white shadow-sm'
                        : 'text-[#8C877D] hover:text-[#F5F1E8]'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>

              {/* Difficulty Dropdown */}
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="bg-[#16191E] border border-white/[0.08] text-xs font-semibold text-[#F5F1E8] rounded-xl px-3 py-2 focus:outline-none focus:border-[#FF6B5F] shrink-0 cursor-pointer"
              >
                <option value="All">All Tiers</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          {/* Categories Pill List */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-1">
            <span className="text-[11px] font-bold text-[#8C877D] mr-2 uppercase tracking-wider shrink-0">
              Domains:
            </span>
            {['All', 'Frontend', 'Backend', 'Database', 'Cloud & DevOps', 'AI & Data Science', 'Security', 'Advanced Web'].map(
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

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-[#8C877D] px-1">
          <span>
            Showing <strong className="text-[#F5F1E8]">{filteredCourses.length}</strong> of{' '}
            {courses.length} courses
          </span>
          {enrollmentFilter !== 'All' && (
            <span className="font-medium text-[#38BDF8]">Filter active: {enrollmentFilter}</span>
          )}
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              onClick={() => setSelectedCourse(course)}
              className="rounded-2xl bg-[#111418] border border-white/[0.08] hover:border-[#FF6B5F]/40 transition-all flex flex-col justify-between overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl hover:shadow-[#FF6B5F]/5"
            >
              {/* Header Gradient Banner */}
              <div
                className={`h-24 bg-gradient-to-br ${course.thumbnailGradient || 'from-brand-600/30 via-coral-600/20 to-slate-900/40'} p-4 flex items-start justify-between relative`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/40 text-white backdrop-blur-sm border border-white/10 font-mono">
                    {course.category}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase font-mono ${
                      course.difficulty === 'Beginner'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : course.difficulty === 'Intermediate'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    }`}
                  >
                    {course.difficulty}
                  </span>
                </div>

                <div className="flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded-full text-[11px] font-bold text-amber-300 border border-white/10 font-mono backdrop-blur-sm">
                  <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                  <span>{course.rating}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-[#F5F1E8] group-hover:text-[#FF857A] transition-colors leading-snug line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-xs text-[#8C877D] line-clamp-2 leading-relaxed">
                    {course.tagline}
                  </p>
                </div>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5">
                  {course.skillsCovered?.slice(0, 3).map((sk, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-white/[0.04] text-[#C7C2B6] border border-white/[0.06]"
                    >
                      {sk}
                    </span>
                  ))}
                  {course.skillsCovered?.length > 3 && (
                    <span className="text-[10px] text-[#8C877D] self-center">
                      +{course.skillsCovered.length - 3} more
                    </span>
                  )}
                </div>

                {/* Progress bar if enrolled */}
                {course.enrolled && (
                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between text-[11px] font-semibold">
                      <span className="text-[#8C877D]">Track Progress</span>
                      <span className="text-[#34D399] font-mono">{course.progress || 0}%</span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-[#34D399] h-full rounded-full transition-all duration-300"
                        style={{ width: `${course.progress || 0}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div className="px-5 py-3.5 bg-[#0E1114] border-t border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-[#8C877D] font-medium">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1 text-[#FBBF24]">
                    <Award className="w-3.5 h-3.5" />
                    +{course.xpReward} XP
                  </span>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEnrollToggle(course.id);
                  }}
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
          ))}
        </div>

        {/* Course Details Modal */}
        {selectedCourse && (
          <CourseDetailsModal
            course={selectedCourse}
            onClose={() => setSelectedCourse(null)}
            onEnrollToggle={handleEnrollToggle}
            onStartLesson={handleStartLesson}
            onLaunchAssessment={handleLaunchAssessment}
          />
        )}

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
