import React, { useState, useRef, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { useAuth } from '../../context/AuthContext';
import { useLearningPath } from '../../context/LearningPathContext';
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
  Check
} from 'lucide-react';

export default function AIChatInterface() {
  const { user } = useAuth();
  const { learningPath, skillGapReport } = useLearningPath();
  const activeRole = user?.targetRole || user?.careerGoal || 'Full Stack Developer';

  const [messages, setMessages] = useState([
    {
      id: 'm-init',
      sender: 'ai',
      text: `Hello ${user?.name?.split(' ')[0] || 'Learner'}! 👋 I am your 24/7 AI Learning Path Mentor. I've analyzed your target goal (${activeRole}) and current progress. How can I help you master your curriculum or clarify concepts today?`
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

  const generateAIResponse = (userPrompt) => {
    const lower = userPrompt.toLowerCase();
    
    if (lower.includes('typescript') || lower.includes('gap') || lower.includes('skill')) {
      return `To accelerate closing your TypeScript and Architecture skill gaps for **${activeRole}**:
1. **Strict Generics & Utility Types**: Master \`Pick<T, K>\`, \`Omit<T, K>\`, \`Record<K, T>\`, and \`ReturnType<T>\`.
2. **Discriminated Unions**: Structure state and API responses with tagged unions to eliminate runtime type casting.
3. **Zod Validation**: Parse incoming HTTP payloads directly into validated TypeScript types.
Check the **Courses tab** to enroll in our *TypeScript 5.x Mastery* track!`;
    }

    if (lower.includes('jwt') || lower.includes('cookie') || lower.includes('auth')) {
      return `Here is the security difference between **HttpOnly Cookies** & **LocalStorage** for JWT tokens:

• **HttpOnly SameSite=Strict Cookies** *(Recommended)*:
  Protected against Cross-Site Scripting (XSS) attacks because client-side JavaScript cannot access \`document.cookie\`.
• **LocalStorage**:
  Susceptible to token extraction if an attacker executes arbitrary JavaScript on your domain.

\`\`\`javascript
// Express.js Secure Cookie Pattern:
res.cookie('token', jwtToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
});
\`\`\``;
    }

    if (lower.includes('mongo') || lower.includes('project') || lower.includes('database')) {
      return `For a 30-minute practice project on **MongoDB Performance**:
Build an **Aggregation Pipeline Analytics API** that groups user study logs by day and computes rolling 7-day average completion rates using \`$match\`, \`$group\`, and \`$project\`.

\`\`\`javascript
db.studySessions.aggregate([
  { $match: { completed: true } },
  { $group: { _id: "$dayOfWeek", totalHours: { $sum: "$hours" } } },
  { $sort: { totalHours: -1 } }
]);
\`\`\``;
    }

    if (lower.includes('pace') || lower.includes('roadmap') || lower.includes('timeline') || lower.includes('schedule')) {
      return `Looking at your active roadmap for **${activeRole}**:
• Current Milestone Phase: **Phase ${learningPath?.currentPhase || 2} of ${learningPath?.phases?.length || 4}**.
• Estimated Completion: **${learningPath?.totalEstimatedWeeks || 12} weeks** at 10-12 hours/week.
• Pacing Telemetry: You are on track with expected milestone milestones. Maintain your 1.5h daily study cadence!`;
    }

    if (lower.includes('event loop') || lower.includes('node') || lower.includes('libuv')) {
      return `The Node.js **libuv Event Loop** executes in 6 distinct phases in order:
1. **Timers**: Executes callbacks scheduled by \`setTimeout()\` and \`setInterval()\`.
2. **Pending Callbacks**: Executes I/O callbacks deferred to the next loop iteration.
3. **Idle, Prepare**: Internal libuv use only.
4. **Poll**: Retrieves new I/O events and executes I/O related callbacks.
5. **Check**: Executes \`setImmediate()\` callbacks.
6. **Close Callbacks**: Executes close event callbacks (e.g. \`socket.on('close')\`).

*Note: \`process.nextTick()\` runs immediately after the current operation, before the event loop continues.*`;
    }

    return `Great question! In the context of your **${activeRole}** journey, mastering this concept directly advances your Phase ${learningPath?.currentPhase || 2} milestones. Would you like me to create a 3-question quick quiz or recommend specific documentation for this topic?`;
  };

  const handleSend = (text) => {
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

    setTimeout(() => {
      const aiReply = {
        id: `m-ai-${Date.now()}`,
        sender: 'ai',
        text: generateAIResponse(msgToSend)
      };
      setMessages((prev) => [...prev, aiReply]);
      setIsTyping(false);
    }, 600);
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const promptChips = [
    'Explain React 18 concurrent rendering',
    'Help me close my database indexing skill gap',
    'Recommend a 30-minute practice project on MongoDB',
    'Explain the Node.js event loop check phase',
    'Create a study plan for my career goal'
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
              className={`relative max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-[#FF6B5F] to-[#E85548] text-white font-medium shadow-md'
                  : 'bg-[#16191E] border border-white/[0.06] text-[#F5F1E8]'
              }`}
            >
              <div className="whitespace-pre-wrap font-sans">{msg.text}</div>

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

    </div>
  );
}
