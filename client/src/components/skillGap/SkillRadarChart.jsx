import React from 'react';
import { useTheme } from '../../context/ThemeContext';
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
  const { theme } = useTheme();
  const isDark = theme === 'dark';

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
          <PolarGrid stroke={isDark ? "#1f2438" : "#e2e8f0"} />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: isDark ? '#cbd5e1' : '#475569', fontSize: 10 }}
          />
          <PolarRadiusAxis angle={30} domain={[0, 100]} stroke={isDark ? "#475569" : "#94a3b8"} tick={{ fill: isDark ? '#64748b' : '#94a3b8', fontSize: 9 }} />
          <Radar
            name="Current Proficiency"
            dataKey="Current"
            stroke="#FF6B5F"
            fill="#FF6B5F"
            fillOpacity={0.4}
          />
          <Radar
            name="Target Role Required"
            dataKey="Target"
            stroke="#34D399"
            fill="#34D399"
            fillOpacity={0.2}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? '#12141e' : '#ffffff',
              borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
              borderRadius: '12px',
              fontSize: '12px',
              color: isDark ? '#ffffff' : '#000000',
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillRadarChart;
