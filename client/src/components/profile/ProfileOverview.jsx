import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { useAuth } from '../../context/AuthContext';
import { mockProfile } from '../../utils/mockData';
import { User, Mail, MapPin, Target, Award, Edit3, Settings } from 'lucide-react';

/**
 * Member 1: Profile Overview Placeholder Component
 * Obsidian + Ivory + Coral Palette
 */
export default function ProfileOverview() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Profile Header Banner Card */}
      <Card variant="default">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
            alt={user?.name || 'User'}
            className="w-24 h-24 rounded-2xl object-cover border-2 border-[#E05A47] shadow-md"
          />
          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-2xl font-bold text-[#202124]">{user?.name || 'Demo Learner'}</h2>
                <p className="text-xs text-[#5F6368] flex items-center justify-center sm:justify-start gap-2 mt-1">
                  <Mail className="w-3.5 h-3.5" /> {user?.email}
                  <span>•</span>
                  <MapPin className="w-3.5 h-3.5" /> {mockProfile.location}
                </p>
              </div>
              <Button variant="outline" size="sm" icon={Edit3}>
                Edit Profile
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
              <Badge variant="primary" size="md">
                🎯 {user?.targetRole || 'Full Stack MERN Developer'}
              </Badge>
              <Badge variant="secondary" size="md">
                ⚡ Level: {user?.experienceLevel || 'Intermediate'}
              </Badge>
              <Badge variant="success" size="md">
                🔥 {user?.streakDays || 5} Day Streak
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Profile Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Interests & Goals */}
        <Card variant="default">
          <CardHeader>
            <CardTitle>Target Competencies</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-[#5F6368] mb-3 leading-relaxed">{mockProfile.bio}</p>
            <div className="flex flex-wrap gap-2">
              {mockProfile.primaryInterests.map((interest, idx) => (
                <Badge key={idx} variant="neutral" size="sm">
                  {interest}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Learning Preferences */}
        <Card variant="default">
          <CardHeader>
            <CardTitle>AI Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2.5 text-xs text-[#3F4247]">
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#F6F2EA] border border-[#E6E0D7]">
                <span>Mentor Persona</span>
                <span className="font-semibold text-[#E05A47]">{mockProfile.savedPreferences.aiMentorPersonality}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#F6F2EA] border border-[#E6E0D7]">
                <span>Weekly Goal Commitment</span>
                <span className="font-semibold text-[#202124]">{user?.weeklyGoalHours || 12} Hours / Week</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
