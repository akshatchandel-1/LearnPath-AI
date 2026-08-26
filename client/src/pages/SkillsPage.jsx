import React, { useState } from 'react';
import { useLearningPath } from '../context/LearningPathContext';
import { SkillGapChart } from '../components/skillGap/SkillGapChart';
import { SkillRadarChart } from '../components/skillGap/SkillRadarChart';
import { QuizModal } from '../components/quiz/QuizModal';
import {
  Layers,
  CheckCircle2,
  AlertCircle,
  Award,
  Sparkles,
  BarChart3,
  Search,
  Filter,
} from 'lucide-react';

export const SkillsPage = () => {
  const { skillGapReport } = useLearningPath();
  const [activeQuizSkill, setActiveQuizSkill] = useState(null);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const skills = skillGapReport?.skills || [];

  const filteredSkills = skills.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || s.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', 'Frontend', 'Backend', 'Database', 'DevOps & Cloud', 'AI & Machine Learning'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-brand-500/20 text-brand-300 border border-brand-500/30">
            Target Competency Breakdown
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white font-display">
          Skill Gap Analysis & Matrix
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">
          Algorithmic comparison of target role requirements vs your verified competencies.
        </p>
      </div>

      {/* Visual Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-cyan-400" />
              Current vs Target Role Levels (0-100%)
            </h3>
          </div>
          <SkillGapChart skills={skills} />
        </div>

        {/* Radar Chart */}
        <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
              <Layers className="w-4 h-4 text-brand-400" />
              Competence Polygon Balance
            </h3>
          </div>
          <SkillRadarChart skills={skills} />
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl glass-panel border border-white/10">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search skills..."
            className="w-full pl-10 pr-4 py-2 rounded-xl text-xs bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-brand-400"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                categoryFilter === cat
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Detailed Skill Cards Table / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSkills.map((sk, idx) => {
          const current = sk.currentLevel || 0;
          const target = sk.targetLevel || 85;
          const gapPct = sk.gapPercentage || Math.max(0, Math.round(((target - current) / target) * 100));

          return (
            <div
              key={idx}
              className="p-5 rounded-2xl glass-card border border-white/10 flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      sk.priority === 'Critical'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : sk.priority === 'High'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {sk.priority || 'Standard'} Priority
                  </span>

                  <span
                    className={`text-xs font-bold ${
                      current >= target
                        ? 'text-emerald-400'
                        : current > 0
                        ? 'text-brand-300'
                        : 'text-slate-500'
                    }`}
                  >
                    {sk.status}
                  </span>
                </div>

                <h4 className="text-base font-bold text-white font-display">{sk.name}</h4>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span>Proficiency</span>
                    <span>{current}% / {target}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-brand-500 to-cyan-400 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (current / target) * 100)}%` }}
                    />
                  </div>
                </div>

                {gapPct > 0 && (
                  <p className="text-[11px] text-rose-300 font-medium">
                    Skill Gap: {gapPct}% ({target - current} pts to target mastery)
                  </p>
                )}
              </div>

              <div className="pt-2 border-t border-white/5">
                <button
                  onClick={() => setActiveQuizSkill(sk.name)}
                  className="w-full py-2 rounded-xl text-xs font-bold bg-white/5 hover:bg-brand-500/20 text-brand-300 hover:text-white border border-brand-500/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>Take Checkpoint Quiz</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quiz Modal */}
      <QuizModal
        skillName={activeQuizSkill}
        isOpen={Boolean(activeQuizSkill)}
        onClose={() => setActiveQuizSkill(null)}
      />
    </div>
  );
};

export default SkillsPage;
