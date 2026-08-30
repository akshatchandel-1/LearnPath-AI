import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useLearningPath } from '../context/LearningPathContext';
import { ResourceCard } from '../components/cards/ResourceCard';
import { ExplainabilityModal } from '../components/explainability/ExplainabilityModal';
import { BookOpen, Search, Filter, RefreshCw, Sparkles, ExternalLink } from 'lucide-react';

export const ResourcesPage = () => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { recommendations } = useLearningPath();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [selectedExplainRec, setSelectedExplainRec] = useState(null);

  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      fetchResources();
    }
  }, [typeFilter, search, isAuthenticated, authLoading]);

  const fetchResources = async () => {
    try {
      setLoading(true);
      const params = {};
      if (typeFilter !== 'All') params.type = typeFilter;
      if (search) params.search = search;

      const res = await api.get('/resources', { params });
      if (res.data.success) {
        setResources(res.data.resources);
      }
    } catch (err) {
      console.error('Error fetching resources:', err);
    } finally {
      setLoading(false);
    }
  };

  const types = ['All', 'Course', 'Video', 'Project', 'Article', 'Coding Practice', 'Documentation'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-brand-500/20 text-brand-300 border border-brand-500/30">
            Curated Knowledge Base
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white font-display">
          Learning Resource Catalog
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">
          50+ curated courses, documentation, interactive projects, and video deep-dives.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl glass-panel border border-white/10">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by topic, skill, or title..."
            className="w-full pl-10 pr-4 py-2 rounded-xl text-xs bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-brand-400"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                typeFilter === t
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Resource Cards Grid */}
      {loading ? (
        <div className="py-20 text-center space-y-3">
          <RefreshCw className="w-8 h-8 text-brand-400 animate-spin mx-auto" />
          <p className="text-xs text-slate-400">Loading resources...</p>
        </div>
      ) : resources.length === 0 ? (
        <div className="py-16 text-center text-slate-400 glass-panel rounded-2xl border border-white/10">
          No resources found matching your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((res) => {
            // Find if this resource is in current ML recommendations
            const matchedRec = recommendations.find(r => (r.resource?._id || r.resource) === res._id);
            const fallbackRec = matchedRec || {
              _id: `rec_${res._id}`,
              resource: res,
              score: 85,
              reason: `Covers ${res.skills?.join(', ')} with high student rating (${res.rating}★).`,
              breakdown: {
                semanticSimilarity: 80,
                skillGapMatch: 75,
                difficultyMatch: 85,
                interestMatch: 80,
                prerequisiteMatch: 90,
                learningPreferenceMatch: 85,
                historicalPerformance: 80,
              },
              matchedSkills: res.skills || [],
              skillGapAddressed: [],
              difficultyFit: 'Good Fit',
              estimatedImpact: `Strengthens ${res.skills?.[0] || 'competencies'}`,
            };

            return (
              <ResourceCard
                key={res._id}
                recommendation={fallbackRec}
                onExplain={(r) => setSelectedExplainRec(r)}
              />
            );
          })}
        </div>
      )}

      {/* Explainability Modal */}
      <ExplainabilityModal
        recommendation={selectedExplainRec}
        isOpen={Boolean(selectedExplainRec)}
        onClose={() => setSelectedExplainRec(null)}
      />
    </div>
  );
};

export default ResourcesPage;
