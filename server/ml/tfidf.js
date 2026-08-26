/**
 * Mathematical TF-IDF Vectorizer with Sublinear Term Frequency Scaling,
 * Stopword Filtering, and Unigram/Bigram N-Gram Extraction.
 */

const STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and',
  'any', 'are', 'aren\'t', 'as', 'at', 'be', 'because', 'been', 'before', 'being',
  'below', 'between', 'both', 'but', 'by', 'can', 'can\'t', 'cannot', 'could',
  'couldn\'t', 'did', 'didn\'t', 'do', 'does', 'doesn\'t', 'doing', 'don\'t',
  'down', 'during', 'each', 'few', 'for', 'from', 'further', 'had', 'hadn\'t',
  'has', 'hasn\'t', 'have', 'haven\'t', 'having', 'he', 'he\'d', 'he\'ll', 'he\'s',
  'her', 'here', 'here\'s', 'hers', 'herself', 'him', 'himself', 'his', 'how',
  'how\'s', 'i', 'i\'d', 'i\'ll', 'i\'m', 'i\'ve', 'if', 'in', 'into', 'is',
  'isn\'t', 'it', 'it\'s', 'its', 'itself', 'let\'s', 'me', 'more', 'most',
  'mustn\'t', 'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once',
  'only', 'or', 'other', 'ought', 'our', 'ours', 'ourselves', 'out', 'over',
  'own', 'same', 'shan\'t', 'she', 'she\'d', 'she\'ll', 'she\'s', 'should',
  'shouldn\'t', 'so', 'some', 'such', 'than', 'that', 'that\'s', 'the', 'their',
  'theirs', 'them', 'themselves', 'then', 'there', 'there\'s', 'these', 'they',
  'they\'d', 'they\'ll', 'they\'re', 'they\'ve', 'this', 'those', 'through',
  'to', 'too', 'under', 'until', 'up', 'very', 'was', 'wasn\'t', 'we', 'we\'d',
  'we\'ll', 'we\'re', 'we\'ve', 'were', 'weren\'t', 'what', 'what\'s', 'when',
  'when\'s', 'where', 'where\'s', 'which', 'while', 'who', 'who\'s', 'whom',
  'why', 'why\'s', 'with', 'won\'t', 'would', 'wouldn\'t', 'you', 'you\'d',
  'you\'ll', 'you\'re', 'you\'ve', 'your', 'yours', 'yourself', 'yourselves'
]);

class TFIDFVectorizer {
  constructor() {
    this.vocabulary = new Map(); // term -> index
    this.idf = new Map();        // term -> idf value
    this.corpusSize = 0;
    this.isFitted = false;
  }

  tokenize(text) {
    if (!text || typeof text !== 'string') return [];
    const cleaned = text
      .toLowerCase()
      .replace(/[^a-z0-9+#.\-_]/g, ' ')
      .trim();

    const tokens = cleaned
      .split(/\s+/)
      .filter(t => t.length > 1 && !STOP_WORDS.has(t));

    // Generate unigrams + bigrams for richer technical context
    const ngrams = [...tokens];
    for (let i = 0; i < tokens.length - 1; i++) {
      ngrams.push(`${tokens[i]}_${tokens[i + 1]}`);
    }

    return ngrams;
  }

  fit(documents) {
    this.corpusSize = documents.length;
    const documentFrequencies = new Map();

    documents.forEach((doc) => {
      const tokens = this.tokenize(doc);
      const uniqueTokens = new Set(tokens);

      uniqueTokens.forEach((term) => {
        documentFrequencies.set(term, (documentFrequencies.get(term) || 0) + 1);
      });
    });

    let termIndex = 0;
    documentFrequencies.forEach((df, term) => {
      // Smooth Inverse Document Frequency: log((1 + N) / (1 + df)) + 1
      const idfValue = Math.log((1 + this.corpusSize) / (1 + df)) + 1.0;
      this.idf.set(term, idfValue);
      this.vocabulary.set(term, termIndex++);
    });

    this.isFitted = true;
    return this;
  }

  transform(text) {
    if (!this.isFitted) {
      throw new Error('TFIDFVectorizer must be fitted with documents before transform.');
    }

    const tokens = this.tokenize(text);
    const vector = new Array(this.vocabulary.size).fill(0);
    const termCounts = new Map();

    tokens.forEach((t) => {
      if (this.vocabulary.has(t)) {
        termCounts.set(t, (termCounts.get(t) || 0) + 1);
      }
    });

    termCounts.forEach((count, term) => {
      const index = this.vocabulary.get(term);
      const idf = this.idf.get(term) || 1.0;
      // Sublinear term frequency scaling: (1 + ln(count)) * idf
      const tf = 1.0 + Math.log(count);
      vector[index] = tf * idf;
    });

    return vector;
  }

  fitTransform(documents) {
    this.fit(documents);
    return documents.map(doc => this.transform(doc));
  }
}

module.exports = TFIDFVectorizer;
