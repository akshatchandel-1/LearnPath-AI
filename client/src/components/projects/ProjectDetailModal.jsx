import React, { useState } from 'react';
import {
  X,
  Sparkles,
  CheckCircle2,
  Clock,
  Layers,
  Code,
  Award,
  Zap,
  FolderGit2,
  FileCode,
  ExternalLink,
} from 'lucide-react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export const ProjectDetailModal = ({ project, isOpen, onClose }) => {
  const { user, updateUserProfile } = useAuth();
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen || !project) return null;

  const handleStartProject = async () => {
    try {
      setLoading(true);
      // Record progress & activity for this project milestone
      const res = await api.post('/ai/chat', {
        message: `I am starting the portfolio project "${project.title}". Can you give me a recommended day-by-day implementation sprint plan?`,
      });

      setStarted(true);
    } catch (err) {
      console.warn('Project start note:', err.message);
      setStarted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/80 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto glass-panel rounded-3xl border border-brand-500/30 p-6 sm:p-8 shadow-2xl shadow-brand-500/20 text-slate-100 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-gray-200 dark:border-white/10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-brand-500/20 text-brand-300 border border-brand-500/30">
                {project.category} • {project.difficulty}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                <Clock className="w-3.5 h-3.5" />
                ~{project.estimatedHours} Hours
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white font-display">
              {project.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-slate-400 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {project.description}
        </p>

        {/* Core Architecture Deliverables */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            Key Architecture Features
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {(project.features || []).map((feat, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-white/[0.03] border border-gray-200 dark:border-white/5 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-200">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Outcomes */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-brand-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-400" />
            Learning Outcomes & Competency Mastery
          </h3>
          <ul className="space-y-1.5 text-xs text-slate-300 pl-2">
            {(project.learningOutcomes || []).map((out, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-brand-400 font-bold">•</span>
                <span>{out}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Evaluation Rubric */}
        {project.rubric && project.rubric.length > 0 && (
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              Evaluation Rubric (100 pts)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.rubric.map((r, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-200">{r.criteria}</span>
                  <span className="font-bold text-amber-300 font-mono">{r.points} pts</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Footer */}
        <div className="pt-4 border-t border-gray-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <a
            href={project.starterRepoUrl || 'https://github.com/vercel/next.js/tree/canary/examples'}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold bg-gray-100 dark:bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-gray-200 dark:border-white/10 transition-colors flex items-center justify-center gap-2"
          >
            <FolderGit2 className="w-4 h-4 text-cyan-400" />
            <span>Open Reference Template</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={handleStartProject}
            disabled={loading || started}
            className={`w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer ${
              started
                ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40'
                : 'bg-brand-600 hover:bg-brand-500 text-white shadow-brand-600/30'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>{started ? '✓ Milestone Sprint Initialized' : loading ? 'Initializing Sprint...' : 'Start This Project Milestone'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailModal;
