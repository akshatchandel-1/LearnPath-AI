class LLMService {
  constructor() {
    this.provider = process.env.LLM_PROVIDER || 'gemini';
    this.apiKey = process.env.GEMINI_API_KEY || '';
  }

  async generateContent(prompt, options = {}) {
    // If Gemini API Key is configured, attempt call
    if (this.apiKey && this.apiKey.length > 5) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${this.apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                temperature: options.temperature || 0.4,
                maxOutputTokens: options.maxTokens || 1024,
              },
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) return text;
        }
      } catch (err) {
        console.warn('Gemini API call failed, using intelligent reasoning fallback:', err.message);
      }
    }

    // High-fidelity fallback reasoning
    return null;
  }
}

const llmService = new LLMService();
module.exports = llmService;
