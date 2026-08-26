/**
 * Mathematical Cosine Similarity calculation between vectors.
 * Cosine Similarity = (A · B) / (||A|| * ||B||)
 */

function cosineSimilarity(vecA, vecB) {
  if (!vecA || !vecB || vecA.length === 0 || vecB.length === 0) return 0.0;
  if (vecA.length !== vecB.length) return 0.0;

  let dotProduct = 0.0;
  let normA = 0.0;
  let normB = 0.0;

  for (let i = 0; i < vecA.length; i++) {
    const valA = vecA[i];
    const valB = vecB[i];

    dotProduct += valA * valB;
    normA += valA * valA;
    normB += valB * valB;
  }

  const magnitude = Math.sqrt(normA) * Math.sqrt(normB);
  if (magnitude === 0.0) return 0.0;

  const similarity = dotProduct / magnitude;
  return Math.max(0.0, Math.min(1.0, similarity));
}

function calculateTextSimilarity(textA, textB, vectorizer) {
  if (!textA || !textB || !vectorizer) return 0.0;
  const vecA = vectorizer.transform(textA);
  const vecB = vectorizer.transform(textB);
  return cosineSimilarity(vecA, vecB);
}

module.exports = {
  cosineSimilarity,
  calculateTextSimilarity,
};
