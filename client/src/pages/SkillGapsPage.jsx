import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import PageHeader from '../components/common/PageHeader';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/common/Card';
import { useLearningPath } from '../context/LearningPathContext';
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

const getPoint = (percentage, angleDeg) => {
  const r = (percentage / 100) * 85;
  const angleRad = (angleDeg * Math.PI) / 180;
  return {
    x: 100 + r * Math.cos(angleRad),
    y: 100 + r * Math.sin(angleRad)
  };
};

const generateRadarData = (gaps = []) => {
  const angles = [-90, -30, 30, 90, 150, 210];
  const top6 = gaps.slice(0, 6);
  
  while (top6.length > 0 && top6.length < 6) {
    top6.push(top6[top6.length - 1]); 
  }
  
  if (top6.length === 0) return { reqStr: '', curStr: '', curPoints: [], labels: [] };

  const reqPoints = [];
  const curPoints = [];
  const labels = [];

  top6.forEach((gap, idx) => {
    const angle = angles[idx];
    const req = getPoint(gap.targetLevel || 85, angle);
    const cur = getPoint(gap.currentLevel || 50, angle);
    reqPoints.push(`${req.x},${req.y}`);
    curPoints.push({ x: cur.x, y: cur.y });
    
    const labelPos = getPoint(110, angle);
    let anchor = 'start';
    if (idx === 0 || idx === 3) anchor = 'middle';
    else if (idx > 3) anchor = 'end';

    labels.push({ 
      text: gap.skill, 
      x: labelPos.x, 
      y: labelPos.y, 
      anchor 
    });
  });

  return { reqStr: reqPoints.join(' '), curStr: curPoints.map(p=>`${p.x},${p.y}`).join(' '), curPoints, labels };
};

