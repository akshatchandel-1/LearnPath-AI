const TFIDFVectorizer = require('../../ml/tfidf');
const { cosineSimilarity } = require('../../ml/cosineSimilarity');

class SimilarityEngine {
  constructor() {
    this.vectorizer = new TFIDFVectorizer();
    this.corpusResources = [];
    this.isInitialized = false;
  }

  initialize(resources = []) {
    if (!resources || resources.length === 0) return;

    this.corpusResources = resources;
    const documentStrings = resources.map((r) => {
      const skillsStr = Array.isArray(r.skills) ? r.skills.join(' ') : '';
      const tagsStr = Array.isArray(r.tags) ? r.tags.join(' ') : '';
      return `${r.title} ${r.description} ${skillsStr} ${tagsStr} ${r.type} ${r.difficulty}`;
    });

    this.vectorizer.fit(documentStrings);
    this.isInitialized = true;
  }

  computeSimilarityForProfile(userProfile, resource) {
    if (!this.isInitialized) return 0.5;

    const skillsStr = (userProfile.skills || []).map(s => s.name).join(' ');
    const interestsStr = (userProfile.interests || []).join(' ');
    const profileDoc = `${userProfile.careerGoal || ''} ${userProfile.targetRole || ''} ${skillsStr} ${interestsStr} ${userProfile.preferredLearningStyle || ''}`;

    const resDoc = `${resource.title} ${resource.description} ${(resource.skills || []).join(' ')} ${resource.type} ${resource.difficulty}`;

    const profileVec = this.vectorizer.transform(profileDoc);
    const resVec = this.vectorizer.transform(resDoc);

    return cosineSimilarity(profileVec, resVec);
  }
}

const similarityEngine = new SimilarityEngine();
module.exports = similarityEngine;
