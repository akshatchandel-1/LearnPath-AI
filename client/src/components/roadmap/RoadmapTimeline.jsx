import React, { useState } from 'react';
import {
  CheckCircle2,
  Lock,
  PlayCircle,
  Award,
  Sparkles,
  BookOpen,
  Clock,
  ArrowRight,
  RefreshCw,
  ExternalLink,
  Info,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useLearningPath } from '../../context/LearningPathContext';

export const RoadmapTimeline = ({ onOpenQuiz, onExplainResource }) => {
  const { learningPath, adaptRoadmap, adapting } = useLearningPath();
  const [expandedPhase, setExpandedPhase] = useState(null);

  if (!learningPath || !learningPath.phases || learningPath.phases.length === 0) {
    return (
      <div className="p-8 text-center glass-panel rounded-2xl border border-white/10">
        <p className="text-slate-400">No active roadmap found. Complete onboarding or generate a new path.</p>
      </div>
    );
  }

  const { phases, title, durationWeeks, totalHours, adaptationCount, adaptationReason } = learningPath;

  const togglePhase = (phaseNum) => {
    setExpandedPhase(prev => (prev === phaseNum ? null : phaseNum));
  };

  return (
    <div className="space-y-6">
      {/* Roadmap Header Card */}
      <div className="p-6 rounded-2xl glass-panel border border-brand-500/30 bg-gradient-to-r from-brand-950/40 via-[#121420] to-cyan-950/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-brand-500/20 text-brand-300 border border-brand-500/30">
              Prerequisite-Aware Sequence
            </span>
            {adaptationCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                <RefreshCw className="w-3 h-3 animate-spin" />
                Adapted {adaptationCount}x
              </span>
            )}
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white font-display">
            {title}
          </h2>
          <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-slate-300">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-brand-400" />
              {durationWeeks} Weeks Estimated ({totalHours} Total Hours)
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              {phases.length} Structured Phases
            </span>
          </div>
        </div>

        {/* Adapt Roadmap Action */}
        <button
          onClick={() => adaptRoadmap()}
          disabled={adapting}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-brand-600 to-cyan-600 hover:from-brand-500 hover:to-cyan-500 text-white shadow-lg shadow-brand-500/20 transition-all disabled:opacity-50 cursor-pointer shrink-0"
          title="Recalibrate roadmap with latest quiz results and feedback"
        >
          <RefreshCw className={`w-4 h-4 ${adapting ? 'animate-spin' : ''}`} />
          <span>{adapting ? 'Adapting Path...' : '⚡ Adapt My Path'}</span>
        </button>
      </div>

      {/* Adaptation Reason Alert if Present */}
      {adaptationReason && (
        <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-200 flex items-start gap-2.5 animate-in fade-in">
          <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <span><strong>Dynamic Adaptation:</strong> {adaptationReason}</span>
        </div>
      )}

      {/* Vertical Timeline Nodes */}
      <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-brand-500 before:via-cyan-500 before:to-slate-800">
        {phases.map((phase) => {
          const isCompleted = phase.status === 'completed';
          const isInProgress = phase.status === 'in-progress' || phase.status === 'available';
          const isLocked = phase.status === 'locked';
          const isExpanded = expandedPhase === phase.phaseNumber || isInProgress;

          return (
            <div
              key={phase.phaseNumber}
              className={`relative rounded-2xl glass-panel border transition-all duration-300 ${
                isInProgress
                  ? 'border-brand-500/60 shadow-xl shadow-brand-500/10 bg-[#141829]'
                  : isCompleted
                  ? 'border-emerald-500/30 bg-[#0e171b]'
                  : 'border-white/5 opacity-75 bg-[#0e1017]'
              }`}
            >
              {/* Timeline Bullet Node */}
              <div
                className={`absolute -left-[31px] sm:-left-[39px] top-6 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-transform ${
                  isCompleted
                    ? 'bg-emerald-500 border-emerald-300 text-black shadow-lg shadow-emerald-500/30 scale-105'
                    : isInProgress
                    ? 'bg-brand-600 border-cyan-400 text-white shadow-lg shadow-brand-500/50 scale-110 animate-pulse'
                    : 'bg-slate-900 border-slate-700 text-slate-500'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : isInProgress ? (
                  <PlayCircle className="w-5 h-5 fill-white text-brand-600" />
                ) : (
                  <Lock className="w-4 h-4" />
                )}
              </div>

              {/* Phase Header Content */}
              <div
                onClick={() => togglePhase(phase.phaseNumber)}
                className="p-5 sm:p-6 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider ${
                        isCompleted
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : isInProgress
                          ? 'bg-brand-500/20 text-brand-300 border border-brand-500/40'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      Phase {phase.phaseNumber} • {phase.status}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {phase.estimatedHours} hrs
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white font-display">
                    {phase.title}
                  </h3>
                  <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                    {phase.description}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {phase.adaptiveNotes && (
                    <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                      {phase.adaptiveNotes}
                    </span>
                  )}
                  <button className="p-1 text-slate-400 hover:text-white">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Expanded Phase Details (Skills, Resources, Quiz, Project) */}
              {isExpanded && (
                <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-white/5 space-y-4">
                  {/* Skills Target Badges */}
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Core Competencies in Phase
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {phase.skills.map((sk, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium bg-brand-500/10 border border-brand-500/20 text-brand-200"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Phase Milestone Box */}
                  <div className="p-3.5 rounded-xl bg-gradient-to-r from-brand-950/40 to-cyan-950/40 border border-white/10 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-5 h-5 text-cyan-400 shrink-0" />
                      <div>
                        <p className="text-[11px] text-cyan-300 uppercase font-bold tracking-wider">
                          Phase Milestone Deliverable
                        </p>
                        <p className="text-xs sm:text-sm font-semibold text-white">
                          {phase.milestone}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions (Checkpoint Quiz & Project) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {/* Checkpoint Quiz Button */}
                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <Award className="w-5 h-5 text-amber-400 shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-white line-clamp-1">{phase.quizTitle || 'Checkpoint Quiz'}</p>
                          <p className="text-[11px] text-slate-400">
                            {phase.quizScore !== null ? `Score: ${phase.quizScore}%` : '5 Question Assessment'}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => onOpenQuiz && onOpenQuiz(phase.skills[0] || 'JavaScript')}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/30 transition-colors"
                      >
                        {phase.quizStatus === 'passed' ? 'Retake' : 'Take Quiz'}
                      </button>
                    </div>

                    {/* Milestone Project Preview */}
                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <Sparkles className="w-5 h-5 text-brand-400 shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-white line-clamp-1">{phase.projectTitle || 'Capstone Milestone'}</p>
                          <p className="text-[11px] text-slate-400">Hands-on Portfolio Build</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-brand-500/10 text-brand-300 border border-brand-500/20">
                        {phase.status === 'completed' ? 'Submitted' : 'Assigned'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoadmapTimeline;
