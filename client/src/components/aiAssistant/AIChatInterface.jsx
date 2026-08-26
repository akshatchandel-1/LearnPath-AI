import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { mockAIAssistant } from '../../utils/mockData';
import { Bot, Send, Sparkles, User, Lightbulb } from 'lucide-react';

/**
 * Member 4: AI Assistant Placeholder Component
 * Location: src/components/aiAssistant/AIChatInterface.jsx
 */
export default function AIChatInterface() {
  const [messages, setMessages] = useState(mockAIAssistant.sampleConversation);
  const [inputVal, setInputVal] = useState('');

  const handleSend = (text) => {
    const msgToSend = text || inputVal;
    if (!msgToSend.trim()) return;

    setMessages((prev) => [
      ...prev,
      { sender: 'user', message: msgToSend },
      { sender: 'ai', message: `[AI Mentor Simulation]: This AI Assistant module will be connected to the AI/ML backend in feature/member-4. You asked: "${msgToSend}"` }
    ]);
    setInputVal('');
  };

  return (
    <div className="space-y-6">
      {/* AI Assistant Chat Container */}
      <Card variant="glow" className="flex flex-col h-[550px]">
        {/* Chat Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">LearnPath AI Mentor</h3>
              <p className="text-xs text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Online & Ready
              </p>
            </div>
          </div>
          <Badge variant="primary" size="sm">Claude / Gemini Powered</Badge>
        </div>

        {/* Message Log */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3.5 pr-1">
          {messages.map((msg, idx) => {
            const isAI = msg.sender === 'ai';
            return (
              <div
                key={idx}
                className={`flex items-start gap-2.5 ${isAI ? 'justify-start' : 'justify-end'}`}
              >
                {isAI && (
                  <div className="w-7 h-7 rounded-lg bg-primary/20 text-primary-300 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-lg p-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    isAI
                      ? 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-sm'
                      : 'bg-primary text-white rounded-tr-sm shadow-md shadow-primary/20'
                  }`}
                >
                  {msg.message}
                </div>
                {!isAI && (
                  <div className="w-7 h-7 rounded-lg bg-secondary/20 text-secondary-300 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Suggested Prompts */}
        <div className="py-2 border-t border-slate-800/80">
          <div className="flex items-center gap-1.5 text-[11px] text-text-subtle mb-2">
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span>Suggested prompts:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {mockAIAssistant.suggestedPrompts.slice(0, 2).map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="text-[11px] bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white px-2.5 py-1 rounded-lg border border-slate-800 transition-colors truncate max-w-xs"
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
            placeholder="Ask your AI Mentor about concepts, roadmaps, code..."
            className="flex-1 bg-slate-900/90 border border-slate-800 text-xs sm:text-sm text-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary placeholder:text-slate-500"
          />
          <Button type="submit" variant="primary" size="md" icon={Send}>
            Send
          </Button>
        </form>
      </Card>
    </div>
  );
}
