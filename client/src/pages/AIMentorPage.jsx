import React, { useState, useEffect, useRef } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useLearningPath } from '../context/LearningPathContext';
import {
  Bot,
  User,
  Send,
  Sparkles,
  RefreshCw,
  Zap,
  HelpCircle,
  BookOpen,
  Map,
  Layers,
} from 'lucide-react';

export const AIMentorPage = () => {
  const { user } = useAuth();
  const { learningPath, skillGapReport } = useLearningPath();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const messagesEndRef = useRef(null);

  const suggestedPrompts = [
    'Why should I learn Node.js now?',
    'Explain how React hooks and Virtual DOM work under the hood',
    'What is the next critical milestone in my roadmap?',
    'How do I optimize MongoDB query performance with indexing?',
    'Give me a coding exercise for JavaScript closures',
  ];

  useEffect(() => {
    loadConversation();
  }, []);

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

    try {
      const res = await api.post('/ai/chat', { message: query });
      if (res.data.success && res.data.message) {
        setMessages(prev => [...prev, res.data.message]);
      }
    } catch (err) {
      console.error('Error sending message to mentor:', err);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'I experienced a temporary network issue connecting to the AI reasoning engine. Please try again.',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const currentPhase = learningPath?.phases?.[learningPath.currentPhaseIndex] || learningPath?.phases?.[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-brand-500/20 text-brand-300 border border-brand-500/30 flex items-center gap-1.5">
              <Bot className="w-3.5 h-3.5 text-cyan-400" />
              Real-Time Adaptive Mentor
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-display">
            LearnPath AI Mentor Studio
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Your personalized 1-on-1 AI tutor with real-time access to your roadmap, weak skills, and milestone goals.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Side: Active Learner Context Summary Card (1 Col) */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl glass-panel border border-white/10 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Map className="w-4 h-4 text-cyan-400" />
              Live Learner Context
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Career Goal</p>
                <p className="font-bold text-white">{user?.careerGoal || 'Full Stack Developer'}</p>
              </div>

              <div className="p-3 rounded-xl bg-brand-500/10 border border-brand-500/20 space-y-1">
                <p className="text-[10px] uppercase tracking-wider text-brand-300 font-semibold">Active Roadmap Phase</p>
                <p className="font-bold text-white">{currentPhase?.title || 'Phase 2: React Architecture'}</p>
                <p className="text-[11px] text-slate-300">Milestone: {currentPhase?.milestone}</p>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1.5">
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Prioritized Skill Gaps</p>
                <div className="flex flex-wrap gap-1">
                  {(skillGapReport?.skills || user?.skills || []).slice(0, 4).map((sk, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[10px] font-medium bg-rose-500/10 text-rose-300 border border-rose-500/20"
                    >
                      {sk.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Chat Console (3 Cols) */}
        <div className="lg:col-span-3 glass-panel rounded-3xl border border-brand-500/30 flex flex-col h-[650px] shadow-2xl overflow-hidden">
          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {initialLoading ? (
              <div className="py-24 text-center space-y-3">
                <RefreshCw className="w-8 h-8 text-brand-400 animate-spin mx-auto" />
                <p className="text-xs text-slate-400">Loading AI mentor conversation...</p>
              </div>
            ) : (
              messages.map((msg, idx) => {
                const isAssistant = msg.role === 'assistant';
                return (
                  <div
                    key={idx}
                    className={`flex items-start gap-3 ${isAssistant ? 'justify-start' : 'justify-end'}`}
                  >
                    {isAssistant && (
                      <div className="w-8 h-8 rounded-xl bg-brand-600/30 border border-brand-500/40 flex items-center justify-center shrink-0 mt-1">
                        <Bot className="w-4 h-4 text-cyan-300" />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                        isAssistant
                          ? 'glass-card border border-white/10 text-slate-100 shadow-md'
                          : 'bg-brand-600 text-white font-medium shadow-md shadow-brand-600/30'
                      }`}
                    >
                      <div className="prose prose-invert prose-xs max-w-none whitespace-pre-wrap">
                        {msg.content}
                      </div>
                    </div>

                    {!isAssistant && (
                      <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 mt-1">
                        <User className="w-4 h-4 text-slate-300" />
                      </div>
                    )}
                  </div>
                );
              })
            )}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-cyan-300 py-2">
                <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
                <span>AI Mentor is synthesizing an answer using your learner context...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompts Bar */}
          <div className="p-3 border-t border-white/5 bg-black/20">
            <div className="flex flex-wrap gap-1.5">
              {suggestedPrompts.slice(0, 3).map((p, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(p)}
                  className="px-3 py-1 rounded-lg text-xs font-medium bg-white/[0.04] hover:bg-brand-500/20 hover:text-brand-300 border border-white/10 text-slate-300 transition-colors text-left"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Input Box */}
          <div className="p-4 border-t border-white/10 bg-[#0d0f17]">
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
                placeholder="Ask the AI Mentor anything about your path, concepts, or roadblocks..."
                className="flex-1 px-4 py-3 rounded-xl text-xs sm:text-sm bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-brand-400 transition-colors"
              />
              <button
                type="submit"
                disabled={loading || !inputMessage.trim()}
                className="px-5 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-600/30 transition-all disabled:opacity-40 flex items-center gap-1.5 cursor-pointer font-bold text-xs"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIMentorPage;
