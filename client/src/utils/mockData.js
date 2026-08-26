/**
 * LearnPath AI — Centralized Mock Data
 * This mock data is strictly used for initial UI layout previews.
 * Individual developers can replace these references with real API hooks in later feature branches.
 */

export const mockUser = {
  id: 'usr_101',
  name: 'Demo Learner',
  email: 'alex.rivera@learnpath.ai',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  targetRole: 'Full Stack MERN Developer',
  experienceLevel: 'Intermediate',
  weeklyGoalHours: 12,
  completedHours: 7.5,
  overallProgress: 68,
  streakDays: 5,
  totalXp: 1420,
};

export const mockDashboard = {
  stats: [
    { label: 'Weekly Target', value: '7.5 / 12 hrs', progress: 62.5, change: '+1.5 hrs this week' },
    { label: 'Mastered Skills', value: '14 / 22', progress: 63.6, change: '+2 new skills' },
    { label: 'Active Courses', value: '3 in progress', progress: 75, change: '1 course completed' },
    { label: 'Overall Readiness', value: '68%', progress: 68, change: '+5% vs last week' },
  ],
  recentMilestones: [
    { title: 'Completed MongoDB Aggregations', date: 'Yesterday', category: 'Backend' },
    { title: 'Passed React Hooks Assessment', date: '3 days ago', category: 'Frontend' },
    { title: 'Started Express REST Architecture', date: '5 days ago', category: 'Backend' },
  ],
  recommendedNextStep: {
    title: 'Node.js Event Loop & Asynchronous I/O',
    module: 'Learning Path Step 4.2',
    duration: '45 mins',
  }
};

export const mockProfile = {
  bio: 'Passionate aspiring Full Stack engineer aiming for senior engineering roles in cloud-native web apps.',
  location: 'San Francisco, CA',
  github: 'github.com/demolearner',
  linkedin: 'linkedin.com/in/demolearner',
  primaryInterests: ['Full Stack MERN', 'TypeScript', 'Vector Databases', 'System Design'],
  savedPreferences: {
    emailNotifications: true,
    weeklyDigest: true,
    aiMentorPersonality: 'Encouraging & Practical',
  }
};

export const mockLearningPath = {
  roadmapTitle: 'MERN Full Stack Mastery 2026',
  estimatedCompletion: '8 Weeks remaining',
  stages: [
    { id: 1, name: 'Frontend Architecture & State Management', status: 'Completed', progress: 100 },
    { id: 2, name: 'Node.js & Express API Microservices', status: 'In Progress', progress: 65 },
    { id: 3, name: 'MongoDB Indexing & Aggregations', status: 'In Progress', progress: 40 },
    { id: 4, name: 'Full-Stack Integration & AI Embeddings', status: 'Upcoming', progress: 0 },
    { id: 5, name: 'Production DevOps & Cloud Deployment', status: 'Upcoming', progress: 0 },
  ]
};

export const mockSkillGaps = {
  targetRole: 'Full Stack MERN Developer',
  skills: [
    { name: 'React.js', current: 85, required: 90, gap: 'Low Gap' },
    { name: 'Node.js / Express', current: 65, required: 85, gap: 'Medium Gap' },
    { name: 'MongoDB / Mongoose', current: 60, required: 80, gap: 'Medium Gap' },
    { name: 'TypeScript', current: 40, required: 80, gap: 'High Gap' },
    { name: 'System Design & Docker', current: 30, required: 75, gap: 'High Gap' },
  ]
};

export const mockCourses = [
  {
    id: 'c1',
    title: 'Advanced React Design Patterns & Performance',
    platform: 'LearnPath Curated',
    duration: '4.5 Hours',
    rating: 4.9,
    enrolled: true,
    progress: 72,
    category: 'Frontend'
  },
  {
    id: 'c2',
    title: 'Production-Ready Express.js & MongoDB APIs',
    platform: 'Coursera / Partner',
    duration: '6.0 Hours',
    rating: 4.8,
    enrolled: true,
    progress: 45,
    category: 'Backend'
  },
  {
    id: 'c3',
    title: 'TypeScript for Full Stack Developers',
    platform: 'LearnPath AI Recommender',
    duration: '5.2 Hours',
    rating: 4.9,
    enrolled: false,
    progress: 0,
    category: 'Languages'
  }
];

export const mockAssessments = [
  {
    id: 'a1',
    title: 'React Core & Hooks Benchmark',
    duration: '20 mins',
    questionsCount: 15,
    difficulty: 'Intermediate',
    lastScore: '92%',
    status: 'Passed'
  },
  {
    id: 'a2',
    title: 'Node.js Event Loop & REST API Architecture',
    duration: '25 mins',
    questionsCount: 20,
    difficulty: 'Intermediate',
    lastScore: null,
    status: 'Ready to Take'
  },
  {
    id: 'a3',
    title: 'MongoDB Query Performance & Indexing',
    duration: '30 mins',
    questionsCount: 18,
    difficulty: 'Advanced',
    lastScore: null,
    status: 'Locked'
  }
];

export const mockAIAssistant = {
  suggestedPrompts: [
    'How do I close my TypeScript skill gap this week?',
    'Explain the difference between JWT in cookies vs localStorage.',
    'Recommend a 30-minute practice project for MongoDB aggregations.',
    'Review my current learning pace and suggest timeline adjustments.'
  ],
  sampleConversation: [
    {
      sender: 'ai',
      message: 'Hello Demo Learner! I have analyzed your target role (Full Stack MERN Developer). You have a 20% gap in TypeScript and a 20% gap in Express backend architectures. What would you like to tackle today?'
    }
  ]
};

export const mockProgress = {
  weeklyActivity: [
    { day: 'Mon', hours: 2.0 },
    { day: 'Tue', hours: 1.5 },
    { day: 'Wed', hours: 2.5 },
    { day: 'Thu', hours: 0.8 },
    { day: 'Fri', hours: 1.2 },
    { day: 'Sat', hours: 3.0 },
    { day: 'Sun', hours: 1.0 },
  ],
  categoryBreakdown: [
    { category: 'Frontend', percentage: 45 },
    { category: 'Backend', percentage: 35 },
    { category: 'Database', percentage: 15 },
    { category: 'DevOps', percentage: 5 },
  ],
  totalTimeSpentHours: 42.5,
  badgesEarnedCount: 6,
};
