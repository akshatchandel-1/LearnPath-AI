import React, { useState, useEffect } from 'react';
import api from '../services/api';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  BarChart3,
  TrendingUp,
  Clock,
  Award,
  Flame,
  CheckCircle2,
  RefreshCw,
  Zap,
} from 'lucide-react';

export const AnalyticsPage = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const res = await api.get('/analytics/dashboard');
      if (res.data.success) {
        setAnalytics(res.data.analytics);
      }
    } catch (err) {
      console.error('Error fetching analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#8b5cf6', '#06b6d4', '#ec4899', '#10b981'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-brand-500/20 text-brand-300 border border-brand-500/30">
            Telemetry & Learning Metrics
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white font-display">
          Learning Analytics & Velocity
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">
          Real-time measurement of skill growth, study hours, assessment velocity, and format affinity.
        </p>
      </div>

      {/* Top Stat Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl glass-panel border border-gray-200 dark:border-white/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase">Overall Mastery</p>
            <p className="text-2xl font-black text-white font-display">{analytics?.mastery ?? analytics?.overallProgress ?? 0}%</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-gray-200 dark:border-white/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
            <Clock className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase">Total Study Hours</p>
            <p className="text-2xl font-black text-white font-display">{analytics?.totalStudyHours ?? 0} hrs</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-gray-200 dark:border-white/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
            <Award className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase">Avg Quiz Score</p>
            <p className="text-2xl font-black text-white font-display">{analytics?.averageQuizScore ?? 0}%</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-gray-200 dark:border-white/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
            <Flame className="w-6 h-6 text-orange-400 fill-orange-400" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase">Active Streak</p>
            <p className="text-2xl font-black text-white font-display">{analytics?.streak ?? 0} Days</p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center">
          <RefreshCw className="w-8 h-8 text-brand-400 animate-spin mx-auto" />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Row 1: Weekly Study Activity & Learning Style Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Weekly Hours Bar Chart (2 Cols) */}
            <div className="lg:col-span-2 p-6 rounded-3xl glass-panel border border-gray-200 dark:border-white/10 space-y-4">
              <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-cyan-400" />
                Weekly Study Activity (Hours per Day)
              </h3>
              <div className="w-full h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analytics?.weeklyActivity || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1f2438" />
                    <XAxis dataKey="day" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                    <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#12141e',
                        borderColor: 'rgba(255,255,255,0.1)',
                        borderRadius: '12px',
                        fontSize: '12px',
                      }}
                    />
                    <Bar dataKey="hours" name="Study Hours" fill="#06b6d4" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Learning Format Donut Chart (1 Col) */}
            <div className="p-6 rounded-3xl glass-panel border border-gray-200 dark:border-white/10 space-y-4 flex flex-col justify-between">
              <h3 className="text-base font-bold text-white font-display">
                Learning Format Affinity
              </h3>
              <div className="w-full h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={analytics?.learningDistribution || []}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {(analytics?.learningDistribution || []).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#12141e',
                        borderColor: 'rgba(255,255,255,0.1)',
                        borderRadius: '12px',
                        fontSize: '12px',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {(analytics?.learningDistribution || []).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                    <span className="text-slate-300 truncate">{item.name} ({item.value}%)</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 2: Skill Growth Line Trajectory */}
          <div className="p-6 rounded-3xl glass-panel border border-gray-200 dark:border-white/10 space-y-4">
            <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-brand-400" />
              Verified Competency Growth Trajectory (Baseline vs Current Level)
            </h3>
            <div className="w-full h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analytics?.skillGrowth || []} margin={{ top: 10, right: 20, left: -10, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2438" />
                  <XAxis dataKey="skill" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#12141e',
                      borderColor: 'rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      fontSize: '12px',
                    }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }} />
                  <Line type="monotone" dataKey="starting" name="Initial Level" stroke="#64748b" strokeDasharray="5 5" strokeWidth={2} />
                  <Line type="monotone" dataKey="current" name="Current Level" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="target" name="Target Mastery (90%)" stroke="#06b6d4" strokeDasharray="3 3" strokeWidth={1.5} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsPage;
