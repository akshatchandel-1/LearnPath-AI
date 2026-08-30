class LLMService {
  constructor() {
    this.provider = process.env.LLM_PROVIDER || "gemini";
  }

  getApiKey() {
    return process.env.GEMINI_API_KEY || "";
  }

  async generateContent(prompt, options = {}) {
    const apiKey = this.getApiKey();
    if (!apiKey || apiKey.length < 5) {
      return null;
    }

    const models = [
      "gemini-3.6-flash",
      "gemini-3.5-flash",
      "gemini-3.5-flash-lite",
      "gemini-3.1-flash-lite",
      "gemini-flash-lite-latest",
      "gemma-4-26b-a4b-it",
      "gemma-4-31b-it"
    ];
    const timeoutMs = options.timeout || 15000;

    for (const model of models) {
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), timeoutMs);

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                temperature: options.temperature !== undefined ? options.temperature : 0.4,
                maxOutputTokens: options.maxTokens || 1500,
              },
            }),
            signal: controller.signal,
          }
        );

        clearTimeout(timer);

        if (response.ok) {
          const data = await response.json();
          let text = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text && text.trim().length > 0) {
            // Strip any thinking tags if present
            text = text.replace(/<thought>[\s\S]*?<\/thought>/gi, "").trim();
            if (text.length > 0) {
              return text;
            }
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

