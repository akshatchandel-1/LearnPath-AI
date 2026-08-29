import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import PageHeader from '../components/common/PageHeader';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/common/Card';
import { useLearningPath } from '../context/LearningPathContext';
import { useAuth } from '../context/AuthContext';
import { CAREER_OBJECTIVES } from '../data/careerObjectives';
import {
  Target,
  Book,
  Clock,
  Briefcase,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Lock,
  PlayCircle,
  AlertCircle,
  Sparkles,
  Edit3,
  Save,
  Flag,
  Lightbulb,
  ArrowRight,
  Compass
} from 'lucide-react';

const colorMap = {
  emerald: { bg: 'bg-[#34D399]', bgLight: 'bg-[#34D399]/10', text: 'text-[#34D399]', border: 'border-[#34D399]/40' },
  coral:   { bg: 'bg-[#FF6B5F]', bgLight: 'bg-[#FF6B5F]/10', text: 'text-[#FF857A]', border: 'border-[#FF6B5F]/40' },
  amber:   { bg: 'bg-[#FBBF24]', bgLight: 'bg-[#FBBF24]/10', text: 'text-[#FBBF24]', border: 'border-[#FBBF24]/40' },
  blue:    { bg: 'bg-[#38BDF8]', bgLight: 'bg-[#38BDF8]/10', text: 'text-[#38BDF8]', border: 'border-[#38BDF8]/40' },
  slate:   { bg: 'bg-gray-200 dark:bg-white/20',  bgLight: 'bg-gray-100 dark:bg-white/[0.04]', text: 'text-gray-500 dark:text-[#8C877D]', border: 'border-gray-200 dark:border-white/10' },
};

const getStatusConfig = (status) => {
  switch (status) {
    case 'completed': return { color: 'emerald', icon: CheckCircle2 };
    case 'in-progress': return { color: 'coral', icon: PlayCircle };
    case 'available': return { color: 'blue', icon: Book };
    case 'reinforce': return { color: 'amber', icon: AlertCircle };
    case 'locked':
    default: return { color: 'slate', icon: Lock };
  }
};

