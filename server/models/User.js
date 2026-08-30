const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
    },
    avatar: {
      type: String,
      default: 'https://api.dicebear.com/7.x/bottts/svg?seed=LearnPath',
    },
    education: {
      type: String,
      default: 'Computer Science / Engineering',
    },
    experienceLevel: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner',
    },
    careerGoal: {
      type: String,
      default: 'Full Stack MERN Developer',
    },
    targetRole: {
      type: String,
      default: 'Full Stack MERN Developer',
    },
    location: {
      type: String,
      default: 'India',
    },
    preferredLearningStyle: {
      type: String,
      enum: ['Video', 'Reading', 'Hands-on Projects', 'Practice Problems', 'Mixed'],
      default: 'Hands-on Projects',
    },
    weeklyHours: {
      type: Number,
      default: 10,
    },
    preferredDifficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Intermediate',
    },
    skills: [
      {
        name: String,
        level: { type: Number, default: 0, min: 0, max: 100 },
        category: String,
      },
    ],
    completedResources: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resource',
      },
    ],
    currentLearningPath: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'LearningPath',
    },
    streak: {
      type: Number,
      default: 0,
    },
    points: {
      type: Number,
      default: 0,
    },
    badges: [
      {
        id: String,
        name: String,
        icon: String,
        earnedAt: { type: Date, default: Date.now },
        description: String,
      },
    ],
    resume: {
      fileName: { type: String, default: null },
      filePath: { type: String, default: null },
      uploadedAt: { type: Date, default: null }
    },
    resumeData: {
      name: { type: String, default: null },
      email: { type: String, default: null },
      phone: { type: String, default: null },
      location: { type: String, default: null },
      linkedin: { type: String, default: null },
      github: { type: String, default: null },
      portfolio: { type: String, default: null },
      education: { type: Array, default: [] },
      experience: { type: Array, default: [] },
      skills: { type: Array, default: [] },
      projects: { type: Array, default: [] },
      certifications: { type: Array, default: [] },
      achievements: { type: Array, default: [] }
    }
  },
  { 
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.password;
        return ret;
      }
    }
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);

