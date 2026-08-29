/**
 * LearnPath AI — Assistant Coding & Technical Deep-Dive Prompt
 * Specialized prompt templates for syntax breakdowns, code explanations, and architectural patterns.
 */

export const getCodingPrompt = ({ targetRole, topic = '', language = 'JavaScript' }) => {
  return `Focus: Deep Technical & Architectural Explanation
Target Role Context: ${targetRole}
Core Topic: ${topic}
Primary Language/Ecosystem: ${language}

Provide:
1. Core Mental Model: Explain how ${topic} works under the hood (e.g. runtime mechanics, memory, execution order).
2. Production Code Example: Clean, idiomatic implementation with inline comments.
3. Common Anti-Patterns & Pitfalls: What mistakes developers make and how to prevent them.
4. Production Best Practices: Performance optimizations, edge-case handling, and testing strategies.`;
};