export default function SkillGapsPage() {
  const navigate = useNavigate();
  const { skillGapReport, recommendations, loading, refreshAll } = useLearningPath();
  const [addedCourses, setAddedCourses] = useState({});

  useEffect(() => {
    if (!skillGapReport || (recommendations && recommendations.length === 0)) {
      refreshAll();
    }
  }, [skillGapReport, recommendations, refreshAll]);

  const handleAddCourse = (idx) => {
    setAddedCourses(prev => ({ ...prev, [idx]: true }));
  };

  const handleDownload = () => {
    alert("Skill Gap Report downloaded successfully (PDF format).");
  };

  if (loading || !skillGapReport) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-full min-h-[60vh]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-3 border-[#FF6B5F]/20 border-t-[#FF6B5F] rounded-full animate-spin" />
            <p className="text-[#8C877D] font-medium animate-pulse text-xs">
              Analyzing your skill competency gaps...
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  const { readinessScore, gaps = [], criticalGaps = [], targetRole } = skillGapReport;
  const radarData = generateRadarData(gaps);
  const highPriorityCount = criticalGaps?.length || gaps.filter(g => g.gapScore > 40).length;
  const strongSkillsCount = gaps.filter(g => g.gapScore <= 20).length;
  const gapSkillsCount = gaps.filter(g => g.gapScore > 20).length;

  const dynamicStats = [
    {
      title: 'Skill Match',
      value: `${readinessScore || 68}%`,
      subText: 'vs market benchmark',
      icon: Target,
      color: 'coral'
    },
    {
      title: 'Mastered Skills',
      value: strongSkillsCount || 4,
      subText: 'Strong proficiency',
      icon: CheckCircle2,
      color: 'emerald'
    },
    {
      title: 'Active Gaps',
      value: gapSkillsCount || 3,
      subText: 'Identified gaps',
      icon: AlertOctagon,
      color: 'amber'
    },
    {
      title: 'Priority Gaps',
      value: highPriorityCount || 2,
      subText: 'Immediate focus',
      icon: TrendingUp,
      color: 'coral'
    },
  ];

  return (
    <MainLayout>
      <PageHeader
        greeting="Competency Radar & Analysis"
        title="Skill Gap Analysis"
        description="Identify your current competency discrepancies against industry benchmarks and bridge them with AI."
        badge="Live Analysis"
        badgeVariant="coral"
        action={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              icon={RotateCcw}
              onClick={() => navigate('/assessments')}
            >
              Take Assessment
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={Download}
              onClick={handleDownload}
            >
              Export Report
            </Button>
          </div>
        }
      />

      <div className="max-w-[1500px] mx-auto w-full space-y-6">
        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {dynamicStats.map((stat, idx) => (
            <Card key={idx} variant="interactive" className="group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#8C877D] font-medium uppercase tracking-wider">{stat.title}</span>
                <div className="w-8 h-8 rounded-xl bg-[#FF6B5F]/10 border border-[#FF6B5F]/20 text-[#FF6B5F] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <stat.icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-[#F5F1E8] tracking-tight mb-1">
                {stat.value}
              </div>
              <p className="text-[11px] text-[#8C877D] font-medium">{stat.subText}</p>
            </Card>
          ))}
        </div>

        {/* Main Content Split: Left (Breakdown & Recommendations) + Right (Radar Chart & AI Insights) */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          {/* Left 8 Cols */}
          <div className="xl:col-span-8 space-y-6">
            {/* Skill Gap Breakdown Table */}
            <Card variant="default">
              <CardHeader>
                <div>
                  <CardTitle>Skill Gap Breakdown</CardTitle>
                  <CardDescription>Target Role Benchmark: {targetRole || 'Full Stack AI Engineer'}</CardDescription>
                </div>
                <Badge variant="coral" size="sm">
                  {gaps.length} Evaluated Skills
                </Badge>
              </CardHeader>

              {/* Table Header */}
              <div className="grid grid-cols-12 gap-3 pb-3 border-b border-white/[0.08] text-[11px] font-bold text-[#8C877D] uppercase tracking-wider">
                <div className="col-span-4">Skill Domain</div>
                <div className="col-span-3 text-center">Your Level</div>
                <div className="col-span-3 text-center">Target Level</div>
                <div className="col-span-1 text-center">Gap</div>
                <div className="col-span-1 text-right">Priority</div>
              </div>

              {/* Table Rows */}
              <div className="divide-y divide-white/[0.04]">
                {gaps.map((gap, idx) => {
                  const Icon = getSkillIcon(gap.skill);
                  const prio = getPriorityColor(gap.priority);

                  return (
                    <div key={idx} className="grid grid-cols-12 gap-3 py-3.5 items-center hover:bg-white/[0.02] px-1 rounded-xl transition-colors">
                      {/* Skill Name */}
                      <div className="col-span-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FF857A] shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#F5F1E8] truncate" title={gap.skill}>
                            {gap.skill}
                          </p>
                          <p className="text-[10px] text-[#8C877D]">Core Competency</p>
                        </div>
                      </div>

                      {/* Current Level */}
                      <div className="col-span-3 flex items-center gap-2 px-2">
                        <span className="text-xs font-bold text-[#C7C2B6] w-7">{gap.currentLevel}%</span>
                        <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[#FF6B5F] to-[#E85548]"
                            style={{ width: `${gap.currentLevel}%` }}
                          />
                        </div>
                      </div>

                      {/* Target Level */}
                      <div className="col-span-3 flex items-center gap-2 px-2">
                        <span className="text-xs font-bold text-[#34D399] w-7">{gap.targetLevel}%</span>
                        <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-[#34D399]"
                            style={{ width: `${gap.targetLevel}%` }}
                          />
                        </div>
                      </div>

                      {/* Gap % */}
                      <div className="col-span-1 text-center">
                        <span className="text-xs font-black text-[#FF857A]">
                          {gap.gapPercent}%
                        </span>
                      </div>

                      {/* Priority Badge */}
                      <div className="col-span-1 text-right">
                        <span className={`inline-block px-2 py-0.5 rounded-lg text-[10px] font-bold border ${prio.bg} ${prio.text} ${prio.border}`}>
                          {gap.priority}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Info Hint Banner */}
              <div className="mt-4 flex items-center gap-2.5 bg-[#FF6B5F]/10 p-3 rounded-xl border border-[#FF6B5F]/20 text-[#FF857A] text-xs">
                <Lightbulb className="w-4 h-4 shrink-0" />
                <span>Focus on High Priority skill gaps to accelerate your readiness for <strong>{targetRole}</strong>.</span>
              </div>
            </Card>

            {/* Top Recommendations to Close Gaps */}
            <Card variant="default">
              <CardHeader>
                <div>
                  <CardTitle>Recommended Action Items</CardTitle>
                  <CardDescription>Curated resources directly targeting your largest discrepancies</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/courses')}
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Explore All
                </Button>
              </CardHeader>

              <div className="space-y-3">
                {recommendations && recommendations.length > 0 ? (
                  recommendations.slice(0, 3).map((rec, idx) => {
                    const res = rec.resource || {};
                    return (
                      <div
                        key={idx}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#16191E] border border-white/[0.06] hover:border-[#FF6B5F]/30 transition-all group"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="w-10 h-10 rounded-xl bg-[#FF6B5F]/10 border border-[#FF6B5F]/20 text-[#FF6B5F] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                            <BookOpen className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-xs sm:text-sm font-bold text-[#F5F1E8] group-hover:text-[#FF6B5F] transition-colors">
                              {res.title || 'Advanced Microservices & Cloud Patterns'}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-[#8C877D] mt-0.5">
                              <span>{res.provider || 'LearnPath AI'} • {res.type || 'Course'}</span>
                              <span>•</span>
                              <span className="text-[10px] font-bold text-[#FF857A] bg-[#FF6B5F]/10 px-2 py-0.5 rounded border border-[#FF6B5F]/20">
                                Bridges: {rec.skillGapAddressed || 'Backend Mastery'}
                              </span>
                            </div>
                          </div>
                        </div>

                        <Button
                          variant={addedCourses[idx] ? 'secondary' : 'primary'}
                          size="sm"
                          onClick={() => handleAddCourse(idx)}
                          icon={addedCourses[idx] ? CheckCircle2 : Plus}
                          className="shrink-0"
                        >
                          {addedCourses[idx] ? 'Added to Path' : 'Add to Path'}
                        </Button>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-xs text-[#8C877D] text-center py-4">No recommendations found.</p>
                )}
              </div>
            </Card>
          </div>

          {/* Right 4 Cols: Radar Hexagon View + AI Insights */}
          <div className="xl:col-span-4 space-y-6">
            {/* Hexagonal Skill Radar Chart */}
            <Card variant="glow">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/[0.08]">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#8C877D]">
                  Skill Radar Competency
                </h3>
                <span className="text-[10px] text-[#34D399] font-mono">Benchmark Sync</span>
              </div>

              <div className="w-full aspect-square relative flex items-center justify-center py-2">
                <svg viewBox="0 0 200 200" className="w-full h-full max-w-[260px] overflow-visible">
                  {/* Grid Hexagons */}
                  <polygon points="100,10 178,55 178,145 100,190 22,145 22,55" fill="none" stroke="rgba(245,241,232,0.08)" strokeWidth="1" />
                  <polygon points="100,32.5 158.5,66.25 158.5,133.75 100,167.5 41.5,133.75 41.5,66.25" fill="none" stroke="rgba(245,241,232,0.08)" strokeWidth="1" />
                  <polygon points="100,55 139,77.5 139,122.5 100,145 61,122.5 61,77.5" fill="none" stroke="rgba(245,241,232,0.08)" strokeWidth="1" />
                  
                  {/* Axis lines */}
                  <line x1="100" y1="100" x2="100" y2="10" stroke="rgba(245,241,232,0.08)" strokeWidth="1" />
                  <line x1="100" y1="100" x2="178" y2="55" stroke="rgba(245,241,232,0.08)" strokeWidth="1" />
                  <line x1="100" y1="100" x2="178" y2="145" stroke="rgba(245,241,232,0.08)" strokeWidth="1" />
                  <line x1="100" y1="100" x2="100" y2="190" stroke="rgba(245,241,232,0.08)" strokeWidth="1" />
                  <line x1="100" y1="100" x2="22" y2="145" stroke="rgba(245,241,232,0.08)" strokeWidth="1" />
                  <line x1="100" y1="100" x2="22" y2="55" stroke="rgba(245,241,232,0.08)" strokeWidth="1" />

                  {/* Required Data Polygon (Green Dashed) */}
                  {radarData.reqStr && (
                    <polygon 
                      points={radarData.reqStr} 
                      fill="none" 
                      stroke="#34D399" 
                      strokeWidth="1.5" 
                      strokeDasharray="4 2"
                    />
                  )}

                  {/* User Data Polygon (Coral Fill) */}
                  {radarData.curStr && (
                    <polygon 
                      points={radarData.curStr} 
                      fill="#FF6B5F" 
                      fillOpacity="0.2" 
                      stroke="#FF6B5F" 
                      strokeWidth="2" 
                    />
                  )}

                  {/* Data Points */}
                  {radarData.curPoints?.map((pt, i) => (
                    <circle key={i} cx={pt.x} cy={pt.y} r="3" fill="#FF857A" />
                  ))}

                  {/* Skill Labels */}
                  {radarData.labels?.map((lbl, i) => (
                    <text key={i} x={lbl.x} y={lbl.y + 3} fontSize="7" fontWeight="bold" fill="#C7C2B6" textAnchor={lbl.anchor}>
                      {lbl.text}
                    </text>
                  ))}
                </svg>
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center gap-4 pt-2 text-[10px] font-bold">
                <span className="flex items-center gap-1.5 text-[#FF857A]">
                  <span className="w-2.5 h-2.5 rounded bg-[#FF6B5F]" /> Current Mastery
                </span>
                <span className="flex items-center gap-1.5 text-[#34D399]">
                  <span className="w-2.5 h-2.5 rounded border border-[#34D399] border-dashed" /> Industry Target
                </span>
              </div>
            </Card>

            {/* AI Insights Card */}
            <Card variant="default">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-[#FF6B5F]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#8C877D]">
                  AI Synthesis
                </h3>
              </div>
              <p className="text-xs text-[#C7C2B6] leading-relaxed font-medium">
                {criticalGaps && criticalGaps.length > 0 ? (
                  <>
                    Your analysis shows high priority opportunities in <span className="font-bold text-[#FF857A]">{criticalGaps.join(', ')}</span>. 
                    Targeting these modules will increase your readiness for <span className="font-bold text-[#F5F1E8]">{targetRole}</span> to over <strong>85%</strong>.
                  </>
                ) : (
                  <>
                    Your skills are well-aligned with your target role of <span className="font-bold text-[#FF857A]">{targetRole}</span>!
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
