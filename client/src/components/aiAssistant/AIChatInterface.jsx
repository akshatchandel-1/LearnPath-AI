import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { mockAIAssistant } from '../../utils/mockData';
import { Bot, Send, Sparkles, User, Lightbulb } from 'lucide-react';

/**
 * Member 4: AI Assistant Placeholder Component
 * Obsidian + Ivory + Coral Palette
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
      <Card variant="default" className="flex flex-col h-[550px]">
        {/* Chat Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E6E0D7]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FDF0EE] border border-[#F9D5CD] flex items-center justify-center text-[#E05A47]">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#202124]">LearnPath AI Mentor</h3>
              <p className="text-xs text-[#3F8F68] flex items-center gap-1 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3F8F68] animate-pulse" />
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
                  <div className="w-7 h-7 rounded-lg bg-[#FDF0EE] text-[#E05A47] border border-[#F9D5CD] flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-lg p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    isAI
                      ? 'bg-[#F6F2EA] border border-[#E6E0D7] text-[#202124] rounded-tl-sm'
                      : 'bg-[#E05A47] text-white rounded-tr-sm shadow-md shadow-[#E05A47]/20 font-medium'
                  }`}
                >
                  {msg.message}
                </div>
                {!isAI && (
                  <div className="w-7 h-7 rounded-lg bg-[#FAF0ED] text-[#A83B2B] border border-[#F3B2A4] flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Suggested Prompts */}
        <div className="py-2 border-t border-[#E6E0D7]">
          <div className="flex items-center gap-1.5 text-[11px] text-[#5F6368] mb-2 font-medium">
            <Lightbulb className="w-3.5 h-3.5 text-[#C48A3A]" />
            <span>Suggested prompts:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {mockAIAssistant.suggestedPrompts.slice(0, 2).map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="text-[11px] bg-[#FFFDF8] hover:bg-[#F6F2EA] text-[#202124] px-3 py-1 rounded-xl border border-[#E6E0D7] hover:border-[#D99A8A] transition-colors truncate max-w-xs cursor-pointer font-medium"
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
            className="flex-1 bg-[#FFFDF8] border border-[#E6E0D7] text-xs sm:text-sm text-[#202124] rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#E05A47] focus:ring-1 focus:ring-[#E05A47] placeholder:text-[#8A8F98]"
          />
          <Button type="submit" variant="primary" size="md" icon={Send}>
            Send
          </Button>
        </form>
      </Card>
    </div>
  );
}
