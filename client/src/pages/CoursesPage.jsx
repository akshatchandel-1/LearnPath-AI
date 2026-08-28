import React, { useState, useEffect } from 'react';
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
  const { awardXp } = useAuth();

  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('m3_courses_data');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return INITIAL_COURSES; }
    }
    return INITIAL_COURSES;
  });

  const [assessments, setAssessments] = useState(() => {
    const saved = localStorage.getItem('m3_assessments_data');
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
    localStorage.setItem('m3_courses_data', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('m3_assessments_data', JSON.stringify(assessments));
  }, [assessments]);

  // Toggle enrollment
  const handleEnrollToggle = (courseId) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id === courseId) {
          const newEnrolled = !c.enrolled;
          return {
            ...c,
            enrolled: newEnrolled,
            progress: newEnrolled ? (c.progress || 10) : 0,
            completedLessons: newEnrolled ? (c.completedLessons || 1) : 0,
          };
        }
        return c;
      })
    );

    if (selectedCourse && selectedCourse.id === courseId) {
      setSelectedCourse((prev) => ({
        ...prev,
        enrolled: !prev.enrolled,
        progress: !prev.enrolled ? (prev.progress || 10) : 0,
        completedLessons: !prev.enrolled ? (prev.completedLessons || 1) : 0,
      }));
    }
  };

  // Toggle individual lesson
  const handleStartLesson = (courseId, lessonId) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id === courseId) {
          const updatedModules = c.modules?.map((m) => ({
            ...m,
            lessons: m.lessons?.map((l) =>
              l.id === lessonId ? { ...l, completed: !l.completed } : l
            ),
          }));

          const total = updatedModules?.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) || 1;
          const completed = updatedModules?.reduce((acc, m) => acc + (m.lessons?.filter((l) => l.completed)?.length || 0), 0) || 0;
          const newProgress = Math.round((completed / total) * 100);

          return {
            ...c,
            enrolled: true,
            modules: updatedModules,
            completedLessons: completed,
            progress: newProgress,
          };
        }
        return c;
      })
    );

    if (selectedCourse && selectedCourse.id === courseId) {
      setSelectedCourse((prev) => {
        const updatedModules = prev.modules?.map((m) => ({
          ...m,
          lessons: m.lessons?.map((l) =>
            l.id === lessonId ? { ...l, completed: !l.completed } : l
          ),
        }));
        const total = updatedModules?.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) || 1;
        const completed = updatedModules?.reduce((acc, m) => acc + (m.lessons?.filter((l) => l.completed)?.length || 0), 0) || 0;
        return {
          ...prev,
          enrolled: true,
          modules: updatedModules,
          completedLessons: completed,
          progress: Math.round((completed / total) * 100),
        };
      });
    }
  };

  // Synthesize Custom Curriculum
  const handleSynthesizeCurriculum = (e) => {
    e.preventDefault();
    const skill = customSkillPrompt.trim();
    if (!skill) return;

    setIsSynthesizing(true);

    setTimeout(() => {
      const generatedCourse = {
        id: `synth-${Date.now()}`,
        title: `${skill} Mastery & Production Engineering`,
        tagline: `Comprehensive curriculum covering core principles, production architecture, and hands-on integration for ${skill}.`,
        category: 'Languages',
        difficulty: 'Intermediate',
        platform: 'LearnPath AI Synthesizer',
        instructor: 'AI Autonomous Curriculum Engine',
        duration: '5.0 Hours',
        rating: 5.0,
        reviewsCount: 1,
        enrolled: true,
        progress: 15,
        completedLessons: 1,
        totalLessons: 6,
        xpReward: 350,
        skillsCovered: [skill, `${skill} Architecture`, 'Best Practices', 'Debugging'],
        targetRole: 'Full Stack Developer',
        thumbnailGradient: 'from-pink-500/20 via-rose-600/10 to-slate-900/30',
        resources: {
          officialDocs: {
            title: `${skill} Official Docs`,
            url: `https://www.google.com/search?q=${encodeURIComponent(skill + ' official documentation')}`
          },
          youtubeVideo: {
            title: `${skill} Crash Course for Developers`,
            url: `https://www.youtube.com/results?search_query=${encodeURIComponent(skill + ' tutorial full course')}`
          },
          youtubeChannel: {
            title: 'freeCodeCamp.org',
            url: 'https://www.youtube.com/@freecodecamp'
          },
          learningPlatform: {
            title: `${skill} Interactive Learning Hub`,
            url: 'https://github.com'
          }
        },
        modules: [
          {
            title: `Module 1: ${skill} Fundamentals & Core Syntax`,
            duration: '2.5 hrs',
            lessons: [
              { id: `sl_${Date.now()}_1`, title: `Introduction to ${skill} & Setup`, duration: '40 mins', completed: true },
              { id: `sl_${Date.now()}_2`, title: `Data Flow & Architectural Patterns in ${skill}`, duration: '50 mins', completed: false },
              { id: `sl_${Date.now()}_3`, title: `Error Handling & Resilience Strategies`, duration: '45 mins', completed: false },
            ]
          },
          {
            title: `Module 2: Advanced ${skill} & Integration`,
            duration: '2.5 hrs',
            lessons: [
              { id: `sl_${Date.now()}_4`, title: `Performance Profiling & Optimization`, duration: '50 mins', completed: false },
              { id: `sl_${Date.now()}_5`, title: `Production Deployment & Security Checklist`, duration: '50 mins', completed: false },
              { id: `sl_${Date.now()}_6`, title: `Hands-On Milestone Project`, duration: '50 mins', completed: false },
            ]
          }
        ]
      };

      setCourses((prev) => [generatedCourse, ...prev]);
      setCustomSkillPrompt('');
      setIsSynthesizing(false);
      setSynthesizedSuccess(true);
      setSelectedCourse(generatedCourse);
      setTimeout(() => setSynthesizedSuccess(false), 4000);
    }, 600);
  };

  // Launch Assessment Handler
  const handleLaunchAssessment = (assessmentId) => {
    const target = assessments.find((a) => a.id === assessmentId);
    if (target) {
      setActiveAssessment(target);
    } else {
      navigate('/assessments');
    }
  };

  // Assessment Quiz Submit
  const handleAssessmentComplete = (result) => {
    setAssessments((prev) =>
      prev.map((a) => {
        if (a.id === result.assessmentId) {
          return {
            ...a,
            lastScore: result.score,
            status: result.passed ? 'Passed' : 'Ready to Take',
            attemptsCount: (a.attemptsCount || 0) + 1,
          };
        }
        return a;
      })
    );

    if (result.passed && awardXp) {
      awardXp(result.xpAwarded || 200);
    }
  };

  // Filter Categories & Difficulties
  const categories = ['All', 'Frontend', 'Backend', 'Languages', 'Database', 'Cloud & DevOps', 'Architecture', 'AI/ML'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredCourses = courses.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.tagline?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.skillsCovered?.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || c.difficulty === selectedDifficulty;
    const matchesEnrollment =
      enrollmentFilter === 'All'
        ? true
        : enrollmentFilter === 'Enrolled'
        ? c.enrolled
        : !c.enrolled;

    return matchesSearch && matchesCategory && matchesDifficulty && matchesEnrollment;
  });

  // Calculate dynamic metrics (no hardcoding)
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
                Curated Skill Tracks 👋
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#F5F1E8] tracking-tight">
              Courses & Educational Resources
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-[#8C877D] max-w-3xl leading-relaxed">
              Smart, prioritized curriculum modules and curated educational resources matched to your active engineering goals.
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
                +{totalXpAvailable}
              </p>
              <p className="text-[11px] text-[#FBBF24] font-semibold">Reward Pool</p>
            </div>
          </div>
        </div>

        {/* AI Custom Curriculum Synthesizer Banner */}
        <div className="p-6 rounded-[24px] bg-[#111418] border border-white/[0.08] shadow-lg relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-lg bg-[#FF6B5F]/20 text-[#FF857A] flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-bold text-[#FF857A] uppercase tracking-wider">
                Autonomous Course Synthesizer
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-[#F5F1E8] mb-1.5">
              Synthesize Custom Curriculum on Any Tech Skill
            </h3>
            <p className="text-xs text-[#8C877D] mb-4 leading-relaxed">
              Enter any framework, tool, or engineering concept (e.g. <em>GraphQL, Redis, WebSockets, Next.js, Kafka, Rust, Kubernetes</em>) to generate a structured mini-course.
            </p>

            <form onSubmit={handleSynthesizeCurriculum} className="flex flex-col sm:flex-row items-center gap-2.5">
              <div className="relative flex-1 w-full">
                <Zap className="w-4 h-4 text-[#8C877D] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={customSkillPrompt}
                  onChange={(e) => setCustomSkillPrompt(e.target.value)}
                  placeholder="e.g. Redis Caching, WebSockets, Kafka, GraphQL, Rust..."
                  className="w-full bg-[#16191E] border border-white/[0.08] text-xs sm:text-sm text-[#F5F1E8] rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#FF6B5F] focus:ring-1 focus:ring-[#FF6B5F]/40 placeholder:text-[#8C877D]"
                />
              </div>

              <button
                type="submit"
                disabled={isSynthesizing || !customSkillPrompt.trim()}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF6B5F] to-[#E85548] hover:from-[#FF857A] hover:to-[#FF6B5F] text-white text-xs font-bold shadow-md shadow-[#FF6B5F]/20 transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
              >
                {isSynthesizing ? (
                  <span>Synthesizing...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Track</span>
                  </>
                )}
              </button>
            </form>

            {synthesizedSuccess && (
              <p className="text-xs text-[#34D399] font-bold mt-2 animate-in fade-in flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Custom curriculum synthesized and added to your tracks!
              </p>
            )}
          </div>
        </div>

        {/* Filter Controls */}
        <div className="space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#8C877D] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses, skills, concepts..."
                className="w-full bg-[#111418] border border-white/[0.08] text-xs text-[#F5F1E8] rounded-xl pl-9 pr-4 py-2 focus:outline-none focus:border-[#FF6B5F] placeholder:text-[#8C877D]"
              />
            </div>

            {/* Difficulty Tabs */}
            <div className="flex bg-[#111418] p-1 rounded-xl border border-white/[0.08] overflow-x-auto">
              {difficulties.map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    selectedDifficulty === diff
                      ? 'bg-[#FF6B5F] text-white shadow-md shadow-[#FF6B5F]/20'
                      : 'text-[#8C877D] hover:text-[#F5F1E8]'
                  }`}
                >
                  {diff}
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
                    : 'bg-[#111418] text-[#8C877D] border-white/[0.06] hover:text-[#F5F1E8]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              onClick={() => setSelectedCourse(course)}
              className="p-6 rounded-[24px] bg-[#111418] border border-white/[0.08] hover:border-[#FF6B5F]/40 transition-all cursor-pointer group flex flex-col justify-between shadow-sm relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-[#FF6B5F]/15 text-[#FF857A] uppercase font-mono border border-[#FF6B5F]/30">
                    {course.category}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/5 text-[#8C877D] font-mono">
                    {course.difficulty}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#F5F1E8] group-hover:text-[#FF857A] transition-colors leading-snug mb-1.5">
                  {course.title}
                </h3>
                <p className="text-xs text-[#8C877D] line-clamp-2 leading-relaxed mb-4">
                  {course.tagline || course.description}
                </p>

                {/* Progress bar if enrolled */}
                {course.enrolled && (
                  <div className="space-y-1 mb-4">
                    <div className="flex justify-between text-[10px] text-[#8C877D]">
                      <span>Progress</span>
                      <span className="font-mono font-bold text-[#FF857A]">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#FF6B5F] to-[#E85548] h-full rounded-full"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between mt-2">
                <div className="flex items-center gap-3 text-xs text-[#8C877D]">
                  <span className="flex items-center gap-1 font-mono">
                    <Clock className="w-3.5 h-3.5 text-[#FF6B5F]" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1 font-mono text-[#FBBF24]">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    {course.rating || 4.9}
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
                  {course.enrolled ? 'Enrolled ✓' : 'Enroll'}
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

        {/* Module Scope Modal */}
        {isModuleScopeOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in overflow-y-auto">
            <div className="bg-[#111418] rounded-[28px] max-w-xl w-full p-6 sm:p-8 border border-white/[0.1] shadow-2xl text-[#F5F1E8] space-y-5 relative">
              <button
                onClick={() => setIsModuleScopeOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-xl text-[#8C877D] hover:text-[#F5F1E8] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#38BDF8]/15 text-[#38BDF8] flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black">Course Catalog & Curriculum Scope</h3>
                  <p className="text-xs text-[#8C877D]">Full structural taxonomy overview</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-[#0E1114] border border-white/[0.06]">
                  <span className="text-[#8C877D] block">Total Tracks</span>
                  <span className="text-lg font-black font-mono text-[#F5F1E8] mt-0.5 block">{courses.length} Courses</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#0E1114] border border-white/[0.06]">
                  <span className="text-[#8C877D] block">Estimated Total Study</span>
                  <span className="text-lg font-black font-mono text-[#FF857A] mt-0.5 block">58+ Hours</span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <h4 className="font-bold text-[#C7C2B6] uppercase tracking-wider">Difficulty Taxonomy Distribution</h4>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[#8C877D]">
                    <span>Beginner Tier (Foundations)</span>
                    <span className="font-mono text-[#F5F1E8] font-bold">{courses.filter(c => c.difficulty === 'Beginner').length} courses</span>
                  </div>
                  <div className="flex justify-between text-[#8C877D]">
                    <span>Intermediate Tier (Core Architecture)</span>
                    <span className="font-mono text-[#F5F1E8] font-bold">{courses.filter(c => c.difficulty === 'Intermediate').length} courses</span>
                  </div>
                  <div className="flex justify-between text-[#8C877D]">
                    <span>Advanced Tier (High Scale & Systems)</span>
                    <span className="font-mono text-[#F5F1E8] font-bold">{courses.filter(c => c.difficulty === 'Advanced').length} courses</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsModuleScopeOpen(false)}
                className="w-full py-2.5 rounded-xl bg-[#FF6B5F] text-white text-xs font-bold hover:bg-[#E85548] cursor-pointer"
              >
                Close Scope Overview
              </button>
            </div>
          </div>
        )}

      </div>
    </MainLayout>
  );
}
