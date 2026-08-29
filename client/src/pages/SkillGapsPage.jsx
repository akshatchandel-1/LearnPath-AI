import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import PageHeader from '../components/common/PageHeader';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/common/Card';
import { useLearningPath, defaultSkillGapReport, defaultRecommendations } from '../context/LearningPathContext';
import { useAuth } from '../context/AuthContext';
import { generateSkillGapReportPDF } from '../utils/reportGenerator';
import {
  Download,
  RotateCcw,
  Target,
  CheckCircle2,
  AlertOctagon,
  TrendingUp,
  Calendar,
  Filter,
  Info,
  Lightbulb,
  Sparkles,
  BookOpen,
  Code2,
  PieChart,
  BrainCircuit,
  Database,
  BarChart,
  Plus,
  ArrowRight
} from 'lucide-react';

const getSkillIcon = (category) => {
  if (!category) return Code2;
  const lower = category.toLowerCase();
  if (lower.includes('data') || lower.includes('database') || lower.includes('sql')) return Database;
  if (lower.includes('machine learning') || lower.includes('ai') || lower.includes('model')) return BrainCircuit;
  if (lower.includes('visual')) return BarChart;
  if (lower.includes('stat') || lower.includes('math')) return PieChart;
  if (lower.includes('deep')) return Sparkles;
  return Code2;
};

const getPriorityColor = (priority) => {
  if (priority === 'High') return { bg: 'bg-[#FF6B5F]/15', text: 'text-[#FF857A]', border: 'border-[#FF6B5F]/30' };
  if (priority === 'Medium') return { bg: 'bg-[#FBBF24]/15', text: 'text-[#FBBF24]', border: 'border-[#FBBF24]/30' };
  return { bg: 'bg-[#38BDF8]/15', text: 'text-[#38BDF8]', border: 'border-[#38BDF8]/30' };
};

import SkillRadarChart from '../components/skillGap/SkillRadarChart';

