import React from 'react';
import {
  BookOpen,
  Star,
  Clock,
  PlayCircle,
  BookmarkPlus,
  CheckCircle2,
  ListTree,
  Sparkles,
  Zap,
  BookmarkCheck
} from 'lucide-react';

export default function CoursesList({
  courses = [],
  onOpenDetails,
  onEnrollToggle,
  onOpenAssessment
}) {
  if (courses.length === 0) {
    return (
      <div className="py-16 text-center rounded-3xl bg-[#111418] border border-white/[0.08] shadow-sm text-[#8C877D] space-y-3">
        <BookOpen className="w-10 h-10 text-[#FF6B5F] mx-auto" />
        <p className="text-sm font-semibold text-[#F5F1E8]">No courses match your selected filters</p>
        <p className="text-xs text-[#8C877D]">Try adjusting your search query or reset category filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => {
        const totalLessons = course.totalLessons || 10;
        const completedLessons = course.completedLessons || 0;
        const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : (course.progress || 0);

        return (
          <div
            key={course.id}
            className="m3-card p-5 sm:p-6 flex flex-col justify-between group bg-[#111418] border border-white/[0.08] hover:border-[#FF6B5F]/40"
          >
            <div>
              {/* Header Badge & Rating */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-[#FF6B5F]/15 text-[#FF857A] border border-[#FF6B5F]/30 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#FF6B5F]" />
                  {course.category}
                </span>

                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-[#FBBF24]/10 border border-[#FBBF24]/20 text-[#FBBF24] text-xs font-bold font-mono">
                  <Star className="w-3.5 h-3.5 fill-current text-[#FBBF24]" />
                  <span>{course.rating}</span>
                </div>
              </div>

              {/* Course Title */}
              <h3
                onClick={() => onOpenDetails(course)}
                className="text-base sm:text-lg font-bold text-[#F5F1E8] mb-2 line-clamp-2 hover:text-[#FF857A] transition-colors cursor-pointer"
              >
                {course.title}
              </h3>

              {/* Tagline / Subtitle */}
              <p className="text-xs text-[#8C877D] line-clamp-2 mb-4 leading-relaxed">
                {course.tagline}
              </p>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-[#8C877D] mb-4 pb-3 border-b border-white/[0.06]">
                <span className="flex items-center gap-1 text-[#FF857A] font-semibold">
                  <BookOpen className="w-3.5 h-3.5 text-[#FF6B5F]" />
                  {course.platform}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#8C877D]" />
                  {course.duration}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/5 text-[#C7C2B6] border border-white/10">
                  {course.difficulty}
                </span>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {course.skillsCovered?.slice(0, 3).map((s, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-[#16191E] text-[#C7C2B6] border border-white/[0.08]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions & Progress */}
            <div className="pt-3 space-y-3">
              {course.enrolled ? (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#8C877D] font-medium">
                      Progress ({completedLessons}/{totalLessons} lessons)
                    </span>
                    <span className="text-[#FF857A] font-bold font-mono">
                      {progress}%
                    </span>
                  </div>

                  <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#FF6B5F] to-[#E85548] h-full rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => onOpenDetails(course)}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#FF6B5F] to-[#E85548] hover:from-[#FF857A] hover:to-[#FF6B5F] text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <PlayCircle className="w-4 h-4" />
                      <span>Continue Module</span>
                    </button>
                    {course.assessmentId && (
                      <button
                        onClick={() => onOpenAssessment(course.assessmentId)}
                        title="Take Linked Skill Quiz"
                        className="p-2.5 rounded-xl border border-white/[0.08] hover:border-[#FF6B5F]/40 bg-[#16191E] text-[#FF857A] transition-colors cursor-pointer"
                      >
                        <Zap className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onEnrollToggle(course.id)}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#FF6B5F] to-[#E85548] hover:from-[#FF857A] hover:to-[#FF6B5F] text-white text-xs font-bold transition-all shadow-md shadow-[#FF6B5F]/20 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <BookmarkPlus className="w-4 h-4" />
                    <span>Enroll Now</span>
                  </button>

                  <button
                    onClick={() => onOpenDetails(course)}
                    className="p-2.5 rounded-xl border border-white/[0.08] hover:border-white/20 bg-[#16191E] text-[#C7C2B6] hover:text-[#F5F1E8] transition-colors cursor-pointer"
                    title="View Syllabus"
                  >
                    <ListTree className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
