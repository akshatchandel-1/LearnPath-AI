import React, { useState } from 'react';
import {
  Sparkles,
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
  Clock,
  Star,
  Layers,
  HelpCircle,
  Video,
  FileText,
  Code,
  Award,
  BookOpen,
} from 'lucide-react';
import { useLearningPath } from '../../context/LearningPathContext';

const isValidExternalUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch (e) {
    return false;
  }
};

export const ResourceCard = ({ recommendation, onExplain }) => {
  const { submitFeedback } = useLearningPath();
  const [voted, setVoted] = useState(recommendation?.feedback?.helpful);

  const { resource, score, reason, difficultyFit, matchedSkills, skillGapAddressed } = recommendation;
  if (!resource) return null;

  const handleVote = async (isHelpful, e) => {
    e.stopPropagation();
    try {
      await submitFeedback(recommendation._id, { helpful: isHelpful });
      setVoted(isHelpful);
    } catch (err) {
      console.error(err);
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Video': return <Video className="w-3.5 h-3.5 text-rose-400" />;
      case 'Project': return <Code className="w-3.5 h-3.5 text-brand-400" />;
      case 'Article': return <FileText className="w-3.5 h-3.5 text-emerald-400" />;
      case 'Quiz': return <Award className="w-3.5 h-3.5 text-amber-400" />;
      default: return <BookOpen className="w-3.5 h-3.5 text-cyan-400" />;
    }
  };

  const isUrlValid = isValidExternalUrl(resource.url);

  return (
    <div className="rounded-2xl glass-card border border-gray-200 dark:border-white/10 p-5 flex flex-col justify-between transition-all duration-300 group">
      <div className="space-y-3">
        {/* Card Header: Type Badge & AI Score */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-slate-200">
              {getTypeIcon(resource.type)}
              <span>{resource.type}</span>
            </span>
            {resource.free && (
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                Free
              </span>
            )}
          </div>

          {/* AI Match Score Pill */}
          <div
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border shadow-sm ${
              score >= 90
                ? 'bg-purple-500/20 text-purple-300 border-purple-500/40 shadow-purple-500/10'
                : score >= 80
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                : 'bg-slate-800 text-slate-300 border-slate-700'
            }`}
          >
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>{score}% Match</span>
          </div>
        </div>

        {/* Title & Provider */}
        <div>
          <h3 className="text-base font-bold text-white group-hover:text-brand-300 transition-colors line-clamp-1 font-display">
            {resource.title}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            by <span className="text-slate-300 font-medium">{resource.provider || 'Verified Instructor'}</span>
          </p>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
          {resource.description}
        </p>

        {/* Skills Tags */}
        <div className="flex flex-wrap gap-1 pt-1">
          {(resource.skills || []).slice(0, 3).map((sk, i) => (
            <span
              key={i}
              className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-brand-500/10 text-brand-300 border border-brand-500/20"
            >
              {sk}
            </span>
          ))}
        </div>

        {/* AI Mini Reason Snippet */}
        <div className="p-2.5 rounded-xl bg-brand-950/40 border border-brand-500/20 text-[11px] text-slate-300 line-clamp-2">
          <span className="text-cyan-400 font-semibold">AI Fit: </span>
          {reason}
        </div>
      </div>

      {/* Footer Meta & Actions */}
      <div className="pt-4 mt-4 border-t border-gray-200 dark:border-white/5 flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            {resource.duration || '3 hours'}
          </span>
          <span className="flex items-center gap-1 text-amber-400 font-medium">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            {resource.rating || 4.8}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2 pt-1">
          {/* Explainability Trigger Button */}
          <button
            onClick={() => onExplain && onExplain(recommendation)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-brand-500/15 hover:bg-brand-500/25 text-brand-300 border border-brand-500/30 transition-colors cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Why Recommend?</span>
          </button>

          <div className="flex items-center gap-1.5">
            {/* Feedback Thumbs */}
            <button
              onClick={(e) => handleVote(true, e)}
              className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                voted === true
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                  : 'bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10 text-slate-400 hover:text-white'
              }`}
              title="Helpful recommendation"
            >
              <ThumbsUp className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={(e) => handleVote(false, e)}
              className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                voted === false
                  ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                  : 'bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10 text-slate-400 hover:text-white'
              }`}
              title="Not relevant"
            >
              <ThumbsDown className="w-3.5 h-3.5" />
            </button>

            {/* Launch Resource */}
            {isUrlValid ? (
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-gray-200 dark:border-white/10 transition-colors"
                title="Open verified resource"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <button
                onClick={() => onExplain && onExplain(recommendation)}
                className="p-1.5 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-white/10 text-slate-300 border border-gray-200 dark:border-white/10 transition-colors cursor-pointer text-[10px]"
                title="Resource available in LearnPath AI"
              >
                In-App
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
