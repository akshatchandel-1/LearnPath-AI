/**
 * LearnPath AI — Centralized Mock Data
 * This mock data is strictly used for initial UI layout previews.
 * Individual developers can replace these references with real API hooks in later feature branches.
 */

export const mockUser = {
  id: 'usr_kritika_101',
  name: 'Kritika Gupta',
  email: 'kritika.gupta@example.com',
  location: 'Kanpur, India',
  avatar: null, // Displays purple circle with initial 'K' as in screenshot
  targetRole: 'Full Stack Developer',
  tagline: 'Aspiring Full Stack Developer',
  education: 'B.Tech in CSE (Data Science)',
  experienceLevel: 'Intermediate',
  weeklyGoalHours: 10,
  weeklyLearningTime: '8-10 hours',
  careerGoal: 'To become a skilled Full Stack Developer and work on impactful products.',
  preferredLearningStyle: 'Hands-on Projects',
  currentFocus: 'JavaScript, React, Node.js',
  streakDays: 7,
  coursesCompleted: 12,
  projectsDone: 5,
  skillsGained: 18,
  totalLearningHours: 48,
  interests: ['Web Development', 'Artificial Intelligence', 'Data Science', 'UI/UX Design'],
  areasOfInterest: ['Web Development', 'AI', 'Data Science'],
  skills: [
    { name: 'HTML', progress: 90 },
    { name: 'CSS', progress: 80 },
    { name: 'JavaScript', progress: 65 },
    { name: 'React', progress: 40 },
    { name: 'Node.js', progress: 20 }
  ]
};

export const mockDashboard = {
  stats: [
    { label: 'Current Streak', value: '7 days', count: 7, icon: 'fire', change: 'Keep it up!' },
    { label: 'Courses Completed', value: '12', count: 12, icon: 'book', change: '+2 this month' },
    { label: 'Projects Done', value: '5', count: 5, icon: 'folder', change: '+1 this week' },
    { label: 'Skills Gained', value: '18', count: 18, icon: 'star', change: '+3 new badges' }
  ],
  learningPath: {
    title: 'Full Stack Web Development',
    status: 'In Progress',
    progress: 65,
    currentModule: 'JavaScript Fundamentals'
  },
  nextMilestone: {
    title: 'Build a Responsive Portfolio',
    description: 'Create and deploy a personal portfolio website using HTML, CSS, and JavaScript.',
    dueDate: 'Due in 5 days'
  },
  recommendedNext: [
    {
      id: 'rec_1',
      title: 'React.js - Complete Guide',
      type: 'Course',
      duration: '4.5 hrs',
      icon: 'react',
      level: 'Intermediate'
    },
    {
      id: 'rec_2',
      title: 'Node.js Basics',
      type: 'Course',
      duration: '3.0 hrs',
      icon: 'node',
      level: 'Beginner'
    },
    {
      id: 'rec_3',
      title: 'Build a Todo App',
      type: 'Project',
      duration: '2.5 hrs',
      icon: 'project',
      level: 'Hands-on'
    }
  ],
  skills: [
    { name: 'HTML', progress: 90 },
    { name: 'CSS', progress: 80 },
    { name: 'JavaScript', progress: 65 },
    { name: 'React', progress: 40 },
    { name: 'Node.js', progress: 20 }
  ],
  recentActivity: [
    { id: 1, title: 'Completed: CSS Flexbox Tutorial', time: '2 hours ago', status: 'completed' },
    { id: 2, title: 'Completed: JavaScript Basics', time: '1 day ago', status: 'completed' },
    { id: 3, title: 'Started: React.js - Complete Guide', time: '2 days ago', status: 'started' },
    { id: 4, title: 'Completed: HTML Forms', time: '3 days ago', status: 'completed' }
  ]
};

export const mockProfile = {
  name: 'Kritika Gupta',
  tagline: 'Aspiring Full Stack Developer',
  email: 'kritika.gupta@example.com',
  location: 'Kanpur, India',
  education: 'B.Tech in CSE (Data Science)',
  experienceLevel: 'Intermediate',
  careerGoal: 'To become a skilled Full Stack Developer and work on impactful products.',
  areasOfInterest: 'Web Development, AI, Data Science',
  preferredLearningStyle: 'Hands-on Projects',
  weeklyLearningTime: '8-10 hours',
  currentFocus: 'JavaScript, React, Node.js',
  interests: ['Web Development', 'Artificial Intelligence', 'Data Science', 'UI/UX Design'],
  summaryStats: {
    coursesCompleted: 12,
    projectsCompleted: 5,
    dayStreak: 7,
    totalHours: 48
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
