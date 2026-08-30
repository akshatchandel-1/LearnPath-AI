class LLMService {
  constructor() {
    this.provider = process.env.LLM_PROVIDER || 'gemini';
    this.apiKey = process.env.GEMINI_API_KEY || '';
  }

  async generateContent(prompt, options = {}) {
    if (!this.apiKey || this.apiKey.length < 5) {
      return null;
    }

    const models = ['gemini-2.0-flash', 'gemini-1.5-flash'];
    const timeoutMs = options.timeout || 12000;

    for (const model of models) {
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), timeoutMs);

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${this.apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                temperature: options.temperature || 0.4,
                maxOutputTokens: options.maxTokens || 1200,
              },
            }),
            signal: controller.signal,
          }
        );

        clearTimeout(timer);

        if (response.ok) {
          const data = await response.json();
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text && text.trim().length > 0) {
            return text.trim();
          }
        }
      } catch (err) {
        // Continue to fallback model if network or timeout occurs
      }
    }

    return null;
  }
}

const llmService = new LLMService();
module.exports = llmService;
