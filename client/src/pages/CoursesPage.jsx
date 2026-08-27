import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import EmptyState from '../components/common/EmptyState';
import CoursesList from '../components/courses/CoursesList';
import CourseDetailsModal from '../components/courses/CourseDetailsModal';
import AssessmentRunnerModal from '../components/assessments/AssessmentRunnerModal';
import Button from '../components/common/Button';
import { INITIAL_COURSES, INITIAL_ASSESSMENTS } from '../data/coursesAndAssessmentsData';
import '../styles/m3-theme.css';
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
  GraduationCap
} from 'lucide-react';

export default function CoursesPage() {
  const navigate = useNavigate();
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
  const [viewMode, setViewMode] = useState('preview'); // 'preview' | 'spec'

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [enrollmentFilter, setEnrollmentFilter] = useState('All'); // 'All' | 'Enrolled' | 'Available'
  const [customAiPrompt, setCustomAiPrompt] = useState('');
  const [isGeneratingAiCourse, setIsGeneratingAiCourse] = useState(false);

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
  };

  // Toggle lesson completed in syllabus
  const handleToggleLesson = (courseId, lessonId) => {
    setCourses((prev) =>
      prev.map((course) => {
        if (course.id !== courseId) return course;

        let total = 0;
        let completed = 0;

        const updatedModules = course.modules.map((mod) => {
          const updatedLessons = mod.lessons.map((les) => {
            total++;
            if (les.id === lessonId) {
              const newStatus = !les.completed;
              if (newStatus) completed++;
              return { ...les, completed: newStatus };
            }
            if (les.completed) completed++;
            return les;
          });
          return { ...mod, lessons: updatedLessons };
        });

        const newProgress = total > 0 ? Math.round((completed / total) * 100) : 0;

        const updatedCourse = {
          ...course,
          modules: updatedModules,
          totalLessons: total,
          completedLessons: completed,
          progress: newProgress,
          enrolled: true,
        };

        if (selectedCourse && selectedCourse.id === courseId) {
          setSelectedCourse(updatedCourse);
        }

        return updatedCourse;
      })
    );
  };

  // Handle assessment trigger from course card
  const handleOpenAssessment = (assessmentId) => {
    const found = assessments.find((a) => a.id === assessmentId);
    if (found) {
      setActiveAssessment(found);
    } else {
      navigate('/assessments');
    }
  };

  // AI Course Generator Simulation
  const handleGenerateAiCourse = (e) => {
    e.preventDefault();
    if (!customAiPrompt.trim()) return;

    setIsGeneratingAiCourse(true);
    setTimeout(() => {
      const topic = customAiPrompt.trim();
      const newCourse = {
        id: `course-ai-${Date.now()}`,
        title: `${topic} Masterclass & Enterprise Patterns`,
        tagline: `AI-synthesized learning curriculum covering core fundamentals, real-world architecture, and enterprise standards for ${topic}.`,
        category: 'AI Generated',
        difficulty: 'Intermediate',
        platform: 'LearnPath AI Engine',
        instructor: 'LearnPath AI Synthesizer',
        duration: '5.0 Hours',
        rating: 5.0,
        reviewsCount: 1,
        enrolled: true,
        progress: 0,
        completedLessons: 0,
        totalLessons: 6,
        xpReward: 300,
        skillsCovered: [topic, 'Best Practices', 'Modern Tooling'],
        targetRole: 'Full Stack MERN Developer',
        modules: [
          {
            title: `Module 1: ${topic} Fundamentals & Core Syntax`,
            duration: '2.0 hrs',
            lessons: [
              { id: `l-${Date.now()}-1`, title: `Foundations of ${topic} & Architecture Overview`, duration: '40 mins', completed: false },
              { id: `l-${Date.now()}-2`, title: `Key Conventions, Tooling & Environment Setup`, duration: '45 mins', completed: false },
            ]
          },
          {
            title: `Module 2: Advanced ${topic} Scalability & Patterns`,
            duration: '3.0 hrs',
            lessons: [
              { id: `l-${Date.now()}-3`, title: `Production Deployment & Performance Optimization`, duration: '50 mins', completed: false },
              { id: `l-${Date.now()}-4`, title: `Enterprise Security & Edge Case Handling`, duration: '55 mins', completed: false },
            ]
          }
        ]
      };

      setCourses((prev) => [newCourse, ...prev]);
      setCustomAiPrompt('');
      setIsGeneratingAiCourse(false);
      setSelectedCourse(newCourse);
    }, 800);
  };

  // Filter logic
  const categories = ['All', 'Frontend', 'Backend', 'Languages', 'Cloud & DevOps', 'Architecture'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredCourses = courses.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
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

  // Calculate stats
  const enrolledCount = courses.filter((c) => c.enrolled).length;
  const completedCoursesCount = courses.filter((c) => c.progress === 100).length;
  const totalCompletedLessons = courses.reduce((acc, c) => acc + (c.completedLessons || 0), 0);
  const totalXpAvailable = courses.reduce((acc, c) => acc + (c.xpReward || 300), 0);

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
              Courses & Curated Tracks
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-[#5F6368] max-w-3xl leading-relaxed">
              Smart, prioritized curriculum modules and curated educational resources matched to your active gaps.
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
              Interactive Catalog
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
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#5F6368]">Total Courses</p>
                  <p className="text-xl sm:text-2xl font-black text-[#202124] font-mono mt-0.5">
                    {courses.length}
                  </p>
                  <p className="text-[11px] text-[#E05A47] font-semibold">Curated Tracks</p>
                </div>
              </div>

              <div className="m3-stat-box p-4 sm:p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#EFF5FB] border border-[#CFE0F5] flex items-center justify-center text-[#4A7BC7] shrink-0 shadow-sm">
                  <BookmarkCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#5F6368]">Active Enrolled</p>
                  <p className="text-xl sm:text-2xl font-black text-[#202124] font-mono mt-0.5">
                    {enrolledCount}
                  </p>
                  <p className="text-[11px] text-[#4A7BC7] font-semibold">In Progress</p>
                </div>
              </div>

              <div className="m3-stat-box p-4 sm:p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#EDF7F2] border border-[#C6E7D6] flex items-center justify-center text-[#3F8F68] shrink-0 shadow-sm">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#5F6368]">Completed Lessons</p>
                  <p className="text-xl sm:text-2xl font-black text-[#202124] font-mono mt-0.5">
                    {totalCompletedLessons}
                  </p>
                  <p className="text-[11px] text-[#3F8F68] font-semibold">Topics Mastered</p>
                </div>
              </div>

              <div className="m3-stat-box p-4 sm:p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FAF3E8] border border-[#F0DEC0] flex items-center justify-center text-[#C48A3A] shrink-0 shadow-sm">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#5F6368]">Total Track XP</p>
                  <p className="text-xl sm:text-2xl font-black text-[#202124] font-mono mt-0.5">
                    +{totalXpAvailable}
                  </p>
                  <p className="text-[11px] text-[#C48A3A] font-semibold">Earnable XP</p>
                </div>
              </div>
            </div>

            {/* AI Course Synthesizer Banner */}
            <div className="p-6 sm:p-7 m3-banner-panel flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-1.5 z-10">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-[#D99A8A] border border-white/15 flex items-center gap-1.5 w-fit">
                  <Sparkles className="w-3.5 h-3.5 text-[#E05A47]" />
                  AI Curriculum Synthesizer
                </span>
                <h2 className="text-lg sm:text-2xl font-bold text-white tracking-tight">
                  Synthesize Custom Curriculum on Any Tech Skill
                </h2>
                <p className="text-xs sm:text-sm text-[#D6D8DC] max-w-xl leading-relaxed">
                  Type any skill (e.g. GraphQL Federation, Redis Caching, WebSockets, Vitest) to generate an instant lesson syllabus.
                </p>
              </div>

              <form onSubmit={handleGenerateAiCourse} className="flex items-center gap-2 w-full md:w-auto z-10">
                <input
                  type="text"
                  value={customAiPrompt}
                  onChange={(e) => setCustomAiPrompt(e.target.value)}
                  placeholder="e.g. GraphQL, Redis, Vitest..."
                  className="px-4 py-2.5 rounded-xl text-xs bg-white/10 border border-white/20 text-white placeholder-[#8A8F98] focus:bg-white/15 focus:outline-none focus:border-[#E05A47] w-full sm:w-64"
                />
                <button
                  type="submit"
                  disabled={!customAiPrompt.trim() || isGeneratingAiCourse}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#E05A47] hover:bg-[#C94A38] text-white shadow-lg shadow-[#E05A47]/20 cursor-pointer disabled:opacity-40 shrink-0 flex items-center gap-1.5"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-300" />
                  <span>{isGeneratingAiCourse ? 'Synthesizing...' : 'Generate'}</span>
                </button>
              </form>
            </div>

            {/* Filter & Search Bar */}
            <div className="p-5 m3-filter-panel space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                {/* Search Bar */}
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-[#8A8F98] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search courses, skills, topics..."
                    className="w-full pl-10 pr-4 py-2.5 text-xs m3-input"
                  />
                </div>

                {/* Enrollment Status Tabs */}
                <div className="flex items-center gap-1 bg-[#F1ECE3] p-1 rounded-xl border border-[#E6E0D7] w-full sm:w-auto overflow-x-auto">
                  {['All', 'Enrolled', 'Available'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setEnrollmentFilter(tab)}
                      className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        enrollmentFilter === tab
                          ? 'bg-[#E05A47] text-white font-bold shadow-sm'
                          : 'text-[#5F6368] hover:text-[#202124]'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category & Difficulty Filters */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#E6E0D7]">
                <div className="flex flex-wrap items-center gap-1.5">
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

                <div className="flex items-center gap-2 text-xs">
                  <span className="text-[#5F6368]">Difficulty:</span>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="px-3 py-1.5 rounded-xl bg-[#FFFDF8] border border-[#E6E0D7] text-xs text-[#202124] focus:outline-none focus:border-[#E05A47]"
                  >
                    {difficulties.map((d) => (
                      <option key={d} value={d} className="bg-[#FFFDF8] text-[#202124]">
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Courses Grid */}
            <CoursesList
              courses={filteredCourses}
              onOpenDetails={(course) => setSelectedCourse(course)}
              onEnrollToggle={handleEnrollToggle}
              onOpenAssessment={handleOpenAssessment}
            />

            {/* Course Details / Syllabus Modal */}
            <CourseDetailsModal
              course={selectedCourse}
              isOpen={Boolean(selectedCourse)}
              onClose={() => setSelectedCourse(null)}
              onToggleLesson={handleToggleLesson}
              onEnrollToggle={handleEnrollToggle}
              onOpenAssessment={handleOpenAssessment}
            />

            {/* Assessment Runner Modal */}
            <AssessmentRunnerModal
              assessment={activeAssessment}
              isOpen={Boolean(activeAssessment)}
              onClose={() => setActiveAssessment(null)}
              onAssessmentCompleted={(id, result) => {
                setAssessments((prev) =>
                  prev.map((a) =>
                    a.id === id
                      ? {
                          ...a,
                          lastScore: result.percentage,
                          status: result.passed ? 'Passed' : 'Ready to Take',
                          attemptsCount: (a.attemptsCount || 0) + 1,
                        }
                      : a
                  )
                );
              }}
            />
          </>
        ) : (
          <EmptyState
            title="Courses Module Specification"
            description="Complete interactive curriculum and resource catalog developed for Member 3."
            memberBadge="Ownership: Member 3"
            branchName="frontend"
            icon={BookOpen}
            plannedFeatures={[
              'Curated course card catalog with verified star ratings and durations',
              'Multi-Category filtering (Frontend, Backend, Languages, Cloud & DevOps, Architecture)',
              'Interactive Course Syllabus Modal with lesson check-offs and duration trackers',
              'Direct linkage into recommended skill-gap topics & checkpoint assessments',
              'AI Curriculum Generator for synthesizing custom topic course outlines on demand',
            ]}
            onActionClick={() => setViewMode('preview')}
            actionText="Switch to Interactive Catalog"
          />
        )}
      </div>
    </MainLayout>
  );
}
