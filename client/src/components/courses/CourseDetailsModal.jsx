import React from 'react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/80 dark:bg-black/80 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div className="bg-white dark:bg-[#111418] rounded-[28px] max-w-2xl w-full shadow-2xl overflow-hidden my-8 border border-white/[0.1] text-gray-900 dark:text-[#F5F1E8] relative flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-white/[0.08] bg-gray-50 dark:bg-[#0E1114] flex items-start justify-between gap-4 shrink-0">
          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-[#FF6B5F]/15 text-[#FF857A] uppercase font-mono border border-[#FF6B5F]/30">
                {course.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-[#C7C2B6] font-mono border border-gray-200 dark:border-white/10">
                {course.difficulty}
              </span>
              <span className="flex items-center gap-1 text-xs font-bold text-[#FBBF24] font-mono ml-auto sm:ml-0">
                <Star className="w-3.5 h-3.5 fill-current" />
                {course.rating || 4.9}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black tracking-tight text-gray-900 dark:text-[#F5F1E8]">
              {course.title}
            </h2>
            <p className="text-xs text-gray-500 dark:text-[#8C877D] leading-relaxed">
              {course.tagline || course.description}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-gray-500 dark:text-[#8C877D] hover:text-gray-900 dark:hover:text-[#F5F1E8] hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          
          {/* Key Metrics Banner */}
          <div className="grid grid-cols-3 gap-3 p-3.5 rounded-2xl bg-gray-50 dark:bg-[#16191E] border border-gray-200 dark:border-white/[0.06] text-center">
            <div>
              <span className="text-[10px] font-bold text-gray-500 dark:text-[#8C877D] uppercase block">Duration</span>
              <span className="text-xs sm:text-sm font-bold font-mono text-gray-900 dark:text-[#F5F1E8] flex items-center justify-center gap-1 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-[#FF6B5F]" />
                {course.duration}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-gray-500 dark:text-[#8C877D] uppercase block">Lessons</span>
              <span className="text-xs sm:text-sm font-bold font-mono text-gray-900 dark:text-[#F5F1E8] flex items-center justify-center gap-1 mt-0.5">
                <BookOpen className="w-3.5 h-3.5 text-[#38BDF8]" />
                {completedLessons}/{totalLessons}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-gray-500 dark:text-[#8C877D] uppercase block">Reward</span>
              <span className="text-xs sm:text-sm font-bold font-mono text-[#FBBF24] flex items-center justify-center gap-1 mt-0.5">
                <Award className="w-3.5 h-3.5" />
                +{course.xpReward || 300} XP
              </span>
            </div>
          </div>

          {/* Progress Bar if Enrolled */}
          {course.enrolled && (
            <div className="space-y-1.5 p-4 rounded-2xl bg-gray-50 dark:bg-[#0E1114] border border-gray-200 dark:border-white/[0.06]">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500 dark:text-[#8C877D] font-medium">Curriculum Progress</span>
                <span className="font-mono font-bold text-[#FF857A]">{course.progress || 0}% Complete</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-white/5 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#FF6B5F] to-[#E85548] h-full rounded-full transition-all duration-500"
                  style={{ width: `${course.progress || 0}%` }}
                />
              </div>
            </div>
          )}

          {/* Verified Curated Learning Resources */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-gray-600 dark:text-[#C7C2B6] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#FF6B5F]" />
              <span>Verified Learning Resources</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {resources.officialDocs && (
                <a
                  href={resources.officialDocs.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-[#16191E] border border-gray-200 dark:border-white/[0.06] hover:border-[#FF6B5F]/40 transition-all group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-[#38BDF8]/15 text-[#38BDF8] flex items-center justify-center shrink-0">
                      <FileText className="w-3.5 h-3.5" />
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-bold text-gray-900 dark:text-[#F5F1E8] group-hover:text-[#FF857A] truncate transition-colors">
                        {resources.officialDocs.title}
                      </p>
                      <span className="text-[10px] text-gray-500 dark:text-[#8C877D]">Official Documentation</span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-500 dark:text-[#8C877D] group-hover:text-[#FF857A] shrink-0 ml-2" />
                </a>
              )}

              {resources.youtubeVideo && (
                <a
                  href={resources.youtubeVideo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-[#16191E] border border-gray-200 dark:border-white/[0.06] hover:border-[#FF6B5F]/40 transition-all group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-[#F87171]/15 text-[#F87171] flex items-center justify-center shrink-0">
                      <Youtube className="w-3.5 h-3.5" />
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-bold text-gray-900 dark:text-[#F5F1E8] group-hover:text-[#FF857A] truncate transition-colors">
                        {resources.youtubeVideo.title}
                      </p>
                      <span className="text-[10px] text-gray-500 dark:text-[#8C877D]">Curated Video Tutorial</span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-500 dark:text-[#8C877D] group-hover:text-[#FF857A] shrink-0 ml-2" />
                </a>
              )}

              {resources.youtubeChannel && (
                <a
                  href={resources.youtubeChannel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-[#16191E] border border-gray-200 dark:border-white/[0.06] hover:border-[#FF6B5F]/40 transition-all group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-[#FBBF24]/15 text-[#FBBF24] flex items-center justify-center shrink-0">
                      <Youtube className="w-3.5 h-3.5" />
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-bold text-gray-900 dark:text-[#F5F1E8] group-hover:text-[#FF857A] truncate transition-colors">
                        {resources.youtubeChannel.title}
                      </p>
                      <span className="text-[10px] text-gray-500 dark:text-[#8C877D]">Recommended Channel</span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-500 dark:text-[#8C877D] group-hover:text-[#FF857A] shrink-0 ml-2" />
                </a>
              )}

              {resources.learningPlatform && (
                <a
                  href={resources.learningPlatform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-[#16191E] border border-gray-200 dark:border-white/[0.06] hover:border-[#FF6B5F]/40 transition-all group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-[#34D399]/15 text-[#34D399] flex items-center justify-center shrink-0">
                      <Globe className="w-3.5 h-3.5" />
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-bold text-gray-900 dark:text-[#F5F1E8] group-hover:text-[#FF857A] truncate transition-colors">
                        {resources.learningPlatform.title}
                      </p>
                      <span className="text-[10px] text-gray-500 dark:text-[#8C877D]">Interactive Lab / Website</span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-500 dark:text-[#8C877D] group-hover:text-[#FF857A] shrink-0 ml-2" />
                </a>
              )}
            </div>
          </div>

          {/* Syllabus Modules */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-gray-600 dark:text-[#C7C2B6] uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Syllabus & Lesson Modules</span>
            </h3>

            <div className="space-y-3">
              {course.modules?.map((mod, idx) => (
                <div key={idx} className="rounded-xl bg-gray-50 dark:bg-[#0E1114] border border-gray-200 dark:border-white/[0.06] p-3.5 space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-bold text-gray-900 dark:text-[#F5F1E8]">
                    <span>{mod.title}</span>
                    <span className="text-[10px] text-gray-500 dark:text-[#8C877D] font-mono">{mod.duration}</span>
                  </div>

                  <ul className="space-y-1.5">
                    {mod.lessons?.map((lesson) => (
                      <li
                        key={lesson.id}
                        onClick={() => onStartLesson && onStartLesson(course.id, lesson.id)}
                        className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-[#111418] border border-gray-200 dark:border-white/[0.04] text-xs hover:border-[#FF6B5F]/30 cursor-pointer group transition-all"
                      >
                        <div className="flex items-center gap-2.5">
                          {lesson.completed ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#34D399] shrink-0" />
                          ) : (
                            <PlayCircle className="w-3.5 h-3.5 text-[#FF857A] group-hover:scale-110 transition-transform shrink-0" />
                          )}
                          <span className={`${lesson.completed ? 'text-gray-500 dark:text-[#8C877D] line-through' : 'text-gray-600 dark:text-[#C7C2B6] group-hover:text-gray-900 dark:hover:text-[#F5F1E8]'}`}>
                            {lesson.title}
                          </span>
                        </div>
                        <span className="text-[10px] text-gray-500 dark:text-[#8C877D] font-mono shrink-0 ml-2">
                          {lesson.duration}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-gray-200 dark:border-white/[0.08] bg-gray-50 dark:bg-[#0E1114] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            {course.assessmentId && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onLaunchAssessment) onLaunchAssessment(course.assessmentId);
                }}
                className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 text-xs font-bold text-gray-600 dark:text-[#C7C2B6] hover:text-gray-900 dark:hover:text-[#F5F1E8] hover:bg-gray-100 dark:hover:bg-white/5 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Award className="w-3.5 h-3.5 text-[#FBBF24]" />
                <span>Take Checkpoint Quiz</span>
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => onEnrollToggle(course.id)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer ${
              course.enrolled
                ? 'bg-white/10 text-gray-900 dark:text-[#F5F1E8] hover:bg-white/15'
                : 'bg-gradient-to-r from-[#FF6B5F] to-[#E85548] hover:from-[#FF857A] hover:to-[#FF6B5F] text-white shadow-[#FF6B5F]/25'
            }`}
          >
            <span>{course.enrolled ? 'Enrolled (Drop Course)' : 'Enroll in Track'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
