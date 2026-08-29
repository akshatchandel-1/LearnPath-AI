import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLearningPath } from '../../context/LearningPathContext';
import { generateAssistantResponse } from '../../../../ai-ml/assistant/index.js';
import AssessmentRunnerModal from '../assessments/AssessmentRunnerModal';
import { INITIAL_ASSESSMENTS } from '../../data/coursesAndAssessmentsData';
import Badge from '../common/Badge';
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
  ExternalLink,
  BookOpen,
  Target,
  Award,
  Zap,
  TrendingUp,
  ClipboardCheck
} from 'lucide-react';

/**
 * Lightweight Rich Markdown & Code-Block Parser for AI Chat Responses
 */
function MarkdownMessage({ content, messageId, onCopy, copiedId }) {
  if (!content) return null;

  // Split content by code blocks
  const parts = content.split(/(```[\s\S]*?```)/g);

  return (
    <div className="space-y-2 text-xs sm:text-sm leading-relaxed font-sans select-text">
      {parts.map((part, pIdx) => {
        if (part.startsWith('```') && part.endsWith('```')) {
          const lines = part.slice(3, -3).trim().split('\n');
          const firstLine = lines[0].trim();
          const hasLang = /^[a-zA-Z0-9_-]+$/.test(firstLine);
          const lang = hasLang ? firstLine : 'javascript';
          const codeBody = (hasLang ? lines.slice(1) : lines).join('\n');
          const blockId = `${messageId}-code-${pIdx}`;

          return (
            <div key={pIdx} className="my-3 rounded-xl overflow-hidden border border-white/[0.08] bg-[#0B0D0F] shadow-lg">
              <div className="flex items-center justify-between px-3 py-1.5 bg-[#16191E] border-b border-white/[0.06] text-[11px] text-[#8C877D] font-mono">
                <span className="uppercase tracking-wider font-semibold text-[#FF857A]">{lang}</span>
                <button
                  type="button"
                  onClick={() => onCopy(blockId, codeBody)}
                  className="flex items-center gap-1 hover:text-[#F5F1E8] transition-colors p-1 rounded cursor-pointer"
                  title="Copy code"
                >
                  {copiedId === blockId ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#34D399]" />
                      <span className="text-[#34D399] text-[10px]">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-[10px]">Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-3.5 overflow-x-auto text-[11.5px] sm:text-xs font-mono text-[#F5F1E8] leading-relaxed bg-[#0B0D0F]">
                <code>{codeBody}</code>
              </pre>
            </div>
          );
        }

        // Regular markdown text paragraphs & lists
        const paragraphs = part.split('\n');
        return (
          <div key={pIdx} className="space-y-1.5">
            {paragraphs.map((line, lIdx) => {
              const trimmed = line.trim();
              if (!trimmed) return <div key={lIdx} className="h-1" />;

              // Headings
              if (trimmed.startsWith('### ')) {
                return (
                  <h3 key={lIdx} className="text-sm sm:text-base font-bold text-[#FF857A] mt-2 mb-1 flex items-center gap-1.5">
                    <span>{formatInlineMarkdown(trimmed.replace(/^###\s+/, ''))}</span>
                  </h3>
                );
              }
              if (trimmed.startsWith('#### ')) {
                return (
                  <h4 key={lIdx} className="text-xs sm:text-sm font-semibold text-[#F5F1E8] mt-2 mb-0.5">
                    {formatInlineMarkdown(trimmed.replace(/^####\s+/, ''))}
                  </h4>
                );
              }

              // Bullet points
              if (trimmed.startsWith('• ') || trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
                const bulletText = trimmed.replace(/^[•*-]\s+/, '');
                return (
                  <div key={lIdx} className="flex items-start gap-2 pl-1 my-0.5 text-xs sm:text-sm text-[#C7C2B6]">
                    <span className="text-[#FF6B5F] mt-1 shrink-0 text-xs">•</span>
                    <span className="flex-1">{formatInlineMarkdown(bulletText)}</span>
                  </div>
                );
              }

              // Numbered lists
              const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
              if (numMatch) {
                return (
                  <div key={lIdx} className="flex items-start gap-2 pl-1 my-0.5 text-xs sm:text-sm text-[#C7C2B6]">
                    <span className="text-[#FF857A] font-bold shrink-0 text-xs">{numMatch[1]}.</span>
                    <span className="flex-1">{formatInlineMarkdown(numMatch[2])}</span>
                  </div>
                );
              }

              // Default paragraph
              return (
                <p key={lIdx} className="text-xs sm:text-sm text-[#C7C2B6] leading-relaxed">
                  {formatInlineMarkdown(line)}
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

/**
 * Parses inline formatting: **bold**, `inline code`, [link text](url)
 */
function formatInlineMarkdown(text) {
  if (!text) return '';

  const parts = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // Check for [Link](url)
    const linkMatch = remaining.match(/^\[(.*?)\]\((.*?)\)/);
    if (linkMatch) {
      parts.push(
        <a
          key={key++}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#FF857A] hover:underline font-semibold inline-flex items-center gap-0.5 mx-0.5 cursor-pointer"
        >
          <span>{linkMatch[1]}</span>
          <ExternalLink className="w-3 h-3 inline" />
        </a>
      );
      remaining = remaining.slice(linkMatch[0].length);
      continue;
    }

    // Check for `inline code`
    const codeMatch = remaining.match(/^`(.*?)`/);
    if (codeMatch) {
      parts.push(
        <code key={key++} className="px-1.5 py-0.5 rounded bg-white/10 text-[#FF857A] font-mono text-[11px] sm:text-xs">
          {codeMatch[1]}
        </code>
      );
      remaining = remaining.slice(codeMatch[0].length);
      continue;
    }

    // Check for **bold text**
    const boldMatch = remaining.match(/^\*\*(.*?)\*\*/);
    if (boldMatch) {
      parts.push(
        <strong key={key++} className="font-bold text-[#F5F1E8]">
          {boldMatch[1]}
        </strong>
      );
      remaining = remaining.slice(boldMatch[0].length);
      continue;
    }

    // Regular character slice until next special token
    const nextSpecial = remaining.search(/[`*\[]/);
    if (nextSpecial === -1) {
      parts.push(remaining);
      break;
    } else if (nextSpecial === 0) {
      // Unmatched single special char
      parts.push(remaining[0]);
      remaining = remaining.slice(1);
    } else {
      parts.push(remaining.slice(0, nextSpecial));
      remaining = remaining.slice(nextSpecial);
    }
  }

  return parts;
}

export default function AIChatInterface() {
  const navigate = useNavigate();
  const { user, awardXp, updateSkillMastery } = useAuth();
  const { learningPath, skillGapReport } = useLearningPath();
  const activeRole = user?.targetRole || user?.careerGoal || 'Full Stack Developer';

  // Read enrolled & completed courses from state/localStorage
  const coursesData = useMemo(() => {
    try {
      const raw = localStorage.getItem('m3_courses_data');
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return [];
  }, []);

  const completedCourses = useMemo(() => {
    return coursesData.filter(c => c.progress === 100 || c.completed);
  }, [coursesData]);

  const activeCourses = useMemo(() => {
    return coursesData.filter(c => c.enrolled && (c.progress || 0) < 100);
  }, [coursesData]);

  // Quiz Modal State for GENERATE_QUIZ actions
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [activeQuizAssessment, setActiveQuizAssessment] = useState(null);

  const [messages, setMessages] = useState([
    {
      id: 'm-init',
      sender: 'ai',
      text: `Hello ${user?.name?.split(' ')[0] || 'Learner'}! 👋 I am your 24/7 AI Learning Path Mentor.\n\nI am calibrated for your target role: **${activeRole}**.\nAsk me any technical question, skill gap remediation advice, interview preparation tips, or progress metrics!`,
      relatedTopics: ['Skill Gap Analysis', 'Study Pacing', 'Interview Prep', 'Telemetry Reporting'],
      suggestedActions: [
        { label: 'I am weak in JavaScript. What should I study?', action: 'SEND_PROMPT', payload: { prompt: 'I am weak in JavaScript. What should I study?' } },
        { label: 'How many courses have I completed?', action: 'SEND_PROMPT', payload: { prompt: 'How many courses have I completed?' } },
        { label: 'How much XP have I earned?', action: 'SEND_PROMPT', payload: { prompt: 'How much XP have I earned?' } },
        { label: 'Explain React hooks with an example', action: 'SEND_PROMPT', payload: { prompt: 'Explain React hooks with an example' } }
      ]
    }
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSend = async (text) => {
    const msgToSend = (text || inputVal).trim();
    if (!msgToSend) return;

    const userMsgId = `m-usr-${Date.now()}`;
    const userMessage = {
      id: userMsgId,
      sender: 'user',
      text: msgToSend
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputVal('');
    setIsTyping(true);

    // Build real authenticated context payload
    const contextPayload = {
      message: msgToSend,
      targetRole: activeRole,
      currentSkills: user?.skills || [],
      skillGaps: skillGapReport?.gaps || [],
      learningContext: {
        currentPhase: learningPath?.currentPhase || 1,
        totalPhases: learningPath?.phases?.length || 4,
        activeMilestone: learningPath?.phases?.[(learningPath?.currentPhase || 1) - 1]?.milestones?.[0]?.title || 'Core Milestone',
        weeklyHours: user?.weeklyGoalHours || 10
      },
      userMetrics: {
        completedCoursesCount: completedCourses.length,
        activeCoursesCount: activeCourses.length,
        completedLessonsCount: user?.completedLessonsCount || 0,
        totalXp: user?.totalXp || 0,
        streakDays: user?.streakDays || 0,
        completedCourses,
        activeCourses
      }
    };

    try {
      const result = await generateAssistantResponse(contextPayload);

      const aiReply = {
        id: `m-ai-${Date.now()}`,
        sender: 'ai',
        text: result.response,
        relatedTopics: result.relatedTopics || [],
        suggestedActions: result.suggestedActions || []
      };

      setMessages((prev) => [...prev, aiReply]);
    } catch (err) {
      console.error('[AIChatInterface] Error calling AI engine:', err);
      const fallbackReply = {
        id: `m-ai-${Date.now()}`,
        sender: 'ai',
        text: `I encountered an unexpected issue. Please check your network or try asking another technical question.`,
        relatedTopics: ['System Recovery', 'Curriculum Tracks'],
        suggestedActions: [
          { label: 'Explore Courses Catalog', action: 'NAVIGATE_COURSES', payload: {} },
          { label: 'Take an Assessment', action: 'NAVIGATE_ASSESSMENTS', payload: {} }
        ]
      };
      setMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setIsTyping(false);
    }
  };

  /**
   * Dispatches structured interactive action buttons
   */
  const handleActionClick = (actionObj) => {
    if (!actionObj) return;

    // 1. Direct prompt trigger
    if (actionObj.action === 'SEND_PROMPT') {
      const prompt = actionObj.payload?.prompt || actionObj.label;
      handleSend(prompt);
      return;
    }

    // 2. Generate / Launch Quiz (Matches exact 3-question count)
    if (actionObj.action === 'GENERATE_QUIZ') {
      const targetSkill = actionObj.payload?.skill || 'JavaScript';
      const count = Number(actionObj.payload?.count) || 3;
      
      // Look for a matching pre-configured assessment or synthesize one
      const found = INITIAL_ASSESSMENTS.find(
        a => a.skill?.toLowerCase() === targetSkill.toLowerCase() ||
             a.title?.toLowerCase().includes(targetSkill.toLowerCase())
      );

      let assessmentToRun;
      if (found) {
        const questions = count === 3 ? found.questions.slice(0, 3) : found.questions;
        assessmentToRun = {
          ...found,
          id: `${found.id}-quick-${count}`,
          title: `${targetSkill} Quick Checkpoint (${count} Questions)`,
          duration: count === 3 ? '10 Mins' : found.duration,
          totalQuestions: count,
          xpReward: count === 3 ? 60 : found.xpReward,
          questions: questions
        };
      } else {
        // Synthesize exactly 3 structured questions
        assessmentToRun = {
          id: `custom-assess-${targetSkill.toLowerCase().replace(/[^a-z0-9]/g, '-')}-quick`,
          title: `${targetSkill} Quick Checkpoint (3 Questions)`,
          skill: targetSkill,
          category: 'Technical',
          difficulty: 'Intermediate',
          duration: '10 Mins',
          totalQuestions: 3,
          passingScore: 70,
          xpReward: 60,
          questions: [
            {
              id: 'q1',
              question: `What is a primary architectural principle when implementing scalable solutions in ${targetSkill}?`,
              options: [
                'Tight coupling between storage and presentation layers',
                'Decoupled separation of concerns and defensive error boundaries',
                'Avoiding automated testing to accelerate deployments',
                'Synchronous blocking execution for all network I/O'
              ],
              correctAnswerIndex: 1,
              explanation: 'Decoupling layers and implementing defensive error boundaries ensures modularity, resilience, and testability.'
            },
            {
              id: 'q2',
              question: `How should edge cases and asynchronous failures be managed in ${targetSkill}?`,
              options: [
                'Silently ignore errors to prevent UI crashes',
                'Log errors and rethrow with contextual information or user-friendly fallback',
                'Restart the application on every unhandled exception',
                'Disable timeouts across all network sockets'
              ],
              correctAnswerIndex: 1,
              explanation: 'Contextual logging and structured error propagation allow callers to handle failures gracefully.'
            },
            {
              id: 'q3',
              question: `Which technique is recommended for performance optimization in ${targetSkill}?`,
              options: [
                'Premature optimization of all internal helper functions',
                'Profiling bottlenecks, indexing hot query paths, and caching expensive derivations',
                'Storing all application state in a single global mutable variable',
                'Hardcoding configuration credentials into source code'
              ],
              correctAnswerIndex: 1,
              explanation: 'Targeted profiling, caching, and strategic indexing deliver measurable latency improvements without unnecessary complexity.'
            }
          ]
        };
      }

      setActiveQuizAssessment(assessmentToRun);
      setQuizModalOpen(true);
      return;
    }

    // 3. Navigation Actions
    if (actionObj.action === 'NAVIGATE_COURSES') {
      navigate('/courses');
      return;
    }
    if (actionObj.action === 'NAVIGATE_ROADMAP') {
      navigate('/learning-path');
      return;
    }
    if (actionObj.action === 'NAVIGATE_SKILLGAPS') {
      navigate('/skill-gaps');
      return;
    }
    if (actionObj.action === 'NAVIGATE_DASHBOARD') {
      navigate('/dashboard');
      return;
    }
    if (actionObj.action === 'NAVIGATE_ASSESSMENTS') {
      navigate('/assessments');
      return;
    }

    // 4. External URL
    if (actionObj.action === 'OPEN_URL') {
      if (actionObj.payload?.url) {
        window.open(actionObj.payload.url, '_blank', 'noopener,noreferrer');
      }
      return;
    }

    // Fallback: If label is present, send as prompt
    if (actionObj.label) {
      handleSend(actionObj.label);
    }
  };

  const promptChips = [
    'I am weak in JavaScript. What should I study?',
    'How many courses have I completed?',
    'How much XP have I earned?',
    "What's my current streak?",
    'Explain React hooks with an example',
    'Create a 3-question quiz for JavaScript',
    'Prepare me for a backend interview',
    'What should I learn next according to my roadmap?'
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] max-w-5xl mx-auto rounded-[24px] bg-[#111418] border border-white/[0.08] shadow-2xl overflow-hidden animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-white/[0.08] bg-[#0E1114] flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FF6B5F] to-[#E85548] text-white flex items-center justify-center shadow-lg shadow-[#FF6B5F]/25 shrink-0">
            <Bot className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-[#F5F1E8] truncate">AI Learning Path Mentor</h3>
              <Badge variant="coral" size="sm" dot>Live Telemetry</Badge>
            </div>
            <p className="text-[11px] text-[#8C877D] truncate">
              Calibrated for <strong className="text-[#FF857A]">{activeRole}</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-5">
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
              className={`relative max-w-[92%] sm:max-w-[85%] md:max-w-[78%] p-4 sm:p-5 rounded-2xl ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-[#FF6B5F] to-[#E85548] text-white font-medium shadow-md'
                  : 'bg-[#16191E] border border-white/[0.08] text-[#F5F1E8] shadow-lg'
              }`}
            >
              {/* Message Body with Markdown formatting */}
              {msg.sender === 'user' ? (
                <div className="whitespace-pre-wrap text-xs sm:text-sm font-sans font-medium text-white">{msg.text}</div>
              ) : (
                <MarkdownMessage
                  content={msg.text}
                  messageId={msg.id}
                  onCopy={handleCopy}
                  copiedId={copiedId}
                />
              )}

              {/* Copy Full Message Button */}
              {msg.sender === 'ai' && (
                <button
                  onClick={() => handleCopy(msg.id, msg.text)}
                  className="absolute top-3 right-3 p-1.5 rounded-lg text-[#8C877D] hover:text-[#F5F1E8] hover:bg-white/5 transition-colors cursor-pointer"
                  title="Copy full response"
                >
                  {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-[#34D399]" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              )}

              {/* Interactive Structured Action Buttons */}
              {msg.sender === 'ai' && Array.isArray(msg.suggestedActions) && msg.suggestedActions.length > 0 && (
                <div className="mt-4 pt-3 border-t border-white/[0.06] flex flex-wrap items-center gap-2">
                  {msg.suggestedActions.map((act, aIdx) => {
                    const label = typeof act === 'string' ? act : act.label;
                    const isQuiz = act.action === 'GENERATE_QUIZ';
                    const isDocs = act.action === 'OPEN_URL';
                    const isCourse = act.action === 'NAVIGATE_COURSES';

                    return (
                      <button
                        key={aIdx}
                        type="button"
                        onClick={() => handleActionClick(act)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-sm ${
                          isQuiz
                            ? 'bg-[#FF6B5F]/15 border border-[#FF6B5F]/35 text-[#FF857A] hover:bg-[#FF6B5F]/25 hover:border-[#FF6B5F]/60'
                            : isDocs
                            ? 'bg-blue-500/10 border border-blue-500/30 text-blue-300 hover:bg-blue-500/20'
                            : isCourse
                            ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20'
                            : 'bg-white/5 border border-white/10 text-[#C7C2B6] hover:bg-white/10 hover:text-[#F5F1E8]'
                        }`}
                      >
                        {isQuiz && <Zap className="w-3.5 h-3.5 text-[#FF6B5F]" />}
                        {isDocs && <ExternalLink className="w-3.5 h-3.5 text-blue-400" />}
                        {isCourse && <BookOpen className="w-3.5 h-3.5 text-emerald-400" />}
                        {!isQuiz && !isDocs && !isCourse && <Sparkles className="w-3.5 h-3.5 text-[#FF857A]" />}
                        <span>{label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#FF6B5F]/15 text-[#FF857A] border border-[#FF6B5F]/30 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3.5 rounded-2xl bg-[#16191E] border border-white/[0.06] flex items-center gap-1.5 shadow-md">
              <span className="w-2 h-2 rounded-full bg-[#FF6B5F] animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 rounded-full bg-[#FF6B5F] animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 rounded-full bg-[#FF6B5F] animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompt Chips Container (Responsive & Non-Overflowing) */}
      <div className="px-3 sm:px-4 py-2.5 border-t border-white/[0.06] bg-[#0E1114] flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0 max-w-full">
        <span className="text-[10px] font-mono text-[#8C877D] uppercase font-bold shrink-0 pl-1">
          SUGGESTIONS:
        </span>
        <div className="flex items-center gap-2 shrink-0">
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
      </div>

      {/* Chat Input Box */}
      <div className="p-3 sm:p-4 border-t border-white/[0.08] bg-[#0B0D0F] shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2 max-w-full"
        >
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder={`Ask about ${activeRole} concepts, skill gaps, or progress...`}
            className="flex-1 min-w-0 bg-[#16191E] border border-white/[0.08] text-xs sm:text-sm text-[#F5F1E8] rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#FF6B5F] focus:ring-1 focus:ring-[#FF6B5F]/40 placeholder:text-[#8C877D]"
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

      {/* Interactive Assessment Runner Modal triggered by GENERATE_QUIZ actions */}
      {quizModalOpen && activeQuizAssessment && (
        <AssessmentRunnerModal
          assessment={activeQuizAssessment}
          isOpen={quizModalOpen}
          onClose={() => {
            setQuizModalOpen(false);
            setActiveQuizAssessment(null);
          }}
          onComplete={(result) => {
            if (result.passed) {
              awardXp(result.earnedXp || 60);
              updateSkillMastery(activeQuizAssessment.skill, result.percentage);
            }
          }}
        />
      )}

    </div>
  );
}
