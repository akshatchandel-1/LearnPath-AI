import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  X,
  Send,
  Bot,
  User,
  Sparkles,
  RefreshCw,
  Zap,
  HelpCircle,
  PlayCircle,
  ArrowRight,
  BookOpen,
  Target,
  Trash2
} from 'lucide-react';
import api from '../../services/api';
import { useTheme } from '../../context/ThemeContext';
import { QuizModal } from '../quiz/QuizModal';

export const MentorDrawer = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [activeQuizConfig, setActiveQuizConfig] = useState(null); // { skill: string, count: number } | null
  const [latestActions, setLatestActions] = useState([]);
  const messagesEndRef = useRef(null);

  const suggestedPrompts = [
    'I am weak in JavaScript. What should I study?',
    'How can I improve my React skills?',
    'What skills am I missing for a Data Scientist role?',
    'Explain my current learning progress.',
    'Create a 3-question JavaScript quiz.',
  ];

  useEffect(() => {
    if (isOpen && isAuthenticated && !authLoading) {
      loadConversation();
    }
  }, [isOpen, isAuthenticated, authLoading]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const loadConversation = async () => {
    try {
      setInitialLoading(true);
      const res = await api.get('/ai/conversation');
      if (res.data.success && res.data.conversation) {
        setMessages(res.data.conversation.messages || []);
      }
    } catch (err) {
      console.error('Error loading conversation:', err);
    } finally {
      setInitialLoading(false);
    }
  };

  const handleSendMessage = async (textToSend = null) => {
    const query = textToSend || inputMessage;
    if (!query.trim()) return;

    const userMsg = {
      role: 'user',
      content: query,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setLoading(true);
    setLatestActions([]);

    try {
      const res = await api.post('/ai/chat', { message: query });
      if (res.data?.success && res.data.message) {
        setMessages(prev => [...prev, res.data.message]);
        if (res.data.suggestedActions && res.data.suggestedActions.length > 0) {
          setLatestActions(res.data.suggestedActions);
        }
      }
    } catch (err) {
      console.error('Error sending message to mentor:', err);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'I ran into a temporary hiccup connecting to the AI reasoning engine. Please try again!',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleActionClick = (action) => {
    if (action.action === 'GENERATE_QUIZ') {
      setActiveQuizConfig({
        skill: action.payload?.skill || 'JavaScript',
        count: action.payload?.count || 3,
      });
    } else if (action.action === 'NAVIGATE_ROADMAP') {
      onClose();
      navigate('/learning-path');
    } else if (action.action === 'NAVIGATE_SKILL_GAPS') {
      onClose();
      navigate('/skill-gaps');
    } else if (action.action === 'NAVIGATE_COURSES') {
      onClose();
      navigate('/courses');
    } else if (action.action === 'NAVIGATE_PROGRESS') {
      onClose();
      navigate('/analytics');
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: "Hello! 👋 I am your **LearnPath AI Mentor**.\n\nI'm connected to your live roadmap, skill gaps, and learning telemetry. How can I accelerate your learning today?",
        timestamp: new Date(),
      },
    ]);
    setLatestActions([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className={`w-screen max-w-md sm:max-w-lg flex flex-col shadow-2xl border-l transition-colors ${
          isDark ? 'bg-[#0E1114] border-white/[0.08] text-[#F5F1E8]' : 'bg-[#FFFFFF] border-black/[0.08] text-[#111418]'
        }`}>
          
          {/* Header */}
          <div className={`p-4 sm:p-5 border-b flex items-center justify-between gap-3 shrink-0 ${
            isDark ? 'border-white/[0.08] bg-[#111418]' : 'border-black/[0.08] bg-[#F9FAFB]'
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FF6B5F] to-[#E85548] text-white flex items-center justify-center shadow-md shadow-[#FF6B5F]/20">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-black text-sm sm:text-base">LearnPath AI Mentor</h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#34D399]/15 text-[#34D399] border border-[#34D399]/30 font-mono">
                    Live
                  </span>
                </div>
                <p className="text-xs text-[#8C877D]">Personalized Career & Skills Co-Pilot</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleClearChat}
                title="Clear conversation"
                className="p-2 rounded-xl text-[#8C877D] hover:text-[#FF857A] hover:bg-white/5 transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-[#8C877D] hover:text-[#F5F1E8] hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4">
            {initialLoading ? (
              <div className="py-20 flex flex-col items-center justify-center gap-3 text-center">
                <div className="w-8 h-8 border-3 border-[#FF6B5F]/20 border-t-[#FF6B5F] rounded-full animate-spin" />
                <p className="text-xs text-[#8C877D]">Connecting to AI Mentor reasoning engine...</p>
              </div>
            ) : messages.length === 0 ? (
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.04] text-center space-y-3 my-auto">
                <Bot className="w-8 h-8 mx-auto text-[#FF857A]" />
                <h4 className="text-sm font-bold">How can I help you today?</h4>
                <p className="text-xs text-[#8C877D] leading-relaxed">
                  Ask for targeted study roadmaps, missing skills for career roles, live progress telemetry, or 3-question diagnostic quizzes.
                </p>
              </div>
            ) : (
              messages.map((msg, index) => {
                const isUser = msg.role === 'user';
                return (
                  <div
                    key={index}
                    className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    {!isUser && (
                      <div className="w-8 h-8 rounded-xl bg-[#FF6B5F]/15 border border-[#FF6B5F]/30 text-[#FF857A] flex items-center justify-center shrink-0 mt-0.5">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}

                    <div className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed space-y-2 ${
                      isUser
                        ? 'bg-[#FF6B5F] text-white font-medium rounded-tr-sm shadow-md shadow-[#FF6B5F]/20'
                        : isDark
                        ? 'bg-[#16191E] border border-white/[0.06] text-[#F5F1E8] rounded-tl-sm'
                        : 'bg-[#F3F4F6] border border-black/[0.06] text-[#111418] rounded-tl-sm'
                    }`}>
                      <div className="whitespace-pre-wrap">{msg.content}</div>
                    </div>

                    {isUser && (
                      <div className="w-8 h-8 rounded-xl bg-white/10 text-white flex items-center justify-center shrink-0 mt-0.5">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                );
              })
            )}

            {/* Loading Bubble */}
            {loading && (
              <div className="flex gap-3 justify-start items-center">
                <div className="w-8 h-8 rounded-xl bg-[#FF6B5F]/15 border border-[#FF6B5F]/30 text-[#FF857A] flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className={`p-3 rounded-2xl flex items-center gap-1.5 ${
                  isDark ? 'bg-[#16191E] border border-white/[0.06]' : 'bg-[#F3F4F6] border border-black/[0.06]'
                }`}>
                  <span className="w-2 h-2 rounded-full bg-[#FF6B5F] animate-pulse" />
                  <span className="w-2 h-2 rounded-full bg-[#FF6B5F] animate-pulse [animation-delay:200ms]" />
                  <span className="w-2 h-2 rounded-full bg-[#FF6B5F] animate-pulse [animation-delay:400ms]" />
                </div>
              </div>
            )}

            {/* Action Chips */}
            {latestActions.length > 0 && !loading && (
              <div className="pt-2 space-y-2 animate-in fade-in">
                <p className="text-[11px] font-bold text-[#8C877D] uppercase tracking-wider">
                  Recommended Action:
                </p>
                <div className="flex flex-wrap gap-2">
                  {latestActions.map((act, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleActionClick(act)}
                      className="px-3 py-2 rounded-xl bg-[#FF6B5F]/15 hover:bg-[#FF6B5F]/25 border border-[#FF6B5F]/40 text-[#FF857A] text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5 active:scale-95"
                    >
                      {act.action === 'GENERATE_QUIZ' ? (
                        <Zap className="w-3.5 h-3.5 text-[#FF857A]" />
                      ) : (
                        <ArrowRight className="w-3.5 h-3.5 text-[#FF857A]" />
                      )}
                      <span>{act.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions */}
          <div className={`p-3 border-t overflow-x-auto shrink-0 flex gap-2 ${
            isDark ? 'border-white/[0.06] bg-[#111418]' : 'border-black/[0.06] bg-[#F9FAFB]'
          }`}>
            {suggestedPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                disabled={loading}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all border shrink-0 cursor-pointer ${
                  isDark
                    ? 'border-white/10 bg-[#16191E] text-[#C7C2B6] hover:text-white hover:border-[#FF6B5F]/40'
                    : 'border-black/10 bg-[#FFFFFF] text-[#4B5563] hover:text-[#111418] hover:border-[#FF6B5F]/40'
                }`}
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className={`p-4 border-t shrink-0 ${
            isDark ? 'border-white/[0.08] bg-[#0E1114]' : 'border-black/[0.08] bg-[#FFFFFF]'
          }`}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask mentor anything or request a quiz..."
                disabled={loading}
                className={`flex-1 px-4 py-3 rounded-xl text-xs sm:text-sm transition-colors border focus:outline-none focus:border-[#FF6B5F] ${
                  isDark
                    ? 'bg-[#16191E] border-white/[0.08] text-[#F5F1E8] placeholder-[#8C877D]'
                    : 'bg-[#F9FAFB] border-black/[0.08] text-[#111418] placeholder-[#6B7280]'
                }`}
              />
              <button
                type="submit"
                disabled={loading || !inputMessage.trim()}
                className="p-3 rounded-xl bg-[#FF6B5F] hover:bg-[#E85548] disabled:opacity-40 text-white font-bold transition-all shadow-md shadow-[#FF6B5F]/20 cursor-pointer shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* 3-Question Quiz Modal */}
      {activeQuizConfig && (
        <QuizModal
          skillName={activeQuizConfig.skill}
          count={activeQuizConfig.count || 3}
          isOpen={Boolean(activeQuizConfig)}
          onClose={() => setActiveQuizConfig(null)}
        />
      )}
    </div>
  );
};

export default MentorDrawer;
