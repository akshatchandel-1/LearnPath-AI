import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import {
  X,
  BookOpen,
  Clock,
  Star,
  Award,
  CheckCircle2,
  PlayCircle,
  ExternalLink,
  Youtube,
  FileText,
  Globe,
  Layers,
  ChevronRight,
  Sparkles,
  Check,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CourseDetailsModal({
  course,
  onClose,
  onEnrollToggle,
  onStartLesson,
  onToggleLesson,
  onLaunchAssessment
}) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeLesson, setActiveLesson] = useState(null);

  if (!course) return null;

  const totalLessons = course.totalLessons || course.modules?.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) || 0;
  const completedLessons = course.completedLessons || course.modules?.reduce((acc, m) => acc + (m.lessons?.filter(l => l.completed)?.length || 0), 0) || 0;

  const resources = course.resources || {
    officialDocs: {
      title: `${course.title} Official Docs`,
      url: 'https://developer.mozilla.org/en-US/'
    },
    youtubeVideo: {
      title: `${course.title} Crash Course`,
      url: 'https://www.youtube.com/results?search_query=' + encodeURIComponent(course.title + ' tutorial')
    },
    youtubeChannel: {
      title: 'freeCodeCamp.org',
      url: 'https://www.youtube.com/@freecodecamp'
    },
    learningPlatform: {
      title: 'LearnPath AI Interactive Lab',
      url: 'https://github.com'
    }
  };

  const handleLessonClick = (lesson) => {
    setActiveLesson(lesson);
  };

  const handleLessonToggleComplete = (lessonId) => {
    if (onToggleLesson) {
      onToggleLesson(lessonId);
    } else if (onStartLesson) {
      onStartLesson(course.id, lessonId);
    }
    
    // Toggle active lesson local state
    if (activeLesson && activeLesson.id === lessonId) {
      const nextCompleted = !activeLesson.completed;
      setActiveLesson(prev => ({ ...prev, completed: nextCompleted }));
      if (nextCompleted) {
        try {
          confetti({
            particleCount: 50,
            spread: 50,
            origin: { y: 0.6 }
          });
        } catch (e) {}
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div className={`rounded-[28px] max-w-2xl w-full shadow-2xl overflow-hidden my-8 border relative flex flex-col max-h-[90vh] transition-colors ${
        isDark ? 'bg-[#111418] border-white/[0.1] text-[#F5F1E8]' : 'bg-white border-black/[0.1] text-[#111418]'
      }`}>
        
        {/* Header */}
        <div className={`p-6 border-b flex items-start justify-between gap-4 shrink-0 ${
          isDark ? 'border-white/[0.08] bg-[#0E1114]' : 'border-black/[0.08] bg-[#F9FAFB]'
        }`}>
          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-[#FF6B5F]/15 text-[#FF857A] uppercase font-mono border border-[#FF6B5F]/30">
                {course.category}
              </span>
              <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold font-mono border ${
                isDark ? 'bg-white/5 text-[#C7C2B6] border-white/10' : 'bg-black/5 text-[#4B5563] border-black/10'
              }`}>
                {course.difficulty}
              </span>
              <span className="flex items-center gap-1 text-xs font-bold text-[#FBBF24] font-mono ml-auto sm:ml-0">
                <Star className="w-3.5 h-3.5 fill-current" />
                {course.rating || 4.9}
              </span>
            </div>
            <h2 className={`text-lg sm:text-xl font-black tracking-tight ${
              isDark ? 'text-[#F5F1E8]' : 'text-[#111418]'
            }`}>
              {course.title}
            </h2>
            <p className="text-xs text-[#8C877D] leading-relaxed">
              {course.tagline || course.description}
            </p>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-xl transition-colors cursor-pointer ${
              isDark ? 'text-[#8C877D] hover:text-[#F5F1E8] hover:bg-white/5' : 'text-[#6B7280] hover:text-[#111418] hover:bg-black/5'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Key Metrics Row */}
          <div className="grid grid-cols-3 gap-3">
            <div className={`p-3.5 rounded-2xl border text-center ${
              isDark ? 'bg-[#16191E] border-white/[0.06]' : 'bg-[#FAF7F2] border-black/[0.06]'
            }`}>
              <Clock className="w-4 h-4 text-[#38BDF8] mx-auto mb-1" />
              <span className="text-[10px] text-[#8C877D] font-mono uppercase block">Duration</span>
              <span className={`text-xs font-bold font-mono ${isDark ? 'text-[#F5F1E8]' : 'text-[#111418]'}`}>{course.duration || '6.5 Hours'}</span>
            </div>
            <div className={`p-3.5 rounded-2xl border text-center ${
              isDark ? 'bg-[#16191E] border-white/[0.06]' : 'bg-[#FAF7F2] border-black/[0.06]'
            }`}>
              <BookOpen className="w-4 h-4 text-[#34D399] mx-auto mb-1" />
              <span className="text-[10px] text-[#8C877D] font-mono uppercase block">Lessons</span>
              <span className={`text-xs font-bold font-mono ${isDark ? 'text-[#F5F1E8]' : 'text-[#111418]'}`}>{completedLessons} / {totalLessons}</span>
            </div>
            <div className={`p-3.5 rounded-2xl border text-center ${
              isDark ? 'bg-[#16191E] border-white/[0.06]' : 'bg-[#FAF7F2] border-black/[0.06]'
            }`}>
              <Award className="w-4 h-4 text-[#FF6B5F] mx-auto mb-1" />
              <span className="text-[10px] text-[#8C877D] font-mono uppercase block">XP Reward</span>
              <span className={`text-xs font-bold font-mono ${isDark ? 'text-[#F5F1E8]' : 'text-[#111418]'}`}>+{course.xpReward || 300} XP</span>
            </div>
          </div>

          {/* Curriculum Modules & Lessons */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className={`text-xs font-bold uppercase tracking-wider font-mono ${isDark ? 'text-[#8C877D]' : 'text-[#6B7280]'}`}>
                Curriculum Syllabus & Lessons (Click to launch):
              </h3>
              <span className="text-[11px] text-[#FF857A] font-medium">
                {completedLessons} of {totalLessons} completed
              </span>
            </div>

            {course.modules?.map((mod, mIdx) => (
              <div
                key={mIdx}
                className={`rounded-2xl border overflow-hidden ${
                  isDark ? 'bg-[#16191E] border-white/[0.06]' : 'bg-[#FAF7F2] border-black/[0.06]'
                }`}
              >
                <div className="p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Layers className="w-4 h-4 text-[#FF6B5F]" />
                    <span className={`text-xs font-bold ${isDark ? 'text-[#F5F1E8]' : 'text-[#111418]'}`}>{mod.title}</span>
                  </div>
                  <span className="text-[10px] text-[#8C877D] font-mono">{mod.duration || '2 hrs'}</span>
                </div>

                <div className="space-y-1 px-3 pb-3">
                  {mod.lessons?.map((lesson, lIdx) => (
                    <div
                      key={lesson.id || lIdx}
                      onClick={() => handleLessonClick(lesson)}
                      className={`p-3 border flex items-center justify-between text-xs transition-colors rounded-xl cursor-pointer ${
                        lesson.completed
                          ? 'text-[#34D399] bg-[#34D399]/10 border-[#34D399]/30'
                          : isDark
                          ? 'bg-[#0E1114] border-white/[0.04] text-[#F5F1E8] hover:bg-white/[0.04]'
                          : 'bg-white border-black/[0.04] text-[#111418] hover:bg-black/[0.03]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLessonToggleComplete(lesson.id);
                          }}
                          className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                            lesson.completed
                              ? 'bg-[#34D399] text-black font-bold'
                              : isDark
                              ? 'border border-white/20 hover:border-[#FF6B5F]'
                              : 'border border-black/20 hover:border-[#FF6B5F]'
                          }`}
                        >
                          {lesson.completed && <Check className="w-3.5 h-3.5" />}
                        </button>
                        <span className={lesson.completed ? 'line-through opacity-80' : 'font-medium'}>
                          {lesson.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-[#8C877D] font-mono shrink-0">
                          {lesson.duration}
                        </span>
                        <PlayCircle className="w-3.5 h-3.5 text-[#FF857A]" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* External Learning Resources */}
          <div className="space-y-3">
            <h3 className={`text-xs font-bold uppercase tracking-wider font-mono ${isDark ? 'text-[#8C877D]' : 'text-[#6B7280]'}`}>
              Verified External Learning Resources:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <a
                href={resources.officialDocs.url}
                target="_blank"
                rel="noreferrer"
                className={`p-3.5 rounded-2xl border flex items-center justify-between group transition-all ${
                  isDark ? 'bg-[#16191E] border-white/[0.06] hover:border-white/20' : 'bg-[#FAF7F2] border-black/[0.06] hover:border-black/20'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-[#38BDF8]" />
                  <div>
                    <p className={`text-xs font-bold group-hover:text-[#38BDF8] transition-colors ${isDark ? 'text-[#F5F1E8]' : 'text-[#111418]'}`}>
                      {resources.officialDocs.title}
                    </p>
                    <p className="text-[10px] text-[#8C877D]">Official API Reference</p>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#8C877D] group-hover:text-[#38BDF8]" />
              </a>

              <a
                href={resources.youtubeVideo.url}
                target="_blank"
                rel="noreferrer"
                className={`p-3.5 rounded-2xl border flex items-center justify-between group transition-all ${
                  isDark ? 'bg-[#16191E] border-white/[0.06] hover:border-white/20' : 'bg-[#FAF7F2] border-black/[0.06] hover:border-black/20'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Youtube className="w-4 h-4 text-[#F87171]" />
                  <div>
                    <p className={`text-xs font-bold group-hover:text-[#F87171] transition-colors ${isDark ? 'text-[#F5F1E8]' : 'text-[#111418]'}`}>
                      {resources.youtubeVideo.title}
                    </p>
                    <p className="text-[10px] text-[#8C877D]">Full Video Crash Course</p>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#8C877D] group-hover:text-[#F87171]" />
              </a>

              <a
                href={resources.youtubeChannel.url}
                target="_blank"
                rel="noreferrer"
                className={`p-3.5 rounded-2xl border flex items-center justify-between group transition-all ${
                  isDark ? 'bg-[#16191E] border-white/[0.06] hover:border-white/20' : 'bg-[#FAF7F2] border-black/[0.06] hover:border-black/20'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Globe className="w-4 h-4 text-[#34D399]" />
                  <div>
                    <p className={`text-xs font-bold group-hover:text-[#34D399] transition-colors ${isDark ? 'text-[#F5F1E8]' : 'text-[#111418]'}`}>
                      {resources.youtubeChannel.title}
                    </p>
                    <p className="text-[10px] text-[#8C877D]">Curated Channel Library</p>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#8C877D] group-hover:text-[#34D399]" />
              </a>

              <a
                href={resources.learningPlatform.url}
                target="_blank"
                rel="noreferrer"
                className={`p-3.5 rounded-2xl border flex items-center justify-between group transition-all ${
                  isDark ? 'bg-[#16191E] border-white/[0.06] hover:border-white/20' : 'bg-[#FAF7F2] border-black/[0.06] hover:border-black/20'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-4 h-4 text-[#FBBF24]" />
                  <div>
                    <p className={`text-xs font-bold group-hover:text-[#FBBF24] transition-colors ${isDark ? 'text-[#F5F1E8]' : 'text-[#111418]'}`}>
                      {resources.learningPlatform.title}
                    </p>
                    <p className="text-[10px] text-[#8C877D]">Hands-on Sandbox & Guides</p>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#8C877D] group-hover:text-[#FBBF24]" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`p-6 border-t flex items-center justify-between gap-4 shrink-0 ${
          isDark ? 'border-white/[0.08] bg-[#0E1114]' : 'border-black/[0.08] bg-[#F9FAFB]'
        }`}>
          <button
            type="button"
            onClick={() => onEnrollToggle && onEnrollToggle(course.id)}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
              course.enrolled
                ? 'border-[#34D399]/40 bg-[#34D399]/15 text-[#34D399]'
                : isDark
                ? 'border-white/10 text-[#C7C2B6] hover:bg-white/5'
                : 'border-black/10 text-[#4B5563] hover:bg-black/5'
            }`}
          >
            {course.enrolled ? 'Enrolled in Track' : 'Enroll in Course'}
          </button>

          <button
            type="button"
            onClick={() => onLaunchAssessment && onLaunchAssessment(course.assessmentId)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF6B5F] hover:bg-[#E85548] text-white text-xs font-bold shadow-lg shadow-[#FF6B5F]/25 cursor-pointer transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Take Diagnostic Assessment</span>
          </button>
        </div>
      </div>

      {/* Interactive Lesson Content Player Modal */}
      {activeLesson && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg animate-in fade-in">
          <div className={`rounded-[28px] max-w-xl w-full shadow-2xl overflow-hidden border flex flex-col max-h-[85vh] ${
            isDark ? 'bg-[#111418] border-white/10 text-[#F5F1E8]' : 'bg-white border-black/10 text-[#111418]'
          }`}>
            <div className="p-5 border-b flex items-center justify-between gap-3 bg-[#0E1114]/80">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#FF6B5F]/15 border border-[#FF6B5F]/30 text-[#FF857A] flex items-center justify-center">
                  <PlayCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{activeLesson.title}</h4>
                  <p className="text-[11px] text-[#8C877D] font-mono">{activeLesson.duration} â€¢ {course.title}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveLesson(null)}
                className="p-1.5 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 text-center space-y-2">
                <PlayCircle className="w-10 h-10 text-[#FF6B5F] mx-auto animate-pulse" />
                <p className="text-xs font-bold text-white">Interactive Video & Guided Curriculum Lab</p>
                <p className="text-[11px] text-[#8C877D]">
                  Access high-definition video walkthroughs and complete guided exercises for this module.
                </p>
                <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
                  <a
                    href={resources.youtubeVideo.url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-1.5 rounded-xl bg-[#F87171]/20 hover:bg-[#F87171]/30 border border-[#F87171]/40 text-[#F87171] text-xs font-bold flex items-center gap-1.5"
                  >
                    <Youtube className="w-3.5 h-3.5" />
                    <span>Watch Video Lesson</span>
                  </a>
                  <a
                    href={resources.officialDocs.url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-1.5 rounded-xl bg-[#38BDF8]/20 hover:bg-[#38BDF8]/30 border border-[#38BDF8]/40 text-[#38BDF8] text-xs font-bold flex items-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Read Documentation</span>
                  </a>
                </div>
              </div>

              <div className="space-y-2">
                <h5 className="text-xs font-bold text-[#8C877D] uppercase font-mono">Module Objectives:</h5>
                <ul className="text-xs space-y-1.5 text-neutral-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#34D399] shrink-0" />
                    <span>Understand foundational concepts and architectural patterns.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#34D399] shrink-0" />
                    <span>Implement hands-on code examples and practical exercises.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#34D399] shrink-0" />
                    <span>Test your mastery by taking the associated role benchmark quiz.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-4 border-t flex items-center justify-between gap-3 bg-[#0E1114]/80">
              <button
                type="button"
                onClick={() => setActiveLesson(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-400 hover:text-white"
              >
                Close Viewer
              </button>

              <button
                type="button"
                onClick={() => handleLessonToggleComplete(activeLesson.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeLesson.completed
                    ? 'bg-[#34D399]/20 text-[#34D399] border border-[#34D399]/40'
                    : 'bg-[#34D399] hover:bg-[#2EB882] text-black shadow-md'
                }`}
              >
                <Check className="w-3.5 h-3.5" />
                <span>{activeLesson.completed ? 'Lesson Completed âœ“' : 'Mark as Completed (+50 XP)'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
