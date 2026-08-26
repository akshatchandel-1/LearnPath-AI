import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export const SkillGapChart = ({ skills = [] }) => {
  if (!skills || skills.length === 0) {
    return (
      <div className="py-8 text-center text-xs text-slate-400">
        No skill gap metrics available.
      </div>
    );
  }

  // Format data for Recharts
  const chartData = skills.slice(0, 8).map((s) => ({
    name: s.name,
    'Current Level': s.currentLevel || 0,
    'Target Level': s.targetLevel || 85,
    'Skill Gap': s.gap || 0,
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 rounded-xl glass-panel border border-brand-500/30 text-xs shadow-xl space-y-1">
          <p className="font-bold text-white mb-1">{label}</p>
          {payload.map((p, i) => (
            <p key={i} style={{ color: p.color }} className="font-medium">
              {p.name}: {p.value}%
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 10, left: -20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#1f2438" />
          <XAxis
            dataKey="name"
            stroke="#64748b"
            tick={{ fill: '#94a3b8', fontSize: 10 }}
            angle={-20}
            textAnchor="end"
            interval={0}
          />
          <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10 }} domain={[0, 100]} />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ paddingTop: '10px', fontSize: '11px' }}
            formatter={(value) => <span className="text-slate-300">{value}</span>}
          />
          <Bar dataKey="Current Level" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Target Level" fill="#06b6d4" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillGapChart;
