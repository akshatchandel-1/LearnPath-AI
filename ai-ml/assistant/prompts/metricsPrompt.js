/**
 * LearnPath AI — Assistant User Metrics & Progress Prompt
 * Specialized prompt templates for answering factual telemetry questions without hallucinations.
 */

export const getMetricsPrompt = ({ metricType, userMetrics = {}, targetRole = 'Software Engineer' }) => {
  return `Focus: User Telemetry & Progress Reporting (Zero Hallucination Guardrail)
Requested Metric: ${metricType}
Target Role: ${targetRole}
Available User Telemetry:
- Completed Courses: ${userMetrics.completedCoursesCount !== undefined ? userMetrics.completedCoursesCount : 'UNAVAILABLE'}
- Active Enrolled Courses: ${userMetrics.activeCoursesCount !== undefined ? userMetrics.activeCoursesCount : 'UNAVAILABLE'}
- Completed Lessons: ${userMetrics.completedLessonsCount !== undefined ? userMetrics.completedLessonsCount : 'UNAVAILABLE'}
- Total XP: ${userMetrics.totalXp !== undefined ? userMetrics.totalXp : 'UNAVAILABLE'}
- Current Streak: ${userMetrics.streakDays !== undefined ? userMetrics.streakDays : 'UNAVAILABLE'}

Strict Instructions:
1. Answer the exact factual metric requested directly.
2. If the metric value is 0, explicitly state 0.
3. If the metric is UNAVAILABLE, explicitly state that exact telemetry is currently unavailable instead of guessing or fabricating numbers.
4. Provide 1-2 encouraging, relevant next steps based on the user's target role.`;
};
