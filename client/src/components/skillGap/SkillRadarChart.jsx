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
      <div className="py-12 text-center text-xs text-[#8C877D] space-y-2">
        <p>No verified radar telemetry available.</p>
        <p className="text-[11px] text-[#FF857A]">Take an assessment or add skills in your Profile to plot your competency radar.</p>
      </div>
    );
  }

  const radarData = skills.slice(0, 6).map((s) => ({
    subject: s.name || s.skill || 'Skill',
    Current: s.currentLevel ?? s.level ?? s.progress ?? 0,
    Target: s.targetLevel || 85,
    fullMark: 100,
  }));

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
          <PolarGrid stroke="rgba(245, 241, 232, 0.1)" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: '#C7C2B6', fontSize: 11, fontWeight: 600 }}
          />
          <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#8C877D" tick={{ fill: '#8C877D', fontSize: 9 }} />
          <Radar
            name="Current Proficiency"
            dataKey="Current"
            stroke="#FF6B5F"
            fill="#FF6B5F"
            fillOpacity={0.45}
          />
          <Radar
            name="Target Role Required"
            dataKey="Target"
            stroke="#38BDF8"
            fill="#38BDF8"
            fillOpacity={0.2}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#111418',
              borderColor: 'rgba(255,255,255,0.1)',
              borderRadius: '12px',
              color: '#F5F1E8',
              fontSize: '12px',
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillRadarChart;
