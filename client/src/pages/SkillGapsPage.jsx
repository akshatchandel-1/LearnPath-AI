import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import PageHeader from '../components/common/PageHeader';
import Button from '../components/common/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/common/Card';
import { useLearningPath, defaultSkillGapReport, defaultRecommendations } from '../context/LearningPathContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { generateSkillGapReportPDF } from '../utils/reportGenerator';
import SkillRadarChart from '../components/skillGap/SkillRadarChart';
import {
  Download,
  RotateCcw,
  Target,
  CheckCircle2,
  AlertOctagon,
  TrendingUp,
  Calendar,
  Info,
  Sparkles,
  Code2,
  PieChart,
  BrainCircuit,
  Database,
  BarChart,
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

export default function SkillGapsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { skillGapReport, recommendations } = useLearningPath();
  const [addedCourses, setAddedCourses] = useState({});

  const activeTargetRole = user?.targetRole || user?.careerGoal || skillGapReport?.targetRole || 'Full Stack Developer';
  const report = skillGapReport || defaultSkillGapReport;
  const recs = (recommendations && recommendations.length > 0) ? recommendations : defaultRecommendations;

  const gaps = report.skills || report.gaps || [];
  const criticalGaps = report.criticalGaps || [];
  const readinessScore = report.overallReadiness ?? report.readinessScore ?? 0;

  const highPriorityCount = criticalGaps.length || gaps.filter(g => g.priority === 'High').length;
  const strongSkillsCount = gaps.filter(g => (g.currentLevel || 0) >= 75).length;
  const gapSkillsCount = gaps.filter(g => (g.currentLevel || 0) < 75).length;

  const handleAddCourse = (idx, rec) => {
    setAddedCourses(prev => ({ ...prev, [idx]: true }));
    try {
      const savedCourses = localStorage.getItem('m3_courses_data');
      if (savedCourses) {
        const parsed = JSON.parse(savedCourses);
        const match = parsed.find(c => c.title.toLowerCase().includes(rec.title.toLowerCase()) || rec.title.toLowerCase().includes(c.title.toLowerCase()));
        if (match) {
          const updated = parsed.map(c => c.id === match.id ? { ...c, enrolled: true, progress: c.progress || 0 } : c);
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
      value: `${readinessScore}%`,
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
        
        {/* Top Metric Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {dynamicStats.map((stat, idx) => (
            <Card key={idx} variant="interactive">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-[#8C877D] uppercase tracking-wider">{stat.title}</span>
                <div className="w-8 h-8 rounded-xl bg-[#FF6B5F]/10 border border-[#FF6B5F]/20 text-[#FF6B5F] flex items-center justify-center">
                  <stat.icon className="w-4 h-4" />
                </div>
              </div>
              <div className={`text-2xl font-black font-mono tracking-tight ${isDark ? "text-[#F5F1E8]" : "text-[#111418]"}`}>{stat.value}</div>
              <p className="text-[11px] text-[#8C877D] mt-1">{stat.subText}</p>
            </Card>
          ))}
        </div>

        {/* Main Content Split */}
        <div className="flex flex-col xl:flex-row gap-6 items-start">
          
          {/* Left Column: Skills Breakdown & Course Bridges */}
          <div className="flex-1 w-full space-y-6">
            
            <Card variant="default">
              <div className={`flex items-center justify-between pb-4 border-b mb-4 ${isDark ? "border-white/[0.08]" : "border-black/[0.08]"}`}>
                <div>
                  <CardTitle className={isDark ? "text-[#F5F1E8]" : "text-[#111418]"}>Role Competency Benchmark Breakdown</CardTitle>
                  <p className="text-xs text-[#8C877D]">
                    Telemetry analysis for <strong className={isDark ? "text-[#F5F1E8]" : "text-[#111418]"}>{activeTargetRole}</strong>
                  </p>
                </div>
                <span className="text-xs font-mono text-[#FF857A] bg-[#FF6B5F]/10 px-3 py-1 rounded-full border border-[#FF6B5F]/20 font-bold">
                  {gaps.length} Target Competencies
                </span>
              </div>

              <div className="space-y-3">
                {gaps.map((item, idx) => {
                  const curr = item.currentLevel ?? 0;
                  const req = item.targetLevel || 85;
                  const pColors = getPriorityColor(item.priority || 'Medium');
                  const IconComponent = getSkillIcon(item.category);

                  return (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl border transition-all space-y-3 ${isDark ? "bg-[#0E1114] border-white/[0.04] hover:border-white/[0.12]" : "bg-[#FAF7F2] border-black/[0.06] hover:border-black/[0.12]"}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${isDark ? "bg-white/[0.04] border-white/[0.08] text-[#F5F1E8]" : "bg-white border-black/[0.08] text-[#111418]"}`}>
                            <IconComponent className="w-4 h-4 text-[#FF6B5F]" />
                          </div>
                          <div>
                            <h4 className={`text-sm font-bold ${isDark ? "text-[#F5F1E8]" : "text-[#111418]"}`}>{item.skill || item.name}</h4>
                            <span className="text-[11px] text-[#8C877D] font-mono">{item.category || 'Core'} Domain</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className={`px-2.5 py-0.5 rounded-lg text-xs font-bold font-mono ${pColors.bg} ${pColors.text} border ${pColors.border}`}>
                            {item.priority || 'Normal'} Priority
                          </span>
                          <span className="text-xs text-[#FF857A] font-bold font-mono">
                            Gap: {req > curr ? `${req - curr}%` : '0%'}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] text-[#8C877D]">
                          <span>Current: <strong className={`font-mono ${isDark ? "text-[#F5F1E8]" : "text-[#111418]"}`}>{curr}%</strong></span>
                          <span>Required: <strong className="text-[#38BDF8] font-mono">{req}%</strong></span>
                        </div>
                        <div className={`w-full rounded-full h-2 overflow-hidden relative ${isDark ? "bg-white/5" : "bg-black/5"}`}>
                          <div
                            className="absolute top-0 bottom-0 w-1 bg-[#38BDF8] z-10"
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
              <div className={`flex items-center justify-between pb-4 border-b mb-4 ${isDark ? "border-white/[0.08]" : "border-black/[0.08]"}`}>
                <div>
                  <CardTitle className={isDark ? "text-[#F5F1E8]" : "text-[#111418]"}>Targeted Gap-Closing Curriculum</CardTitle>
                  <p className="text-xs text-[#8C877D]">Courses prioritized for {activeTargetRole}</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate('/courses')}>
                  Explore All
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recs.slice(0, 4).map((rec, idx) => (
                  <div
                    key={rec._id || idx}
                    className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${isDark ? "bg-[#0E1114] border-white/[0.06] hover:border-[#FF6B5F]/30" : "bg-[#FAF7F2] border-black/[0.06] hover:border-[#FF6B5F]/40"}`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FF6B5F]/15 text-[#FF857A] uppercase font-mono">
                          {rec.category || 'Curriculum'}
                        </span>
                        <span className="text-xs text-[#38BDF8] font-bold font-mono">
                          {rec.matchScore || 95}% Match
                        </span>
                      </div>
                      <h4 className={`text-sm font-bold mb-1 leading-snug ${isDark ? "text-[#F5F1E8]" : "text-[#111418]"}`}>{rec.title}</h4>
                      <p className="text-xs text-[#8C877D] line-clamp-2 mb-3 leading-relaxed">{rec.reason || rec.tagline || rec.description}</p>
                    </div>

                    <div className={`flex items-center justify-between pt-2 border-t mt-2 ${isDark ? "border-white/[0.06]" : "border-black/[0.06]"}`}>
                      <span className="text-[11px] text-[#8C877D] font-mono">{rec.duration || '4.0 Hours'}</span>
                      <Button
                        variant={addedCourses[idx] ? 'outline' : 'primary'}
                        size="sm"
                        onClick={() => handleAddCourse(idx, rec)}
                      >
                        {addedCourses[idx] ? 'Added to Path' : 'Add to Path'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

          </div>

          {/* Right Column: Skill Radar & AI Strategic Advice */}
          <div className="w-full xl:w-[420px] space-y-6 flex-shrink-0">
            
            {/* Skill Radar View Card */}
            <Card variant="default">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h3 className={`text-sm font-bold ${isDark ? "text-[#F5F1E8]" : "text-[#111418]"}`}>Skill Radar View</h3>
                  <Info className="w-3.5 h-3.5 text-[#8C877D]" />
                </div>
                <div className="flex items-center gap-3 text-[10px] font-mono">
                  <span className="flex items-center gap-1 text-[#38BDF8]">
                    <span className="w-2 h-2 rounded-full bg-[#38BDF8]" /> Target
                  </span>
                  <span className="flex items-center gap-1 text-[#FF857A]">
                    <span className="w-2 h-2 rounded-full bg-[#FF6B5F]" /> Current
                  </span>
                </div>
              </div>
              
              <div className={`w-full relative flex items-center justify-center p-2 rounded-2xl border ${isDark ? "bg-[#0E1114] border-white/[0.04]" : "bg-[#FAF7F2] border-black/[0.06]"}`}>
                <SkillRadarChart skills={gaps} />
              </div>
            </Card>

            {/* AI Strategic Insights Card */}
            <Card variant="glow">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-[#FF6B5F]" />
                <h3 className="text-sm font-bold text-[#F5F1E8]">AI Strategic Recommendations</h3>
              </div>
              <p className="text-xs text-[#C7C2B6] leading-relaxed">
                {criticalGaps && criticalGaps.length > 0 ? (
                  <>
                    Your highest-impact focus area is currently{' '}
                    <strong className="text-[#FF857A]">{criticalGaps[0]}</strong>. Bridging this specific gap will raise your overall readiness towards{' '}
                    <strong className={isDark ? "text-[#F5F1E8]" : "text-[#111418]"}>{activeTargetRole}</strong> benchmarks.
                  </>
                ) : (
                  <>
                    Your skill competency is progressing along the standard benchmark path for{' '}
                    <strong className={isDark ? "text-[#F5F1E8]" : "text-[#111418]"}>{activeTargetRole}</strong>. Continue completing active roadmap modules.
                  </>
                )}
              </p>
            </Card>

          </div>

        </div>

      </div>
    </MainLayout>
  );
}
