import React, { useState } from 'react';
import { Card } from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { mockAIAssistant } from '../../utils/mockData';
import { Bot, Send, Sparkles, User, Lightbulb, Code2, RefreshCw, Zap } from 'lucide-react';

export default function AIChatInterface() {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      message: "Hello Akshat! I'm your LearnPath AI Tutor. How can I help you master your full stack and AI engineering goals today?",
      time: 'Just now'
    },
    {
      sender: 'user',
      message: 'Can you explain the event loop in Node.js and how libuv schedules microtasks?',
      time: '1m ago'
    },
    {
      sender: 'ai',
      message: `Node.js uses an event loop managed by **libuv** with specific phases:\n\n1. **Timers Phase**: Executes callbacks scheduled by \`setTimeout()\` and \`setInterval()\`.\n2. **Pending Callbacks**: Executes I/O callbacks deferred to the next loop iteration.\n3. **Idle, Prepare**: Used internally by Node.js.\n4. **Poll Phase**: Retrieves new I/O events; executes I/O related callbacks.\n5. **Check Phase**: \`setImmediate()\` callbacks are invoked here.\n6. **Close Callbacks**: Socket closure handlers like \`socket.on('close')\`.\n\n⚡ **Microtasks** (\`process.nextTick()\` and Promise resolution) execute immediately after the current operation finishes, before the event loop advances to the next phase!`,
      time: 'Just now'
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (text) => {
    const msgToSend = text || inputVal;
    if (!msgToSend.trim()) return;

    setMessages((prev) => [
      ...prev,
      { sender: 'user', message: msgToSend, time: 'Just now' }
    ]);
    setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      let aiReply = `Great question regarding **"${msgToSend}"**! In modern scalable architectures, breaking down this concept into modular components accelerates comprehension.\n\nWould you like a step-by-step code example, architectural diagram, or a practice assessment on this topic?`;
      
      if (msgToSend.toLowerCase().includes('react') || msgToSend.toLowerCase().includes('hook')) {
        aiReply = `In React 18+, concurrency and custom hooks allow optimal state synchronization:\n\n\`\`\`jsx\nfunction useDebounce(value, delay) {\n  const [debouncedValue, setDebouncedValue] = useState(value);\n  useEffect(() => {\n    const timer = setTimeout(() => setDebouncedValue(value), delay);\n    return () => clearTimeout(timer);\n  }, [value, delay]);\n  return debouncedValue;\n}\n\`\`\`\n\nThis prevents redundant re-renders during high-frequency user interactions.`;
      } else if (msgToSend.toLowerCase().includes('recommend') || msgToSend.toLowerCase().includes('next')) {
        aiReply = `Based on your skill gap analysis for **Full Stack AI Engineer**, I recommend focusing on **Vector Databases & LLM Embeddings** next. This will boost your competency readiness by +12%!`;
      }

      setMessages((prev) => [
        ...prev,
        { sender: 'ai', message: aiReply, time: 'Just now' }
      ]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="space-y-6">
      {/* AI Assistant Chat Container */}
      <Card variant="glow" className="flex flex-col h-[600px] relative overflow-hidden">
        {/* Chat Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FF6B5F] to-[#E85548] flex items-center justify-center text-white shadow-lg shadow-[#FF6B5F]/25 shrink-0">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#F5F1E8] flex items-center gap-2">
                LearnPath AI Mentor
                <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
              </h3>
              <p className="text-xs text-[#34D399] font-medium">
                Active • Gemini & Claude 3.5 Engine
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="coral" size="sm">Smart Tutor</Badge>
          </div>
        </div>

        {/* Message Log */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
          {messages.map((msg, idx) => {
            const isAI = msg.sender === 'ai';
            return (
              <div
                key={idx}
                className={`flex items-start gap-3 ${isAI ? 'justify-start' : 'justify-end'}`}
              >
                {isAI && (
                  <div className="w-8 h-8 rounded-xl bg-[#FF6B5F]/15 border border-[#FF6B5F]/30 text-[#FF857A] flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-xl p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                    isAI
                      ? 'bg-[#16191E] border border-white/[0.08] text-[#F5F1E8] rounded-tl-sm shadow-md'
                      : 'bg-gradient-to-r from-[#FF6B5F] to-[#E85548] text-white rounded-tr-sm shadow-md shadow-[#FF6B5F]/20 font-medium'
                  }`}
                >
                  {msg.message}
                </div>
                {!isAI && (
                  <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/15 text-[#F5F1E8] flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#FF6B5F]/15 border border-[#FF6B5F]/30 text-[#FF857A] flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-[#16191E] border border-white/[0.08] p-3 rounded-2xl rounded-tl-sm text-xs text-[#8C877D] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B5F] animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B5F] animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B5F] animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
        </div>

        {/* Suggested Prompts */}
        <div className="py-2.5 border-t border-white/[0.08]">
          <div className="flex items-center gap-1.5 text-[11px] text-[#8C877D] mb-2 font-medium">
            <Lightbulb className="w-3.5 h-3.5 text-[#FF6B5F]" />
            <span>Suggested questions:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              'Explain Node.js Event Loop phases',
              'Recommend next topic based on skill gap',
              'How to structure MERN microservices?',
              'Write custom React 18 hook example'
            ].map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="text-[11px] bg-[#16191E] hover:bg-[#1D2128] text-[#C7C2B6] hover:text-[#F5F1E8] px-3 py-1.5 rounded-xl border border-white/[0.06] hover:border-[#FF6B5F]/40 transition-colors truncate max-w-xs cursor-pointer font-medium"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="pt-2 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Ask your AI Mentor about code, algorithms, architectures..."
            className="flex-1 bg-[#16191E] border border-white/10 text-xs sm:text-sm text-[#F5F1E8] rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#FF6B5F] focus:ring-1 focus:ring-[#FF6B5F] placeholder:text-[#8C877D]"
          />
          <Button type="submit" variant="primary" size="md" icon={Send}>
            Send
          </Button>
        </form>
      </Card>
    </div>
  );
}
