import React, { useState } from 'react';
import { CAREER_OBJECTIVES } from '../../data/careerObjectives';
import { X, Save, User, BookOpen, Heart, Target } from 'lucide-react';

export default function EditProfileModal({ profileData, onSave, onClose, initialTab = 'personal' }) {
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
      <div className="bg-[#111418] rounded-[28px] max-w-xl w-full shadow-2xl overflow-hidden my-8 border border-white/[0.1] text-[#F5F1E8]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/[0.08] bg-[#0E1114]">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-[#FF6B5F]" />
            <h3 className="font-bold text-[#F5F1E8] text-base">Edit Profile Information</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#8C877D] hover:text-[#F5F1E8] hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-white/[0.08] px-6 pt-3 bg-[#111418]">
          <button
            type="button"
            onClick={() => setActiveTab('personal')}
            className={`flex items-center gap-2 pb-3 px-3 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'personal'
                ? 'border-[#FF6B5F] text-[#FF857A]'
                : 'border-transparent text-[#8C877D] hover:text-[#F5F1E8]'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Personal Info</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('preferences')}
            className={`flex items-center gap-2 pb-3 px-3 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'preferences'
                ? 'border-[#FF6B5F] text-[#FF857A]'
                : 'border-transparent text-[#8C877D] hover:text-[#F5F1E8]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Learning Preferences</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('interests')}
            className={`flex items-center gap-2 pb-3 px-3 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'interests'
                ? 'border-[#FF6B5F] text-[#FF857A]'
                : 'border-transparent text-[#8C877D] hover:text-[#F5F1E8]'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>Target Role & Goals</span>
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* TAB 1: Personal Info */}
          {activeTab === 'personal' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#C7C2B6] mb-1 uppercase tracking-wider">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full text-xs sm:text-sm bg-[#16191E] border border-white/[0.08] text-[#F5F1E8] rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#FF6B5F] focus:ring-1 focus:ring-[#FF6B5F]/40"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#C7C2B6] mb-1 uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full text-xs sm:text-sm bg-[#16191E] border border-white/[0.08] text-[#F5F1E8] rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#FF6B5F] focus:ring-1 focus:ring-[#FF6B5F]/40"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#C7C2B6] mb-1 uppercase tracking-wider">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="San Francisco, CA"
                    className="w-full text-xs sm:text-sm bg-[#16191E] border border-white/[0.08] text-[#F5F1E8] rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#FF6B5F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#C7C2B6] mb-1 uppercase tracking-wider">
                    Education
                  </label>
                  <input
                    type="text"
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    placeholder="B.Tech in Computer Science"
                    className="w-full text-xs sm:text-sm bg-[#16191E] border border-white/[0.08] text-[#F5F1E8] rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#FF6B5F]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#C7C2B6] mb-1 uppercase tracking-wider">
                  Professional Tagline
                </label>
                <input
                  type="text"
                  name="tagline"
                  value={formData.tagline}
                  onChange={handleChange}
                  placeholder="Aspiring Software Engineer & Cloud Architect"
                  className="w-full text-xs sm:text-sm bg-[#16191E] border border-white/[0.08] text-[#F5F1E8] rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#FF6B5F]"
                />
              </div>
            </div>
          )}

          {/* TAB 2: Learning Preferences */}
          {activeTab === 'preferences' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#C7C2B6] mb-1 uppercase tracking-wider">
                  Preferred Learning Style
                </label>
                <select
                  name="preferredLearningStyle"
                  value={formData.preferredLearningStyle}
                  onChange={handleChange}
                  className="w-full text-xs sm:text-sm bg-[#16191E] border border-white/[0.08] text-[#F5F1E8] rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#FF6B5F] cursor-pointer"
                >
                  <option value="Hands-on Projects" className="bg-[#111418]">Hands-on Projects & Labs</option>
                  <option value="Video Lectures & Code Along" className="bg-[#111418]">Video Lectures & Code Along</option>
                  <option value="Documentation & Articles" className="bg-[#111418]">Technical Docs & RFCs</option>
                  <option value="Quiz & Benchmark Driven" className="bg-[#111418]">Quiz & Benchmark Driven</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#C7C2B6] mb-1 uppercase tracking-wider">
                  Weekly Learning Time Commitment
                </label>
                <select
                  name="weeklyLearningTime"
                  value={formData.weeklyLearningTime}
                  onChange={handleChange}
                  className="w-full text-xs sm:text-sm bg-[#16191E] border border-white/[0.08] text-[#F5F1E8] rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#FF6B5F] cursor-pointer"
                >
                  <option value="5-8 hours/week" className="bg-[#111418]">5-8 hours / week (Casual)</option>
                  <option value="10-15 hours/week" className="bg-[#111418]">10-15 hours / week (Standard)</option>
                  <option value="15-25 hours/week" className="bg-[#111418]">15-25 hours / week (Intensive)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#C7C2B6] mb-1 uppercase tracking-wider">
                  Current Technical Focus
                </label>
                <input
                  type="text"
                  name="currentFocus"
                  value={formData.currentFocus}
                  onChange={handleChange}
                  placeholder="React 18, Node.js Microservices, MongoDB"
                  className="w-full text-xs sm:text-sm bg-[#16191E] border border-white/[0.08] text-[#F5F1E8] rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#FF6B5F]"
                />
              </div>
            </div>
          )}

          {/* TAB 3: Interests & Career Objective */}
          {activeTab === 'interests' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#C7C2B6] mb-1 uppercase tracking-wider flex items-center gap-1">
                  <Target className="w-3.5 h-3.5 text-[#FF6B5F]" />
                  <span>Target Career Objective (48+ IT & CS Specializations)</span>
                </label>
                <select
                  name="targetRole"
                  value={formData.targetRole}
                  onChange={handleChange}
                  className="w-full text-xs sm:text-sm bg-[#16191E] border border-white/[0.08] text-[#F5F1E8] rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#FF6B5F] cursor-pointer"
                >
                  {CAREER_OBJECTIVES.map((obj) => (
                    <option key={obj} value={obj} className="bg-[#111418] text-[#F5F1E8]">
                      {obj}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#C7C2B6] mb-1 uppercase tracking-wider">
                  Areas of Interest (Comma separated)
                </label>
                <input
                  type="text"
                  name="areasOfInterest"
                  value={formData.areasOfInterest}
                  onChange={handleChange}
                  placeholder="Web Development, Artificial Intelligence, System Architecture"
                  className="w-full text-xs sm:text-sm bg-[#16191E] border border-white/[0.08] text-[#F5F1E8] rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#FF6B5F]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#C7C2B6] mb-1 uppercase tracking-wider">
                  Interests & Key Tech Tags
                </label>
                <input
                  type="text"
                  name="interests"
                  value={formData.interests}
                  onChange={handleChange}
                  placeholder="Full Stack, TypeScript, Cloud, System Design"
                  className="w-full text-xs sm:text-sm bg-[#16191E] border border-white/[0.08] text-[#F5F1E8] rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#FF6B5F]"
                />
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-5 border-t border-white/[0.08]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-white/10 text-xs font-bold text-[#8C877D] hover:text-[#F5F1E8] hover:bg-white/5 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF6B5F] to-[#E85548] hover:from-[#FF857A] hover:to-[#FF6B5F] text-white text-xs font-bold shadow-md shadow-[#FF6B5F]/20 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
