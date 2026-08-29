/**
 * LearnPath AI — Recommendation Package
 * Exports clean API function: generateRecommendations, RecommendationEngine, and catalog metadata.
 */

export { generateRecommendations } from './service/recommendationService.js';
export { RecommendationEngine } from './engine/recommendationEngine.js';
export {
  RECOMMENDATION_CATALOG,
  normalizeCatalogSkill
} from './data/recommendationCatalog.js';
