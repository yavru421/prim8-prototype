import 'dotenv/config';
// Placeholder import - replace with actual client lib in real deployment
// import { LlamaAPIClient } from 'llama-api-client';

interface ChatMessage { role: 'system' | 'user' | 'assistant'; content: string; }

// Simple mock for now if real client unavailable
async function callModel(messages: ChatMessage[]): Promise<string> {
  // In production, call real API:
  // const client = new LlamaAPIClient({ apiKey: process.env.LLAMA_API_KEY });
  // const resp = await client.chat.completions.create({ model: 'llama-4.0', messages });
  // return resp.completion_message;
  const last = messages[messages.length - 1].content;
  return `// Generated script (mock)\nconsole.log('Prim8 script executing');\n// Prompt context below as comment for review\n/*${last.replace(/\/*/g, '')}*/`;
}

export async function generateScript(prompt: string, context?: string): Promise<string> {
  const messages: ChatMessage[] = [
    { role: 'system', content: 'You are Prim8, AI generating safe Tampermonkey scripts.' },
    { role: 'user', content: `Context: ${context || 'None'}\nRequest: ${prompt}` }
  ];
  return callModel(messages);
}
