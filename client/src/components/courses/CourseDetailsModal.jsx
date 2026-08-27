import React, { useState } from 'react';
import {
  X,
  BookOpen,
  Clock,
  Star,
  Award,
  CheckCircle2,
  Circle,
  PlayCircle,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Zap,
  Bookmark,
  Share2
} from 'lucide-react';

export default function CourseDetailsModal({
  course,
  isOpen,
  onClose,
  onToggleLesson,
  onEnrollToggle,
  onOpenAssessment
}) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !course) return null;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLessonCheck = (lessonId) => {
    if (onToggleLesson) {
      onToggleLesson(course.id, lessonId);
    }
  };

  const totalLessons = course.totalLessons || 0;
  const completedLessons = course.completedLessons || 0;
  const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="m3-theme-scope relative w-full max-w-3xl max-h-[92vh] overflow-y-auto m3-modal-dialog p-6 sm:p-8 text-[#202124]">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E6E0D7]">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider m3-badge-coral flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#E05A47]" />
              {course.category} • {course.difficulty}
            </span>
            <span className="text-xs text-[#8A8F98] font-mono hidden sm:inline">
              ID: {course.id}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              title="Share Course"
              className="p-2 rounded-xl text-[#5F6368] hover:text-[#202124] hover:bg-[#F6F2EA] transition-all border border-[#E6E0D7] cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#5F6368] hover:text-[#202124] hover:bg-[#F6F2EA] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Hero Course Header */}
        <div className="mt-4 space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#E05A47] font-medium">
            <span>{course.platform}</span>
            <span className="text-[#8A8F98]">•</span>
            <div className="flex items-center gap-1 text-[#C48A3A] font-bold">
              <Star className="w-3.5 h-3.5 fill-current text-[#C48A3A]" />
              <span>{course.rating}</span>
              <span className="text-[#5F6368] text-[11px]">({course.reviewsCount} reviews)</span>
            </div>
            <span className="text-[#8A8F98]">•</span>
            <span className="flex items-center gap-1 text-[#5F6368]">
              <Clock className="w-3.5 h-3.5 text-[#E05A47]" />
              {course.duration}
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-[#202124]">
            {course.title}
          </h1>

          <p className="text-xs sm:text-sm text-[#5F6368] leading-relaxed">
            {course.tagline}
          </p>

          <div className="flex items-center gap-2 pt-1 text-xs text-[#5F6368]">
            <span className="text-[#202124] font-semibold">Instructor:</span>
            <span>{course.instructor}</span>
          </div>
        </div>

        {/* Course Progress & Enrollment Banner */}
        <div className="my-6 p-4 sm:p-5 rounded-2xl bg-[#F6F2EA] border border-[#E6E0D7] space-y-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <p className="text-xs font-bold uppercase tracking-wider text-[#E05A47]">
                  {course.enrolled ? 'Course Progress' : 'Enrollment Status'}
                </p>
                {course.enrolled && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold m3-badge-emerald">
                    Active
                  </span>
                )}
              </div>
              <p className="text-sm font-semibold text-[#202124] mt-0.5">
                {course.enrolled
                  ? `${completedLessons} of ${totalLessons} Lessons Completed (${progressPercent}%)`
                  : 'Ready to enroll • Free with LearnPath AI'
                }
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => onEnrollToggle(course.id)}
                className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center justify-center gap-1.5 ${
                  course.enrolled
                    ? 'm3-btn-secondary'
                    : 'm3-btn-primary'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>{course.enrolled ? 'Enrolled' : 'Enroll Now'}</span>
              </button>

              {course.assessmentId && onOpenAssessment && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenAssessment(course.assessmentId);
                  }}
                  className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold bg-[#191A1C] hover:bg-[#2A2B2E] text-white shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Test Skill</span>
                </button>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          {course.enrolled && (
            <div className="w-full m3-progress-track h-2 bg-[#E6E0D7]">
              <div
                className="m3-progress-fill h-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          )}
        </div>

        {/* Skills Covered Pills */}
        <div className="mb-6 space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-[#202124]">
            Skills & Competencies Addressed:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {course.skillsCovered?.map((skill, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#FDF0EE] text-[#E05A47] border border-[#F9D5CD]"
              >
                ✓ {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Comprehensive Interactive Curriculum Syllabus */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#202124] flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#E05A47]" />
              <span>Course Curriculum & Syllabus</span>
            </h2>
            <span className="text-xs text-[#5F6368] font-mono">
              {course.modules?.length || 0} Modules • {totalLessons} Lessons
            </span>
          </div>

          <div className="space-y-3">
            {course.modules?.map((mod, modIdx) => (
              <div
                key={modIdx}
                className="rounded-2xl border border-[#E6E0D7] bg-[#F6F2EA] overflow-hidden"
              >
                <div className="p-3.5 bg-[#FAF7F0] border-b border-[#E6E0D7] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#FDF0EE] text-[#E05A47] text-[11px] font-bold flex items-center justify-center">
                      {modIdx + 1}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#202124]">
                      {mod.title}
                    </span>
                  </div>
                  <span className="text-xs text-[#E05A47] font-medium font-mono">
                    {mod.duration}
                  </span>
                </div>

                <div className="p-2 sm:p-3 space-y-1.5 bg-[#FFFDF8]">
                  {mod.lessons?.map((lesson) => (
                    <div
                      key={lesson.id}
                      onClick={() => handleLessonCheck(lesson.id)}
                      className={`p-2.5 rounded-xl text-xs flex items-center justify-between gap-3 transition-all cursor-pointer ${
                        lesson.completed
                          ? 'bg-[#FDF0EE] text-[#E05A47] border border-[#F9D5CD]'
                          : 'bg-[#FFFDF8] text-[#3F4247] hover:bg-[#F6F2EA] border border-[#E6E0D7]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {lesson.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-[#3F8F68] shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 text-slate-400 shrink-0 hover:text-[#E05A47]" />
                        )}
                        <span className={lesson.completed ? 'line-through text-slate-400' : 'font-medium'}>
                          {lesson.title}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-[#5F6368] shrink-0">
                        <Clock className="w-3 h-3 text-[#E05A47]" />
                        <span>{lesson.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certificate Section */}
        <div className="mt-6 p-4 rounded-2xl border border-[#E6E0D7] bg-[#F6F2EA] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-[#FDF0EE] border border-[#F9D5CD] flex items-center justify-center text-[#E05A47] shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#202124]">
                LearnPath AI Verified Credential
              </p>
              <p className="text-[11px] text-[#5F6368]">
                Complete all {totalLessons} lessons & pass the {course.skillsCovered?.[0] || 'Skill'} checkpoint quiz to earn +{course.xpReward || 300} XP.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-xl text-xs font-bold m3-btn-primary shrink-0 cursor-pointer"
          >
            Close Syllabus
          </button>
        </div>

      </div>
    </div>
  );
}
