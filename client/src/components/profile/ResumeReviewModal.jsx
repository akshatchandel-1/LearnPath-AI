import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { X, Save, Edit3 } from 'lucide-react';

export default function ResumeReviewModal({ extractedData, onClose, onSave }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [formData, setFormData] = useState({
    name: extractedData?.name || '',
    email: extractedData?.email || '',
    phone: extractedData?.phone || '',
    location: extractedData?.location || '',
    linkedin: extractedData?.linkedin || '',
    github: extractedData?.github || '',
    portfolio: extractedData?.portfolio || '',
    skills: extractedData?.skills ? extractedData.skills.join(', ') : '',
    education: extractedData?.education ? extractedData.education.join('\n') : '',
    experience: extractedData?.experience ? extractedData.experience.join('\n') : '',
    projects: extractedData?.projects ? extractedData.projects.join('\n') : '',
    certifications: extractedData?.certifications ? extractedData.certifications.join('\n') : '',
    achievements: extractedData?.achievements ? extractedData.achievements.join('\n') : ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert back to arrays before saving
    const processArrayField = (text, isCommaSeparated = false) => {
      if (!text || text.trim() === '') return [];
      if (isCommaSeparated) {
        return text.split(',').map(item => item.trim()).filter(Boolean);
      }
      return text.split('\n').map(item => item.trim()).filter(Boolean);
    };

    const finalData = {
      ...formData,
      skills: processArrayField(formData.skills, true),
      education: processArrayField(formData.education),
      experience: processArrayField(formData.experience),
      projects: processArrayField(formData.projects),
      certifications: processArrayField(formData.certifications),
      achievements: processArrayField(formData.achievements)
    };

    onSave(finalData);
  };

  const inputClass = `w-full px-4 py-2.5 rounded-xl border text-sm transition-colors ${
    isDark
      ? 'bg-[#1A1D24] border-white/[0.06] text-white placeholder-gray-500 focus:border-[#FF6B5F] focus:ring-1 focus:ring-[#FF6B5F]'
      : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#FF6B5F] focus:ring-1 focus:ring-[#FF6B5F]'
  }`;

  const labelClass = `block text-xs font-bold mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className={`relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl shadow-2xl overflow-hidden ${
        isDark ? 'bg-[#111418] border border-white/[0.08]' : 'bg-white border border-black/[0.08]'
      }`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b shrink-0 ${
          isDark ? 'border-white/[0.06]' : 'border-gray-100'
        }`}>
          <div>
            <h2 className={`text-xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Review Resume Data
            </h2>
            <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Review and edit the extracted information before saving to your profile.
            </p>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-xl transition-colors ${
              isDark ? 'hover:bg-white/5 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-8">
          <form id="resume-review-form" onSubmit={handleSubmit} className="space-y-6">
            
            {/* Personal Info Section */}
            <div>
              <h3 className={`text-sm font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <div className="w-6 h-6 rounded-md bg-[#FF6B5F]/10 text-[#FF6B5F] flex items-center justify-center shrink-0">
                  <Edit3 className="w-3.5 h-3.5" />
                </div>
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Full Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} className={inputClass} placeholder="John Doe" />
                </div>
                <div>
                  <label className={labelClass}>Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClass} placeholder="john@example.com" />
                </div>
                <div>
                  <label className={labelClass}>Phone</label>
                  <input type="text" name="phone" value={formData.phone} onChange={handleChange} className={inputClass} placeholder="+1 234 567 8900" />
                </div>
                <div>
                  <label className={labelClass}>Location</label>
                  <input type="text" name="location" value={formData.location} onChange={handleChange} className={inputClass} placeholder="San Francisco, CA" />
                </div>
                <div>
                  <label className={labelClass}>LinkedIn URL</label>
                  <input type="url" name="linkedin" value={formData.linkedin} onChange={handleChange} className={inputClass} placeholder="https://linkedin.com/in/..." />
                </div>
                <div>
                  <label className={labelClass}>GitHub URL</label>
                  <input type="url" name="github" value={formData.github} onChange={handleChange} className={inputClass} placeholder="https://github.com/..." />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>Portfolio / Website URL</label>
                  <input type="url" name="portfolio" value={formData.portfolio} onChange={handleChange} className={inputClass} placeholder="https://yourdomain.com" />
                </div>
              </div>
            </div>

            {/* Arrays Section */}
            <div>
              <h3 className={`text-sm font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <div className="w-6 h-6 rounded-md bg-[#38BDF8]/10 text-[#38BDF8] flex items-center justify-center shrink-0">
                  <Edit3 className="w-3.5 h-3.5" />
                </div>
                Extracted Details
              </h3>

              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Skills (Comma separated)</label>
                  <textarea 
                    name="skills" 
                    value={formData.skills} 
                    onChange={handleChange} 
                    rows={2} 
                    className={inputClass} 
                    placeholder="JavaScript, React, Node.js..."
                  />
                </div>
                <div>
                  <label className={labelClass}>Experience (Line separated)</label>
                  <textarea 
                    name="experience" 
                    value={formData.experience} 
                    onChange={handleChange} 
                    rows={4} 
                    className={inputClass} 
                  />
                </div>
                <div>
                  <label className={labelClass}>Education (Line separated)</label>
                  <textarea 
                    name="education" 
                    value={formData.education} 
                    onChange={handleChange} 
                    rows={3} 
                    className={inputClass} 
                  />
                </div>
                <div>
                  <label className={labelClass}>Projects (Line separated)</label>
                  <textarea 
                    name="projects" 
                    value={formData.projects} 
                    onChange={handleChange} 
                    rows={3} 
                    className={inputClass} 
                  />
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className={`flex items-center justify-end gap-3 p-6 border-t shrink-0 ${
          isDark ? 'border-white/[0.06] bg-[#0E1114]' : 'border-gray-100 bg-gray-50'
        }`}>
          <button
            type="button"
            onClick={onClose}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-colors ${
              isDark
                ? 'bg-[#1A1D24] text-gray-300 hover:bg-white/10'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Cancel
          </button>
          
          <button
            type="submit"
            form="resume-review-form"
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#FF6B5F] hover:bg-[#E85548] text-white text-sm font-bold shadow-lg shadow-[#FF6B5F]/20 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save to Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
