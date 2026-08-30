import React, { useState } from 'react';
import { CAREER_OBJECTIVES } from '../../data/careerObjectives';
import { X, Save, User, BookOpen, Heart, Target } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function EditProfileModal({ profileData, onSave, onClose, initialTab = 'personal' }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState(initialTab);

  const [formData, setFormData] = useState({
    name: profileData.name || '',
    email: profileData.email || '',
    location: profileData.location || 'San Francisco, CA',
    tagline: profileData.tagline || 'Aspiring Software Engineer & Cloud Architect',
    education: profileData.education || 'B.Tech in Computer Science',
    experienceLevel: profileData.experienceLevel || 'Intermediate',
    targetRole: profileData.targetRole || profileData.careerGoal || 'Full Stack Developer',
    careerGoal: profileData.careerGoal || profileData.targetRole || 'Full Stack Developer',
    areasOfInterest: typeof profileData.areasOfInterest === 'string'
      ? profileData.areasOfInterest
      : profileData.areasOfInterest ? profileData.areasOfInterest.join(', ') : 'Web Development, Artificial Intelligence, System Architecture',
    preferredLearningStyle: profileData.preferredLearningStyle || 'Hands-on Projects',
    weeklyLearningTime: profileData.weeklyLearningTime || '12-15 hours/week',
    currentFocus: profileData.currentFocus || 'React 18, Node.js Microservices, MongoDB',
    interests: profileData.interests ? (Array.isArray(profileData.interests) ? profileData.interests.join(', ') : profileData.interests) : 'Full Stack, TypeScript, Cloud, System Design',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      ...formData,
      targetRole: formData.targetRole || formData.careerGoal,
      careerGoal: formData.targetRole || formData.careerGoal,
      interests: typeof formData.interests === 'string'
        ? formData.interests.split(',').map(s => s.trim()).filter(Boolean)
        : formData.interests,
    };
    onSave(updatedData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div className={`rounded-[28px] max-w-xl w-full shadow-2xl overflow-hidden my-8 border transition-colors ${
        isDark ? 'bg-[#111418] border-white/[0.1] text-[#F5F1E8]' : 'bg-white border-black/[0.1] text-[#111418]'
      }`}>
        {/* Modal Header */}
        <div className={`flex items-center justify-between p-5 border-b ${
          isDark ? 'border-white/[0.08] bg-[#0E1114]' : 'border-black/[0.08] bg-[#F9FAFB]'
        }`}>
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-[#FF6B5F]" />
            <h3 className={`font-bold text-base ${isDark ? 'text-[#F5F1E8]' : 'text-[#111418]'}`}>
              Edit Profile Information
            </h3>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-xl transition-colors cursor-pointer ${
              isDark ? 'text-[#8C877D] hover:text-[#F5F1E8] hover:bg-white/10' : 'text-[#6B7280] hover:text-[#111418] hover:bg-black/5'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className={`flex border-b px-6 pt-3 ${
          isDark ? 'border-white/[0.08] bg-[#111418]' : 'border-black/[0.08] bg-[#F9FAFB]'
        }`}>
          <button
            type="button"
            onClick={() => setActiveTab('personal')}
            className={`flex items-center gap-2 pb-3 px-3 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'personal'
                ? 'border-[#FF6B5F] text-[#FF857A]'
                : isDark
                ? 'border-transparent text-[#8C877D] hover:text-[#F5F1E8]'
                : 'border-transparent text-[#6B7280] hover:text-[#111418]'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Personal Info</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('career')}
            className={`flex items-center gap-2 pb-3 px-3 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'career'
                ? 'border-[#FF6B5F] text-[#FF857A]'
                : isDark
                ? 'border-transparent text-[#8C877D] hover:text-[#F5F1E8]'
                : 'border-transparent text-[#6B7280] hover:text-[#111418]'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>Career & Role</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('learning')}
            className={`flex items-center gap-2 pb-3 px-3 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'learning'
                ? 'border-[#FF6B5F] text-[#FF857A]'
                : isDark
                ? 'border-transparent text-[#8C877D] hover:text-[#F5F1E8]'
                : 'border-transparent text-[#6B7280] hover:text-[#111418]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Preferences</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          {activeTab === 'personal' && (
            <div className="space-y-4">
              <div>
                <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-[#C7C2B6]' : 'text-[#374151]'}`}>
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#FF6B5F] transition-colors ${
                    isDark ? 'bg-[#16191E] border border-white/10 text-[#F5F1E8]' : 'bg-white border border-black/10 text-[#111418]'
                  }`}
                  required
                />
              </div>

              <div>
                <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-[#C7C2B6]' : 'text-[#374151]'}`}>
                  Professional Tagline
                </label>
                <input
                  type="text"
                  name="tagline"
                  value={formData.tagline}
                  onChange={handleChange}
                  className={`w-full rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#FF6B5F] transition-colors ${
                    isDark ? 'bg-[#16191E] border border-white/10 text-[#F5F1E8]' : 'bg-white border border-black/10 text-[#111418]'
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-[#C7C2B6]' : 'text-[#374151]'}`}>
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className={`w-full rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#FF6B5F] transition-colors ${
                      isDark ? 'bg-[#16191E] border border-white/10 text-[#F5F1E8]' : 'bg-white border border-black/10 text-[#111418]'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-[#C7C2B6]' : 'text-[#374151]'}`}>
                    Education
                  </label>
                  <input
                    type="text"
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    className={`w-full rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#FF6B5F] transition-colors ${
                      isDark ? 'bg-[#16191E] border border-white/10 text-[#F5F1E8]' : 'bg-white border border-black/10 text-[#111418]'
                    }`}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'career' && (
            <div className="space-y-4">
              <div>
                <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-[#C7C2B6]' : 'text-[#374151]'}`}>
                  Target Engineering Role / Objective
                </label>
                <select
                  name="targetRole"
                  value={formData.targetRole}
                  onChange={handleChange}
                  className={`w-full rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#FF6B5F] transition-colors cursor-pointer ${
                    isDark ? 'bg-[#16191E] border border-white/10 text-[#F5F1E8]' : 'bg-white border border-black/10 text-[#111418]'
                  }`}
                >
                  {CAREER_OBJECTIVES.map((role) => (
                    <option key={role} value={role} className={isDark ? 'bg-[#111418] text-[#F5F1E8]' : 'bg-white text-[#111418]'}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-[#C7C2B6]' : 'text-[#374151]'}`}>
                  Experience Level
                </label>
                <select
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleChange}
                  className={`w-full rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#FF6B5F] transition-colors cursor-pointer ${
                    isDark ? 'bg-[#16191E] border border-white/10 text-[#F5F1E8]' : 'bg-white border border-black/10 text-[#111418]'
                  }`}
                >
                  <option value="Beginner" className={isDark ? 'bg-[#111418] text-[#F5F1E8]' : 'bg-white text-[#111418]'}>Beginner (0-1 yrs)</option>
                  <option value="Intermediate" className={isDark ? 'bg-[#111418] text-[#F5F1E8]' : 'bg-white text-[#111418]'}>Intermediate (1-3 yrs)</option>
                  <option value="Advanced" className={isDark ? 'bg-[#111418] text-[#F5F1E8]' : 'bg-white text-[#111418]'}>Advanced (3+ yrs)</option>
                </select>
              </div>

              <div>
                <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-[#C7C2B6]' : 'text-[#374151]'}`}>
                  Current Focus Topics
                </label>
                <input
                  type="text"
                  name="currentFocus"
                  value={formData.currentFocus}
                  onChange={handleChange}
                  className={`w-full rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#FF6B5F] transition-colors ${
                    isDark ? 'bg-[#16191E] border border-white/10 text-[#F5F1E8]' : 'bg-white border border-black/10 text-[#111418]'
                  }`}
                />
              </div>
            </div>
          )}

          {activeTab === 'learning' && (
            <div className="space-y-4">
              <div>
                <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-[#C7C2B6]' : 'text-[#374151]'}`}>
                  Weekly Study Cadence
                </label>
                <input
                  type="text"
                  name="weeklyLearningTime"
                  value={formData.weeklyLearningTime}
                  onChange={handleChange}
                  className={`w-full rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#FF6B5F] transition-colors ${
                    isDark ? 'bg-[#16191E] border border-white/10 text-[#F5F1E8]' : 'bg-white border border-black/10 text-[#111418]'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-[#C7C2B6]' : 'text-[#374151]'}`}>
                  Preferred Learning Style
                </label>
                <select
                  name="preferredLearningStyle"
                  value={formData.preferredLearningStyle}
                  onChange={handleChange}
                  className={`w-full rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#FF6B5F] transition-colors cursor-pointer ${
                    isDark ? 'bg-[#16191E] border border-white/10 text-[#F5F1E8]' : 'bg-white border border-black/10 text-[#111418]'
                  }`}
                >
                  <option value="Hands-on Projects" className={isDark ? 'bg-[#111418] text-[#F5F1E8]' : 'bg-white text-[#111418]'}>Hands-on Projects</option>
                  <option value="Interactive Tutorials" className={isDark ? 'bg-[#111418] text-[#F5F1E8]' : 'bg-white text-[#111418]'}>Interactive Tutorials</option>
                  <option value="Visual Video Walkthroughs" className={isDark ? 'bg-[#111418] text-[#F5F1E8]' : 'bg-white text-[#111418]'}>Visual Video Walkthroughs</option>
                  <option value="Documentation & Deep Dives" className={isDark ? 'bg-[#111418] text-[#F5F1E8]' : 'bg-white text-[#111418]'}>Documentation & Deep Dives</option>
                </select>
              </div>
            </div>
          )}

          {/* Footer Buttons */}
          <div className={`flex items-center justify-end gap-3 pt-4 border-t ${
            isDark ? 'border-white/[0.08]' : 'border-black/[0.08]'
          }`}>
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                isDark ? 'border-white/10 text-[#C7C2B6] hover:bg-white/5' : 'border-black/10 text-[#4B5563] hover:bg-black/5'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-[#FF6B5F] hover:bg-[#E85548] text-white text-xs font-bold transition-all shadow-md shadow-[#FF6B5F]/20 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
