/**
 * LearnPath AI — Assistant Context Manager
 * Safely parses, validates, and enriches contextual metadata without inventing fake user progress.
 */

export class ContextManager {
  /**
   * Normalizes and enriches the input context object.
   *
   * @param {Object} input
   * @param {string} [input.targetRole]
   * @param {Array<{name: string, level: number}>} [input.currentSkills]
   * @param {Array<Object|string>} [input.skillGaps]
   * @param {Object} [input.learningContext]
   * @param {Object} [input.userMetrics]
   * @param {Array} [input.enrolledCourses]
   * @param {Array} [input.completedCourses]
   * @param {Array} [input.recommendations]
   * @returns {Object} Clean validated context
   */
  static normalizeContext(input = {}) {
    const targetRole = typeof input.targetRole === 'string' && input.targetRole.trim()
      ? input.targetRole.trim()
      : 'Software Engineer';

    // Normalize verified skills
    const currentSkills = Array.isArray(input.currentSkills)
      ? input.currentSkills
          .filter(s => s && (typeof s.name === 'string' || typeof s.skill === 'string'))
          .map(s => ({
            name: (s.name || s.skill).trim(),
            level: Math.max(0, Math.min(100, Number(s.level !== undefined ? s.level : s.progress) || 0))
          }))
      : [];

    // Normalize identified skill gaps
    const skillGaps = Array.isArray(input.skillGaps)
      ? input.skillGaps.map(g => {
          if (typeof g === 'string') return { skill: g, priority: 'High' };
          return {
            skill: g.skill || g.name || 'Unknown',
            currentLevel: g.currentLevel !== undefined ? Number(g.currentLevel) : 0,
            targetLevel: g.targetLevel !== undefined ? Number(g.targetLevel) : 80,
            priority: g.priority || 'High'
          };
        })
      : [];

    // Normalize roadmap and learning context
    const rawLearning = input.learningContext || {};
    const learningContext = {
      currentPhase: Number(rawLearning.currentPhase) || 1,
      totalPhases: Number(rawLearning.totalPhases) || 4,
      completedHours: typeof rawLearning.completedHours === 'number' ? rawLearning.completedHours : null,
      weeklyHours: Number(rawLearning.weeklyHours) || 10,
      activeMilestone: rawLearning.activeMilestone || null,
      hasExplicitProgress: rawLearning.currentPhase !== undefined || rawLearning.completedHours !== undefined
    };

    // Normalize user telemetry metrics
    const rawMetrics = input.userMetrics || {};
    const rawUser = input.user || {};

    const completedCourses = Array.isArray(rawMetrics.completedCourses)
      ? rawMetrics.completedCourses
      : (Array.isArray(input.completedCourses) ? input.completedCourses : []);

    const enrolledCourses = Array.isArray(rawMetrics.enrolledCourses)
      ? rawMetrics.enrolledCourses
      : (Array.isArray(input.enrolledCourses) ? input.enrolledCourses : (Array.isArray(input.activeCourses) ? input.activeCourses : []));

    const completedCoursesCount = typeof rawMetrics.completedCoursesCount === 'number'
      ? rawMetrics.completedCoursesCount
      : (completedCourses.length > 0 ? completedCourses.length : (typeof rawUser.completedCoursesCount === 'number' ? rawUser.completedCoursesCount : null));

    const activeCoursesCount = typeof rawMetrics.activeCoursesCount === 'number'
      ? rawMetrics.activeCoursesCount
      : (enrolledCourses.length > 0 ? enrolledCourses.length : (typeof rawUser.activeCoursesCount === 'number' ? rawUser.activeCoursesCount : null));

    const completedLessonsCount = typeof rawMetrics.completedLessonsCount === 'number'
      ? rawMetrics.completedLessonsCount
      : (typeof rawUser.completedLessonsCount === 'number' ? rawUser.completedLessonsCount : null);

    const totalXp = typeof rawMetrics.totalXp === 'number'
      ? rawMetrics.totalXp
      : (typeof rawUser.totalXp === 'number' ? rawUser.totalXp : null);

    const streakDays = typeof rawMetrics.streakDays === 'number'
      ? rawMetrics.streakDays
      : (typeof rawUser.streakDays === 'number' ? rawUser.streakDays : null);

    const userMetrics = {
      completedCoursesCount,
      activeCoursesCount,
      completedLessonsCount,
      totalXp,
      streakDays,
      completedCourses,
      enrolledCourses,
      assessmentHistory: Array.isArray(rawMetrics.assessmentHistory || rawUser.assessmentScores) ? (rawMetrics.assessmentHistory || rawUser.assessmentScores) : []
    };

    return {
      targetRole,
      currentSkills,
      skillGaps,
      learningContext,
      userMetrics,
      recommendations: Array.isArray(input.recommendations) ? input.recommendations : [],
      hasSkills: currentSkills.length > 0,
      hasSkillGaps: skillGaps.length > 0
    };
  }

  /**
   * Generates a concise context summary string for LLM injection.
   */
  static formatContextSummary(normalized) {
    const parts = [
      `Target Specialization: ${normalized.targetRole}`
    ];

    if (normalized.hasSkills) {
      const skillsStr = normalized.currentSkills.map(s => `${s.name} (${s.level}%)`).join(', ');
      parts.push(`Current Skills: ${skillsStr}`);
    } else {
      parts.push(`Current Skills: No verified skills recorded yet`);
    }

    if (normalized.hasSkillGaps) {
      const gapStr = normalized.skillGaps.map(g => `${g.skill} (${g.priority} priority)`).join(', ');
      parts.push(`Identified Skill Gaps: ${gapStr}`);
    }

    if (normalized.learningContext.hasExplicitProgress) {
      if (normalized.learningContext.currentPhase) {
        parts.push(`Roadmap Phase: Phase ${normalized.learningContext.currentPhase}${normalized.learningContext.totalPhases ? ` of ${normalized.learningContext.totalPhases}` : ''}`);
      }
      if (normalized.learningContext.activeMilestone) {
        parts.push(`Active Milestone: ${normalized.learningContext.activeMilestone}`);
      }
    }

    const { userMetrics } = normalized;
    const metricsParts = [];
    if (userMetrics.completedCoursesCount !== null) metricsParts.push(`Completed Courses: ${userMetrics.completedCoursesCount}`);
    if (userMetrics.activeCoursesCount !== null) metricsParts.push(`Active Courses: ${userMetrics.activeCoursesCount}`);
    if (userMetrics.totalXp !== null) metricsParts.push(`Total XP: ${userMetrics.totalXp}`);
    if (userMetrics.streakDays !== null) metricsParts.push(`Streak: ${userMetrics.streakDays} days`);
    
    if (metricsParts.length > 0) {
      parts.push(`Learner Telemetry: ${metricsParts.join(' | ')}`);
    }

    return parts.join('\n');
  }
}
