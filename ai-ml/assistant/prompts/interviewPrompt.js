/**
 * LearnPath AI — Assistant Technical Interview Preparation Prompt
 * Specialized prompt templates for coding interviews, system design, and behavioral questions.
 */

export const getInterviewPrompt = ({ targetRole, topic = '' }) => {
  return `Focus: Technical & Architecture Interview Preparation
Target Role: ${targetRole}
Interview Domain / Topic: ${topic}

Provide:
1. High-Frequency Interview Questions: 2-3 questions frequently asked by top tech engineering panels.
2. Model Solution & Architecture: How a Senior/Staff Engineer approaches the problem (trade-offs, time/space complexity).
3. Red Flags & Common Candidate Mistakes to Avoid.
4. Follow-Up Deep Dive Questions: What interviewers ask when pushing for edge cases.`;
};
