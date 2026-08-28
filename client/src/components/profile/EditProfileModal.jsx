import React, { useState } from 'react';
import { X, Save, User, BookOpen, Target, Sparkles } from 'lucide-react';

export default function EditProfileModal({ profileData, initialTab = 'personal', onSave, onClose }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [formData, setFormData] = useState({
    name: profileData?.name || '',
    email: profileData?.email || '',
    tagline: profileData?.tagline || '',
    location: profileData?.location || '',
    education: profileData?.education || '',
    experienceLevel: profileData?.experienceLevel || 'Intermediate',
    areasOfInterest: profileData?.areasOfInterest || '',
    preferredLearningStyle: profileData?.preferredLearningStyle || 'Hands-on Projects',
    weeklyLearningTime: profileData?.weeklyLearningTime || '12-15 hours/week',
    currentFocus: profileData?.currentFocus || '',
    careerGoal: profileData?.careerGoal || '',
    interests: Array.isArray(profileData?.interests) ? profileData.interests.join(', ') : (profileData?.interests || ''),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = {
      ...formData,
      interests: typeof formData.interests === 'string'
        ? formData.interests.split(',').map((s) => s.trim()).filter(Boolean)
        : formData.interests,
    };
    onSave(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div
        className="bg-[#111418] border border-white/10 rounded-[28px] max-w-2xl w-full shadow-2xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto animate-in zoom-in-95 text-[#F5F1E8]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6B5F] to-[#E85548] flex items-center justify-center text-white shadow-lg shadow-[#FF6B5F]/25">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#F5F1E8]">Edit Profile & Preferences</h2>
              <p className="text-xs text-[#8C877D]">Keep your AI recommendation engine up to date</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#8C877D] hover:text-[#F5F1E8] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/[0.08] my-4 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('personal')}
            className={`flex items-center gap-1.5 pb-2.5 px-3 border-b-2 transition-colors ${
              activeTab === 'personal'
                ? 'border-[#FF6B5F] text-[#FF857A]'
                : 'border-transparent text-[#8C877D] hover:text-[#F5F1E8]'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            Personal Info
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preferences')}
            className={`flex items-center gap-1.5 pb-2.5 px-3 border-b-2 transition-colors ${
              activeTab === 'preferences'
                ? 'border-[#FF6B5F] text-[#FF857A]'
                : 'border-transparent text-[#8C877D] hover:text-[#F5F1E8]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Learning Preferences
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('interests')}
            className={`flex items-center gap-1.5 pb-2.5 px-3 border-b-2 transition-colors ${
              activeTab === 'interests'
                ? 'border-[#FF6B5F] text-[#FF857A]'
                : 'border-transparent text-[#8C877D] hover:text-[#F5F1E8]'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            Interests & Goals
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* TAB 1: PERSONAL INFO */}
          {activeTab === 'personal' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#C7C2B6] mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-white/10 bg-[#16191E] text-[#F5F1E8] focus:outline-none focus:border-[#FF6B5F]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#C7C2B6] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-white/10 bg-[#16191E] text-[#F5F1E8] focus:outline-none focus:border-[#FF6B5F]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#C7C2B6] mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-white/10 bg-[#16191E] text-[#F5F1E8] focus:outline-none focus:border-[#FF6B5F]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#C7C2B6] mb-1">
                  Education
                </label>
                <input
                  type="text"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-white/10 bg-[#16191E] text-[#F5F1E8] focus:outline-none focus:border-[#FF6B5F]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#C7C2B6] mb-1">
                  Experience Level
                </label>
                <select
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-white/10 bg-[#16191E] text-[#F5F1E8] focus:outline-none focus:border-[#FF6B5F]"
                >
                  <option value="Beginner" className="bg-[#111418] text-[#F5F1E8]">Beginner</option>
                  <option value="Intermediate" className="bg-[#111418] text-[#F5F1E8]">Intermediate</option>
                  <option value="Advanced" className="bg-[#111418] text-[#F5F1E8]">Advanced</option>
                </select>
              </div>
            </div>
          )}

          {/* TAB 2: LEARNING PREFERENCES */}
          {activeTab === 'preferences' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#C7C2B6] mb-1">
                  Career Goal / Target Role
                </label>
                <input
                  type="text"
                  name="tagline"
                  value={formData.tagline}
                  onChange={handleChange}
                  placeholder="Full Stack Developer"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-white/10 bg-[#16191E] text-[#F5F1E8] focus:outline-none focus:border-[#FF6B5F]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#C7C2B6] mb-1">
                  Areas of Interest
                </label>
                <input
                  type="text"
                  name="areasOfInterest"
                  value={formData.areasOfInterest}
                  onChange={handleChange}
                  placeholder="Web Development, AI, Data Science"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-white/10 bg-[#16191E] text-[#F5F1E8] focus:outline-none focus:border-[#FF6B5F]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#C7C2B6] mb-1">
                    Preferred Learning Style
                  </label>
                  <select
                    name="preferredLearningStyle"
                    value={formData.preferredLearningStyle}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-white/10 bg-[#16191E] text-[#F5F1E8] focus:outline-none focus:border-[#FF6B5F]"
                  >
                    <option value="Hands-on Projects" className="bg-[#111418] text-[#F5F1E8]">Hands-on Projects</option>
                    <option value="Video Tutorials" className="bg-[#111418] text-[#F5F1E8]">Video Tutorials</option>
                    <option value="Interactive Coding" className="bg-[#111418] text-[#F5F1E8]">Interactive Coding</option>
                    <option value="Reading & Documentation" className="bg-[#111418] text-[#F5F1E8]">Reading & Documentation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#C7C2B6] mb-1">
                    Weekly Learning Time
                  </label>
                  <input
                    type="text"
                    name="weeklyLearningTime"
                    value={formData.weeklyLearningTime}
                    onChange={handleChange}
                    placeholder="12-15 hours/week"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-white/10 bg-[#16191E] text-[#F5F1E8] focus:outline-none focus:border-[#FF6B5F]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#C7C2B6] mb-1">
                  Current Focus Technologies
                </label>
                <input
                  type="text"
                  name="currentFocus"
                  value={formData.currentFocus}
                  onChange={handleChange}
                  placeholder="React 18, Node.js Microservices, PyTorch"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-white/10 bg-[#16191E] text-[#F5F1E8] focus:outline-none focus:border-[#FF6B5F]"
                />
              </div>
            </div>
          )}

          {/* TAB 3: INTERESTS & GOALS */}
          {activeTab === 'interests' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#C7C2B6] mb-1">
                  Career Goal Description
                </label>
                <textarea
                  name="careerGoal"
                  rows={3}
                  value={formData.careerGoal}
                  onChange={handleChange}
                  placeholder="To engineer production-ready AI-driven scalable SaaS products..."
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-white/10 bg-[#16191E] text-[#F5F1E8] focus:outline-none focus:border-[#FF6B5F]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#C7C2B6] mb-1">
                  Interests (Comma separated)
                </label>
                <input
                  type="text"
                  name="interests"
                  value={formData.interests}
                  onChange={handleChange}
                  placeholder="Full Stack MERN, TypeScript, Vector Databases, Deep Learning"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-white/10 bg-[#16191E] text-[#F5F1E8] focus:outline-none focus:border-[#FF6B5F]"
                />
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
            <span className="text-[11px] text-[#8C877D] font-medium">
              Changes will save to your profile immediately.
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold rounded-xl text-[#C7C2B6] hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-[#FF6B5F] to-[#E85548] text-white hover:from-[#FF857A] shadow-md shadow-[#FF6B5F]/20 active:scale-[0.98] transition-all cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                Save Preferences
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
