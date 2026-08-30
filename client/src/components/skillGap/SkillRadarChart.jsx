import React, { useMemo } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { useTheme } from '../../context/ThemeContext';
import { Target } from 'lucide-react';

export const SkillRadarChart = ({ skills = [] }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const radarData = useMemo(() => {
    if (!skills || skills.length === 0) return [];
    return skills.slice(0, 6).map((s) => ({
      subject: s.name || s.skill || 'Skill',
      Current: s.currentLevel ?? s.level ?? s.progress ?? 0,
      Target: s.targetLevel || 85,
      fullMark: 100,
    }));
  }, [skills]);

  const hasAssessedSkills = radarData.some((d) => d.Current > 0);

  if (!skills || skills.length === 0 || !hasAssessedSkills) {
    return (
      <div className="py-16 text-center space-y-3">
        <Target className="w-8 h-8 mx-auto text-[#8C877D]" />
        <p className={`text-xs font-bold ${isDark ? 'text-[#F5F1E8]' : 'text-[#111418]'}`}>
          No skills assessed yet.
        </p>
        <p className="text-[11px] text-[#8C877D] max-w-xs mx-auto">
          Complete an assessment or verify skills in your Profile to plot your live competency radar against role benchmarks.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
          <PolarGrid stroke={isDark ? 'rgba(245, 241, 232, 0.1)' : 'rgba(0, 0, 0, 0.08)'} />
          <PolarAngleAxis
            dataKey="subject"
            tick={{
              fill: isDark ? '#C7C2B6' : '#374151',
              fontSize: 11,
              fontWeight: 600,
            }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            stroke={isDark ? '#8C877D' : '#9CA3AF'}
            tick={{ fill: isDark ? '#8C877D' : '#6B7280', fontSize: 9 }}
          />
          <Radar
            name="Current Verified"
            dataKey="Current"
            stroke="#FF6B5F"
            fill="#FF6B5F"
            fillOpacity={0.45}
            isAnimationActive={true}
            animationDuration={800}
            animationEasing="ease-out"
          />
          <Radar
            name="Target Benchmark"
            dataKey="Target"
            stroke="#38BDF8"
            fill="#38BDF8"
            fillOpacity={0.2}
            isAnimationActive={true}
            animationDuration={800}
            animationEasing="ease-out"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? '#111418' : '#FFFFFF',
              borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
              borderRadius: '12px',
              color: isDark ? '#F5F1E8' : '#111418',
              fontSize: '12px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillRadarChart;