export default function LearningPathPage() {
  const navigate = useNavigate();
  const { user, updateUserProfile } = useAuth();
  const { learningPath, adaptRoadmap } = useLearningPath();
  const [expandedPhase, setExpandedPhase] = useState(2);
  const [viewMode, setViewMode] = useState('timeline');
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [goalText, setGoalText] = useState('');
  const [isAdapting, setIsAdapting] = useState(false);
  const [adaptSuccessMsg, setAdaptSuccessMsg] = useState('');

  const activeRole = user?.targetRole || user?.careerGoal || learningPath?.goal || 'Full Stack Developer';

  useEffect(() => {
    if (learningPath) {
      setGoalText(learningPath.goal || activeRole);
      setExpandedPhase(learningPath.currentPhase || 2);
    }
  }, [learningPath, activeRole]);

  const handleSaveGoal = async () => {
    setIsEditingGoal(false);
    if (goalText && goalText !== learningPath?.goal) {
      setIsAdapting(true);
      try {
        await adaptRoadmap({ reason: 'User updated career goal', goal: goalText });
        if (updateUserProfile) {
          updateUserProfile({ targetRole: goalText, careerGoal: goalText });
        }
        setAdaptSuccessMsg(`Roadmap recalibrated for ${goalText}!`);
        setTimeout(() => setAdaptSuccessMsg(''), 4000);
      } catch (err) {
        console.error('Failed to update goal', err);
      } finally {
        setIsAdapting(false);
      }
    }
  };

  const handleRecalibrate = async () => {
    setIsAdapting(true);
    try {
      await adaptRoadmap({ reason: 'Manual AI path optimization requested', goal: goalText || activeRole });
      setAdaptSuccessMsg('Curriculum milestones synchronized with your current telemetry!');
      setTimeout(() => setAdaptSuccessMsg(''), 4000);
    } finally {
      setIsAdapting(false);
    }
  };

  const pathData = learningPath || {
    goal: activeRole,
    title: `${activeRole} Personalized Engineering Roadmap`,
    totalEstimatedWeeks: 12,
    overallProgress: 65,
    currentPhase: 2,
    phases: [],
    adaptationHistory: []
  };

  const currentPhaseData = pathData.phases?.find(p => p.phaseNumber === pathData.currentPhase) || pathData.phases?.[0] || {};

  return (
    <MainLayout>
      <PageHeader
        greeting="Adaptive Curriculum Engine"
        title="My Learning Path"
        description="Personalized, competency-based milestones engineered to reach your target engineering objective."
        badge="Active Roadmap"
        badgeVariant="coral"
        action={
          <Button
            variant="outline"
            size="sm"
            icon={Sparkles}
            onClick={handleRecalibrate}
          >
            Re-calibrate with AI
          </Button>
        }
      />

      <div className="flex flex-col xl:flex-row gap-6 max-w-[1500px] mx-auto w-full relative pb-10">
        {isAdapting && (
          <div className="absolute inset-0 bg-white/80 dark:bg-black/80 backdrop-blur-md z-50 flex items-center justify-center rounded-3xl animate-in fade-in">
            <div className="flex flex-col items-center gap-3 p-6 bg-white dark:bg-[#111418] border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl">
              <div className="w-8 h-8 border-3 border-[#FF6B5F]/20 border-t-[#FF6B5F] rounded-full animate-spin" />
              <p className="text-[#FF857A] font-bold text-sm">Recalibrating your roadmap with AI...</p>
            </div>
          </div>
        )}

        {/* ── Left Column (Main Content) ── */}
        <div className="flex-1 min-w-0 space-y-6">
          
          {adaptSuccessMsg && (
            <div className="p-3.5 rounded-xl bg-[#34D399]/15 border border-[#34D399]/30 text-xs text-[#34D399] font-bold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{adaptSuccessMsg}</span>
            </div>
          )}

          {/* Goal & Milestone Header Card */}
          <Card variant="glow" className="flex flex-col sm:flex-row items-start gap-5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF6B5F] to-[#E85548] text-white flex items-center justify-center shrink-0 shadow-lg shadow-[#FF6B5F]/25">
              <Target className="w-7 h-7" />
            </div>

            <div className="flex-1 pt-0.5">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-xs font-bold text-gray-500 dark:text-[#8C877D] uppercase tracking-wider">Target Objective:</span>
                {isEditingGoal ? (
                  <select
                    value={goalText}
                    onChange={(e) => setGoalText(e.target.value)}
                    className="text-sm font-black text-[#FF857A] bg-gray-50 dark:bg-[#16191E] px-3 py-1.5 rounded-xl border border-[#FF6B5F]/40 focus:outline-none focus:ring-2 focus:ring-[#FF6B5F] w-full max-w-sm cursor-pointer"
                  >
                    {CAREER_OBJECTIVES.map((obj) => (
                      <option key={obj} value={obj} className="bg-white dark:bg-[#111418] text-gray-900 dark:text-[#F5F1E8]">
                        {obj}
                      </option>
                    ))}
                  </select>
                ) : (
                  <h2 className="text-base sm:text-lg font-black text-[#FF857A]">{pathData.goal}</h2>
                )}
              </div>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-[#C7C2B6] leading-relaxed max-w-2xl">
                {pathData.title}
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              icon={isEditingGoal ? Save : Edit3}
              onClick={() => isEditingGoal ? handleSaveGoal() : setIsEditingGoal(true)}
            >
              {isEditingGoal ? 'Save Goal' : 'Edit Goal'}
            </Button>
          </Card>

          {/* Timeline View Section */}
          <div className="relative pl-3 pb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Badge variant="coral" size="sm" dot>Curriculum Phases</Badge>
                <span className="text-xs text-gray-500 dark:text-[#8C877D] font-mono">{pathData.phases?.length || 4} Total Stages</span>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-[#8C877D]">
                <span>View as:</span>
                <div className="flex bg-white dark:bg-[#111418] p-1 rounded-xl border border-gray-200 dark:border-white/[0.08]">
                  <button 
                    onClick={() => setViewMode('timeline')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${viewMode === 'timeline' ? 'bg-[#FF6B5F] text-white shadow-md shadow-[#FF6B5F]/20' : 'text-gray-500 dark:text-[#8C877D] hover:text-gray-900 dark:hover:text-[#F5F1E8]'}`}
                  >
                    Timeline
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${viewMode === 'list' ? 'bg-[#FF6B5F] text-white shadow-md shadow-[#FF6B5F]/20' : 'text-gray-500 dark:text-[#8C877D] hover:text-gray-900 dark:hover:text-[#F5F1E8]'}`}
                  >
                    List
                  </button>
                </div>
              </div>
            </div>

            {pathData.phases?.map((phase, index) => {
              const { color, icon: Icon } = getStatusConfig(phase.status);
              const isExpanded = expandedPhase === phase.phaseNumber;
              const colors = colorMap[color];
              const isLast = index === pathData.phases.length - 1;
              const totalItems = phase.resources?.length || 0;
              const completedItems = phase.resources?.filter(r => r.completed)?.length || 0;

              return (
                <div key={phase.phaseNumber} className="relative mb-4">
                  {viewMode === 'timeline' && !isLast && (
                    <div className="absolute left-[15px] top-10 bottom-[-24px] w-0.5 bg-gray-200 dark:bg-white/[0.08] z-0" />
                  )}
                  <div className={`flex items-start gap-4 relative z-10 ${viewMode === 'list' ? 'items-center' : ''}`}>
                    {viewMode === 'timeline' && (
                      <div className={`w-8 h-8 mt-4 rounded-full flex items-center justify-center shrink-0 border-2 border-[#0B0D0F] ${colors.bg} text-[#0B0D0F] shadow-lg shadow-black/50 z-10 font-bold`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div className={`flex-1 bg-white dark:bg-[#111418] rounded-2xl border ${isExpanded ? `border-l-4 ${colors.border}` : 'border-gray-200 dark:border-white/[0.08]'} shadow-sm overflow-hidden transition-all duration-300`}>
                      <div
                        className={`p-5 flex flex-col sm:flex-row sm:items-center justify-between cursor-pointer transition-colors ${isExpanded ? 'bg-gray-50 dark:bg-[#16191E]' : 'hover:bg-gray-50 dark:hover:bg-white/[0.02]'}`}
                        onClick={() => setExpandedPhase(isExpanded ? null : phase.phaseNumber)}
                      >
                        <div className="flex-1 pr-4">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className={`text-sm sm:text-base font-bold ${colors.text}`}>{phase.title}</h4>
                            {phase.status === 'completed' && (
                              <span className="bg-[#34D399]/15 text-[#34D399] border border-[#34D399]/30 text-[9px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
                                #COMPLETED
                              </span>
                            )}
                            {phase.status === 'in-progress' && (
                              <span className="bg-[#FF6B5F]/15 text-[#FF857A] border border-[#FF6B5F]/30 text-[9px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
                                #ACTIVE
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 dark:text-[#8C877D] leading-relaxed">{phase.description}</p>
                        </div>
                        <div className="flex items-center gap-6 mt-3 sm:mt-0 shrink-0">
                          <div className="text-right">
                            <p className={`text-xs font-bold ${colors.text} mb-0.5 font-mono`}>{phase.completionPercentage || 0}% Complete</p>
                            <p className="text-[10px] text-gray-500 dark:text-[#8C877D]">{completedItems}/{totalItems} resources</p>
                          </div>
                          {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-500 dark:text-[#8C877D]" /> : <ChevronDown className="w-4 h-4 text-gray-500 dark:text-[#8C877D]" />}
                        </div>
                      </div>

                      {isExpanded && phase.resources?.length > 0 && (
                        <div className="px-5 pb-5 pt-2 bg-gray-50 dark:bg-[#0E1114] border-t border-gray-200 dark:border-white/[0.06]">
                          <ul className="space-y-2.5 mt-2">
                            {phase.resources.map((course, idx) => (
                              <li
                                key={idx}
                                className="flex items-center justify-between p-3 bg-white dark:bg-[#111418] border border-gray-200 dark:border-white/[0.06] rounded-xl hover:border-[#FF6B5F]/30 hover:bg-gray-50 dark:hover:bg-[#16191E] transition-all cursor-pointer group"
                                onClick={() => navigate('/courses')}
                              >
                                <div className="flex items-center gap-3">
                                  {course.completed ? (
                                    <CheckCircle2 className="w-4 h-4 text-[#34D399]" />
                                  ) : (
                                    <PlayCircle className="w-4 h-4 text-[#FF857A] group-hover:scale-110 transition-transform" />
                                  )}
                                  <span className={`text-xs font-semibold ${!course.completed ? 'text-gray-900 dark:text-[#F5F1E8]' : 'text-gray-500 dark:text-[#8C877D] line-through'}`}>
                                    {course.title}
                                  </span>
                                </div>
                                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-lg font-mono ${course.completed ? 'bg-[#34D399]/15 text-[#34D399]' : 'bg-[#FF6B5F]/15 text-[#FF857A]'}`}>
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
          {/* Path Overview Card */}
          <Card variant="default">
            <h3 className="text-sm font-bold text-gray-900 dark:text-[#F5F1E8] mb-4">Roadmap Overview</h3>
            <ul className="space-y-3.5">
              <li className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-gray-500 dark:text-[#8C877D]">
                  <Clock className="w-4 h-4 text-[#FF6B5F]" /> Estimated Time
                </div>
                <span className="font-bold text-gray-900 dark:text-[#F5F1E8] font-mono">{pathData.totalEstimatedWeeks} weeks</span>
              </li>
              <li className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-gray-500 dark:text-[#8C877D]">
                  <Book className="w-4 h-4 text-[#FF6B5F]" /> Total Phases
                </div>
                <span className="font-bold text-gray-900 dark:text-[#F5F1E8] font-mono">{pathData.phases?.length || 4}</span>
              </li>
              <li className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-gray-500 dark:text-[#8C877D]">
                  <Briefcase className="w-4 h-4 text-[#FF6B5F]" /> Goal Level
                </div>
                <span className="font-bold text-gray-900 dark:text-[#F5F1E8]">Professional</span>
              </li>
              <li className="pt-3 mt-3 border-t border-gray-200 dark:border-white/[0.06]">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-gray-500 dark:text-[#8C877D] flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-[#FF6B5F]" /> Current Progress
                  </span>
                  <span className="font-black text-[#FF857A] font-mono">{pathData.overallProgress}%</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-white/5 rounded-full h-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-[#FF6B5F] to-[#E85548] h-full rounded-full transition-all duration-500" style={{ width: `${pathData.overallProgress}%` }} />
                </div>
              </li>
            </ul>
          </Card>

          {/* Upcoming Milestone Card */}
          <Card variant="glow">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-[#FF6B5F]/15 text-[#FF857A] flex items-center justify-center">
                <Flag className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-[#F5F1E8]">Upcoming Milestone</h3>
            </div>
            <h4 className="font-bold text-gray-900 dark:text-[#F5F1E8] text-sm leading-snug mb-1.5">
              {currentPhaseData.milestone?.title || currentPhaseData.title}
            </h4>
            <p className="text-xs text-gray-500 dark:text-[#8C877D] mb-4 leading-relaxed">
              {currentPhaseData.milestone?.description || currentPhaseData.description}
            </p>
            <div className="text-[11px] text-gray-500 dark:text-[#8C877D] mb-4">
              Expected Duration: <span className="font-bold text-[#FF857A] font-mono">{currentPhaseData.estimatedWeeks || 3} weeks</span>
            </div>
            <Button
              variant="primary"
              size="sm"
              className="w-full"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => navigate('/courses')}
            >
              Continue Learning
            </Button>
          </Card>

          {/* Adaptation History Card */}
          <Card variant="default">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-4 h-4 text-[#FBBF24]" />
              <h3 className="text-sm font-bold text-gray-900 dark:text-[#F5F1E8]">AI Adaptation Log</h3>
            </div>
            <div className="space-y-3">
              {pathData.adaptationHistory && pathData.adaptationHistory.length > 0 ? (
                pathData.adaptationHistory.slice(0, 3).map((history, idx) => (
                  <div key={idx} className="flex flex-col border border-gray-200 dark:border-white/[0.06] p-3 rounded-xl bg-gray-50 dark:bg-[#0E1114]">
                    <h4 className="text-xs font-bold text-gray-900 dark:text-[#F5F1E8] leading-tight mb-1">{history.actionTaken}</h4>
                    <p className="text-[11px] text-gray-500 dark:text-[#8C877D] mb-1 leading-relaxed">{history.reason}</p>
                    <span className="text-[9px] text-[#FF857A] font-mono mt-0.5">{new Date(history.timestamp).toLocaleDateString()}</span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-500 dark:text-[#8C877D]">Your path is currently optimal. No adaptations needed yet.</p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
