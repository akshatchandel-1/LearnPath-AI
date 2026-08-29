import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

export const SkillRadarChart = ({ skills = [] }) => {
  if (!skills || skills.length === 0) {
    return (
      <div className="py-8 text-center text-xs text-slate-400">
        No radar metrics available.
      </div>
    );
  }

  const radarData = skills.slice(0, 6).map((s) => ({
    subject: s.name,
    Current: s.currentLevel || 0,
    Target: s.targetLevel || 85,
    fullMark: 100,
  }));

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
          <PolarGrid stroke="#1f2438" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: '#cbd5e1', fontSize: 10 }}
          />
          <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" tick={{ fill: '#64748b', fontSize: 9 }} />
          <Radar
            name="Current Proficiency"
            dataKey="Current"
            stroke="#8b5cf6"
            fill="#8b5cf6"
            fillOpacity={0.4}
          />
          <Radar
            name="Target Role Required"
            dataKey="Target"
            stroke="#06b6d4"
            fill="#06b6d4"
            fillOpacity={0.2}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#12141e',
              borderColor: 'rgba(255,255,255,0.1)',
              borderRadius: '12px',
              fontSize: '12px',
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillRadarChart;
