import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { useLearningPath } from '../context/LearningPathContext';
import {
  Target,
  Book,
  BarChart2,
  Cpu,
  Star,
  Briefcase,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Lock,
  Clock,
  Flag,
  PlayCircle,
  Lightbulb,
  AlertCircle
} from 'lucide-react';

const colorMap = {
  emerald: { bg: 'bg-emerald-500', bgLight: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  amber:   { bg: 'bg-amber-500',   bgLight: 'bg-amber-50',   text: 'text-amber-700',   border: 'border-amber-200' },
  blue:    { bg: 'bg-blue-500',    bgLight: 'bg-blue-50',    text: 'text-blue-700',    border: 'border-blue-200' },
  violet:  { bg: 'bg-violet-500',  bgLight: 'bg-violet-50',  text: 'text-violet-700',  border: 'border-violet-200' },
  rose:    { bg: 'bg-rose-500',    bgLight: 'bg-rose-50',    text: 'text-rose-700',    border: 'border-rose-200' },
  slate:   { bg: 'bg-slate-400',   bgLight: 'bg-slate-50',   text: 'text-slate-700',   border: 'border-slate-200' },
};

const getStatusConfig = (status) => {
  switch (status) {
    case 'completed': return { color: 'emerald', icon: CheckCircle2 };
    case 'in-progress': return { color: 'blue', icon: PlayCircle };
    case 'available': return { color: 'violet', icon: Book };
    case 'reinforce': return { color: 'amber', icon: AlertCircle };
    case 'locked':
    default: return { color: 'slate', icon: Lock };
  }
};

export default function LearningPathPage() {
  const navigate = useNavigate();
  const { learningPath, loading, adaptRoadmap } = useLearningPath();
  const [expandedPhase, setExpandedPhase] = useState(1);
  const [viewMode, setViewMode] = useState('timeline');
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [goalText, setGoalText] = useState('');
  const [isAdapting, setIsAdapting] = useState(false);

  useEffect(() => {
    if (learningPath) {
      setGoalText(learningPath.goal || 'Loading goal...');
      setExpandedPhase(learningPath.currentPhase || 1);
    }
  }, [learningPath]);

  const handleSaveGoal = async () => {
    setIsEditingGoal(false);
    if (goalText !== learningPath?.goal) {
      setIsAdapting(true);
      try {
        await adaptRoadmap({ reason: 'User updated career goal', goal: goalText });
      } catch (err) {
        console.error('Failed to update goal', err);
      } finally {
        setIsAdapting(false);
      }
    }
  };

  if (loading || !learningPath) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-full min-h-[60vh]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin"></div>
            <p className="text-slate-500 font-medium animate-pulse">Loading your personalized path...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  const currentPhaseData = learningPath.phases.find(p => p.phaseNumber === learningPath.currentPhase) || learningPath.phases[0];

  return (
    <MainLayout>
      <div className="flex flex-col xl:flex-row gap-6 max-w-[1400px] mx-auto w-full relative">
      {isAdapting && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-50 flex items-center justify-center rounded-2xl">
          <div className="flex flex-col items-center gap-3">
             <div className="w-8 h-8 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin"></div>
             <p className="text-violet-700 font-medium">Recalibrating your roadmap...</p>
          </div>
        </div>
      )}
      {/* ── Left Column (Main Content) ── */}
      <div className="flex-1 min-w-0">
        
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold text-slate-900">My Learning Path</h1>
            <span className="bg-violet-100 text-violet-700 text-[10px] font-mono px-2 py-0.5 rounded-full">#EDE9FE</span>
          </div>
          <p className="text-sm text-slate-500">Personalized roadmap to help you achieve your goals</p>
        </div>

        {/* Goal Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 mb-8 flex items-start gap-5">
          <div className="w-14 h-14 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center shrink-0">
            <Target className="w-7 h-7" />
          </div>
          <div className="flex-1 pt-1">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-lg font-bold text-slate-900">Goal: </h2>
              {isEditingGoal ? (
                <input 
                  type="text" 
                  value={goalText}
                  onChange={(e) => setGoalText(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleSaveGoal(); }}
                  className="text-lg font-bold text-violet-700 bg-violet-50 px-2 py-0.5 rounded border border-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-500 w-full max-w-sm"
                  autoFocus
                />
              ) : (
                <h2 className="text-lg font-bold text-violet-700">{learningPath.goal}</h2>
              )}
            </div>
            <p className="text-sm text-slate-500 leading-relaxed max-w-2xl">
              {learningPath.title}
            </p>
          </div>
          <button 
            onClick={() => isEditingGoal ? handleSaveGoal() : setIsEditingGoal(true)}
            className="hidden sm:block px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-50 transition-colors"
          >
            {isEditingGoal ? 'Save Goal' : 'Edit Goal'}
          </button>
        </div>

        {/* Timeline View */}
        <div className="relative pl-3 pb-10">
          <div className="flex items-center justify-end mb-4">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>View as:</span>
              <div className="flex bg-white p-1 rounded-lg border border-slate-200">
                <button 
                  onClick={() => setViewMode('timeline')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-colors ${viewMode === 'timeline' ? 'bg-violet-50 text-violet-700 font-medium' : 'hover:bg-slate-50'}`}
                >
                  Timeline
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-colors ${viewMode === 'list' ? 'bg-violet-50 text-violet-700 font-medium' : 'hover:bg-slate-50'}`}
                >
                  List
                </button>
              </div>
            </div>
          </div>

          {learningPath.phases.map((phase, index) => {
            const { color, icon: Icon } = getStatusConfig(phase.status);
            const isExpanded = expandedPhase === phase.phaseNumber;
            const colors = colorMap[color];
            const isLast = index === learningPath.phases.length - 1;
            const totalItems = phase.resources?.length || 0;
            const completedItems = phase.resources?.filter(r => r.completed)?.length || 0;

            return (
              <div key={phase.phaseNumber} className="relative mb-4">
                {viewMode === 'timeline' && !isLast && <div className="absolute left-[15px] top-10 bottom-[-24px] w-0.5 bg-slate-200 z-0"></div>}
                <div className={`flex items-start gap-4 relative z-10 ${viewMode === 'list' ? 'items-center' : ''}`}>
                  {viewMode === 'timeline' && (
                    <div className={`w-8 h-8 mt-4 rounded-full flex items-center justify-center shrink-0 border-4 border-[#F4F7FE] ${colors.bg} text-white shadow-sm z-10`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                  )}
                  <div className={`flex-1 bg-white rounded-xl border ${isExpanded ? `border-l-4 ${colors.border}` : 'border-slate-200'} shadow-sm overflow-hidden transition-all duration-300`}>
                    <div className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between cursor-pointer transition-colors ${isExpanded ? colors.bgLight : 'hover:bg-slate-50'}`} onClick={() => setExpandedPhase(isExpanded ? null : phase.phaseNumber)}>
                      <div className="flex-1 pr-4">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className={`text-sm font-bold ${colors.text}`}>{phase.title}</h4>
                          {isExpanded && phase.status === 'completed' && <span className="bg-emerald-100 text-emerald-700 text-[9px] font-mono px-1.5 py-0.5 rounded uppercase tracking-wider">#COMPLETED</span>}
                        </div>
                        <p className="text-xs text-slate-500">{phase.description}</p>
                      </div>
                      <div className="flex items-center gap-6 mt-3 sm:mt-0">
                        <div className="text-right">
                          <p className={`text-[11px] font-bold ${colors.text} mb-0.5`}>{phase.completionPercentage || 0}% Complete</p>
                          <p className="text-[10px] text-slate-400">{completedItems}/{totalItems} resources</p>
                        </div>
                        {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                      </div>
                    </div>
                    {isExpanded && phase.resources?.length > 0 && (
                      <div className="px-5 pb-5 pt-1 bg-white">
                        <ul className="space-y-2 mt-3">
                          {phase.resources.map((course, idx) => (
                            <li key={idx} className="flex items-center justify-between p-2.5 bg-slate-50/50 border border-slate-100 rounded-lg hover:border-slate-200 hover:bg-slate-50 transition-all cursor-pointer">
                              <div className="flex items-center gap-2.5">
                                {course.completed ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <PlayCircle className="w-4 h-4 text-indigo-400" />}
                                <span className={`text-xs font-medium ${!course.completed ? 'text-slate-700' : 'text-slate-500'}`}>{course.title}</span>
                              </div>
                              <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${course.completed ? 'bg-emerald-50 text-emerald-600' : 'bg-indigo-50 text-indigo-600'}`}>
                                {course.completed ? 'Completed' : 'Available'}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Right Column (Sidebar Widgets) ── */}
      <div className="w-full xl:w-80 space-y-6 flex-shrink-0">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-sm font-bold text-slate-900 mb-5">Path Overview</h3>
          <ul className="space-y-3">
            <li className="flex items-center justify-between text-xs"><div className="flex items-center gap-2 text-slate-500"><Clock className="w-4 h-4" /> Estimated Time</div><span className="font-semibold text-slate-800">{learningPath.totalEstimatedWeeks} weeks</span></li>
            <li className="flex items-center justify-between text-xs"><div className="flex items-center gap-2 text-slate-500"><Book className="w-4 h-4" /> Total Phases</div><span className="font-semibold text-slate-800">{learningPath.phases.length}</span></li>
            <li className="flex items-center justify-between text-xs"><div className="flex items-center gap-2 text-slate-500"><Briefcase className="w-4 h-4" /> Goal Level</div><span className="font-semibold text-slate-800">Professional</span></li>
            <li className="pt-4 mt-3 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-slate-500 flex items-center gap-2"><Target className="w-4 h-4"/> Current Progress</span><span className="font-bold text-violet-700">{learningPath.overallProgress}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5">
                <div className="bg-violet-600 h-1.5 rounded-full" style={{ width: `${learningPath.overallProgress}%` }}></div>
              </div>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 mb-4">
            <Flag className="w-5 h-5 text-violet-600" />
            <h3 className="text-sm font-bold text-slate-900">Upcoming Milestone</h3>
          </div>
          <h4 className="font-bold text-slate-800 text-sm leading-snug mb-1">{currentPhaseData.milestone?.title || currentPhaseData.title}</h4>
          <p className="text-xs text-slate-500 mb-4 leading-relaxed">{currentPhaseData.milestone?.description || currentPhaseData.description}</p>
          <div className="text-[11px] text-slate-500 mb-4">Expected: <span className="font-semibold text-slate-700">{currentPhaseData.estimatedWeeks} weeks</span></div>
          <button 
            onClick={() => navigate('/courses')}
            className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs py-2.5 rounded-lg transition-colors shadow-sm"
          >
            Continue Learning
          </button>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 mb-5">
            <Lightbulb className="w-4 h-4 text-slate-400" />
            <h3 className="text-sm font-bold text-slate-900">Adaptation History</h3>
          </div>
          <div className="space-y-4">
            {learningPath.adaptationHistory && learningPath.adaptationHistory.length > 0 ? (
              learningPath.adaptationHistory.slice(-3).reverse().map((history, idx) => (
                <div key={idx} className="flex flex-col border border-slate-100 p-3 rounded-xl bg-slate-50/50">
                  <h4 className="text-[11px] font-bold text-slate-800 leading-tight mb-1">{history.actionTaken}</h4>
                  <p className="text-[9px] text-slate-500 mb-1">{history.reason}</p>
                  <span className="text-[8px] text-slate-400 font-mono mt-1">{new Date(history.timestamp).toLocaleDateString()}</span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500">Your path is currently optimal. No adaptations needed yet.</p>
            )}
          </div>
        </div>
      </div>
      </div>
    </MainLayout>
  );
}
