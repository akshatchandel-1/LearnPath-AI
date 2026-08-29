/**
 * LearnPath AI — Core Roadmap Generator Engine
 * Dynamically synthesizes personalized, competency-aware learning roadmaps based on
 * target role, current skills inventory, and weekly study time.
 */

import { getRoleTemplate } from '../templates/roleTemplates.js';
import { normalizeSkillName } from '../data/skillTaxonomy.js';

export class RoadmapGenerator {
  /**
   * Generates a tailored roadmap from user specifications.
   *
   * @param {Object} params
   * @param {string} params.targetRole - Target career goal / job title
   * @param {number} [params.weeklyHours=10] - Weekly committed study hours
   * @param {Array<{name: string, level: number}>} [params.currentSkills=[]] - User's existing skills with mastery (0-100)
   * @returns {Object} Clean JSON-compatible roadmap object
   */
  static generate({ targetRole = 'Full Stack Developer', weeklyHours = 10, currentSkills = [] }) {
    // 1. Sanitize Inputs
    const cleanRole = typeof targetRole === 'string' && targetRole.trim() ? targetRole.trim() : 'Full Stack Developer';
    const cleanWeeklyHours = Math.max(1, Math.min(60, Number(weeklyHours) || 10));
    
    // 2. Map existing skills for quick O(1) lookup
    const userSkillMap = new Map();
    if (Array.isArray(currentSkills)) {
      currentSkills.forEach((s) => {
        if (s && s.name) {
          const norm = normalizeSkillName(s.name);
          const lvl = Math.max(0, Math.min(100, Number(s.level) || 0));
          userSkillMap.set(norm, lvl);
        }
      });
    }

    // 3. Fetch Master Blueprint
    const template = getRoleTemplate(cleanRole);

    let totalAdjustedHours = 0;

    // 4. Process Phases and calibrate module hours against skill mastery
    const phases = template.phases.map((blueprintPhase, phaseIdx) => {
      // Evaluate skills in this phase
      const phaseSkills = [...blueprintPhase.skills];
      
      const modules = blueprintPhase.modules.map((mod) => {
        const baseHours = mod.estimatedHours || 10;
        
        // Check if any skill in this module is already mastered
        let maxMastery = 0;
        phaseSkills.forEach((sk) => {
          const norm = normalizeSkillName(sk);
          if (userSkillMap.has(norm)) {
            maxMastery = Math.max(maxMastery, userSkillMap.get(norm));
          }
        });

        // Also check if module title mentions a mastered skill
        for (const [normSk, lvl] of userSkillMap.entries()) {
          if (mod.title.toLowerCase().includes(normSk)) {
            maxMastery = Math.max(maxMastery, lvl);
          }
        }

        // Calibrate hours:
        // - Mastery >= 80%: 25% of time (focused review/checkpoint)
        // - Mastery >= 50%: 60% of time (gap reinforcement)
        // - Mastery < 50%: 100% of time (full foundational curriculum)
        let hoursFactor = 1.0;
        if (maxMastery >= 80) {
          hoursFactor = 0.3;
        } else if (maxMastery >= 50) {
          hoursFactor = 0.65;
        } else if (maxMastery > 20) {
          hoursFactor = 0.85;
        }

        const adjustedHours = Math.max(1, Math.round(baseHours * hoursFactor));
        totalAdjustedHours += adjustedHours;

        return {
          title: mod.title,
          estimatedHours: adjustedHours
        };
      });

      return {
        phase: blueprintPhase.phase || phaseIdx + 1,
        title: blueprintPhase.title,
        skills: phaseSkills,
        modules
      };
    });

    // 5. Calculate estimated weeks
    const estimatedWeeks = Math.max(1, Math.ceil(totalAdjustedHours / cleanWeeklyHours));

    return {
      targetRole: cleanRole,
      estimatedWeeks,
      phases
    };
  }

  /**
   * Recalibrates an existing roadmap for a new target role without mutating the original.
   *
   * @param {Object} params
   * @param {Object} [params.existingRoadmap] - The previous roadmap object
   * @param {string} params.newTargetRole - The newly selected target role
   * @param {Array<{name: string, level: number}>} [params.currentSkills=[]] - Current skill inventory
   * @param {number} [params.weeklyHours=10] - Weekly study hours
   * @returns {Object} Newly recalibrated roadmap object
   */
  static recalibrate({ existingRoadmap, newTargetRole, currentSkills = [], weeklyHours = 10 }) {
    // Ensure existing roadmap is not mutated
    const targetRole = newTargetRole || (existingRoadmap && existingRoadmap.targetRole) || 'Full Stack Developer';
    
    // Generate fresh clean roadmap for the target role
    const newRoadmap = RoadmapGenerator.generate({
      targetRole,
      weeklyHours,
      currentSkills
    });

    return newRoadmap;
  }
}
