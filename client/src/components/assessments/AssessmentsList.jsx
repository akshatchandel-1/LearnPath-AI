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
      <div className="py-16 text-center rounded-3xl bg-[#FFFDF8] border border-[#E6E0D7] shadow-sm text-[#5F6368] space-y-3">
        <ClipboardCheck className="w-10 h-10 text-[#E05A47] mx-auto" />
        <p className="text-sm font-semibold text-[#202124]">No assessments found matching your filter</p>
        <p className="text-xs text-[#5F6368]">Try choosing a different category or generate a custom AI assessment.</p>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Passed':
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold m3-badge-emerald flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-[#3F8F68]" />
            Passed
          </span>
        );
      case 'Ready to Take':
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold m3-badge-coral flex items-center gap-1">
            <Zap className="w-3 h-3 text-[#E05A47]" />
            Ready to Take
          </span>
        );
      case 'Locked':
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold m3-badge-neutral flex items-center gap-1">
            <Lock className="w-3 h-3 text-[#8A8F98]" />
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
            className={`m3-card p-5 sm:p-6 flex flex-col justify-between group ${
              isLocked
                ? 'opacity-80 bg-[#F6F2EA] border-[#E6E0D7]'
                : isPassed
                ? 'border-[#C6E7D6] hover:border-[#3F8F68]'
                : 'border-[#E6E0D7] hover:border-[#D99A8A]'
            }`}
          >
            <div>
              {/* Top Status & Difficulty */}
              <div className="flex items-center justify-between gap-2 mb-3">
                {getStatusBadge(assessment.status)}
                <span className="px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-[#F1ECE3] border border-[#E6E0D7] text-[#5F6368]">
                  {assessment.difficulty}
                </span>
              </div>

              {/* Assessment Title */}
              <h3 className="text-base sm:text-lg font-bold text-[#202124] mb-2 line-clamp-2">
                {assessment.title}
              </h3>

              {/* Tagline */}
              <p className="text-xs text-[#5F6368] line-clamp-2 mb-4 leading-relaxed">
                {assessment.tagline || `Calibrate your competency in ${assessment.skill} with 5 timed questions.`}
              </p>

              {/* Meta Info */}
              <div className="space-y-1.5 text-xs text-[#5F6368] mb-4 pb-3 border-b border-[#E6E0D7]">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#E05A47]" />
                    <span>Duration: {assessment.duration}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-[#4A7BC7]" />
                    <span>{questionsCount} Questions</span>
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="flex items-center gap-1.5 text-[#C48A3A] font-semibold">
                    <Award className="w-3.5 h-3.5 text-[#C48A3A]" />
                    <span>+{assessment.xpReward || 150} XP</span>
                  </span>
                  <span className="text-[11px] text-[#5F6368]">
                    Passing: {assessment.passingScore || 70}%
                  </span>
                </div>

                {isPassed && assessment.lastScore && (
                  <div className="flex items-center justify-between pt-2 text-[#3F8F68] font-bold">
                    <span className="flex items-center gap-1 text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#3F8F68]" />
                      <span>Last Score: {assessment.lastScore}%</span>
                    </span>
                    <span className="text-[11px] text-[#3F8F68] font-mono">
                      (Calibrated)
                    </span>
                  </div>
                )}
              </div>

              {/* Skill Tag */}
              <div className="flex items-center gap-1.5 mb-5">
                <span className="text-[11px] text-[#5F6368] font-medium">Skill:</span>
                <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-[#FDF0EE] text-[#E05A47] border border-[#F9D5CD]">
                  {assessment.skill}
                </span>
                {assessment.badgeText && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase m3-badge-coral ml-auto">
                    {assessment.badgeText}
                  </span>
                )}
              </div>
            </div>

            {/* Bottom Launch Action */}
            <div className="pt-2">
              {isLocked ? (
                <button
                  disabled
                  className="w-full py-2.5 rounded-xl text-xs font-semibold bg-[#F1ECE3] text-[#8A8F98] border border-[#E6E0D7] flex items-center justify-center gap-1.5 cursor-not-allowed"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Prerequisites Locked</span>
                </button>
              ) : isPassed ? (
                <button
                  onClick={() => onStartAssessment(assessment)}
                  className="w-full py-2.5 rounded-xl text-xs font-bold m3-btn-secondary cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Assessment</span>
                </button>
              ) : (
                <button
                  onClick={() => onStartAssessment(assessment)}
                  className="w-full py-2.5 rounded-xl text-xs font-bold m3-btn-primary cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Start Assessment</span>
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
