import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import EditProfileModal from './EditProfileModal';
import api from '../../services/api';
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
  Trash2,
  AlertCircle,
  RefreshCw,
  Check,
  Briefcase,
  GraduationCap
} from 'lucide-react';

export default function ProfileOverview() {
  const { user, updateUserProfile } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [activeEditTab, setActiveEditTab] = useState('personal');

  // Resume Upload & Parser State
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [isSavingResumeData, setIsSavingResumeData] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');
  const [parsedData, setParsedData] = useState(null);
  const [activeResume, setActiveResume] = useState(user?.resume || null);

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
    skills: user?.skills || [],
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
        skills: user.skills || prev.skills
      }));
      setActiveResume(user.resume || null);
      if (user.resumeData && user.resumeData.skills?.length > 0) {
        setParsedData(user.resumeData);
      }
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

  // Resume File Selection Handler
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setUploadError('');
    setUploadSuccess('');
    if (file) {
      const ext = file.name.split('.').pop().toLowerCase();
      if (!['pdf', 'doc', 'docx'].includes(ext)) {
        setUploadError('Please select a valid PDF, DOC, or DOCX resume document.');
        setSelectedFile(null);
        return;
      }
      setSelectedFile(file);
    }
  };

  // Upload Resume to Server
  const handleUploadResume = async () => {
    if (!selectedFile) return;
    setIsUploading(true);
    setUploadError('');
    setUploadSuccess('');

    try {
      const formData = new FormData();
      formData.append('resume', selectedFile);

      const res = await api.post('/profile/resume', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (res.data?.success && res.data.resume) {
        setActiveResume(res.data.resume);
        if (updateUserProfile) {
          updateUserProfile({ resume: res.data.resume });
        }
        setUploadSuccess('Resume uploaded successfully! Click Parse to extract skills.');
        setSelectedFile(null);
      } else {
        setUploadError(res.data?.message || 'Failed to upload resume.');
      }
    } catch (err) {
      setUploadError(err.response?.data?.message || err.message || 'Failed to upload resume.');
    } finally {
      setIsUploading(false);
    }
  };

  // Trigger AI Resume Parsing
  const handleParseResume = async () => {
    setIsParsing(true);
    setUploadError('');
    setUploadSuccess('');

    try {
      const res = await api.post('/profile/resume/parse');
      if (res.data?.success && res.data.data) {
        setParsedData(res.data.data);
        setUploadSuccess('AI successfully parsed your resume structured data!');
      } else {
        setUploadError(res.data?.message || 'Failed to parse resume.');
      }
    } catch (err) {
      setUploadError(err.response?.data?.message || err.message || 'Failed to parse resume.');
    } finally {
      setIsParsing(false);
    }
  };

  // Confirm and Save Extracted Resume Skills to Profile
  const handleSaveExtractedData = async () => {
    if (!parsedData) return;
    setIsSavingResumeData(true);
    setUploadError('');

    try {
      const res = await api.put('/profile/resume-data', parsedData);
      if (res.data?.success) {
        setUploadSuccess('Extracted skills and background synchronized to your learner profile!');
        if (updateUserProfile) {
          updateUserProfile({
            name: res.data.profile?.name || user?.name,
            skills: res.data.profile?.skills || user?.skills,
            resumeData: res.data.profile?.resumeData || parsedData
          });
        }
      }
    } catch (err) {
      setUploadError(err.response?.data?.message || err.message || 'Failed to save resume data.');
    } finally {
      setIsSavingResumeData(false);
    }
  };

  // Delete Resume
  const handleDeleteResume = async () => {
    setUploadError('');
    try {
      const res = await api.delete('/profile/resume');
      if (res.data?.success) {
        setActiveResume(null);
        setParsedData(null);
        setSelectedFile(null);
        if (updateUserProfile) {
          updateUserProfile({
            resume: { fileName: null, filePath: null, uploadedAt: null },
            resumeData: null
          });
        }
        setUploadSuccess('Resume deleted successfully.');
      }
    } catch (err) {
      setUploadError(err.response?.data?.message || err.message || 'Failed to remove resume.');
    }
  };

  const avatarInitial = profileData.name ? profileData.name.charAt(0).toUpperCase() : 'U';
  const userStreak = user?.streakDays ?? user?.streak ?? 0;
  const userHours = user?.completedHours || 0;
  const userXp = user?.points ?? user?.totalXp ?? 0;
  const userProgress = user?.overallProgress ?? 0;

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

      {/* Hero Profile Card */}
      <div className={`p-6 sm:p-8 rounded-[28px] border shadow-xl relative overflow-hidden transition-all ${
        isDark ? 'bg-[#111418] border-white/[0.08]' : 'bg-white border-black/[0.08]'
      }`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#FF6B5F] to-[#E85548] text-white flex items-center justify-center font-black text-2xl sm:text-3xl shadow-lg shadow-[#FF6B5F]/25 shrink-0">
              {avatarInitial}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h2 className={`text-xl sm:text-2xl font-black tracking-tight ${isDark ? 'text-[#F5F1E8]' : 'text-[#111418]'}`}>
                  {profileData.name}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FF6B5F]/15 text-[#FF857A] border border-[#FF6B5F]/30 uppercase font-mono">
                  {profileData.experienceLevel}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#FF857A] font-bold flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5" />
                <span>{profileData.targetRole}</span>
              </p>
              <p className="text-xs text-[#8C877D] flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>{profileData.location}</span>
                <span className="mx-1">?</span>
                <Mail className="w-3.5 h-3.5" />
                <span className="truncate max-w-[200px]">{profileData.email}</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => openEditModal('personal')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FF6B5F] hover:bg-[#E85548] text-white text-xs font-bold transition-all shadow-md shadow-[#FF6B5F]/20 cursor-pointer self-start sm:self-auto"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>
        </div>

        {/* Dynamic User Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/[0.06]">
          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-[#0E1114] border-white/[0.04]' : 'bg-black/[0.02] border-black/[0.04]'}`}>
            <span className="text-[10px] text-[#8C877D] font-bold uppercase block">Current Streak</span>
            <span className="text-lg font-black font-mono text-[#FF857A] flex items-center gap-1 mt-0.5">
              <Flame className="w-4 h-4" /> {userStreak} days
            </span>
          </div>

          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-[#0E1114] border-white/[0.04]' : 'bg-black/[0.02] border-black/[0.04]'}`}>
            <span className="text-[10px] text-[#8C877D] font-bold uppercase block">Time Logged</span>
            <span className="text-lg font-black font-mono text-[#38BDF8] flex items-center gap-1 mt-0.5">
              <Clock className="w-4 h-4" /> {userHours} hrs
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

      {/* ?? Resume Upload & AI Parser Card ?? */}
      <div className={`p-6 sm:p-8 rounded-[28px] border shadow-xl space-y-5 transition-all ${
        isDark ? 'bg-[#111418] border-white/[0.08]' : 'bg-white border-black/[0.08]'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/[0.06]">
          <div>
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#FF6B5F]" />
              <h3 className={`text-lg font-bold ${isDark ? 'text-[#F5F1E8]' : 'text-[#111418]'}`}>
                Resume & Competency Extraction
              </h3>
            </div>
            <p className="text-xs text-[#8C877D] mt-0.5">
              Upload your PDF or DOCX resume to auto-calibrate your skills and accelerate roadmap tailoring.
            </p>
          </div>

          {activeResume?.fileName && (
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#34D399]/15 text-[#34D399] border border-[#34D399]/30 flex items-center gap-1.5 self-start sm:self-auto">
              <Check className="w-3.5 h-3.5" />
              <span>Resume Active</span>
            </span>
          )}
        </div>

        {/* Feedback Banners */}
        {uploadError && (
          <div className="p-3.5 rounded-xl bg-[#F87171]/10 border border-[#F87171]/30 text-xs text-[#F87171] font-semibold flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{uploadError}</span>
          </div>
        )}

        {uploadSuccess && (
          <div className="p-3.5 rounded-xl bg-[#34D399]/10 border border-[#34D399]/30 text-xs text-[#34D399] font-semibold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{uploadSuccess}</span>
          </div>
        )}

        {/* Active Resume Details OR File Upload Dropzone */}
        {activeResume?.fileName ? (
          <div className={`p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
            isDark ? 'bg-[#16191E] border-white/[0.06]' : 'bg-[#FAF7F2] border-black/[0.06]'
          }`}>
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#FF6B5F]/15 border border-[#FF6B5F]/30 text-[#FF857A] flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className={`text-sm font-bold truncate max-w-[280px] sm:max-w-md ${isDark ? 'text-[#F5F1E8]' : 'text-[#111418]'}`}>
                  {activeResume.fileName}
                </p>
                <p className="text-xs text-[#8C877D]">
                  Uploaded {activeResume.uploadedAt ? new Date(activeResume.uploadedAt).toLocaleDateString() : 'recently'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                disabled={isParsing}
                onClick={handleParseResume}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FF6B5F]/15 hover:bg-[#FF6B5F]/25 text-[#FF857A] border border-[#FF6B5F]/30 text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
              >
                {isParsing ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Parsing AI...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI Parse Resume</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleDeleteResume}
                className="p-2 rounded-xl text-[#8C877D] hover:text-[#F87171] hover:bg-[#F87171]/10 border border-transparent hover:border-[#F87171]/20 transition-all cursor-pointer"
                title="Remove Resume"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className={`p-6 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center text-center space-y-3 ${
            isDark ? 'border-white/10 bg-[#16191E]/50' : 'border-black/10 bg-[#FAF7F2]'
          }`}>
            <div className="w-12 h-12 rounded-2xl bg-[#FF6B5F]/10 border border-[#FF6B5F]/20 text-[#FF6B5F] flex items-center justify-center">
              <Upload className="w-6 h-6" />
            </div>

            <div>
              <p className={`text-sm font-bold ${isDark ? 'text-[#F5F1E8]' : 'text-[#111418]'}`}>
                {selectedFile ? selectedFile.name : 'Choose a resume file to upload'}
              </p>
              <p className="text-xs text-[#8C877D] mt-0.5">
                {selectedFile ? `${(selectedFile.size / 1024).toFixed(1)} KB ? Ready to upload` : 'PDF, DOC, DOCX up to 10MB'}
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <label className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-[#F5F1E8] cursor-pointer transition-all">
                <span>Browse File</span>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>

              {selectedFile && (
                <button
                  type="button"
                  disabled={isUploading}
                  onClick={handleUploadResume}
                  className="px-4 py-2 rounded-xl bg-[#FF6B5F] hover:bg-[#E85548] text-white text-xs font-bold shadow-md shadow-[#FF6B5F]/20 cursor-pointer transition-all flex items-center gap-1.5"
                >
                  {isUploading ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload to Server</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        )}

        {/* Parsed Resume Structured Preview */}
        {parsedData && (
          <div className={`p-5 rounded-2xl border space-y-4 animate-in fade-in ${
            isDark ? 'bg-[#0E1114] border-white/[0.08]' : 'bg-[#FAF7F2] border-black/[0.08]'
          }`}>
            <div className="flex items-center justify-between">
              <h4 className={`text-xs font-bold uppercase tracking-wider text-[#FF857A]`}>
                AI Extracted Candidate Profile
              </h4>
              <button
                type="button"
                disabled={isSavingResumeData}
                onClick={handleSaveExtractedData}
                className="px-3 py-1.5 rounded-lg bg-[#34D399] hover:bg-[#2EB885] text-black text-xs font-bold transition-all shadow-sm flex items-center gap-1 cursor-pointer"
              >
                {isSavingResumeData ? (
                  <>
                    <RefreshCw className="w-3 h-3 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-3 h-3" />
                    <span>Merge Skills into Profile</span>
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {parsedData.name && (
                <div>
                  <span className="text-[#8C877D] block font-medium">Extracted Name</span>
                  <span className="font-semibold text-[#F5F1E8]">{parsedData.name}</span>
                </div>
              )}
              {parsedData.email && (
                <div>
                  <span className="text-[#8C877D] block font-medium">Extracted Email</span>
                  <span className="font-semibold text-[#F5F1E8]">{parsedData.email}</span>
                </div>
              )}
              {parsedData.phone && (
                <div>
                  <span className="text-[#8C877D] block font-medium">Phone</span>
                  <span className="font-semibold text-[#F5F1E8]">{parsedData.phone}</span>
                </div>
              )}
              {parsedData.github && (
                <div>
                  <span className="text-[#8C877D] block font-medium">GitHub</span>
                  <span className="font-semibold text-[#FF857A]">{parsedData.github}</span>
                </div>
              )}
            </div>

            {parsedData.skills && parsedData.skills.length > 0 && (
              <div>
                <span className="text-[#8C877D] block font-medium text-xs mb-2">Extracted Competencies & Skills ({parsedData.skills.length})</span>
                <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                  {parsedData.skills.map((sk, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/20"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
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

