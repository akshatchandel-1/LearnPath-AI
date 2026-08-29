/**
 * LearnPath AI — Roadmap Package Entry Point
 * Exports clean API functions: generateRoadmap and recalibrateRoadmap.
 */

export { generateRoadmap, recalibrateRoadmap } from './service/roadmapService.js';
export { RoadmapGenerator } from './generator/roadmapGenerator.js';
export { ROLE_TEMPLATES, getRoleTemplate } from './templates/roleTemplates.js';
export { SKILL_TAXONOMY, normalizeSkillName, getSkillMetadata } from './data/skillTaxonomy.js';
