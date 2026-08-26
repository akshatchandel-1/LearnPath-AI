/**
 * Semantic Embeddings Provider (Gemini / Heuristic fallback vectorizer)
 */

function generateDeterministicEmbedding(text, dimension = 64) {
  if (!text || typeof text !== 'string') return new Array(dimension).fill(0);

  const vector = new Array(dimension).fill(0);
  const normalized = text.toLowerCase().trim();

  for (let i = 0; i < normalized.length; i++) {
    const charCode = normalized.charCodeAt(i);
    const index = (charCode * 31 + i * 17) % dimension;
    vector[index] += Math.sin(charCode + i);
  }

  // Normalize to unit vector
  let norm = 0;
  for (let i = 0; i < dimension; i++) norm += vector[i] * vector[i];
  norm = Math.sqrt(norm);

  if (norm > 0) {
    for (let i = 0; i < dimension; i++) vector[i] /= norm;
  }

  return vector;
}

module.exports = {
  generateDeterministicEmbedding,
};
