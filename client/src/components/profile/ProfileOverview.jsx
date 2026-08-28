import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { useAuth } from '../../context/AuthContext';
import EditProfileModal from './EditProfileModal';
import {
  User,
  Mail,
  MapPin,
  GraduationCap,
  Sparkles,
  Award,
  BookOpen,
  FolderCheck,
  Flame,
  Clock,
  Edit3,
  CheckCircle2,
  Brain,
  Code2,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProfileOverview() {
  const { user, updateUserProfile } = useAuth();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [activeEditTab, setActiveEditTab] = useState('personal');

  const profileData = {
    name: user?.name || 'Akshat Singh',
    email: user?.email || 'akshat.singh@learnpath.ai',
    tagline: user?.tagline || 'Full Stack AI Engineer & Cloud Architect',
    location: user?.location || 'San Francisco, CA',
    education: user?.education || 'B.Tech in Computer Science',
    experienceLevel: user?.experienceLevel || 'Intermediate',
    areasOfInterest: user?.areasOfInterest || 'Web Development, Artificial Intelligence, System Architecture',
    preferredLearningStyle: user?.preferredLearningStyle || 'Hands-on Projects',
    weeklyLearningTime: user?.weeklyLearningTime || '12-15 hours/week',
    currentFocus: user?.currentFocus || 'React 18, Node.js Microservices, PyTorch, MongoDB',
    careerGoal: user?.careerGoal || 'To engineer production-ready AI-driven scalable SaaS products and lead innovative engineering teams.',
    interests: user?.interests || ['Full Stack MERN', 'TypeScript', 'Vector Databases', 'Deep Learning', 'System Design'],
    skills: [
      { name: 'React.js / Redux Toolkit', progress: 90 },
      { name: 'Node.js / Express Microservices', progress: 82 },
      { name: 'MongoDB / Indexing & Schema', progress: 78 },
      { name: 'Python / PyTorch & AI Embeddings', progress: 65 },
    ]
  };

  const handleSaveProfile = (updated) => {
    updateUserProfile(updated);
  };

  const openEditModal = (tab = 'personal') => {
    setActiveEditTab(tab);
    setIsEditOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Top Profile Header Card */}
      <Card variant="glow" className="relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                alt={profileData.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover border-2 border-[#FF6B5F]/40 shadow-xl shadow-[#FF6B5F]/20"
              />
              <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#34D399] border-2 border-[#0B0D0F] flex items-center justify-center text-[10px] text-[#0B0D0F] font-bold">
                ✓
              </span>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h2 className="text-xl sm:text-2xl font-black text-[#F5F1E8] tracking-tight">
                  {profileData.name}
                </h2>
                <Badge variant="coral" size="sm" dot>
                  {profileData.experienceLevel}
                </Badge>
              </div>

              <p className="text-xs sm:text-sm font-semibold text-[#FF857A] mb-2">
                {profileData.tagline}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-[#8C877D]">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#C7C2B6]" />
                  {profileData.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C7C2B6]" />
                  {profileData.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-[#C7C2B6]" />
                  {profileData.education}
                </span>
              </div>
            </div>
          </div>

          <Button
            variant="primary"
            size="sm"
            icon={Edit3}
            onClick={() => openEditModal('personal')}
          >
            Edit Profile
          </Button>
        </div>
      </Card>

      {/* 3-Card Grid: Learning Preferences, Focus Technologies, Skills */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Preferences */}
        <Card variant="default">
          <CardHeader>
            <CardTitle>Learning Style</CardTitle>
            <button
              onClick={() => openEditModal('preferences')}
              className="text-xs text-[#FF857A] hover:underline font-semibold cursor-pointer"
            >
              Edit
            </button>
          </CardHeader>
          <CardContent className="text-xs space-y-3">
            <div>
              <span className="text-[#8C877D] block mb-0.5">Preferred Mode</span>
              <span className="font-semibold text-[#F5F1E8]">{profileData.preferredLearningStyle}</span>
            </div>
            <div>
              <span className="text-[#8C877D] block mb-0.5">Weekly Commitment</span>
              <span className="font-semibold text-[#F5F1E8]">{profileData.weeklyLearningTime}</span>
            </div>
            <div>
              <span className="text-[#8C877D] block mb-0.5">Areas of Focus</span>
              <span className="font-semibold text-[#F5F1E8]">{profileData.areasOfInterest}</span>
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Current Focus */}
        <Card variant="default">
          <CardHeader>
            <CardTitle>Current Focus</CardTitle>
            <button
              onClick={() => openEditModal('preferences')}
              className="text-xs text-[#FF857A] hover:underline font-semibold cursor-pointer"
            >
              Edit
            </button>
          </CardHeader>
          <CardContent className="text-xs space-y-3">
            <div>
              <span className="text-[#8C877D] block mb-0.5">Target Competency</span>
              <span className="font-semibold text-[#FF857A]">{profileData.tagline}</span>
            </div>
            <div>
              <span className="text-[#8C877D] block mb-0.5">Core Tech Stack</span>
              <span className="font-semibold text-[#F5F1E8]">{profileData.currentFocus}</span>
            </div>
            <div className="pt-2">
              <Link to="/learning-path">
                <Button variant="outline" size="sm" icon={ArrowRight} iconPosition="right" className="w-full">
                  View Roadmap
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Card 3: Skills Overview */}
        <Card variant="default">
          <CardHeader>
            <CardTitle>Skills Mastery</CardTitle>
            <Link to="/skill-gaps" className="text-xs text-[#FF857A] hover:underline font-semibold">
              Gap Analysis →
            </Link>
          </CardHeader>
          <div className="space-y-3 pt-1">
            {profileData.skills.map((skill) => (
              <div key={skill.name} className="space-y-1">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-[#F5F1E8]">{skill.name}</span>
                  <span className="text-[#FF6B5F]">{skill.progress}%</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#FF6B5F] to-[#E85548] h-full rounded-full transition-all duration-500"
                    style={{ width: `${skill.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Learning Summary Bar (4 Stats) */}
      <Card variant="default">
        <h3 className="text-sm font-bold text-[#F5F1E8] mb-4">
          Learning Summary & Milestones
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#16191E] border border-white/[0.06]">
            <div className="w-10 h-10 rounded-xl bg-[#FF6B5F]/10 border border-[#FF6B5F]/20 text-[#FF6B5F] flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-extrabold text-[#F5F1E8] block leading-tight">12</span>
              <span className="text-[11px] text-[#8C877D] font-medium">Courses Completed</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#16191E] border border-white/[0.06]">
            <div className="w-10 h-10 rounded-xl bg-[#34D399]/10 border border-[#34D399]/20 text-[#34D399] flex items-center justify-center shrink-0">
              <FolderCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-extrabold text-[#F5F1E8] block leading-tight">5</span>
              <span className="text-[11px] text-[#8C877D] font-medium">Projects Shipped</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#16191E] border border-white/[0.06]">
            <div className="w-10 h-10 rounded-xl bg-[#FBBF24]/10 border border-[#FBBF24]/20 text-[#FBBF24] flex items-center justify-center shrink-0">
              <Flame className="w-5 h-5 fill-current" />
            </div>
            <div>
              <span className="text-xl font-extrabold text-[#F5F1E8] block leading-tight">12</span>
              <span className="text-[11px] text-[#8C877D] font-medium">Day Streak</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#16191E] border border-white/[0.06]">
            <div className="w-10 h-10 rounded-xl bg-[#38BDF8]/10 border border-[#38BDF8]/20 text-[#38BDF8] flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-extrabold text-[#F5F1E8] block leading-tight">48.5</span>
              <span className="text-[11px] text-[#8C877D] font-medium">Total Study Hours</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Interests & Goals Card */}
      <Card variant="default">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 flex-1 w-full">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#F5F1E8]">Interests & Long-Term Goals</h3>
              <button
                onClick={() => openEditModal('interests')}
                className="text-xs text-[#FF857A] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
            </div>

            <div>
              <h4 className="text-[11px] font-bold text-[#8C877D] uppercase tracking-wider mb-1">
                Career Goal
              </h4>
              <p className="text-xs sm:text-sm font-medium text-[#C7C2B6] leading-relaxed">
                {profileData.careerGoal}
              </p>
            </div>

            <div>
              <h4 className="text-[11px] font-bold text-[#8C877D] uppercase tracking-wider mb-2">
                Specialized Interests
              </h4>
              <div className="flex flex-wrap gap-2">
                {profileData.interests.map((interest, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#FF6B5F]/10 text-[#FF857A] border border-[#FF6B5F]/20"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>

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
