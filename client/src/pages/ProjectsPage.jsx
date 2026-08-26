import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Sparkles, Code, CheckCircle2, Clock, ExternalLink, RefreshCw, FolderGit2, Layers } from 'lucide-react';
import ProjectDetailModal from '../components/projects/ProjectDetailModal';

export const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await api.get('/projects');
      if (res.data.success) {
        setProjects(res.data.projects || []);
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-brand-500/20 text-brand-300 border border-brand-500/30">
            Portfolio & Capstone Builds
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white font-display">
          Recommended Hands-On Projects
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">
          Industry-grade full-stack and specialized projects designed to prove your learned skills.
        </p>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="py-20 text-center">
          <RefreshCw className="w-8 h-8 text-brand-400 animate-spin mx-auto" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((proj) => (
            <div
              key={proj._id}
              className="p-6 rounded-3xl glass-panel border border-white/10 flex flex-col justify-between space-y-6 group hover:border-brand-500/30 transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-brand-500/20 text-brand-300 border border-brand-500/30">
                    {proj.category} • {proj.difficulty}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    ~{proj.estimatedHours} hours
                  </span>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-display group-hover:text-brand-300 transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                    {proj.description}
                  </p>
                </div>

                {/* Key Features */}
                <div className="space-y-1.5 pt-1">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Core Architectural Deliverables
                  </p>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {proj.features?.slice(0, 3).map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Required Skills Badges */}
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Skills Synthesized
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.requiredSkills?.map((sk, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium bg-brand-500/10 border border-brand-500/20 text-brand-200"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedProject(proj)}
                  className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white font-medium cursor-pointer"
                >
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span>Explore Blueprint</span>
                </button>

                <button
                  onClick={() => setSelectedProject(proj)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-500 text-white shadow-md shadow-brand-600/30 transition-all cursor-pointer"
                >
                  <span>Build Project</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};

export default ProjectsPage;
