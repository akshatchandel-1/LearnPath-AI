import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { QuizModal } from '../components/quiz/QuizModal';
import { Award, Clock, Sparkles, RefreshCw, Zap, CheckCircle2, History } from 'lucide-react';

export const QuizPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeQuizSkill, setActiveQuizSkill] = useState(null);
  const [customSkillInput, setCustomSkillInput] = useState('');

  useEffect(() => {
    fetchQuizzesAndHistory();
  }, []);

  const fetchQuizzesAndHistory = async () => {
    try {
      setLoading(true);
      const [quizRes, historyRes] = await Promise.all([
        api.get('/quiz'),
        api.get('/quiz/history'),
      ]);

      if (quizRes.data.success) setQuizzes(quizRes.data.quizzes || []);
      if (historyRes.data.success) setHistory(historyRes.data.attempts || []);
    } catch (err) {
      console.error('Error fetching quiz data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateCustom = (e) => {
    e.preventDefault();
    if (!customSkillInput.trim()) return;
    setActiveQuizSkill(customSkillInput.trim());
    setCustomSkillInput('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-brand-500/20 text-brand-300 border border-brand-500/30">
            Competency Verification Hub
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white font-display">
          AI Skill Checkpoints & Quizzes
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">
          Take assessments to calibrate your skill scores, earn XP points, and trigger adaptive roadmap updates.
        </p>
      </div>

      {/* Dynamic AI Quiz Generator Banner */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-brand-500/30 bg-gradient-to-r from-brand-950/50 via-[#131626] to-cyan-950/40 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1 w-fit">
            <Zap className="w-3.5 h-3.5" />
            Instant AI Question Engine
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white font-display">
            Generate Quiz on Any Skill
          </h2>
          <p className="text-xs text-slate-300 max-w-lg">
            Our AI generates targeted 5-question technical MCQs with granular answer explanations calibrated to your level.
          </p>
        </div>

        <form onSubmit={handleGenerateCustom} className="flex items-center gap-2 w-full md:w-auto">
          <input
            type="text"
            value={customSkillInput}
            onChange={(e) => setCustomSkillInput(e.target.value)}
            placeholder="e.g. Next.js, Redux, Docker, SQL..."
            className="px-4 py-2.5 rounded-xl text-xs bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-brand-400 w-full sm:w-64"
          />
          <button
            type="submit"
            disabled={!customSkillInput.trim()}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-500 text-white shadow-md shadow-brand-600/30 transition-all disabled:opacity-40 cursor-pointer shrink-0"
          >
            Generate Quiz
          </button>
        </form>
      </div>

      {/* Quizzes List Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white font-display">
          Available Checkpoint Quizzes
        </h3>

        {loading ? (
          <div className="py-16 text-center">
            <RefreshCw className="w-8 h-8 text-brand-400 animate-spin mx-auto" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((q) => (
              <div
                key={q._id}
                className="p-6 rounded-2xl glass-card border border-gray-200 dark:border-white/10 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-brand-500/20 text-brand-300 border border-brand-500/30">
                      {q.difficulty}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {q.estimatedMinutes || 10}m
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white font-display line-clamp-1">{q.title}</h4>
                  <p className="text-xs text-slate-300">
                    Skill Focus: <strong className="text-cyan-300">{q.skill}</strong>
                  </p>
                  <p className="text-[11px] text-slate-400">
                    5 Technical MCQs • +100 XP on passing score
                  </p>
                </div>

                <button
                  onClick={() => setActiveQuizSkill(q.skill)}
                  className="w-full py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-brand-600 to-cyan-500 hover:from-brand-500 hover:to-cyan-400 text-white shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Award className="w-4 h-4" />
                  <span>Start Checkpoint</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quiz History Section */}
      {history.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-white/10">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-cyan-400" />
            <h3 className="text-lg font-bold text-white font-display">
              Recent Assessment History & Calibrations
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {history.slice(0, 6).map((item) => (
              <div
                key={item._id}
                className="p-4 rounded-xl glass-card border border-gray-200 dark:border-white/10 flex items-center justify-between gap-3"
              >
                <div>
                  <p className="text-xs font-bold text-white">{item.skill} Assessment</p>
                  <p className="text-[11px] text-slate-400 font-mono">
                    Score: {item.score}% ({item.previousSkillLevel}% → {item.newSkillLevel}%)
                  </p>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                    item.score >= 70
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  }`}
                >
                  {item.score}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quiz Modal */}
      <QuizModal
        skillName={activeQuizSkill}
        isOpen={Boolean(activeQuizSkill)}
        onClose={() => {
          setActiveQuizSkill(null);
          fetchQuizzesAndHistory();
        }}
      />
    </div>
  );
};

export default QuizPage;
