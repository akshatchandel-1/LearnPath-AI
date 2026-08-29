import React from 'react';
import {
  ClipboardCheck,
  Clock,
  HelpCircle,
  Lock,
  Play,
  Award,
  Sparkles,
  Zap,
  RotateCcw,
  CheckCircle2,
  TrendingUp
} from 'lucide-react';

export default function AssessmentsList({
  assessments = [],
  onStartAssessment
}) {
  if (assessments.length === 0) {
    return (
      <div className="py-16 text-center rounded-3xl bg-white dark:bg-[#111418] border border-gray-200 dark:border-white/[0.08] shadow-sm text-gray-500 dark:text-[#8C877D] space-y-3">
        <ClipboardCheck className="w-10 h-10 text-[#FF6B5F] mx-auto" />
        <p className="text-sm font-semibold text-gray-900 dark:text-[#F5F1E8]">No assessments found matching your filter</p>
        <p className="text-xs text-gray-500 dark:text-[#8C877D]">Try choosing a different category or generate a custom AI assessment.</p>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Passed':
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#34D399]/15 text-[#34D399] border border-[#34D399]/30 flex items-center gap-1 font-mono">
            <CheckCircle2 className="w-3 h-3 text-[#34D399]" />
            Passed
          </span>
        );
      case 'Ready to Take':
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#FF6B5F]/15 text-[#FF857A] border border-[#FF6B5F]/30 flex items-center gap-1 font-mono">
            <Zap className="w-3 h-3 text-[#FF6B5F]" />
            Ready to Take
          </span>
        );
      case 'Locked':
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-[#8C877D] border border-gray-200 dark:border-white/10 flex items-center gap-1 font-mono">
            <Lock className="w-3 h-3 text-gray-500 dark:text-[#8C877D]" />
            Locked
          </span>
        );
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {assessments.map((assessment) => {
        const isLocked = assessment.status === 'Locked';
        const isPassed = assessment.status === 'Passed';
        const questionsCount = assessment.questions?.length || assessment.questionsCount || 5;

        return (
          <div
            key={assessment.id}
            className={`m3-card p-5 sm:p-6 flex flex-col justify-between group bg-white dark:bg-[#111418] border transition-all ${
              isLocked
                ? 'opacity-60 border-gray-200 dark:border-white/[0.04]'
                : isPassed
                ? 'border-[#34D399]/30 hover:border-[#34D399]/60'
                : 'border-gray-200 dark:border-white/[0.08] hover:border-[#FF6B5F]/40'
            }`}
          >
            <div>
              {/* Top Status & Difficulty */}
              <div className="flex items-center justify-between gap-2 mb-3">
                {getStatusBadge(assessment.status)}
                <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-[#C7C2B6] font-mono">
                  {assessment.difficulty}
                </span>
              </div>

              {/* Assessment Title */}
              <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-[#F5F1E8] mb-2 line-clamp-2">
                {assessment.title}
              </h3>

              {/* Tagline */}
              <p className="text-xs text-gray-500 dark:text-[#8C877D] line-clamp-2 mb-4 leading-relaxed">
                {assessment.tagline || `Calibrate your competency in ${assessment.skill} with 5 timed questions.`}
              </p>

              {/* Meta Info */}
              <div className="space-y-1.5 text-xs text-gray-500 dark:text-[#8C877D] mb-4 pb-3 border-b border-gray-200 dark:border-white/[0.06]">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#FF6B5F]" />
                    <span>Duration: {assessment.duration}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-gray-500 dark:text-[#8C877D]" />
                    <span>{questionsCount} Questions</span>
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-gray-500 dark:text-[#8C877D]">
                    Passing Benchmark: <strong className="text-gray-900 dark:text-[#F5F1E8] font-mono">{assessment.passingScore}%</strong>
                  </span>
                  <span className="text-[#FF857A] font-bold flex items-center gap-1 font-mono">
                    <Award className="w-3.5 h-3.5 text-[#FF6B5F]" />
                    +{assessment.xpReward} XP
                  </span>
                </div>
              </div>

              {/* Best Score or Prerequisite note */}
              {isPassed ? (
                <div className="p-2.5 rounded-xl bg-[#34D399]/10 border border-[#34D399]/20 text-[#34D399] text-xs font-bold flex items-center justify-between mb-4 font-mono">
                  <span>Score: {assessment.score}%</span>
                  <span>Certified ✓</span>
                </div>
              ) : isLocked ? (
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] text-gray-500 dark:text-[#8C877D] text-xs flex items-center gap-2 mb-4">
                  <Lock className="w-3.5 h-3.5" />
                  <span>{assessment.prerequisite || 'Complete prerequisite courses to unlock'}</span>
                </div>
              ) : (
                <div className="p-2.5 rounded-xl bg-[#FF6B5F]/10 border border-[#FF6B5F]/20 text-[#FF857A] text-xs flex items-center gap-2 mb-4 font-mono">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Adaptive Diagnostic Test Ready</span>
                </div>
              )}
            </div>

            {/* Bottom Action Button */}
            <div className="pt-2">
              {isLocked ? (
                <button
                  disabled
                  className="w-full py-2.5 px-4 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-[#8C877D] text-xs font-bold cursor-not-allowed flex items-center justify-center gap-1.5"
                >
                  <Lock className="w-4 h-4" />
                  <span>Assessment Locked</span>
                </button>
              ) : isPassed ? (
                <button
                  onClick={() => onStartAssessment(assessment)}
                  className="w-full py-2.5 px-4 rounded-xl border border-white/[0.1] bg-gray-50 dark:bg-[#16191E] hover:bg-gray-100 dark:hover:bg-white/5 text-gray-900 dark:text-[#F5F1E8] text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4 text-[#FF857A]" />
                  <span>Retake Quiz for Higher XP</span>
                </button>
              ) : (
                <button
                  onClick={() => onStartAssessment(assessment)}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#FF6B5F] to-[#E85548] hover:from-[#FF857A] hover:to-[#FF6B5F] text-white text-xs font-bold transition-all shadow-md shadow-[#FF6B5F]/20 flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.99]"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Start Assessment Now</span>
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
