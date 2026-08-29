/**
 * LearnPath AI — Roadmap Service Layer
 * Exposes clean, validated functions: generateRoadmap(input) and recalibrateRoadmap(input).
 */

import { RoadmapGenerator } from '../generator/roadmapGenerator.js';

/**
 * Generates an adaptive, structured learning roadmap.
 *
 * @param {Object} input
 * @param {string} input.targetRole - e.g. "MERN Stack Developer"
 * @param {number} [input.weeklyHours=10] - e.g. 10
 * @param {Array<{name: string, level: number}>} [input.currentSkills=[]] - e.g. [{ name: "HTML", level: 80 }]
 * @returns {Object} JSON-compatible roadmap object
 */
export const generateRoadmap = (input = {}) => {
  try {
    const sanitizedInput = {
      targetRole: input?.targetRole || 'Full Stack Developer',
      weeklyHours: Number(input?.weeklyHours) || 10,
      currentSkills: Array.isArray(input?.currentSkills) ? input.currentSkills : []
    };

    return RoadmapGenerator.generate(sanitizedInput);
  } catch (error) {
    console.error('[RoadmapService] Error generating roadmap:', error.message);
    // Safe resilient fallback
    return {
      targetRole: input?.targetRole || 'Full Stack Developer',
      estimatedWeeks: 12,
      phases: [
        {
          phase: 1,
          title: 'Phase 1: Core Engineering Foundations',
          skills: ['Core Concepts', 'Tooling', 'Git'],
          modules: [
            { title: 'Foundational Programming & Syntax', estimatedHours: 10 },
            { title: 'Data Structures & Algorithms Basics', estimatedHours: 12 }
          ]
        },
        {
          phase: 2,
          title: 'Phase 2: Framework Mastery & Production Architecture',
          skills: ['Primary Frameworks', 'API Design'],
          modules: [
            { title: 'Framework Architecture & Design Patterns', estimatedHours: 14 },
            { title: 'State Management & Testing', estimatedHours: 10 }
          ]
        }
      ]
    };
  }
};

/**
 * Recalibrates a learning roadmap for a new target role or updated skills without mutating the input.
 *
 * @param {Object} input
 * @param {Object} [input.existingRoadmap] - The prior roadmap
 * @param {string} input.newTargetRole - The new goal, e.g. "Data Scientist"
 * @param {Array<{name: string, level: number}>} [input.currentSkills=[]]
 * @param {number} [input.weeklyHours=10]
 * @returns {Object} A fresh, newly recalibrated roadmap object
 */
export const recalibrateRoadmap = (input = {}) => {
  try {
    // Clone existing roadmap if provided to strictly preserve immutability
    const existingClone = input?.existingRoadmap
      ? JSON.parse(JSON.stringify(input.existingRoadmap))
      : null;

    const newTargetRole = input?.newTargetRole || existingClone?.targetRole || 'Full Stack Developer';
    const weeklyHours = Number(input?.weeklyHours) || 10;
    const currentSkills = Array.isArray(input?.currentSkills) ? input.currentSkills : [];

    return RoadmapGenerator.recalibrate({
      existingRoadmap: existingClone,
      newTargetRole,
      currentSkills,
      weeklyHours
    });
  } catch (error) {
    console.error('[RoadmapService] Error recalibrating roadmap:', error.message);
    return generateRoadmap({
      targetRole: input?.newTargetRole || 'Full Stack Developer',
      weeklyHours: input?.weeklyHours,
      currentSkills: input?.currentSkills
    });
  }
};
