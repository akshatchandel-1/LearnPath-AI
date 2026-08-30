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
    const cur = getPoint(gap.currentLevel ?? 0, angle);
    reqPoints.push(`${req.x},${req.y}`);
    curPoints.push({ x: cur.x, y: cur.y });
    
    const labelPos = getPoint(115, angle);
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
  const { user } = useAuth();
  const { skillGapReport, recommendations } = useLearningPath();
  const [addedCourses, setAddedCourses] = useState({});

  const activeTargetRole = user?.targetRole || user?.careerGoal || skillGapReport?.targetRole || 'Full Stack Developer';
  const report = skillGapReport || defaultSkillGapReport;
  const recs = (recommendations && recommendations.length > 0) ? recommendations : defaultRecommendations;

  const { readinessScore, gaps = [], criticalGaps = [] } = report;
  const radarData = useMemo(() => generateRadarData(gaps), [gaps]);
  
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
        
        {/* â”€â”€ Top Metric Stats Row â”€â”€ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {dynamicStats.map((stat, idx) => (
            <Card key={idx} variant="interactive">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-[#8C877D] uppercase tracking-wider">{stat.title}</span>
                <div className="w-8 h-8 rounded-xl bg-[#FF6B5F]/10 border border-[#FF6B5F]/20 text-[#FF6B5F] flex items-center justify-center">
                  <stat.icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-[#F5F1E8] tracking-tight mb-1 font-mono">{stat.value}</div>
              <p className="text-xs text-[#8C877D]">{stat.subText}</p>
            </Card>
          ))}
        </div>

        {/* â”€â”€ Main Content Split â”€â”€ */}
        <div className="flex flex-col xl:flex-row gap-6">
          
          {/* â”€â”€ Left Column: Skills Breakdown & Course Bridges â”€â”€ */}
          <div className="flex-1 min-w-0 space-y-6">
            
            {/* Skills Breakdown Table Card */}
            <Card variant="glow">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-4">
                <div>
                  <CardTitle className="text-[#F5F1E8]">Competency Breakdown Matrix</CardTitle>
                  <p className="text-xs text-[#8C877D]">Disparity between verified level and {activeTargetRole} benchmark</p>
                </div>
                <Badge variant="coral" size="sm">{activeTargetRole}</Badge>
              </div>

              <div className="space-y-3.5">
                {gaps.map((item, idx) => {
                  const pColors = getPriorityColor(item.priority);
                  const Icon = getSkillIcon(item.category);
                  const curr = item.currentLevel ?? 0;
                  const req = item.targetLevel || 85;

                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-[#111418] border border-white/[0.06] hover:border-white/15 transition-all space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-[#FF857A] flex items-center justify-center shrink-0">
                            <Icon className="w-4.5 h-4.5" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-[#F5F1E8]">{item.skill}</h4>
                            <span className="text-[11px] text-[#8C877D] font-mono">{item.category} Domain</span>
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
                        <div className="flex justify-between text-[11px] text-[#8C877D]">
                          <span>Current: <strong className="text-[#F5F1E8] font-mono">{curr}%</strong></span>
                          <span>Required: <strong className="text-[#34D399] font-mono">{req}%</strong></span>
                        </div>
                        <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden relative">
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
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-4">
                <div>
                  <CardTitle className="text-[#F5F1E8]">Targeted Gap-Closing Curriculum</CardTitle>
                  <p className="text-xs text-[#8C877D]">Courses prioritized by the recommendation engine for {activeTargetRole}</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate('/courses')}>
                  Explore All
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recs.slice(0, 4).map((rec, idx) => (
                  <div
                    key={rec._id || idx}
                    className="p-4 rounded-2xl bg-[#0E1114] border border-white/[0.06] hover:border-[#FF6B5F]/30 transition-all flex flex-col justify-between"
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
                      <h4 className="text-sm font-bold text-[#F5F1E8] mb-1 leading-snug">{rec.title}</h4>
                      <p className="text-xs text-[#8C877D] line-clamp-2 mb-3 leading-relaxed">{rec.reason || rec.tagline}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] mt-2">
                      <span className="text-[11px] text-[#8C877D] font-mono">{rec.duration || '6.5 Hours'}</span>
                      <Button
                        variant={addedCourses[idx] ? 'outline' : 'primary'}
                        size="sm"
                        onClick={() => handleAddCourse(idx, rec)}
                      >
                        {addedCourses[idx] ? 'Added to Path âœ“' : 'Add to Path'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

          </div>

          {/* â”€â”€ Right Column: Skill Radar & AI Strategic Advice â”€â”€ */}
          <div className="w-full xl:w-[400px] space-y-6 flex-shrink-0">
            
            {/* Skill Radar View Card */}
            <Card variant="default">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-[#F5F1E8]">Skill Radar View</h3>
                  <Info className="w-3.5 h-3.5 text-[#8C877D]" />
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
              
              <div className="w-full aspect-square relative flex items-center justify-center py-2 bg-[#0E1114] rounded-2xl border border-white/[0.04]">
                <svg viewBox="0 0 200 200" className="w-full h-full max-w-[280px] overflow-visible">
                  {/* Grid Lines (Hexagon) */}
                  <polygon points="100,10 178,55 178,145 100,190 22,145 22,55" fill="none" stroke="rgba(245, 241, 232, 0.08)" strokeWidth="1" />
                  <polygon points="100,32.5 158.5,66.25 158.5,133.75 100,167.5 41.5,133.75 41.5,66.25" fill="none" stroke="rgba(245, 241, 232, 0.08)" strokeWidth="1" />
                  <polygon points="100,55 139,77.5 139,122.5 100,145 61,122.5 61,77.5" fill="none" stroke="rgba(245, 241, 232, 0.08)" strokeWidth="1" />
                  
                  {/* Axis Lines */}
                  <line x1="100" y1="100" x2="100" y2="10" stroke="rgba(245, 241, 232, 0.08)" strokeWidth="1" />
                  <line x1="100" y1="100" x2="178" y2="55" stroke="rgba(245, 241, 232, 0.08)" strokeWidth="1" />
                  <line x1="100" y1="100" x2="178" y2="145" stroke="rgba(245, 241, 232, 0.08)" strokeWidth="1" />
                  <line x1="100" y1="100" x2="100" y2="190" stroke="rgba(245, 241, 232, 0.08)" strokeWidth="1" />
                  <line x1="100" y1="100" x2="22" y2="145" stroke="rgba(245, 241, 232, 0.08)" strokeWidth="1" />
                  <line x1="100" y1="100" x2="22" y2="55" stroke="rgba(245, 241, 232, 0.08)" strokeWidth="1" />

                  {/* Required Target Polygon */}
                  {radarData.reqStr && (
                    <polygon 
                      points={radarData.reqStr} 
                      fill="none" 
                      stroke="#34D399" 
                      strokeWidth="1.5" 
                      strokeDasharray="4 2"
                    />
                  )}

                  {/* Current Data Polygon */}
                  {radarData.curStr && (
                    <polygon 
                      points={radarData.curStr} 
                      fill="rgba(255, 107, 95, 0.25)" 
                      stroke="#FF6B5F" 
                      strokeWidth="2" 
                    />
                  )}

                  {/* Data Points */}
                  {radarData.curPoints.map((pt, i) => (
                    <circle key={i} cx={pt.x} cy={pt.y} r="3.5" fill="#FF857A" stroke="#0B0D0F" strokeWidth="1" />
                  ))}

                  {/* Skill Labels */}
                  {radarData.labels.map((lbl, i) => (
                    <text key={i} x={lbl.x} y={lbl.y + 3} fontSize="7" fontWeight="bold" fill="#C7C2B6" textAnchor={lbl.anchor}>
                      {lbl.text}
                    </text>
                  ))}
                </svg>
              </div>
            </Card>

            {/* AI Insights Card */}
            <Card variant="glow">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-[#FF6B5F]" />
                <h3 className="text-sm font-bold text-[#F5F1E8]">AI Strategic Recommendations</h3>
              </div>
              <p className="text-xs text-[#C7C2B6] leading-relaxed">
                {criticalGaps && criticalGaps.length > 0 ? (
                  <>
                    Telemetric analysis highlights priority competencies in <strong className="text-[#FF857A]">{criticalGaps.join(', ')}</strong>. 
                    Tackling these modules will elevate your competency match for <strong className="text-[#F5F1E8]">{activeTargetRole}</strong> by an estimated +22%.
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
              <h3 className="text-sm font-bold text-[#F5F1E8] mb-4">Recommended Next Actions</h3>
              <div className="space-y-3.5">
                
                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-[#0E1114] border border-white/[0.04]">
                  <div className="w-8 h-8 rounded-lg bg-[#FF6B5F]/15 text-[#FF857A] flex items-center justify-center shrink-0 mt-0.5">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#F5F1E8] mb-0.5">Prioritize Bottlenecks</h4>
                    <p className="text-[11px] text-[#8C877D]">Start with {criticalGaps[0] || 'Core Architecture & APIs'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-[#0E1114] border border-white/[0.04]">
                  <div className="w-8 h-8 rounded-lg bg-[#34D399]/15 text-[#34D399] flex items-center justify-center shrink-0 mt-0.5">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#F5F1E8] mb-0.5">Complete Bridge Modules</h4>
                    <p className="text-[11px] text-[#8C877D]">Enroll in curated micro-courses</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-[#0E1114] border border-white/[0.04]">
                  <div className="w-8 h-8 rounded-lg bg-[#38BDF8]/15 text-[#38BDF8] flex items-center justify-center shrink-0 mt-0.5">
                    <RotateCcw className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#F5F1E8] mb-0.5">Reassess in 30 Days</h4>
                    <p className="text-[11px] text-[#8C877D]">Track competency gains with assessments</p>
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

