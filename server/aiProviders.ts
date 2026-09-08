export type AiProvider = 'anthropic' | 'openai' | 'gemini';

export interface ProviderConfig { provider: AiProvider; model: string; apiKey: string }

async function callAnthropic(config: ProviderConfig, system: string, user: string) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-api-key': config.apiKey, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({ model: config.model, max_tokens: 1200, system, messages: [{ role: 'user', content: user }] }),
  });
  if (!response.ok) throw new Error(`Anthropic API error ${response.status}: ${await response.text()}`);
  const data = await response.json();
  return data.content?.[0]?.text ?? '';
}

async function callOpenAi(config: ProviderConfig, system: string, user: string) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${config.apiKey}` },
    body: JSON.stringify({ model: config.model, response_format: { type: 'json_object' }, messages: [{ role: 'system', content: system }, { role: 'user', content: user }] }),
  });
  if (!response.ok) throw new Error(`OpenAI API error ${response.status}: ${await response.text()}`);
  const data = await response.json();
  return data.choices?.[0]?.message?.content ?? '';
}

async function callGemini(config: ProviderConfig, system: string, user: string) {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${config.model}:generateContent?key=${config.apiKey}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: system }] },
      contents: [{ role: 'user', parts: [{ text: user }] }],
      generationConfig: { responseMimeType: 'application/json' },
    }),
  });
  if (!response.ok) throw new Error(`Gemini API error ${response.status}: ${await response.text()}`);
  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
}

export async function callProvider(config: ProviderConfig, system: string, user: string): Promise<string> {
  switch (config.provider) {
    case 'anthropic': return callAnthropic(config, system, user);
    case 'openai': return callOpenAi(config, system, user);
    case 'gemini': return callGemini(config, system, user);
  }
}
