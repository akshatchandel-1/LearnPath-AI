import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { useAuth } from '../../context/AuthContext';
import { useLearningPath } from '../../context/LearningPathContext';
import { QuizModal } from '../quiz/QuizModal';
import api from '../../services/api';
import {
  Bot,
  Send,
  Sparkles,
  User,
  Lightbulb,
  Code2,
  CheckCircle2,
  ArrowRight,
  Copy,
  Check,
  Zap,
  BookOpen,
  Target,
  BarChart3
} from 'lucide-react';

export default function AIChatInterface() {
  const { user } = useAuth();
  const { learningPath, skillGapReport } = useLearningPath();
  const navigate = useNavigate();
  const activeRole = user?.targetRole || user?.careerGoal || 'Full Stack Developer';

  const [messages, setMessages] = useState([
    {
      id: 'm-init',
      sender: 'ai',
      text: `Hello ${user?.name?.split(' ')[0] || 'Learner'}! ?? I am your 24/7 AI Learning Path Mentor. I've analyzed your target goal (${activeRole}) and live curriculum telemetry. How can I help you master your curriculum or clarify concepts today?`,
      suggestedActions: [
        { label: 'Ask: "I am weak in JavaScript. What should I study?"', action: 'SEND_PROMPT', payload: { prompt: 'I am weak in JavaScript. What should I study?' } },
        { label: 'Ask: "Create a 3-question quiz for JavaScript."', action: 'SEND_PROMPT', payload: { prompt: 'Create a 3-question quiz for JavaScript.' } },
        { label: 'Ask: "I want to improve React."', action: 'SEND_PROMPT', payload: { prompt: 'I want to improve React.' } },
        { label: 'Ask: "What skills am I missing for a Node.js Developer role?"', action: 'SEND_PROMPT', payload: { prompt: 'What skills am I missing for a Node.js Developer role?' } },
        { label: 'Ask: "Explain my current learning progress."', action: 'SEND_PROMPT', payload: { prompt: 'Explain my current learning progress.' } }
      ]
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [activeQuizConfig, setActiveQuizSkill] = useState(null); // { skill: string, count: number }
  const messagesEndRef = useRef(null);

  // Load server conversation history on mount
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get('/ai/conversation');
        if (res.data?.success && res.data.conversation?.messages?.length > 0) {
          const formatted = res.data.conversation.messages.map((m, idx) => ({
            id: `m-srv-${idx}-${Date.now()}`,
            sender: m.role === 'assistant' ? 'ai' : 'user',
            text: m.content,
            suggestedActions: m.role === 'assistant' ? [
              { label: 'Start 3-Question Quiz for JavaScript', action: 'GENERATE_QUIZ', payload: { skill: 'JavaScript', count: 3 } },
              { label: 'View Active Roadmap', action: 'NAVIGATE_ROADMAP', payload: {} }
            ] : []
          }));
          setMessages(formatted);
        }
      } catch (err) {
        console.warn('Could not load AI conversation history:', err.message);
      }
    };

    fetchHistory();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (text) => {
    const msgToSend = (text || inputVal).trim();
    if (!msgToSend) return;

    const userMessage = {
      id: `m-usr-${Date.now()}`,
      sender: 'user',
      text: msgToSend
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputVal('');
    setIsTyping(true);

    try {
      const res = await api.post('/ai/chat', { message: msgToSend });
      if (res.data?.success && res.data.message) {
        const aiReply = {
          id: `m-ai-${Date.now()}`,
          sender: 'ai',
          text: res.data.message.content,
          suggestedActions: res.data.suggestedActions || [],
          relatedTopics: res.data.relatedTopics || []
        };
        setMessages((prev) => [...prev, aiReply]);
      } else {
        throw new Error('No message in response');
      }
    } catch (err) {
      console.warn('AI chat error, using context-aware response:', err.message);
      // Fallback message
      const fallbackReply = {
        id: `m-ai-${Date.now()}`,
        sender: 'ai',
        text: `### ${activeRole} Learning Guidance ??\n\nI am tracking your learning progress. Focus on your active milestone in **Phase ${learningPath?.currentPhase || 1}** and take diagnostic assessments to evaluate your mastery.\n\nWould you like to test your knowledge with a 3-question quiz?`,
        suggestedActions: [
          { label: 'Start 3-Question Quiz for JavaScript', action: 'GENERATE_QUIZ', payload: { skill: 'JavaScript', count: 3 } },
          { label: 'Explore Course Catalog', action: 'NAVIGATE_COURSES', payload: {} }
        ]
      };
      setMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleActionClick = (actionItem) => {
    const { action, payload = {} } = actionItem;

    if (action === 'GENERATE_QUIZ') {
      setActiveQuizSkill({ skill: payload.skill || 'JavaScript', count: payload.count || 3 });
    } else if (action === 'NAVIGATE_COURSES') {
      navigate('/courses');
    } else if (action === 'NAVIGATE_SKILL_GAPS') {
      navigate('/skill-gaps');
    } else if (action === 'NAVIGATE_PROGRESS') {
      navigate('/progress');
    } else if (action === 'NAVIGATE_ROADMAP') {
      navigate('/learning-path');
    } else if (action === 'SEND_PROMPT') {
      handleSend(payload.prompt || actionItem.label);
    } else if (action === 'OPEN_URL' && payload.url) {
      window.open(payload.url, '_blank');
    }
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const promptChips = [
    'I am weak in JavaScript. What should I study?',
    'Create a 3-question quiz for JavaScript.',
    'I want to improve React.',
    'What skills am I missing for a Node.js Developer role?',
    'Explain my current learning progress.'
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] max-w-5xl mx-auto rounded-[24px] bg-[#111418] border border-white/[0.08] shadow-2xl overflow-hidden animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-white/[0.08] bg-[#0E1114] flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FF6B5F] to-[#E85548] text-white flex items-center justify-center shadow-lg shadow-[#FF6B5F]/25">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-[#F5F1E8]">AI Learning Path Mentor</h3>
              <Badge variant="coral" size="sm" dot>Live Telemetry</Badge>
            </div>
            <p className="text-[11px] text-[#8C877D]">
              Calibrated for <strong className="text-[#FF857A]">{activeRole}</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                msg.sender === 'user'
                  ? 'bg-white/10 text-[#F5F1E8]'
                  : 'bg-[#FF6B5F]/15 text-[#FF857A] border border-[#FF6B5F]/30'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`relative max-w-[85%] sm:max-w-[78%] p-4 sm:p-5 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-3 ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-[#FF6B5F] to-[#E85548] text-white font-medium shadow-md'
                  : 'bg-[#16191E] border border-white/[0.06] text-[#F5F1E8]'
              }`}
            >
              <div className="whitespace-pre-wrap font-sans leading-relaxed">{msg.text}</div>

              {/* Dynamic Suggested Actions */}
              {msg.sender === 'ai' && msg.suggestedActions && msg.suggestedActions.length > 0 && (
                <div className="pt-2 border-t border-white/[0.08] flex flex-wrap gap-2">
                  {msg.suggestedActions.map((act, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleActionClick(act)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FF6B5F]/15 hover:bg-[#FF6B5F]/25 text-[#FF857A] border border-[#FF6B5F]/30 text-xs font-bold transition-all shadow-sm cursor-pointer active:scale-[0.98]"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{act.label}</span>
                    </button>
                  ))}
                </div>
              )}

              {msg.sender === 'ai' && (
                <button
                  onClick={() => handleCopy(msg.id, msg.text)}
                  className="absolute bottom-2 right-2 p-1.5 rounded-lg text-[#8C877D] hover:text-[#F5F1E8] hover:bg-white/5 transition-colors cursor-pointer"
                  title="Copy response"
                >
                  {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-[#34D399]" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#FF6B5F]/15 text-[#FF857A] border border-[#FF6B5F]/30 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3.5 rounded-2xl bg-[#16191E] border border-white/[0.06] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FF6B5F] animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 rounded-full bg-[#FF6B5F] animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 rounded-full bg-[#FF6B5F] animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompt Chips */}
      <div className="p-3 border-t border-white/[0.06] bg-[#0E1114] flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
        <span className="text-[10px] font-mono text-[#8C877D] uppercase font-bold shrink-0 pl-1">
          Suggestions:
        </span>
        {promptChips.map((chip, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSend(chip)}
            className="px-3 py-1 rounded-xl text-xs font-semibold bg-[#16191E] border border-white/[0.06] text-[#C7C2B6] hover:text-[#FF857A] hover:border-[#FF6B5F]/30 transition-all shrink-0 cursor-pointer whitespace-nowrap"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="p-3 sm:p-4 border-t border-white/[0.08] bg-[#0B0D0F] shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder={`Ask about ${activeRole} topics, code concepts, or study plans...`}
            className="flex-1 bg-[#16191E] border border-white/[0.08] text-xs sm:text-sm text-[#F5F1E8] rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#FF6B5F] focus:ring-1 focus:ring-[#FF6B5F]/40 placeholder:text-[#8C877D]"
          />
          <button
            type="submit"
            disabled={!inputVal.trim() || isTyping}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FF6B5F] to-[#E85548] hover:from-[#FF857A] text-white text-xs font-bold shadow-md shadow-[#FF6B5F]/20 transition-all cursor-pointer disabled:opacity-40 flex items-center gap-1.5 shrink-0"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      {/* Interactive 3-Question Quiz Modal */}
      {activeQuizConfig && (
        <QuizModal
          skillName={activeQuizConfig.skill}
          count={activeQuizConfig.count || 3}
          isOpen={Boolean(activeQuizConfig)}
          onClose={() => setActiveQuizSkill(null)}
        />
      )}

    </div>
  );
}

