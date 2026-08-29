import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLearningPath } from '../context/LearningPathContext';
import api from '../services/api';
import {
  Sparkles,
  Bot,
  User,
  Send,
  ArrowRight,
  RefreshCw,
  CheckCircle2,
  BrainCircuit,
  Zap,
} from 'lucide-react';

export const OnboardingPage = () => {
  const { user } = useAuth();
  const { refreshAll } = useLearningPath();
  const navigate = useNavigate();

  const [stepIndex, setStepIndex] = useState(0);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [isFinalizing, setIsFinalizing] = useState(false);
  const messagesEndRef = useRef(null);

  // Collected structured profile state
  const [profileData, setProfileData] = useState({
    careerGoal: user?.careerGoal || 'Full Stack MERN Developer',
    backgroundText: '',
    jsComfort: 'Intermediate',
    weeklyHours: 12,
    preferredLearningStyle: 'Hands-on Projects',
    difficulty: 'Intermediate',
  });

  const steps = [
    {
      id: 'career_goal',
      aiText: `Hi ${user?.name?.split(' ')[0] || 'there'} 👋 Welcome to LearnPath AI! What tech role do you want to master?`,
      options: [
        'Full Stack MERN Developer',
        'Frontend Engineer (React / Next.js)',
        'Backend Engineer (Node.js & Express)',
        'AI & Machine Learning Engineer',
      ],
      field: 'careerGoal',
    },
    {
      id: 'js_comfort',
      aiText: `Awesome choice! How comfortable are you currently with JavaScript and programming fundamentals?`,
      options: [
        'Beginner (learning variables & loops)',
        'Basic (understand functions & DOM)',
        'Intermediate (comfortable with ES6 & Promises)',
        'Advanced (confident with closures & async patterns)',
      ],
      field: 'jsComfort',
    },
    {
      id: 'prior_skills',
      aiText: `Tell me in your own words what you have already learned or built, and what areas you feel weak in.`,
      options: [
        'I know HTML, CSS and basic JS but weak in backend APIs.',
        'I have built basic React apps but need help with Node.js and MongoDB.',
        'I have backend experience with Python/SQL but need modern React frontend skills.',
        'Complete beginner looking to start from scratch.',
      ],
      field: 'backgroundText',
    },
    {
      id: 'weekly_hours',
      aiText: `How many focused hours can you dedicate to studying each week?`,
      options: ['6-8 hours / week', '10-14 hours / week', '15-20 hours / week', '20+ hours / week (Intensive)'],
      field: 'weeklyHours',
      mapVal: (opt) => parseInt(opt.split('-')[0], 10) || 12,
    },
    {
      id: 'learning_style',
      aiText: `What type of learning format helps you understand concepts best?`,
      options: ['Hands-on Projects', 'Video Tutorials', 'Documentation & Reading', 'Practice Problems & Quizzes', 'Mixed Approach'],
      field: 'preferredLearningStyle',
    },
  ];

  useEffect(() => {
    // Initialize first AI prompt
    if (messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          content: steps[0].aiText,
          options: steps[0].options,
        },
      ]);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isFinalizing]);

  const handleSelectOption = (opt) => {
    advanceStep(opt);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    advanceStep(inputText);
    setInputText('');
  };

  const advanceStep = async (userResponse) => {
    const currentStep = steps[stepIndex];

    // Append user response message
    const updatedMessages = [
      ...messages,
      { role: 'user', content: userResponse },
    ];
    setMessages(updatedMessages);

    // Save into profile data state
    const fieldName = currentStep.field;
    const valueToSave = currentStep.mapVal ? currentStep.mapVal(userResponse) : userResponse;
    const nextProfile = { ...profileData, [fieldName]: valueToSave };
    setProfileData(nextProfile);

    const nextIdx = stepIndex + 1;

    if (nextIdx < steps.length) {
      setStepIndex(nextIdx);
      // Append next AI prompt after short natural delay
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            content: steps[nextIdx].aiText,
            options: steps[nextIdx].options,
          },
        ]);
      }, 400);
    } else {
      // Finished all conversational steps -> Finalize profile & trigger AI/ML engine!
      await finalizeOnboarding(nextProfile);
    }
  };

  const finalizeOnboarding = async (finalProfile) => {
    setIsFinalizing(true);
    try {
      const payload = {
        careerGoal: finalProfile.careerGoal,
        backgroundText: `${finalProfile.backgroundText}. JavaScript Level: ${finalProfile.jsComfort}`,
        preferredLearningStyle: finalProfile.preferredLearningStyle,
        weeklyHours: typeof finalProfile.weeklyHours === 'number' ? finalProfile.weeklyHours : 14,
        difficulty: finalProfile.jsComfort.includes('Advanced') ? 'Advanced' : 'Intermediate',
      };

      const res = await api.post('/profile/onboard', payload);
      if (res.data.success) {
        await refreshAll();
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      }
    } catch (err) {
      console.error('Error finalizing onboarding:', err);
      setIsFinalizing(false);
    }
  };

  return (
    <div className="min-h-[88vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl glass-panel rounded-3xl border border-brand-500/30 p-6 sm:p-8 shadow-2xl shadow-brand-500/10 flex flex-col h-[750px] max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-cyan-400 p-0.5 shadow-md shadow-brand-500/30">
              <div className="w-full h-full bg-[#0d0f17] rounded-[14px] flex items-center justify-center">
                <BrainCircuit className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-display">
                Conversational AI Profiler
              </h2>
              <p className="text-xs text-brand-300">Calibrating your initial knowledge graph</p>
            </div>
          </div>

          {/* Step Progress Pill */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs text-slate-300 font-mono">
            <span>Step {Math.min(stepIndex + 1, steps.length)} of {steps.length}</span>
          </div>
        </div>

        {/* Chat History Area */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
          {messages.map((msg, idx) => {
            const isAssistant = msg.role === 'assistant';
            return (
              <div key={idx} className="space-y-3">
                <div className={`flex items-start gap-3 ${isAssistant ? 'justify-start' : 'justify-end'}`}>
                  {isAssistant && (
                    <div className="w-8 h-8 rounded-xl bg-brand-600/30 border border-brand-500/40 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                      <Bot className="w-4 h-4 text-cyan-300" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                      isAssistant
                        ? 'bg-white/[0.04] border border-gray-200 dark:border-white/10 text-slate-100 shadow-md'
                        : 'bg-brand-600 text-white font-medium shadow-md shadow-brand-600/30'
                    }`}
                  >
                    {msg.content}
                  </div>

                  {!isAssistant && (
                    <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                      <User className="w-4 h-4 text-slate-300" />
                    </div>
                  )}
                </div>

                {/* Option Choice Pills for Active Assistant Message */}
                {isAssistant && msg.options && idx === messages.length - 1 && !isFinalizing && (
                  <div className="pl-11 flex flex-wrap gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
                    {msg.options.map((opt, optIdx) => (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(opt)}
                        className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-gray-100 dark:bg-white/5 hover:bg-brand-500/20 text-slate-200 hover:text-brand-200 border border-gray-200 dark:border-white/10 hover:border-brand-500/40 shadow-sm transition-all text-left cursor-pointer hover:scale-[1.02]"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Finalizing Loading State */}
          {isFinalizing && (
            <div className="p-6 rounded-2xl bg-brand-950/40 border border-brand-500/40 text-center space-y-3 animate-in zoom-in-95">
              <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin mx-auto" />
              <div>
                <p className="text-sm font-bold text-white">Extracting Skill Matrix & Building Adaptive Roadmap...</p>
                <p className="text-xs text-slate-400 mt-1">Executing TF-IDF vector ranking and topological sort graph</p>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        {!isFinalizing && (
          <div className="pt-3 border-t border-gray-200 dark:border-white/10 shrink-0">
            <form onSubmit={handleCustomSubmit} className="flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your custom response or click an option above..."
                className="flex-1 px-4 py-3 rounded-xl text-xs sm:text-sm bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-brand-400 transition-colors"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="p-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white shadow-md shadow-brand-600/30 transition-all disabled:opacity-40 cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingPage;