export default function SkillGapsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { skillGapReport, recommendations } = useLearningPath();
  const [addedCourses, setAddedCourses] = useState({});

  const activeTargetRole = user?.targetRole || user?.careerGoal || skillGapReport?.targetRole || 'Full Stack Developer';
  const report = skillGapReport || defaultSkillGapReport;
  const recs = (recommendations && recommendations.length > 0) ? recommendations : defaultRecommendations;

  const { readinessScore, gaps = [], criticalGaps = [], currentSkills = [], missingSkills = [] } = report;

  // Adapter for SkillRadarChart
  const radarSkills = useMemo(() => {
    // If backend returns currentSkills and missingSkills
    if (currentSkills.length > 0 || missingSkills.length > 0) {
      const mergedMap = {};
      
      currentSkills.forEach(s => {
        mergedMap[s.name] = {
          name: s.name,
          currentLevel: s.level || 0,
          targetLevel: s.targetLevel || 85
        };
      });
      
      missingSkills.forEach(s => {
        if (mergedMap[s.name]) {
          mergedMap[s.name].targetLevel = s.requiredLevel || mergedMap[s.name].targetLevel;
        } else {
          mergedMap[s.name] = {
            name: s.name,
            currentLevel: 0,
            targetLevel: s.requiredLevel || 85
          };
        }
      });
      
      return Object.values(mergedMap);
    }
    
    // Fallback to legacy mock data structure
    if (gaps.length > 0) {
      return gaps.map(g => ({
        name: g.skill,
        currentLevel: g.currentLevel,
        targetLevel: g.targetLevel
      }));
    }
    
    return [];
  }, [currentSkills, missingSkills, gaps]);
  
  const highPriorityCount = criticalGaps?.length || gaps.filter(g => g.priority === 'High').length;
  const strongSkillsCount = gaps.filter(g => (g.currentLevel || 0) >= 75).length;
  const gapSkillsCount = gaps.filter(g => (g.currentLevel || 0) < 75).length;

  const handleAddCourse = (idx, rec) => {
    setAddedCourses(prev => ({ ...prev, [idx]: true }));

    // Enroll in course in localStorage
    try {
      const savedCourses = localStorage.getItem('m3_courses_data');
      if (savedCourses) {
        const parsed = JSON.parse(savedCourses);
        const match = parsed.find(c => c.title.toLowerCase().includes(rec.title.toLowerCase()) || rec.title.toLowerCase().includes(c.title.toLowerCase()));
        if (match) {
          const updated = parsed.map(c => c.id === match.id ? { ...c, enrolled: true, progress: c.progress || 10 } : c);
          localStorage.setItem('m3_courses_data', JSON.stringify(updated));
        }
      }
    } catch (e) {}
  };

  const handleDownload = () => {
    generateSkillGapReportPDF(report, user);
  };

  const dynamicStats = [
    {
      title: 'Overall Skill Match',
      value: `${readinessScore || 68}%`,
      subText: 'vs target role requirements',
      icon: Target,
      color: 'coral'
    },
    {
      title: 'Strong Competencies',
      value: strongSkillsCount,
      subText: 'Ready for production',
      icon: CheckCircle2,
      color: 'emerald'
    },
    {
      title: 'Identified Skill Gaps',
      value: gapSkillsCount,
      subText: 'Needs reinforcement',
      icon: AlertOctagon,
      color: 'amber'
    },
    {
      title: 'High Priority Focus',
      value: highPriorityCount,
      subText: 'Critical bottleneck areas',
      icon: TrendingUp,
      color: 'coral'
    },
    {
      title: 'Sync Status',
      value: 'Live',
      subText: 'Real-time AI telemetry',
      icon: Calendar,
      color: 'blue'
    }
  ];

  return (
    <MainLayout>
      <PageHeader
        greeting="Competency Disparity Telemetry"
        title="Skill Gap Analysis"
        description="Identify exact competency deltas against industry benchmark profiles and bridge gaps with targeted curriculum."
        badge="Live Telemetry"
        badgeVariant="coral"
        action={
          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              icon={RotateCcw}
              onClick={() => navigate('/assessments')}
            >
              Take Skill Assessment
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={Download}
              onClick={handleDownload}
            >
              Download Report
            </Button>
          </div>
        }
      />

      <div className="max-w-[1500px] mx-auto w-full space-y-6 pb-8">
        
        {/* ── Top Metric Stats Row ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {dynamicStats.map((stat, idx) => (
            <Card key={idx} variant="interactive">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-gray-500 dark:text-[#8C877D] uppercase tracking-wider">{stat.title}</span>
                <div className="w-8 h-8 rounded-xl bg-[#FF6B5F]/10 border border-[#FF6B5F]/20 text-[#FF6B5F] flex items-center justify-center">
                  <stat.icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-gray-900 dark:text-[#F5F1E8] tracking-tight mb-1 font-mono">{stat.value}</div>
              <p className="text-xs text-gray-500 dark:text-[#8C877D]">{stat.subText}</p>
            </Card>
          ))}
        </div>

        {/* ── Main Content Split ── */}
        <div className="flex flex-col xl:flex-row gap-6">
          
          {/* ── Left Column: Skills Breakdown & Course Bridges ── */}
          <div className="flex-1 min-w-0 space-y-6">
            
            {/* Skills Breakdown Table Card */}
            <Card variant="glow">
              <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-white/[0.08] mb-4">
                <div>
                  <CardTitle className="text-gray-900 dark:text-[#F5F1E8]">Competency Breakdown Matrix</CardTitle>
                  <p className="text-xs text-gray-500 dark:text-[#8C877D]">Disparity between verified level and {activeTargetRole} benchmark</p>
                </div>
                <Badge variant="coral" size="sm">{activeTargetRole}</Badge>
              </div>

              <div className="space-y-3.5">
                {gaps.map((item, idx) => {
                  const pColors = getPriorityColor(item.priority);
                  const Icon = getSkillIcon(item.category);
                  const curr = item.currentLevel || 50;
                  const req = item.targetLevel || 85;

                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white dark:bg-[#111418] border border-gray-200 dark:border-white/[0.06] hover:border-white/15 transition-all space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[#FF857A] flex items-center justify-center shrink-0">
                            <Icon className="w-4.5 h-4.5" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-gray-900 dark:text-[#F5F1E8]">{item.skill}</h4>
                            <span className="text-[11px] text-gray-500 dark:text-[#8C877D] font-mono">{item.category} Domain</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className={`px-2.5 py-0.5 rounded-lg text-xs font-bold font-mono ${pColors.bg} ${pColors.text} border ${pColors.border}`}>
                            {item.priority} Priority
                          </span>
                          <span className="text-xs text-[#FF857A] font-bold font-mono">
                            Gap: {item.gapDisparity || `${req - curr}%`}
                          </span>
                        </div>
                      </div>

                      {/* Progress Bar Comparison */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] text-gray-500 dark:text-[#8C877D]">
                          <span>Current: <strong className="text-gray-900 dark:text-[#F5F1E8] font-mono">{curr}%</strong></span>
                          <span>Required: <strong className="text-[#34D399] font-mono">{req}%</strong></span>
                        </div>
                        <div className="w-full bg-gray-100 dark:bg-white/5 rounded-full h-2 overflow-hidden relative">
                          <div
                            className="absolute top-0 bottom-0 w-1 bg-[#34D399] z-10"
                            style={{ left: `${req}%` }}
                            title={`Target: ${req}%`}
                          />
                          <div
                            className="bg-gradient-to-r from-[#FF6B5F] to-[#E85548] h-full rounded-full transition-all duration-500"
                            style={{ width: `${curr}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Recommended Bridge Courses */}
            <Card variant="default">
              <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-white/[0.08] mb-4">
                <div>
                  <CardTitle className="text-gray-900 dark:text-[#F5F1E8]">Targeted Gap-Closing Curriculum</CardTitle>
                  <p className="text-xs text-gray-500 dark:text-[#8C877D]">Courses prioritized by the recommendation engine for {activeTargetRole}</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate('/courses')}>
                  Explore All
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recs.slice(0, 4).map((rec, idx) => (
                  <div
                    key={rec._id || idx}
                    className="p-4 rounded-2xl bg-gray-50 dark:bg-[#0E1114] border border-gray-200 dark:border-white/[0.06] hover:border-[#FF6B5F]/30 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FF6B5F]/15 text-[#FF857A] uppercase font-mono">
                          {rec.category}
                        </span>
                        <span className="text-xs text-[#34D399] font-bold font-mono">
                          {rec.matchScore || 95}% Match
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-gray-900 dark:text-[#F5F1E8] mb-1 leading-snug">{rec.title}</h4>
                      <p className="text-xs text-gray-500 dark:text-[#8C877D] line-clamp-2 mb-3 leading-relaxed">{rec.reason || rec.tagline}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-white/[0.06] mt-2">
                      <span className="text-[11px] text-gray-500 dark:text-[#8C877D] font-mono">{rec.duration || '6.5 Hours'}</span>
                      <Button
                        variant={addedCourses[idx] ? 'outline' : 'primary'}
                        size="sm"
                        onClick={() => handleAddCourse(idx, rec)}
                      >
                        {addedCourses[idx] ? 'Added to Path ✓' : 'Add to Path'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

          </div>

          {/* ── Right Column: Skill Radar & AI Strategic Advice ── */}
          <div className="w-full xl:w-[400px] space-y-6 flex-shrink-0">
            
            {/* Skill Radar View Card */}
            <Card variant="default">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-[#F5F1E8]">Skill Radar View</h3>
                  <Info className="w-3.5 h-3.5 text-gray-500 dark:text-[#8C877D]" />
                </div>
                <div className="flex items-center gap-3 text-[10px] font-mono">
                  <span className="flex items-center gap-1 text-[#34D399]">
                    <span className="w-2 h-2 rounded-full bg-[#34D399]" /> Target
                  </span>
                  <span className="flex items-center gap-1 text-[#FF857A]">
                    <span className="w-2 h-2 rounded-full bg-[#FF6B5F]" /> Current
                  </span>
                </div>
              </div>
              
              <div className="w-full aspect-square relative flex items-center justify-center py-2 bg-gray-50 dark:bg-[#0E1114] rounded-2xl border border-gray-200 dark:border-white/[0.04]">
                <SkillRadarChart skills={radarSkills} />
              </div>
            </Card>

            {/* AI Insights Card */}
            <Card variant="glow">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-[#FF6B5F]" />
                <h3 className="text-sm font-bold text-gray-900 dark:text-[#F5F1E8]">AI Strategic Recommendations</h3>
              </div>
              <p className="text-xs text-gray-600 dark:text-[#C7C2B6] leading-relaxed">
                {criticalGaps && criticalGaps.length > 0 ? (
                  <>
                    Telemetric analysis highlights priority competencies in <strong className="text-[#FF857A]">{criticalGaps.join(', ')}</strong>. 
                    Tackling these modules will elevate your competency match for <strong className="text-gray-900 dark:text-[#F5F1E8]">{activeTargetRole}</strong> by an estimated +22%.
                  </>
                ) : (
                  <>
                    Your competencies align strongly with your target profile for {activeTargetRole}! Maintain weekly review quizzes to consolidate retention.
                  </>
                )}
              </p>
            </Card>

            {/* What You Can Do Next Action Checklist */}
            <Card variant="default">
              <h3 className="text-sm font-bold text-gray-900 dark:text-[#F5F1E8] mb-4">Recommended Next Actions</h3>
              <div className="space-y-3.5">
                
                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-gray-50 dark:bg-[#0E1114] border border-gray-200 dark:border-white/[0.04]">
                  <div className="w-8 h-8 rounded-lg bg-[#FF6B5F]/15 text-[#FF857A] flex items-center justify-center shrink-0 mt-0.5">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-[#F5F1E8] mb-0.5">Prioritize Bottlenecks</h4>
                    <p className="text-[11px] text-gray-500 dark:text-[#8C877D]">Start with {criticalGaps[0] || 'Core Architecture & APIs'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-gray-50 dark:bg-[#0E1114] border border-gray-200 dark:border-white/[0.04]">
                  <div className="w-8 h-8 rounded-lg bg-[#34D399]/15 text-[#34D399] flex items-center justify-center shrink-0 mt-0.5">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-[#F5F1E8] mb-0.5">Complete Bridge Modules</h4>
                    <p className="text-[11px] text-gray-500 dark:text-[#8C877D]">Enroll in curated micro-courses</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-gray-50 dark:bg-[#0E1114] border border-gray-200 dark:border-white/[0.04]">
                  <div className="w-8 h-8 rounded-lg bg-[#38BDF8]/15 text-[#38BDF8] flex items-center justify-center shrink-0 mt-0.5">
                    <RotateCcw className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-[#F5F1E8] mb-0.5">Reassess in 30 Days</h4>
                    <p className="text-[11px] text-gray-500 dark:text-[#8C877D]">Track competency gains with assessments</p>
                  </div>
                </div>

              </div>
            </Card>

          </div>
        </div>

      </div>
    </MainLayout>
  );
}
