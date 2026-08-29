/**
 * LearnPath AI — Assistant Package Entry Point
 * Exports clean API function: generateAssistantResponse, along with ChatEngine, ContextManager, and Prompts.
 */

export { generateAssistantResponse } from './service/assistantService.js';
export { ChatEngine } from './chat/chatEngine.js';
export { ContextManager } from './context/contextManager.js';
export { BaseAIProvider, OfflineMockProvider, RemoteLLMProvider } from './service/providerAdapter.js';
export * from './prompts/index.js';
