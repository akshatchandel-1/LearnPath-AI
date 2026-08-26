import React, { useState } from 'react';
import { useLearningPath } from '../context/LearningPathContext';
import { RoadmapTimeline } from '../components/roadmap/RoadmapTimeline';
import { QuizModal } from '../components/quiz/QuizModal';
import { ExplainabilityModal } from '../components/explainability/ExplainabilityModal';
import { Map, Sparkles, RefreshCw, GitFork, CheckCircle2, Award } from 'lucide-react';

export const RoadmapPage = () => {
  const { learningPath, adaptRoadmap, adapting } = useLearningPath();
  const [activeQuizSkill, setActiveQuizSkill] = useState(null);
  const [selectedExplainRec, setSelectedExplainRec] = useState(null);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Page Title & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-brand-500/20 text-brand-300 border border-brand-500/30 flex items-center gap-1">
              <GitFork className="w-3.5 h-3.5" />
              Topological Curriculum Graph
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-display">
            Personalized Learning Roadmap
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Prerequisite-ordered roadmap dynamically recalibrating based on your assessment scores.
          </p>
        </div>
      </div>

      {/* Interactive Timeline */}
      <RoadmapTimeline
        onOpenQuiz={(skill) => setActiveQuizSkill(skill)}
        onExplainResource={(r) => setSelectedExplainRec(r)}
      />

      {/* Modals */}
      <QuizModal
        skillName={activeQuizSkill}
        isOpen={Boolean(activeQuizSkill)}
        onClose={() => setActiveQuizSkill(null)}
      />

      <ExplainabilityModal
        recommendation={selectedExplainRec}
        isOpen={Boolean(selectedExplainRec)}
        onClose={() => setSelectedExplainRec(null)}
      />
    </div>
  );
};

export default RoadmapPage;
