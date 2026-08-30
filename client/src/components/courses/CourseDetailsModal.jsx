import React from 'react';
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
  Sparkles
} from 'lucide-react';

export default function CourseDetailsModal({
  course,
  onClose,
  onEnrollToggle,
  onStartLesson,
  onLaunchAssessment
}) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

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
            <h3 className={`text-xs font-bold uppercase tracking-wider font-mono ${isDark ? 'text-[#8C877D]' : 'text-[#6B7280]'}`}>
              Curriculum Syllabus & Lessons:
            </h3>

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
                      onClick={() => onStartLesson && onStartLesson(course.id, lesson.id)}
                      className={`p-3 border-t flex items-center justify-between text-xs transition-colors rounded-xl cursor-pointer ${
                        lesson.completed
                          ? 'text-[#34D399] bg-[#34D399]/5 border-[#34D399]/20'
                          : isDark
                          ? 'bg-[#0E1114] border-white/[0.04] text-[#F5F1E8] hover:bg-white/[0.02]'
                          : 'bg-white border-black/[0.04] text-[#111418] hover:bg-black/[0.02]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {lesson.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-[#34D399] shrink-0" />
                        ) : (
                          <PlayCircle className="w-4 h-4 text-[#8C877D] shrink-0" />
                        )}
                        <span className={lesson.completed ? 'line-through opacity-80' : 'font-medium'}>
                          {lesson.title}
                        </span>
                      </div>
                      <span className="text-[10px] text-[#8C877D] font-mono shrink-0">
                        {lesson.duration}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* External Learning Resources */}
          <div className="space-y-3">
            <h3 className={`text-xs font-bold uppercase tracking-wider font-mono ${isDark ? 'text-[#8C877D]' : 'text-[#6B7280]'}`}>
              Integrated External Learning Resources:
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
            onClick={() => {
              onClose();
              if (onLaunchAssessment) onLaunchAssessment(course);
            }}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#FF6B5F] hover:bg-[#E85548] text-white text-xs font-bold transition-all shadow-md shadow-[#FF6B5F]/20 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Launch Checkpoint Assessment</span>
          </button>
        </div>
      </div>
    </div>
  );
}
