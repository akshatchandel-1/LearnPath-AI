import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
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
  ChevronDown,
  Info,
  Lightbulb,
  Sparkles,
  BookOpen,
  Code2,
  PieChart,
  BrainCircuit,
  Database,
  BarChart,
  Plus
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
  if (priority === 'High') return { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-200' };
  if (priority === 'Medium') return { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200' };
  return { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' };
};

const getPoint = (percentage, angleDeg) => {
  const r = (percentage / 100) * 90;
  const angleRad = (angleDeg * Math.PI) / 180;
  return {
    x: 100 + r * Math.cos(angleRad),
    y: 100 + r * Math.sin(angleRad)
  };
};

const generateRadarData = (gaps = []) => {
  const angles = [-90, -30, 30, 90, 150, 210];
  const top6 = gaps.slice(0, 6);
  
  // Pad with empty or copy to ensure hexagon shape
  while (top6.length > 0 && top6.length < 6) {
    top6.push(top6[top6.length - 1]); 
  }
  
  if (top6.length === 0) return { reqStr: '', curStr: '', curPoints: [], labels: [] };

  const reqPoints = [];
  const curPoints = [];
  const labels = [];

  top6.forEach((gap, idx) => {
    const angle = angles[idx];
    const req = getPoint(gap.targetLevel || 0, angle);
    const cur = getPoint(gap.currentLevel || 0, angle);
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
    alert("Downloading your comprehensive Skill Gap Report as PDF...");
  };

  if (loading || !skillGapReport) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-full min-h-[60vh]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin"></div>
            <p className="text-slate-500 font-medium animate-pulse">Analyzing your skill profile...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  const { readinessScore, gaps, criticalGaps, targetRole } = skillGapReport;
  const radarData = useMemo(() => generateRadarData(gaps), [gaps]);
  const highPriorityCount = criticalGaps?.length || gaps.filter(g => g.gapScore > 40).length;
  const strongSkillsCount = gaps.filter(g => g.gapScore <= 20).length;
  const gapSkillsCount = gaps.filter(g => g.gapScore > 20).length;

  const dynamicStats = [
    {
      title: 'Overall Skill Match',
      value: `${readinessScore || 0}%`,
      subValue: '',
      subText: 'vs requirements',
      icon: Target,
      color: 'violet'
    },
    {
      title: 'Skills Strong',
      value: strongSkillsCount,
      subText: 'Good foundation',
      icon: CheckCircle2,
      color: 'emerald'
    },
    {
      title: 'Skill Gaps',
      value: gapSkillsCount,
      subText: 'Need improvement',
      icon: AlertOctagon,
      color: 'amber'
    },
    {
      title: 'High Priority Gaps',
      value: highPriorityCount,
      subText: 'Focus areas',
      icon: TrendingUp,
      color: 'blue'
    },
    {
      title: 'Assessment Date',
      value: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      subText: 'Real-time sync',
      icon: Calendar,
      color: 'violet'
    }
  ];

  return (
    <MainLayout>
      <div className="max-w-[1400px] mx-auto w-full pb-8">
        
        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-1">Skill Gap Analysis</h1>
            <p className="text-sm text-slate-500">
              Identify your gaps and get <span className="italic">personalized</span> recommendations to level up.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/assessments')}
              className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-violet-700 bg-white rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors"
            >
              <RotateCcw className="w-4 h-4" /> Retake Assessment
            </button>
            <button 
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-violet-700 text-white rounded-lg text-sm font-semibold hover:bg-violet-800 transition-colors"
            >
              <Download className="w-4 h-4" /> Download Report
            </button>
          </div>
        </div>

        {/* ── Top Stats Row ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          {dynamicStats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl bg-${stat.color}-50 flex items-center justify-center shrink-0`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <div className="flex-1">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1">{stat.title}</p>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-xl font-bold text-slate-900 leading-none">{stat.value}</span>
                  {stat.subValue && <span className="text-xs font-bold text-rose-500">{stat.subValue}</span>}
                </div>
                <p className="text-xs text-slate-400">{stat.subText}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Main Content Split ── */}
        <div className="flex flex-col xl:flex-row gap-6">
          
          {/* ── Left Column ── */}
          <div className="flex-1 min-w-0 space-y-6">
            
            {/* Skill Gap Breakdown */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-bold text-slate-900">Skill Gap Breakdown</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">Target Role:</span>
                  <span className="px-3 py-1 bg-violet-100 text-violet-800 rounded-lg text-xs font-bold">{targetRole}</span>
                </div>
              </div>

              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 pb-3 border-b border-slate-100 text-xs font-bold text-slate-900">
                <div className="col-span-4">Skill</div>
                <div className="col-span-3 text-center">Your Level</div>
                <div className="col-span-3 text-center">Required Level</div>
                <div className="col-span-1 text-center">Gap</div>
                <div className="col-span-1 text-right">Priority</div>
              </div>

              {/* Table Body */}
              <div className="space-y-1">
                {gaps.map((gap, idx) => {
                  const Icon = getSkillIcon(gap.skill);
                  const prioColor = getPriorityColor(gap.priority);
                  return (
                    <div key={idx} className="grid grid-cols-12 gap-4 py-3 items-center border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                      
                      <div className="col-span-4 flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0`}>
                          <Icon className={`w-4 h-4 text-slate-600`} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800 line-clamp-1" title={gap.skill}>{gap.skill}</p>
                          <p className="text-[10px] text-slate-500">Core Requirement</p>
                        </div>
                      </div>

                      <div className="col-span-3 flex items-center gap-3 px-2">
                        <span className="text-xs font-semibold text-slate-600 w-8">{gap.currentLevel}%</span>
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full">
                          <div className={`h-full rounded-full bg-violet-500`} style={{ width: `${gap.currentLevel}%` }}></div>
                        </div>
                      </div>

                      <div className="col-span-3 flex items-center gap-3 px-2">
                        <span className="text-xs font-semibold text-slate-600 w-8">{gap.targetLevel}%</span>
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full">
                          <div className={`h-full rounded-full bg-emerald-500`} style={{ width: `${gap.targetLevel}%` }}></div>
                        </div>
                      </div>

                      <div className="col-span-1 text-center">
                        <span className="text-xs font-bold text-rose-500">{gap.gapPercent}%</span>
                      </div>

                      <div className="col-span-1 text-right">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border ${prioColor.bg} ${prioColor.text} ${prioColor.border}`}>
                          {gap.priority}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Info Banner */}
              <div className="mt-4 flex items-center gap-2 bg-violet-50 p-3 rounded-xl border border-violet-100">
                <Lightbulb className="w-4 h-4 text-violet-600 shrink-0" />
                <p className="text-xs text-violet-800 font-medium">Focus on high priority gaps to accelerate your journey to {targetRole}.</p>
              </div>
            </div>

            {/* Top Recommendations */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-bold text-slate-900">Top Recommendations to Close Your Gaps</h3>
                <button 
                  onClick={() => navigate('/resources')}
                  className="text-xs font-bold text-violet-700 border border-slate-200 rounded-lg px-3 py-1.5 hover:bg-slate-50 transition-colors"
                >
                  View All
                </button>
              </div>

              <div className="space-y-3">
                {recommendations && recommendations.length > 0 ? recommendations.slice(0, 3).map((rec, idx) => {
                  const res = rec.resource;
                  return (
                  <div key={idx} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl hover:border-violet-200 hover:shadow-sm transition-all group">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center shrink-0`}>
                        <BookOpen className={`w-5 h-5 text-violet-600`} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 mb-0.5 group-hover:text-violet-700 transition-colors">{res.title}</h4>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <span>{res.provider || 'LearnPath Engine'} • {res.type || 'Course'}</span>
                          <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                          <span className="text-[10px] font-bold bg-violet-100 text-violet-700 px-1.5 py-0.5 rounded">{rec.skillGapAddressed}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right hidden sm:block">
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Est. Time</p>
                        <p className="text-xs font-bold text-slate-800">{res.duration || '2 weeks'}</p>
                      </div>
                      <button 
                        onClick={() => handleAddCourse(idx)}
                        disabled={addedCourses[idx]}
                        className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-xs font-bold transition-colors ${
                          addedCourses[idx] 
                            ? 'border-emerald-200 text-emerald-600 bg-emerald-50' 
                            : 'border-slate-200 text-violet-700 hover:bg-violet-50'
                        }`}
                      >
                        {addedCourses[idx] ? (
                          <><CheckCircle2 className="w-3.5 h-3.5" /> Added</>
                        ) : (
                          <><Plus className="w-3.5 h-3.5" /> Add to Path</>
                        )}
                      </button>
                    </div>
                  </div>
                )}) : (
                  <p className="text-sm text-slate-500 p-4 text-center">No recommendations found at this time.</p>
                )}
              </div>
            </div>

          </div>


          {/* ── Right Column ── */}
          <div className="w-full xl:w-[380px] space-y-6 flex-shrink-0">
            
            {/* Skill Radar View */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <h3 className="text-sm font-bold text-slate-900">Skill Radar View</h3>
                <Info className="w-3.5 h-3.5 text-slate-400" />
              </div>
              
              <div className="w-full aspect-square relative flex items-center justify-center py-2">
                <svg viewBox="0 0 200 200" className="w-full h-full max-w-[240px] overflow-visible">
                  {/* Grid Lines (Hexagon) */}
                  <polygon points="100,10 178,55 178,145 100,190 22,145 22,55" fill="none" stroke="#F1F5F9" strokeWidth="1" />
                  <polygon points="100,32.5 158.5,66.25 158.5,133.75 100,167.5 41.5,133.75 41.5,66.25" fill="none" stroke="#F1F5F9" strokeWidth="1" />
                  <polygon points="100,55 139,77.5 139,122.5 100,145 61,122.5 61,77.5" fill="none" stroke="#F1F5F9" strokeWidth="1" />
                  
                  {/* Axis Lines */}
                  <line x1="100" y1="100" x2="100" y2="10" stroke="#F1F5F9" strokeWidth="1" />
                  <line x1="100" y1="100" x2="178" y2="55" stroke="#F1F5F9" strokeWidth="1" />
                  <line x1="100" y1="100" x2="178" y2="145" stroke="#F1F5F9" strokeWidth="1" />
                  <line x1="100" y1="100" x2="100" y2="190" stroke="#F1F5F9" strokeWidth="1" />
                  <line x1="100" y1="100" x2="22" y2="145" stroke="#F1F5F9" strokeWidth="1" />
                  <line x1="100" y1="100" x2="22" y2="55" stroke="#F1F5F9" strokeWidth="1" />

                  {/* Text Labels */}
                  <text x="100" y="24" fontSize="8" fill="#94A3B8" textAnchor="middle">100%</text>

                  {/* Required Data Polygon (Green) */}
                  {radarData.reqStr && (
                    <polygon 
                      points={radarData.reqStr} 
                      fill="none" 
                      stroke="#10B981" 
                      strokeWidth="1.5" 
                      strokeDasharray="4 2"
                    />
                  )}

                  {/* Current Data Polygon (Purple) */}
                  {radarData.curStr && (
                    <polygon 
                      points={radarData.curStr} 
                      fill="#8B5CF6" 
                      fillOpacity="0.15" 
                      stroke="#7C3AED" 
                      strokeWidth="2" 
                    />
                  )}

                  {/* Data Points (Purple) */}
                  {radarData.curPoints.map((pt, i) => (
                    <circle key={i} cx={pt.x} cy={pt.y} r="3" fill="#7C3AED" />
                  ))}

                  {/* Skill Labels */}
                  {radarData.labels.map((lbl, i) => (
                    <text key={i} x={lbl.x} y={lbl.y + 3} fontSize="7" fontWeight="bold" fill="#475569" textAnchor={lbl.anchor}>
                      {lbl.text}
                    </text>
                  ))}
                </svg>
              </div>
            </div>

            {/* AI Insights */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-violet-600" />
                <h3 className="text-sm font-bold text-slate-900">AI Insights</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                {criticalGaps && criticalGaps.length > 0 ? (
                  <>
                    Your analysis shows high priority gaps in <span className="font-semibold text-slate-800">{criticalGaps.join(', ')}</span>. 
                    Focus on improving these areas to achieve your goal as a <span className="font-bold text-violet-700">{targetRole}</span>.
                  </>
                ) : (
                  <>
                    Your skills are well-aligned with your target role of <span className="font-bold text-violet-700">{targetRole}</span>!
                    Continue practicing to solidify your expertise.
                  </>
                )}
              </p>
            </div>

            {/* What You Can Do Next */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 mb-5">What You Can Do Next</h3>
              <div className="space-y-4">
                
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-violet-100 text-violet-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 mb-0.5">Focus on High Priority Skills</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Start with {(criticalGaps && criticalGaps[0]) || 'your biggest gap'}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 mb-0.5">Take Recommended Courses</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Enroll in curated courses to build expertise</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 mb-0.5">Practice with Projects</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Apply your skills with hands-on projects</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                    <BarChart className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 mb-0.5">Reassess in 60 Days</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Track your progress and update your path</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </MainLayout>
  );
}
