import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import EditProfileModal from './EditProfileModal';
import {
  Mail,
  MapPin,
  Edit3,
  BookOpen,
  FolderCheck,
  Flame,
  Clock,
  Target,
  Sparkles,
  Award,
  CheckCircle2
} from 'lucide-react';

export default function ProfileOverview() {
  const { user, updateUserProfile } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [activeEditTab, setActiveEditTab] = useState('personal');

  const [profileData, setProfileData] = useState(() => ({
    name: user?.name || 'Learner',
    email: user?.email || '',
    location: user?.location || 'San Francisco, CA',
    tagline: user?.tagline || 'Aspiring Software Engineer & Cloud Architect',
    education: user?.education || 'B.Tech in Computer Science',
    experienceLevel: user?.experienceLevel || 'Intermediate',
    targetRole: user?.targetRole || user?.careerGoal || 'Full Stack Developer',
    careerGoal: user?.careerGoal || user?.targetRole || 'Full Stack Developer',
    areasOfInterest: user?.areasOfInterest || 'Web Development, Artificial Intelligence, System Architecture',
    preferredLearningStyle: user?.preferredLearningStyle || 'Hands-on Projects',
    weeklyLearningTime: user?.weeklyLearningTime || '10-15 hours/week',
    currentFocus: user?.currentFocus || 'React 18, Node.js Microservices, MongoDB',
    interests: user?.interests || ['Full Stack Development', 'TypeScript', 'System Design', 'Cloud Architecture'],
    skills: user?.skills || [
      { name: 'HTML & CSS', progress: 85 },
      { name: 'JavaScript ES6+', progress: 75 },
      { name: 'React.js', progress: 60 },
      { name: 'Node.js & Express', progress: 50 },
      { name: 'MongoDB', progress: 45 },
    ],
  }));

  useEffect(() => {
    if (user) {
      setProfileData(prev => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
        targetRole: user.targetRole || user.careerGoal || prev.targetRole,
        careerGoal: user.careerGoal || user.targetRole || prev.careerGoal,
        location: user.location || prev.location,
        tagline: user.tagline || prev.tagline,
        education: user.education || prev.education,
        experienceLevel: user.experienceLevel || prev.experienceLevel,
        weeklyLearningTime: user.weeklyLearningTime || prev.weeklyLearningTime,
        currentFocus: user.currentFocus || prev.currentFocus
      }));
    }
  }, [user]);

  const openEditModal = (tab = 'personal') => {
    setActiveEditTab(tab);
    setIsEditOpen(true);
  };

  const handleSaveProfile = (updated) => {
    setProfileData((prev) => ({
      ...prev,
      ...updated,
    }));
    if (updateUserProfile) {
      updateUserProfile(updated);
    }
    setIsEditOpen(false);
  };

  const avatarInitial = profileData.name ? profileData.name.charAt(0).toUpperCase() : 'U';
  const userStreak = user?.streakDays ?? user?.streak ?? 0;
  const userHours = user?.completedHours || 0;
  const userXp = user?.totalXp || 0;
  const userProgress = user?.overallProgress ?? 65;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-8 animate-in fade-in duration-200">
      {/* Header Title */}
      <div>
        <h1 className={`text-2xl sm:text-3xl font-black tracking-tight ${isDark ? 'text-[#F5F1E8]' : 'text-[#111418]'}`}>
          My Profile
        </h1>
        <p className="text-xs sm:text-sm text-[#8C877D] mt-1">
          Manage your personal credentials, target career objective, and learning preferences.
        </p>
      </div>

      {/* Profile Hero Card */}
      <div className={`p-6 sm:p-8 rounded-[24px] border shadow-sm ${
        isDark ? 'bg-[#111418] border-white/[0.08]' : 'bg-white border-black/[0.08]'
      }`}>
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            {/* Avatar Circle */}
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#FF6B5F] to-[#E85548] text-white font-black text-3xl flex items-center justify-center shrink-0 shadow-xl shadow-[#FF6B5F]/25">
              {avatarInitial}
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className={`text-2xl font-black tracking-tight ${isDark ? 'text-[#F5F1E8]' : 'text-[#111418]'}`}>
                  {profileData.name}
                </h2>
                <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold bg-[#FF6B5F]/15 text-[#FF857A] border border-[#FF6B5F]/30 font-mono">
                  {profileData.targetRole}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-[#8C877D]">
                {profileData.tagline}
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-1 text-xs text-[#8C877D]">
                {profileData.email && (
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#FF6B5F]" />
                    {profileData.email}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#FF6B5F]" />
                  {profileData.location}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => openEditModal('personal')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FF6B5F] hover:bg-[#E85548] text-white text-xs font-bold transition-all shadow-md shadow-[#FF6B5F]/20 cursor-pointer shrink-0"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>
        </div>

        {/* 4 Summary Mini Metrics (Dynamic) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/[0.06]">
          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-[#0E1114] border-white/[0.04]' : 'bg-black/[0.02] border-black/[0.04]'}`}>
            <span className="text-[10px] text-[#8C877D] font-bold uppercase block">Current Streak</span>
            <span className="text-lg font-black font-mono text-[#FF857A] flex items-center gap-1 mt-0.5">
              <Flame className="w-4 h-4 fill-current" /> {userStreak} Days
            </span>
          </div>

          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-[#0E1114] border-white/[0.04]' : 'bg-black/[0.02] border-black/[0.04]'}`}>
            <span className="text-[10px] text-[#8C877D] font-bold uppercase block">Time Logged</span>
            <span className="text-lg font-black font-mono text-[#F5F1E8] flex items-center gap-1 mt-0.5">
              <Clock className="w-4 h-4 text-[#38BDF8]" /> {userHours} hrs
            </span>
          </div>

          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-[#0E1114] border-white/[0.04]' : 'bg-black/[0.02] border-black/[0.04]'}`}>
            <span className="text-[10px] text-[#8C877D] font-bold uppercase block">Total XP</span>
            <span className="text-lg font-black font-mono text-[#FBBF24] flex items-center gap-1 mt-0.5">
              <Award className="w-4 h-4" /> +{userXp} XP
            </span>
          </div>

          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-[#0E1114] border-white/[0.04]' : 'bg-black/[0.02] border-black/[0.04]'}`}>
            <span className="text-[10px] text-[#8C877D] font-bold uppercase block">Roadmap Progress</span>
            <span className="text-lg font-black font-mono text-[#34D399] flex items-center gap-1 mt-0.5">
              <CheckCircle2 className="w-4 h-4" /> {userProgress}%
            </span>
          </div>
        </div>
      </div>

      {/* 3-Column Detailed Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Personal Information */}
        <div className={`p-6 rounded-[24px] border space-y-4 shadow-sm ${
          isDark ? 'bg-[#111418] border-white/[0.08]' : 'bg-white border-black/[0.08]'
        }`}>
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
            <h3 className={`text-base font-bold ${isDark ? 'text-[#F5F1E8]' : 'text-[#111418]'}`}>
              Personal Information
            </h3>
            <button
              onClick={() => openEditModal('personal')}
              className="text-xs text-[#FF857A] hover:underline font-bold flex items-center gap-1 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-[#8C877D] block font-medium">Full Name</span>
              <span className={`font-semibold text-sm ${isDark ? 'text-[#F5F1E8]' : 'text-[#111418]'}`}>
                {profileData.name}
              </span>
            </div>

            <div>
              <span className="text-[#8C877D] block font-medium">Email Address</span>
              <span className={`font-semibold truncate block ${isDark ? 'text-[#F5F1E8]' : 'text-[#111418]'}`}>
                {profileData.email || 'Not configured'}
              </span>
            </div>

            <div>
              <span className="text-[#8C877D] block font-medium">Location</span>
              <span className={`font-semibold ${isDark ? 'text-[#F5F1E8]' : 'text-[#111418]'}`}>
                {profileData.location}
              </span>
            </div>

            <div>
              <span className="text-[#8C877D] block font-medium">Education</span>
              <span className={`font-semibold ${isDark ? 'text-[#F5F1E8]' : 'text-[#111418]'}`}>
                {profileData.education}
              </span>
            </div>

            <div>
              <span className="text-[#8C877D] block font-medium">Experience Level</span>
              <span className={`font-semibold ${isDark ? 'text-[#F5F1E8]' : 'text-[#111418]'}`}>
                {profileData.experienceLevel}
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Learning Preferences */}
        <div className={`p-6 rounded-[24px] border space-y-4 shadow-sm ${
          isDark ? 'bg-[#111418] border-white/[0.08]' : 'bg-white border-black/[0.08]'
        }`}>
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
            <h3 className={`text-base font-bold ${isDark ? 'text-[#F5F1E8]' : 'text-[#111418]'}`}>
              Learning Preferences
            </h3>
            <button
              onClick={() => openEditModal('preferences')}
              className="text-xs text-[#FF857A] hover:underline font-bold flex items-center gap-1 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-[#8C877D] block font-medium">Preferred Learning Style</span>
              <span className={`font-semibold ${isDark ? 'text-[#F5F1E8]' : 'text-[#111418]'}`}>
                {profileData.preferredLearningStyle}
              </span>
            </div>

            <div>
              <span className="text-[#8C877D] block font-medium">Weekly Time Commitment</span>
              <span className={`font-semibold ${isDark ? 'text-[#F5F1E8]' : 'text-[#111418]'}`}>
                {profileData.weeklyLearningTime}
              </span>
            </div>

            <div>
              <span className="text-[#8C877D] block font-medium">Current Focus</span>
              <span className={`font-semibold leading-relaxed block ${isDark ? 'text-[#F5F1E8]' : 'text-[#111418]'}`}>
                {profileData.currentFocus}
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: Career Objective & Interests */}
        <div className={`p-6 rounded-[24px] border space-y-4 shadow-sm ${
          isDark ? 'bg-[#111418] border-white/[0.08]' : 'bg-white border-black/[0.08]'
        }`}>
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
            <h3 className={`text-base font-bold ${isDark ? 'text-[#F5F1E8]' : 'text-[#111418]'}`}>
              Career Objective
            </h3>
            <button
              onClick={() => openEditModal('interests')}
              className="text-xs text-[#FF857A] hover:underline font-bold flex items-center gap-1 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-[#8C877D] block font-medium">Target Role</span>
              <span className="font-bold text-sm text-[#FF857A] block mt-0.5">
                {profileData.targetRole}
              </span>
            </div>

            <div>
              <span className="text-[#8C877D] block font-medium">Areas of Interest</span>
              <p className={`font-semibold leading-relaxed mt-0.5 ${isDark ? 'text-[#F5F1E8]' : 'text-[#111418]'}`}>
                {profileData.areasOfInterest}
              </p>
            </div>

            <div>
              <span className="text-[#8C877D] block font-medium mb-1.5">Key Technical Interests</span>
              <div className="flex flex-wrap gap-1.5">
                {(Array.isArray(profileData.interests) ? profileData.interests : profileData.interests.split(',')).map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-[#FF6B5F]/10 text-[#FF857A] border border-[#FF6B5F]/20 font-mono"
                  >
                    {typeof tag === 'string' ? tag.trim() : tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal Component */}
      {isEditOpen && (
        <EditProfileModal
          initialTab={activeEditTab}
          profileData={profileData}
          onClose={() => setIsEditOpen(false)}
          onSave={handleSaveProfile}
        />
      )}
    </div>
  );
}
