import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { mockProfile } from '../../utils/mockData';
import EditProfileModal from './EditProfileModal';
import {
  Mail,
  MapPin,
  Edit3,
  BookOpen,
  FolderCheck,
  Flame,
  Clock
} from 'lucide-react';

export default function ProfileOverview() {
  const { user } = useAuth();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [activeEditTab, setActiveEditTab] = useState('personal');

  const [profileData, setProfileData] = useState(() => ({
    name: user?.name || mockProfile.name,
    email: user?.email || mockProfile.email,
    location: user?.location || mockProfile.location,
    tagline: user?.tagline || mockProfile.tagline,
    education: user?.education || mockProfile.education,
    experienceLevel: user?.experienceLevel || mockProfile.experienceLevel,
    careerGoal: user?.careerGoal || mockProfile.careerGoal,
    areasOfInterest: user?.areasOfInterest || mockProfile.areasOfInterest,
    preferredLearningStyle: user?.preferredLearningStyle || mockProfile.preferredLearningStyle,
    weeklyLearningTime: user?.weeklyLearningTime || mockProfile.weeklyLearningTime,
    currentFocus: user?.currentFocus || mockProfile.currentFocus,
    interests: user?.interests || mockProfile.interests,
    skills: user?.skills || [
      { name: 'HTML', progress: 90 },
      { name: 'CSS', progress: 80 },
      { name: 'JavaScript', progress: 65 },
      { name: 'React', progress: 40 },
      { name: 'Node.js', progress: 20 },
    ],
  }));

  const openEditModal = (tab = 'personal') => {
    setActiveEditTab(tab);
    setIsEditOpen(true);
  };

  const handleSaveProfile = (updated) => {
    setProfileData((prev) => ({
      ...prev,
      ...updated,
    }));
    setIsEditOpen(false);
  };

  const avatarInitial = profileData.name ? profileData.name.charAt(0).toUpperCase() : 'K';

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-8">
      {/* Header Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
          My Profile
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage your personal information and learning preferences.
        </p>
      </div>

      {/* Profile Hero Card */}
      <div className="bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            {/* Avatar Circle */}
            <div className="w-20 h-20 rounded-full bg-purple-600 text-white font-bold text-3xl flex items-center justify-center shrink-0 shadow-lg shadow-purple-600/20">
              {avatarInitial}
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {profileData.name}
              </h2>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {profileData.tagline}
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  {profileData.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  {profileData.location}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => openEditModal('personal')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-purple-600 dark:border-purple-500 text-purple-600 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/40 text-xs font-semibold transition-colors shrink-0"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>
        </div>
      </div>

      {/* 3-Column Detailed Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Personal Information */}
        <div className="bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Personal Information
            </h3>
            <button
              onClick={() => openEditModal('personal')}
              className="text-xs text-purple-600 dark:text-purple-400 hover:underline font-semibold flex items-center gap-1"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-slate-400 dark:text-slate-500 block font-medium">Full Name</span>
              <span className="text-slate-800 dark:text-slate-200 font-semibold text-sm">
                {profileData.name}
              </span>
            </div>

            <div>
              <span className="text-slate-400 dark:text-slate-500 block font-medium">Email</span>
              <span className="text-slate-800 dark:text-slate-200 font-semibold truncate block">
                {profileData.email}
              </span>
            </div>

            <div>
              <span className="text-slate-400 dark:text-slate-500 block font-medium">Location</span>
              <span className="text-slate-800 dark:text-slate-200 font-semibold">
                {profileData.location}
              </span>
            </div>

            <div>
              <span className="text-slate-400 dark:text-slate-500 block font-medium">Education</span>
              <span className="text-slate-800 dark:text-slate-200 font-semibold">
                {profileData.education}
              </span>
            </div>

            <div>
              <span className="text-slate-400 dark:text-slate-500 block font-medium">Experience Level</span>
              <span className="text-slate-800 dark:text-slate-200 font-semibold">
                {profileData.experienceLevel}
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Learning Preferences */}
        <div className="bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Learning Preferences
            </h3>
            <button
              onClick={() => openEditModal('preferences')}
              className="text-xs text-purple-600 dark:text-purple-400 hover:underline font-semibold flex items-center gap-1"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-slate-400 dark:text-slate-500 block font-medium">Career Goal</span>
              <span className="text-slate-800 dark:text-slate-200 font-semibold">
                {profileData.tagline ? profileData.tagline.replace('Aspiring ', '') : 'Full Stack Developer'}
              </span>
            </div>

            <div>
              <span className="text-slate-400 dark:text-slate-500 block font-medium">Areas of Interest</span>
              <span className="text-slate-800 dark:text-slate-200 font-semibold">
                {typeof profileData.areasOfInterest === 'string'
                  ? profileData.areasOfInterest
                  : profileData.areasOfInterest.join(', ')}
              </span>
            </div>

            <div>
              <span className="text-slate-400 dark:text-slate-500 block font-medium">Preferred Learning Style</span>
              <span className="text-slate-800 dark:text-slate-200 font-semibold">
                {profileData.preferredLearningStyle}
              </span>
            </div>

            <div>
              <span className="text-slate-400 dark:text-slate-500 block font-medium">Weekly Learning Time</span>
              <span className="text-slate-800 dark:text-slate-200 font-semibold">
                {profileData.weeklyLearningTime}
              </span>
            </div>

            <div>
              <span className="text-slate-400 dark:text-slate-500 block font-medium">Current Focus</span>
              <span className="text-purple-600 dark:text-purple-400 font-semibold">
                {profileData.currentFocus}
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: Skills Overview */}
        <div className="bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="pb-2 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Skills Overview
            </h3>
          </div>

          <div className="space-y-3.5 pt-1">
            {profileData.skills.map((skill) => (
              <div key={skill.name} className="space-y-1">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-slate-700 dark:text-slate-300">{skill.name}</span>
                  <span className="text-slate-500 dark:text-slate-400">{skill.progress}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-purple-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${skill.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Learning Summary Bar (4 Stats) */}
      <div className="bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
          Learning Summary
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold text-slate-900 dark:text-white block leading-tight">12</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Courses Completed</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
              <FolderCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold text-slate-900 dark:text-white block leading-tight">5</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Projects Completed</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40">
            <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/60 text-orange-500 flex items-center justify-center shrink-0">
              <Flame className="w-5 h-5 fill-orange-500" />
            </div>
            <div>
              <span className="text-xl font-bold text-slate-900 dark:text-white block leading-tight">7</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Day Streak</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold text-slate-900 dark:text-white block leading-tight">48</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Total Learning Hours</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interests & Goals Card with Vector Graphic */}
      <div className="bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-5 flex-1 w-full">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Interests & Goals</h3>
              <button
                onClick={() => openEditModal('interests')}
                className="text-xs text-purple-600 dark:text-purple-400 hover:underline font-semibold flex items-center gap-1"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
                Career Goal
              </h4>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
                {profileData.careerGoal}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2.5">
                Interests
              </h4>
              <div className="flex flex-wrap gap-2">
                {profileData.interests.map((interest) => (
                  <span
                    key={interest}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-100 dark:border-purple-900/50"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Vector Illustration */}
          <div className="w-48 h-44 shrink-0 flex items-center justify-center">
            <svg viewBox="0 0 200 180" fill="none" className="w-full h-full">
              <ellipse cx="160" cy="145" rx="16" ry="6" fill="#CBD5E1" />
              <path d="M148 120 L152 145 L168 145 L172 120 Z" fill="#93C5FD" />
              <path d="M160 120 C150 100 135 110 145 90 C155 105 160 115 160 120 Z" fill="#22C55E" />
              <path d="M160 120 C170 100 185 110 175 90 C165 105 160 115 160 120 Z" fill="#16A34A" />

              <rect x="25" y="130" width="110" height="18" rx="4" fill="#818CF8" />
              <rect x="35" y="133" width="95" height="12" rx="2" fill="#EEF2FF" />

              <rect x="30" y="112" width="100" height="18" rx="4" fill="#C084FC" />
              <rect x="38" y="115" width="86" height="12" rx="2" fill="#FAF5FF" />

              <rect x="35" y="94" width="90" height="18" rx="4" fill="#6366F1" />
              <rect x="42" y="97" width="76" height="12" rx="2" fill="#EEF2FF" />

              <rect x="40" y="76" width="80" height="18" rx="4" fill="#7C3AED" />
              <rect x="46" y="79" width="68" height="12" rx="2" fill="#F3E8FF" />

              <polygon points="80,35 125,50 80,65 35,50" fill="#312E81" />
              <path d="M50 56 L50 72 C50 78 110 78 110 72 L110 56 Z" fill="#4338CA" />
              <circle cx="80" cy="50" r="3" fill="#F59E0B" />
              <path d="M80 50 L115 65 L115 80" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditOpen && (
        <EditProfileModal
          profileData={profileData}
          initialTab={activeEditTab}
          onSave={handleSaveProfile}
          onClose={() => setIsEditOpen(false)}
        />
      )}
    </div>
  );
}
