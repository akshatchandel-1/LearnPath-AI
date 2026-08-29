import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Cpu,
  CheckCircle2,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  Layers,
  Clock,
  ExternalLink,
  BrainCircuit,
  Zap,
} from 'lucide-react';
import { useLearningPath } from '../../context/LearningPathContext';

export const ExplainabilityModal = ({ recommendation, isOpen, onClose }) => {
  const { submitFeedback } = useLearningPath();
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [difficultyRating, setDifficultyRating] = useState(recommendation?.feedback?.difficultyRating || 'Just Right');

  if (!isOpen || !recommendation) return null;

  const { resource, score, breakdown, matchedSkills, skillGapAddressed, reason, difficultyFit, estimatedImpact } = recommendation;

  const factorConfig = [
    { key: 'semanticSimilarity', label: 'Semantic & Goal Relevance', weight: '30%', color: 'from-purple-500 to-indigo-500', desc: 'TF-IDF & semantic vector cosine similarity with your career goal' },
    { key: 'skillGapMatch', label: 'Skill Gap Alignment', weight: '20%', color: 'from-cyan-500 to-blue-500', desc: 'Addresses your identified weak areas vs target role requirements' },
    { key: 'difficultyMatch', label: 'Difficulty Level Fit', weight: '15%', color: 'from-emerald-500 to-teal-500', desc: 'Optimal challenge zone matching your current experience' },
    { key: 'interestMatch', label: 'Learner Interest Match', weight: '10%', color: 'from-pink-500 to-rose-500', desc: 'Matches topics, frameworks, and domain tags you selected' },
    { key: 'prerequisiteMatch', label: 'Prerequisite Readiness', weight: '10%', color: 'from-amber-500 to-orange-500', desc: 'Verified that prerequisite foundations are satisfied' },
    { key: 'learningPreferenceMatch', label: 'Learning Style Affinity', weight: '10%', color: 'from-violet-500 to-purple-500', desc: 'Matches your preference for videos, projects, or reading' },
    { key: 'historicalPerformance', label: 'Historical Velocity & Quizzes', weight: '5%', color: 'from-blue-500 to-cyan-500', desc: 'Calibrated against previous quiz scores and task completion speed' },
  ];

  const handleVote = async (isHelpful) => {
    try {
      await submitFeedback(recommendation._id, {
        helpful: isHelpful,
        difficultyRating,
      });
      setFeedbackSent(true);
      setTimeout(() => setFeedbackSent(false), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl glass-panel border border-brand-500/30 p-6 sm:p-8 shadow-2xl shadow-brand-500/20 text-slate-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 via-brand-500 to-cyan-400 p-0.5 shadow-lg shadow-brand-500/30 shrink-0">
            <div className="w-full h-full bg-[#0d0f17] rounded-[14px] flex items-center justify-center">
              <BrainCircuit className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-brand-500/20 text-brand-300 border border-brand-500/30">
                Explainable AI (XAI) Panel
              </span>
              <span className="text-xs text-slate-400 font-mono">Formula v2.4</span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1 font-display">
              Why did AI recommend this?
            </h2>
            <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">
              {resource?.title}
            </p>
          </div>
        </div>

        {/* Big Overall Score Card */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-brand-950/60 via-[#131726] to-cyan-950/50 border border-white/10 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-full bg-brand-900/60 border-2 border-brand-400 flex items-center justify-center shadow-lg shadow-brand-500/30">
              <span className="text-2xl font-black font-display text-white">{score}%</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-brand-300 uppercase tracking-wide">
                Hybrid Recommendation Score
              </p>
              <p className="text-sm text-slate-200 font-medium mt-0.5">
                {difficultyFit || 'Optimal Challenge Fit'}
              </p>
              <p className="text-xs text-cyan-400 font-medium">{estimatedImpact}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={resource?.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white shadow-md shadow-brand-600/30 transition-all"
            >
              <span>Open Resource</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* AI Natural Language Explanation Box */}
        <div className="p-4 rounded-xl bg-brand-500/10 border border-brand-500/20 mb-6">
          <div className="flex items-center gap-2 text-xs font-bold text-brand-300 uppercase tracking-wider mb-1.5">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            AI Reasoning Engine Justification
          </div>
          <p className="text-sm text-slate-200 leading-relaxed">{reason}</p>
        </div>

        {/* 7 Mathematical Scoring Factors Breakdown */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Cpu className="w-4 h-4 text-brand-400" />
              7-Factor Score Decomposition
            </h3>
            <span className="text-[11px] text-slate-400 font-mono">Weighted Sum = 100%</span>
          </div>

          <div className="space-y-3">
            {factorConfig.map((factor) => {
              const val = breakdown ? breakdown[factor.key] || 75 : 75;
              return (
                <div key={factor.key} className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-200">{factor.label}</span>
                      <span className="text-[10px] text-slate-400 font-mono">({factor.weight})</span>
                    </div>
                    <span className="font-bold text-white">{val}%</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${factor.color} rounded-full transition-all duration-500`}
                      style={{ width: `${val}%` }}
                    />
                  </div>

                  <p className="text-[10px] text-slate-400 mt-1">{factor.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Matched Gaps & Target Competencies */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
            <p className="text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              Target Skill Gaps Addressed
            </p>
            <div className="flex flex-wrap gap-1.5">
              {skillGapAddressed && skillGapAddressed.length > 0 ? (
                skillGapAddressed.map((gap, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md text-xs font-medium bg-rose-500/10 text-rose-300 border border-rose-500/20"
                  >
                    {gap}
                  </span>
                ))
              ) : (
                <span className="text-xs text-slate-400">Core foundational curriculum</span>
              )}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
            <p className="text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Skills Strengthened
            </p>
            <div className="flex flex-wrap gap-1.5">
              {(matchedSkills || []).map((sk, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-md text-xs font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                >
                  {sk}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Adaptive Feedback Loop */}
        <div className="p-4 rounded-xl bg-brand-950/30 border border-brand-500/20">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold text-white">Is this recommendation helpful?</p>
              <p className="text-[11px] text-slate-400">Your feedback continuously trains the recommendation weights.</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleVote(true)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-colors"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                Helpful
              </button>
              <button
                onClick={() => handleVote(false)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-colors"
              >
                <ThumbsDown className="w-3.5 h-3.5" />
                Not for me
              </button>
            </div>
          </div>

          {feedbackSent && (
            <p className="text-xs text-emerald-400 font-medium mt-2 animate-in fade-in">
              ✓ Thanks for your feedback! Recommendation weights adjusted in real time.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExplainabilityModal;
