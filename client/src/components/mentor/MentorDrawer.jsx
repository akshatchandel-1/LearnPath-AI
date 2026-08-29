import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Send,
  Bot,
  User,
  Sparkles,
  RefreshCw,
  Zap,
  HelpCircle,
} from 'lucide-react';
import api from '../../services/api';

export const MentorDrawer = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const messagesEndRef = useRef(null);

  const suggestedPrompts = [
    'Why should I learn Node.js now?',
    'Explain how React Hooks work under the hood',
    'What should I focus on next in my roadmap?',
    'Recommend a portfolio project for my skills',
  ];

  useEffect(() => {
    if (isOpen) {
      loadConversation();
    }
  }, [isOpen]);

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
          content: `I ran into a temporary hiccup connecting to the AI reasoning engine. Please try again!`,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md glass-panel border-l border-brand-500/30 flex flex-col shadow-2xl">
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-gray-200 dark:border-white/10 flex items-center justify-between bg-gradient-to-r from-brand-950/60 to-[#0e1019]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-cyan-400 p-0.5 shadow-md shadow-brand-500/30">
                <div className="w-full h-full bg-[#0d0f17] rounded-[10px] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <div>
                <h2 className="text-sm font-bold text-white flex items-center gap-1.5 font-display">
                  LearnPath AI Mentor
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </h2>
                <p className="text-[11px] text-brand-300">Context-Aware Adaptive Tutor</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {initialLoading ? (
              <div className="py-12 text-center space-y-2">
                <RefreshCw className="w-6 h-6 text-brand-400 animate-spin mx-auto" />
                <p className="text-xs text-slate-400">Loading your personalized mentorship context...</p>
              </div>
            ) : messages.length === 0 ? (
              <div className="py-10 text-center space-y-3">
                <Sparkles className="w-8 h-8 text-cyan-400 mx-auto" />
                <p className="text-xs text-slate-300">
                  Ask me anything about your current roadmap, why skills are sequenced, or concept explanations!
                </p>
              </div>
            ) : (
              messages.map((msg, i) => {
                const isAssistant = msg.role === 'assistant';
                return (
                  <div
                    key={i}
                    className={`flex items-start gap-2.5 ${isAssistant ? 'justify-start' : 'justify-end'}`}
                  >
                    {isAssistant && (
                      <div className="w-7 h-7 rounded-lg bg-brand-600/30 border border-brand-500/40 flex items-center justify-center shrink-0 mt-1">
                        <Bot className="w-4 h-4 text-cyan-300" />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                        isAssistant
                          ? 'glass-card border border-gray-200 dark:border-white/10 text-slate-100'
                          : 'bg-brand-600 text-white shadow-md shadow-brand-600/20'
                      }`}
                    >
                      <div className="prose prose-invert prose-xs max-w-none whitespace-pre-wrap">
                        {msg.content}
                      </div>
                    </div>

                    {!isAssistant && (
                      <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 mt-1">
                        <User className="w-4 h-4 text-slate-300" />
                      </div>
                    )}
                  </div>
                );
              })
            )}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-brand-300 py-2">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>AI Mentor is thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggested Prompts Pills */}
          <div className="p-3 border-t border-gray-200 dark:border-white/5 bg-black/20">
            <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1.5">
              Suggested Questions
            </p>
            <div className="flex flex-wrap gap-1.5">
              {suggestedPrompts.map((p, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(p)}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white/[0.04] hover:bg-brand-500/20 hover:text-brand-300 border border-gray-200 dark:border-white/10 text-slate-300 transition-colors text-left"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Message Input Box */}
          <div className="p-3 sm:p-4 border-t border-gray-200 dark:border-white/10 bg-[#0d0f17]">
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
                placeholder="Ask mentor a question..."
                className="flex-1 px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-brand-400 transition-colors"
              />
              <button
                type="submit"
                disabled={loading || !inputMessage.trim()}
                className="p-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white shadow-md shadow-brand-600/30 transition-all disabled:opacity-40"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorDrawer;
