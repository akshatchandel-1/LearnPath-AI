import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import EditProfileModal from './EditProfileModal';
import ResumeReviewModal from './ResumeReviewModal';
import { uploadResume, parseResume, saveResumeData, deleteResume } from '../../services/api';
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
  CheckCircle2,
  FileText,
  Upload,
  RefreshCw,
  Trash2,
  ScanSearch
} from 'lucide-react';

export default function ProfileOverview() {
  const { user, updateUserProfile } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [activeEditTab, setActiveEditTab] = useState('personal');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  
  const [isUploading, setIsUploading] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const fileInputRef = useRef(null);

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
    resume: user?.resume || null,
    resumeData: user?.resumeData || null,
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
        currentFocus: user.currentFocus || prev.currentFocus,
        resume: user.resume || prev.resume,
        resumeData: user.resumeData || prev.resumeData
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

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert('File is too large. Maximum size is 10MB.');
      return;
    }

    try {
      setIsUploading(true);
      const res = await uploadResume(file);
      setProfileData(prev => ({ ...prev, resume: res.data.resume }));
      if (updateUserProfile) updateUserProfile({ resume: res.data.resume });
      
      // Reset input
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to upload resume');
    } finally {
      setIsUploading(false);
    }
  };

  const handleAnalyzeResume = async () => {
    try {
      setIsParsing(true);
      const res = await parseResume();
      setExtractedData(res.data.data);
      setIsReviewModalOpen(true);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to parse resume');
    } finally {
      setIsParsing(false);
    }
  };

  const handleSaveExtractedData = async (data) => {
    try {
      const res = await saveResumeData(data);
      
      const updatedProfileFields = {
        resumeData: res.data.profile.resumeData,
        name: res.data.profile.name,
        skills: res.data.profile.skills
      };

      setProfileData(prev => ({ ...prev, ...updatedProfileFields }));
      if (updateUserProfile) updateUserProfile(updatedProfileFields);
      
      setIsReviewModalOpen(false);
      alert('Resume data saved successfully! (Auto-filled core details)');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save resume data');
    }
  };

  const handleDeleteResume = async () => {
    if (!window.confirm('Are you sure you want to remove your resume?')) return;
    try {
      await deleteResume();
      setProfileData(prev => ({ ...prev, resume: null, resumeData: null }));
      if (updateUserProfile) updateUserProfile({ resume: null, resumeData: null });
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to remove resume');
    }
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
        <h1 className={`text-2xl sm:text-3xl font-black tracking-tight ${isDark ? 'text-gray-900 dark:text-[#F5F1E8]' : 'text-[#111418]'}`}>
          My Profile
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-[#8C877D] mt-1">
          Manage your personal credentials, target career objective, and learning preferences.
        </p>
      </div>

      {/* Profile Hero Card */}
      <div className={`p-6 sm:p-8 rounded-[24px] border shadow-sm ${
        isDark ? 'bg-white dark:bg-[#111418] border-gray-200 dark:border-white/[0.08]' : 'bg-white border-black/[0.08]'
      }`}>
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            {/* Avatar Circle */}
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#FF6B5F] to-[#E85548] text-white font-black text-3xl flex items-center justify-center shrink-0 shadow-xl shadow-[#FF6B5F]/25">
              {avatarInitial}
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className={`text-2xl font-black tracking-tight ${isDark ? 'text-gray-900 dark:text-[#F5F1E8]' : 'text-[#111418]'}`}>
                  {profileData.name}
                </h2>
                <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold bg-[#FF6B5F]/15 text-[#FF857A] border border-[#FF6B5F]/30 font-mono">
                  {profileData.targetRole}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-[#8C877D]">
                {profileData.tagline}
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-1 text-xs text-gray-500 dark:text-[#8C877D]">
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
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-white/[0.06]">
          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-gray-50 dark:bg-[#0E1114] border-gray-200 dark:border-white/[0.04]' : 'bg-black/[0.02] border-black/[0.04]'}`}>
            <span className="text-[10px] text-gray-500 dark:text-[#8C877D] font-bold uppercase block">Current Streak</span>
            <span className="text-lg font-black font-mono text-[#FF857A] flex items-center gap-1 mt-0.5">
              <Flame className="w-4 h-4 fill-current" /> {userStreak} Days
            </span>
          </div>

          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-gray-50 dark:bg-[#0E1114] border-gray-200 dark:border-white/[0.04]' : 'bg-black/[0.02] border-black/[0.04]'}`}>
            <span className="text-[10px] text-gray-500 dark:text-[#8C877D] font-bold uppercase block">Time Logged</span>
            <span className="text-lg font-black font-mono text-gray-900 dark:text-[#F5F1E8] flex items-center gap-1 mt-0.5">
              <Clock className="w-4 h-4 text-[#38BDF8]" /> {userHours} hrs
            </span>
          </div>

          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-gray-50 dark:bg-[#0E1114] border-gray-200 dark:border-white/[0.04]' : 'bg-black/[0.02] border-black/[0.04]'}`}>
            <span className="text-[10px] text-gray-500 dark:text-[#8C877D] font-bold uppercase block">Total XP</span>
            <span className="text-lg font-black font-mono text-[#FBBF24] flex items-center gap-1 mt-0.5">
              <Award className="w-4 h-4" /> +{userXp} XP
            </span>
          </div>

          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-gray-50 dark:bg-[#0E1114] border-gray-200 dark:border-white/[0.04]' : 'bg-black/[0.02] border-black/[0.04]'}`}>
            <span className="text-[10px] text-gray-500 dark:text-[#8C877D] font-bold uppercase block">Roadmap Progress</span>
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
          isDark ? 'bg-white dark:bg-[#111418] border-gray-200 dark:border-white/[0.08]' : 'bg-white border-black/[0.08]'
        }`}>
          <div className="flex items-center justify-between pb-2 border-b border-gray-200 dark:border-white/[0.06]">
            <h3 className={`text-base font-bold ${isDark ? 'text-gray-900 dark:text-[#F5F1E8]' : 'text-[#111418]'}`}>
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
              <span className="text-gray-500 dark:text-[#8C877D] block font-medium">Full Name</span>
              <span className={`font-semibold text-sm ${isDark ? 'text-gray-900 dark:text-[#F5F1E8]' : 'text-[#111418]'}`}>
                {profileData.name}
              </span>
            </div>

            <div>
              <span className="text-gray-500 dark:text-[#8C877D] block font-medium">Email Address</span>
              <span className={`font-semibold truncate block ${isDark ? 'text-gray-900 dark:text-[#F5F1E8]' : 'text-[#111418]'}`}>
                {profileData.email || 'Not configured'}
              </span>
            </div>

            <div>
              <span className="text-gray-500 dark:text-[#8C877D] block font-medium">Location</span>
              <span className={`font-semibold ${isDark ? 'text-gray-900 dark:text-[#F5F1E8]' : 'text-[#111418]'}`}>
                {profileData.location}
              </span>
            </div>

            <div>
              <span className="text-gray-500 dark:text-[#8C877D] block font-medium">Education</span>
              <span className={`font-semibold ${isDark ? 'text-gray-900 dark:text-[#F5F1E8]' : 'text-[#111418]'}`}>
                {profileData.education}
              </span>
            </div>

            <div>
              <span className="text-gray-500 dark:text-[#8C877D] block font-medium">Experience Level</span>
              <span className={`font-semibold ${isDark ? 'text-gray-900 dark:text-[#F5F1E8]' : 'text-[#111418]'}`}>
                {profileData.experienceLevel}
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Learning Preferences */}
        <div className={`p-6 rounded-[24px] border space-y-4 shadow-sm ${
          isDark ? 'bg-white dark:bg-[#111418] border-gray-200 dark:border-white/[0.08]' : 'bg-white border-black/[0.08]'
        }`}>
          <div className="flex items-center justify-between pb-2 border-b border-gray-200 dark:border-white/[0.06]">
            <h3 className={`text-base font-bold ${isDark ? 'text-gray-900 dark:text-[#F5F1E8]' : 'text-[#111418]'}`}>
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
              <span className="text-gray-500 dark:text-[#8C877D] block font-medium">Preferred Learning Style</span>
              <span className={`font-semibold ${isDark ? 'text-gray-900 dark:text-[#F5F1E8]' : 'text-[#111418]'}`}>
                {profileData.preferredLearningStyle}
              </span>
            </div>

            <div>
              <span className="text-gray-500 dark:text-[#8C877D] block font-medium">Weekly Time Commitment</span>
              <span className={`font-semibold ${isDark ? 'text-gray-900 dark:text-[#F5F1E8]' : 'text-[#111418]'}`}>
                {profileData.weeklyLearningTime}
              </span>
            </div>

            <div>
              <span className="text-gray-500 dark:text-[#8C877D] block font-medium">Current Focus</span>
              <span className={`font-semibold leading-relaxed block ${isDark ? 'text-gray-900 dark:text-[#F5F1E8]' : 'text-[#111418]'}`}>
                {profileData.currentFocus}
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: Career Objective & Interests */}
        <div className={`p-6 rounded-[24px] border space-y-4 shadow-sm ${
          isDark ? 'bg-white dark:bg-[#111418] border-gray-200 dark:border-white/[0.08]' : 'bg-white border-black/[0.08]'
        }`}>
          <div className="flex items-center justify-between pb-2 border-b border-gray-200 dark:border-white/[0.06]">
            <h3 className={`text-base font-bold ${isDark ? 'text-gray-900 dark:text-[#F5F1E8]' : 'text-[#111418]'}`}>
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
              <span className="text-gray-500 dark:text-[#8C877D] block font-medium">Target Role</span>
              <span className="font-bold text-sm text-[#FF857A] block mt-0.5">
                {profileData.targetRole}
              </span>
            </div>

            <div>
              <span className="text-gray-500 dark:text-[#8C877D] block font-medium">Areas of Interest</span>
              <p className={`font-semibold leading-relaxed mt-0.5 ${isDark ? 'text-gray-900 dark:text-[#F5F1E8]' : 'text-[#111418]'}`}>
                {profileData.areasOfInterest}
              </p>
            </div>

            <div>
              <span className="text-gray-500 dark:text-[#8C877D] block font-medium mb-1.5">Key Technical Interests</span>
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

      {/* Resume Section */}
      <div className={`p-6 rounded-[24px] border shadow-sm ${
        isDark ? 'bg-white dark:bg-[#111418] border-gray-200 dark:border-white/[0.08]' : 'bg-white border-black/[0.08]'
      }`}>
        <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-white/[0.06]">
          <h3 className={`text-base font-bold flex items-center gap-2 ${isDark ? 'text-gray-900 dark:text-[#F5F1E8]' : 'text-[#111418]'}`}>
            <FileText className="w-5 h-5 text-[#FF6B5F]" />
            Resume & AI Extraction
          </h3>
        </div>

        <div className="mt-6">
          {!profileData.resume?.fileName ? (
            <div className={`flex flex-col items-center justify-center p-8 rounded-2xl border border-dashed text-center ${
              isDark ? 'bg-[#0E1114] border-white/[0.1]' : 'bg-gray-50 border-gray-300'
            }`}>
              <FileText className={`w-10 h-10 mb-3 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
              <h4 className={`text-sm font-bold mb-1 ${isDark ? 'text-[#F5F1E8]' : 'text-gray-900'}`}>No Resume Uploaded</h4>
              <p className={`text-xs mb-4 max-w-sm ${isDark ? 'text-[#8C877D]' : 'text-gray-500'}`}>
                Upload your resume to automatically extract your skills, education, experience and projects for AI analysis.
              </p>
              
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx"
                className="hidden" 
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF6B5F] hover:bg-[#E85548] text-white text-xs font-bold transition-all shadow-md shadow-[#FF6B5F]/20 disabled:opacity-50"
              >
                {isUploading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                <span>{isUploading ? 'Uploading...' : 'Upload Resume'}</span>
              </button>
              <p className={`text-[10px] mt-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>PDF, DOCX up to 10MB</p>
            </div>
          ) : (
            <div className={`flex flex-col sm:flex-row items-center justify-between p-5 rounded-2xl border ${
              isDark ? 'bg-[#0E1114] border-white/[0.06]' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center gap-4 mb-4 sm:mb-0">
                <div className="w-12 h-12 rounded-xl bg-[#FF6B5F]/10 text-[#FF6B5F] flex items-center justify-center shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h4 className={`text-sm font-bold ${isDark ? 'text-[#F5F1E8]' : 'text-gray-900'}`}>
                    {profileData.resume.fileName}
                  </h4>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-[#8C877D]' : 'text-gray-500'}`}>
                    Uploaded on {new Date(profileData.resume.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx"
                  className="hidden" 
                />
                
                {!profileData.resumeData?.name && (
                  <button
                    onClick={handleAnalyzeResume}
                    disabled={isParsing}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#38BDF8]/10 text-[#38BDF8] hover:bg-[#38BDF8]/20 text-xs font-bold transition-colors disabled:opacity-50"
                  >
                    {isParsing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <ScanSearch className="w-3.5 h-3.5" />}
                    <span>{isParsing ? 'Parsing...' : 'Analyze Resume'}</span>
                  </button>
                )}

                {profileData.resumeData?.name && (
                  <button
                    onClick={() => {
                      setExtractedData(profileData.resumeData);
                      setIsReviewModalOpen(true);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-300 dark:border-white/[0.1] hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300 text-xs font-bold transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>View / Review</span>
                  </button>
                )}
                
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-300 dark:border-white/[0.1] hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300 text-xs font-bold transition-colors disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isUploading ? 'animate-spin' : ''}`} />
                  <span>Replace</span>
                </button>

                <button
                  onClick={handleDeleteResume}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20 text-xs font-bold transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          )}
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

      {/* Resume Review Modal Component */}
      {isReviewModalOpen && (
        <ResumeReviewModal
          extractedData={extractedData}
          onClose={() => setIsReviewModalOpen(false)}
          onSave={handleSaveExtractedData}
        />
      )}
    </div>
  );
}
