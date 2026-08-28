import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import PageHeader from '../components/common/PageHeader';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/common/Card';
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
  AlertCircle,
  Sparkles,
  Edit3,
  Save,
  Compass
} from 'lucide-react';

const colorMap = {
  emerald: { bg: 'bg-[#34D399]', bgLight: 'bg-[#34D399]/10', text: 'text-[#34D399]', border: 'border-[#34D399]/30' },
  amber:   { bg: 'bg-[#FBBF24]', bgLight: 'bg-[#FBBF24]/10', text: 'text-[#FBBF24]', border: 'border-[#FBBF24]/30' },
  coral:   { bg: 'bg-[#FF6B5F]', bgLight: 'bg-[#FF6B5F]/10', text: 'text-[#FF857A]', border: 'border-[#FF6B5F]/30' },
  blue:    { bg: 'bg-[#38BDF8]', bgLight: 'bg-[#38BDF8]/10', text: 'text-[#38BDF8]', border: 'border-[#38BDF8]/30' },
  slate:   { bg: 'bg-white/20',  bgLight: 'bg-white/5',      text: 'text-[#8C877D]', border: 'border-white/10' },
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
  const { learningPath, loading, adaptRoadmap } = useLearningPath();
  const [expandedPhase, setExpandedPhase] = useState(1);
  const [viewMode, setViewMode] = useState('timeline');
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [goalText, setGoalText] = useState('');
  const [isAdapting, setIsAdapting] = useState(false);

  useEffect(() => {
    if (learningPath) {
      setGoalText(learningPath.goal || 'Full Stack AI Engineer');
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
            <div className="w-10 h-10 border-3 border-[#FF6B5F]/20 border-t-[#FF6B5F] rounded-full animate-spin" />
            <p className="text-[#8C877D] font-medium animate-pulse text-xs">
              Loading your personalized learning path...
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  const currentPhaseData = learningPath.phases?.find(p => p.phaseNumber === learningPath.currentPhase) || learningPath.phases?.[0] || {};

  return (
    <MainLayout>
      <PageHeader
        greeting="AI Roadmap Generation"
        title="My Learning Path"
        description="Personalized, competency-based milestones engineered to reach your target career objective."
        badge="Active Roadmap"
        badgeVariant="coral"
        action={
          <Button
            variant="outline"
            size="sm"
            icon={Sparkles}
            onClick={async () => {
              setIsAdapting(true);
              try {
                await adaptRoadmap({ reason: 'Manual AI path refresh requested' });
              } finally {
                setIsAdapting(false);
              }
            }}
          >
            Re-calibrate with AI
          </Button>
        }
      />

      <div className="flex flex-col xl:flex-row gap-6 max-w-[1500px] mx-auto w-full relative">
        {isAdapting && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center rounded-3xl animate-in fade-in">
            <div className="flex flex-col items-center gap-3 p-6 bg-[#111418] border border-white/10 rounded-2xl shadow-2xl">
              <div className="w-8 h-8 border-3 border-[#FF6B5F]/20 border-t-[#FF6B5F] rounded-full animate-spin" />
              <p className="text-[#FF857A] font-bold text-sm">Recalibrating your roadmap with AI...</p>
            </div>
          </div>
        )}

        {/* Left Column: Main Timeline & Phases */}
        <div className="flex-1 min-w-0 space-y-6">
          {/* Goal & Milestone Header Card */}
          <Card variant="glow" className="flex flex-col sm:flex-row items-start gap-5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF6B5F] to-[#E85548] text-white flex items-center justify-center shrink-0 shadow-lg shadow-[#FF6B5F]/25">
              <Target className="w-7 h-7" />
            </div>

            <div className="flex-1 pt-0.5">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-xs font-bold text-[#8C877D] uppercase tracking-wider">Target Objective:</span>
                {isEditingGoal ? (
                  <input
                    type="text"
                    value={goalText}
                    onChange={(e) => setGoalText(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleSaveGoal(); }}
                    className="text-base font-bold text-[#FF857A] bg-[#16191E] px-3 py-1 rounded-xl border border-[#FF6B5F]/50 focus:outline-none focus:ring-1 focus:ring-[#FF6B5F] w-full max-w-sm"
                    autoFocus
                  />
                ) : (
                  <h2 className="text-base sm:text-lg font-black text-[#FF857A]">{learningPath.goal}</h2>
                )}
              </div>
              <p className="text-xs sm:text-sm text-[#C7C2B6] leading-relaxed max-w-2xl font-medium">
                {learningPath.title}
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              icon={isEditingGoal ? Save : Edit3}
              onClick={() => isEditingGoal ? handleSaveGoal() : setIsEditingGoal(true)}
              className="shrink-0"
            >
              {isEditingGoal ? 'Save' : 'Edit Goal'}
            </Button>
          </Card>

          {/* Timeline Controls & Phases List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#F5F1E8]">Roadmap Phases & Modules</h3>
              <div className="flex items-center gap-1 bg-[#111418] p-1 rounded-xl border border-white/[0.08] text-xs">
                <button
                  onClick={() => setViewMode('timeline')}
                  className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                    viewMode === 'timeline'
                      ? 'bg-[#FF6B5F] text-white shadow-xs'
                      : 'text-[#8C877D] hover:text-[#F5F1E8]'
                  }`}
                >
                  Timeline
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                    viewMode === 'list'
                      ? 'bg-[#FF6B5F] text-white shadow-xs'
                      : 'text-[#8C877D] hover:text-[#F5F1E8]'
                  }`}
                >
                  List
                </button>
              </div>
            </div>

            {/* Phases Loop */}
            <div className="space-y-4">
              {learningPath.phases?.map((phase, index) => {
                const { color, icon: Icon } = getStatusConfig(phase.status);
                const isExpanded = expandedPhase === phase.phaseNumber;
                const colors = colorMap[color] || colorMap.slate;
                const isLast = index === learningPath.phases.length - 1;
                const totalItems = phase.resources?.length || 0;
                const completedItems = phase.resources?.filter(r => r.completed)?.length || 0;

                return (
                  <div key={phase.phaseNumber} className="relative">
                    {viewMode === 'timeline' && !isLast && (
                      <div className="absolute left-[19px] top-12 bottom-[-20px] w-0.5 bg-white/[0.1] z-0" />
                    )}

                    <div className={`flex items-start gap-4 relative z-10 ${viewMode === 'list' ? 'items-center' : ''}`}>
                      {viewMode === 'timeline' && (
                        <div
                          className={`w-10 h-10 mt-3 rounded-2xl flex items-center justify-center shrink-0 border-2 border-[#0B0D0F] ${colors.bg} text-white shadow-md z-10`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                      )}

                      <div
                        className={`flex-1 bg-[#111418] rounded-2xl border ${
                          isExpanded ? `border-l-4 ${colors.border}` : 'border-white/[0.08]'
                        } shadow-lg overflow-hidden transition-all duration-300`}
                      >
                        <div
                          className={`p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between cursor-pointer transition-colors ${
                            isExpanded ? colors.bgLight : 'hover:bg-white/[0.02]'
                          }`}
                          onClick={() => setExpandedPhase(isExpanded ? null : phase.phaseNumber)}
                        >
                          <div className="flex-1 pr-4">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[10px] font-mono font-bold text-[#8C877D] uppercase">
                                Phase {phase.phaseNumber}
                              </span>
                              <h4 className={`text-sm font-bold ${colors.text}`}>{phase.title}</h4>
                              {phase.status === 'completed' && (
                                <Badge variant="success" size="sm">Completed</Badge>
                              )}
                            </div>
                            <p className="text-xs text-[#C7C2B6] font-medium">{phase.description}</p>
                          </div>

                          <div className="flex items-center gap-4 mt-3 sm:mt-0">
                            <div className="text-right">
                              <p className={`text-xs font-black ${colors.text} mb-0.5`}>
                                {phase.completionPercentage || 0}% Complete
                              </p>
                              <p className="text-[10px] text-[#8C877D] font-mono">
                                {completedItems}/{totalItems} modules
                              </p>
                            </div>
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4 text-[#8C877D]" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-[#8C877D]" />
                            )}
                          </div>
                        </div>

                        {/* Expanded Modules List */}
                        {isExpanded && phase.resources?.length > 0 && (
                          <div className="px-5 pb-5 pt-1 bg-[#0E1114] border-t border-white/[0.06]">
                            <ul className="space-y-2.5 mt-3">
                              {phase.resources.map((course, idx) => (
                                <li
                                  key={idx}
                                  onClick={() => navigate('/courses')}
                                  className="flex items-center justify-between p-3 bg-[#16191E] border border-white/[0.06] rounded-xl hover:border-[#FF6B5F]/40 hover:bg-[#1D2128] transition-all cursor-pointer group"
                                >
                                  <div className="flex items-center gap-3">
                                    {course.completed ? (
                                      <CheckCircle2 className="w-4 h-4 text-[#34D399]" />
                                    ) : (
                                      <PlayCircle className="w-4 h-4 text-[#FF6B5F] group-hover:scale-110 transition-transform" />
                                    )}
                                    <span className={`text-xs font-semibold ${
                                      course.completed ? 'text-[#8C877D] line-through' : 'text-[#F5F1E8]'
                                    }`}>
                                      {course.title}
                                    </span>
                                  </div>
                                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-lg ${
                                    course.completed
                                      ? 'bg-[#34D399]/15 text-[#34D399]'
                                      : 'bg-[#FF6B5F]/15 text-[#FF857A]'
                                  }`}>
                                    {course.completed ? 'Passed' : 'Available'}
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
        </div>

        {/* Right Column: Path Metrics & Milestone Summary */}
        <div className="w-full xl:w-80 space-y-6 flex-shrink-0">
          {/* Path Overview Card */}
          <Card variant="default">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#8C877D] mb-4">
              Path Overview
            </h3>
            <ul className="space-y-3.5 text-xs">
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#C7C2B6]">
                  <Clock className="w-4 h-4 text-[#FF6B5F]" />
                  <span>Estimated Duration</span>
                </div>
                <span className="font-bold text-[#F5F1E8]">{learningPath.totalEstimatedWeeks || 8} weeks</span>
              </li>

              <li className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#C7C2B6]">
                  <Book className="w-4 h-4 text-[#FF6B5F]" />
                  <span>Total Phases</span>
                </div>
                <span className="font-bold text-[#F5F1E8]">{learningPath.phases?.length || 5}</span>
              </li>

              <li className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#C7C2B6]">
                  <Briefcase className="w-4 h-4 text-[#FF6B5F]" />
                  <span>Competency Target</span>
                </div>
                <span className="font-bold text-[#FF857A]">Professional</span>
              </li>

              <li className="pt-3 border-t border-white/[0.06]">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-[#C7C2B6] font-medium flex items-center gap-2">
                    <Target className="w-4 h-4 text-[#FF6B5F]" /> Overall Progress
                  </span>
                  <span className="font-black text-[#FF857A]">{learningPath.overallProgress || 68}%</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#FF6B5F] to-[#E85548] h-full rounded-full transition-all duration-500"
                    style={{ width: `${learningPath.overallProgress || 68}%` }}
                  />
                </div>
              </li>
            </ul>
          </Card>

          {/* Upcoming Milestone Card */}
          <Card variant="glow">
            <div className="flex items-center gap-2 mb-3">
              <Flag className="w-4 h-4 text-[#FF6B5F]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#8C877D]">
                Upcoming Milestone
              </h3>
            </div>
            <h4 className="font-bold text-[#F5F1E8] text-sm leading-snug mb-1">
              {currentPhaseData.milestone?.title || currentPhaseData.title || 'Microservices Architecture'}
            </h4>
            <p className="text-xs text-[#C7C2B6] mb-4 leading-relaxed font-medium">
              {currentPhaseData.milestone?.description || currentPhaseData.description || 'Build robust backend architectures.'}
            </p>
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('/courses')}
              className="w-full"
            >
              Continue Learning
            </Button>
          </Card>

          {/* AI Adaptation History */}
          <Card variant="default">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-4 h-4 text-[#FF6B5F]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#8C877D]">
                AI Calibration History
              </h3>
            </div>
            <div className="space-y-3">
              {learningPath.adaptationHistory && learningPath.adaptationHistory.length > 0 ? (
                learningPath.adaptationHistory.slice(-3).reverse().map((history, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#16191E] border border-white/[0.06]">
                    <h4 className="text-xs font-bold text-[#F5F1E8] mb-1">{history.actionTaken}</h4>
                    <p className="text-[10px] text-[#C7C2B6] mb-1">{history.reason}</p>
                    <span className="text-[9px] text-[#8C877D] font-mono">
                      {new Date(history.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-[#8C877D]">Your path is currently optimal. No adaptations needed yet.</p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
