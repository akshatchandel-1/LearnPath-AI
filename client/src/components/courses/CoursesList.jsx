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
      <div className="py-16 text-center rounded-3xl bg-[#FFFDF8] border border-[#E6E0D7] shadow-sm text-[#5F6368] space-y-3">
        <BookOpen className="w-10 h-10 text-[#E05A47] mx-auto" />
        <p className="text-sm font-semibold text-[#202124]">No courses match your selected filters</p>
        <p className="text-xs text-[#5F6368]">Try adjusting your search query or reset category filters.</p>
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
            className="m3-card p-5 sm:p-6 flex flex-col justify-between group"
          >
            <div>
              {/* Header Badge & Rating */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase m3-badge-coral flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#E05A47]" />
                  {course.category}
                </span>

                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-[#FAF3E8] border border-[#F0DEC0] text-[#C48A3A] text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-current text-[#C48A3A]" />
                  <span>{course.rating}</span>
                </div>
              </div>

              {/* Course Title */}
              <h3
                onClick={() => onOpenDetails(course)}
                className="text-base sm:text-lg font-bold text-[#202124] mb-2 line-clamp-2 hover:text-[#E05A47] transition-colors cursor-pointer"
              >
                {course.title}
              </h3>

              {/* Tagline / Subtitle */}
              <p className="text-xs text-[#5F6368] line-clamp-2 mb-4 leading-relaxed">
                {course.tagline}
              </p>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-[#5F6368] mb-4 pb-3 border-b border-[#E6E0D7]">
                <span className="flex items-center gap-1 text-[#E05A47] font-medium">
                  <BookOpen className="w-3.5 h-3.5 text-[#E05A47]" />
                  {course.platform}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#5F6368]" />
                  {course.duration}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#F1ECE3] text-[#5F6368] border border-[#E6E0D7]">
                  {course.difficulty}
                </span>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {course.skillsCovered?.slice(0, 3).map((s, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-[#FDF0EE] text-[#E05A47] border border-[#F9D5CD]"
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
                    <span className="text-[#5F6368] font-medium">
                      Progress ({completedLessons}/{totalLessons} lessons)
                    </span>
                    <span className="text-[#E05A47] font-bold font-mono">
                      {progress}%
                    </span>
                  </div>

                  <div className="w-full m3-progress-track h-2">
                    <div
                      className="m3-progress-fill h-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => onOpenDetails(course)}
                      className="flex-1 py-2.5 rounded-xl text-xs font-bold m3-btn-primary cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <PlayCircle className="w-4 h-4" />
                      <span>Continue Lesson</span>
                    </button>

                    <button
                      onClick={() => onOpenDetails(course)}
                      title="View Syllabus"
                      className="p-2.5 rounded-xl text-xs font-semibold m3-btn-secondary cursor-pointer"
                    >
                      <ListTree className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onEnrollToggle(course.id)}
                    className="flex-1 py-2.5 rounded-xl text-xs font-bold m3-btn-primary cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <BookmarkPlus className="w-4 h-4" />
                    <span>Enroll in Course</span>
                  </button>

                  <button
                    onClick={() => onOpenDetails(course)}
                    className="px-3 py-2.5 rounded-xl text-xs font-semibold m3-btn-secondary cursor-pointer flex items-center gap-1"
                  >
                    <ListTree className="w-4 h-4" />
                    <span>Syllabus</span>
                  </button>
                </div>
              )}

              {course.assessmentId && onOpenAssessment && (
                <div className="flex items-center justify-between text-[11px] text-[#5F6368] pt-1">
                  <span className="flex items-center gap-1 text-[#5F6368]">
                    <Zap className="w-3 h-3 text-[#C48A3A]" />
                    Checkpoint Quiz Available
                  </span>
                  <button
                    onClick={() => onOpenAssessment(course.assessmentId)}
                    className="hover:underline text-[#E05A47] font-semibold cursor-pointer"
                  >
                    Take Quiz →
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
