/**
 * LearnPath AI — Assistant Learning & Roadmap Navigation Prompt
 * Specialized prompt templates for pacing, study strategy, and curriculum questions.
 */

export const getLearningPrompt = ({ targetRole, learningContext = {}, topic = '' }) => {
  const currentPhase = learningContext.currentPhase || 1;
  const weeklyHours = learningContext.weeklyHours || 10;

  return `Focus: Learning Path Optimization & Study Strategy
Target Role: ${targetRole}
Current Roadmap Phase: Phase ${currentPhase}
Weekly Study Commitment: ${weeklyHours} hours/week
Query: ${topic}

Provide:
1. Pacing & Time Allocation: Realistic hours needed to achieve fluency in this concept.
2. Conceptual Prerequisites: What fundamentals should be solid before tackling advanced sub-topics.
3. Hands-on Practice Exercise: A 30-to-60 minute micro-project to test retention.
4. Checkpoint Self-Assessment: 2-3 conceptual questions the learner should be able to answer.`;
};
