import { defineConfig } from 'vitest/config';
import { loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { handlePatientAiRequest, resolveProviderEnv } from './server/patientAi.ts';
import { handleStreamingTokenRequest, handleTranscribeRequest, resolveTranscribeEnv } from './server/transcribe.ts';
import { handleVoiceCleanup } from './server/voiceCleanup.ts';
import { createInsurerStore, handleInsurerRequest } from './server/insurer.ts';

function patientAiProxyPlugin(env: Record<string, string | undefined>): Plugin {
  return {
    name: 'patient-ai-proxy',
    configureServer(server) {
      const insurerStore = createInsurerStore();
      server.middlewares.use('/api/insurer', (req, res) => { void handleInsurerRequest(req, res, insurerStore); });
      server.middlewares.use('/api/voice-cleanup', (req, res) => { void handleVoiceCleanup(req, res, env); });
      server.middlewares.use('/api/patient-ai', async (req, res) => {
        if (req.method !== 'POST') { res.statusCode = 405; res.end('Method not allowed'); return; }
        const providerEnv = resolveProviderEnv(env);
        if (!providerEnv) { res.statusCode = 503; res.setHeader('content-type', 'application/json'); res.end(JSON.stringify({ error: 'AI provider not configured. Set AI_PROVIDER, AI_MODEL and the matching API key in .env.' })); return; }
        try {
          const chunks: Buffer[] = [];
          for await (const chunk of req) chunks.push(chunk as Buffer);
          const body = JSON.parse(Buffer.concat(chunks).toString('utf8'));
          const result = await handlePatientAiRequest(body, providerEnv);
          res.statusCode = 200; res.setHeader('content-type', 'application/json'); res.end(JSON.stringify(result));
        } catch (error) {
          res.statusCode = 502; res.setHeader('content-type', 'application/json'); res.end(JSON.stringify({ error: error instanceof Error ? error.message : 'AI request failed' }));
        }
      });
      server.middlewares.use('/api/transcribe', async (req, res) => {
        if (req.method !== 'POST') { res.statusCode = 405; res.end('Method not allowed'); return; }
        const transcribeEnv = resolveTranscribeEnv(env);
        if (!transcribeEnv) { res.statusCode = 503; res.setHeader('content-type', 'application/json'); res.end(JSON.stringify({ error: 'Voice transcription not configured. Set ASSEMBLYAI_API_KEY in .env.' })); return; }
        try {
          const chunks: Buffer[] = [];
          for await (const chunk of req) chunks.push(chunk as Buffer);
          const result = await handleTranscribeRequest(Buffer.concat(chunks), transcribeEnv);
          res.statusCode = 200; res.setHeader('content-type', 'application/json'); res.end(JSON.stringify(result));
        } catch (error) {
          res.statusCode = 502; res.setHeader('content-type', 'application/json'); res.end(JSON.stringify({ error: error instanceof Error ? error.message : 'Transcription failed' }));
        }
      });
      server.middlewares.use('/api/transcribe-token', async (req, res) => {
        if (req.method !== 'POST') { res.statusCode = 405; res.end('Method not allowed'); return; }
        const transcribeEnv = resolveTranscribeEnv(env);
        if (!transcribeEnv) { res.statusCode = 503; res.setHeader('content-type', 'application/json'); res.end(JSON.stringify({ error: 'Voice transcription not configured. Set ASSEMBLYAI_API_KEY in .env.' })); return; }
        try {
          const result = await handleStreamingTokenRequest(transcribeEnv);
          res.statusCode = 200; res.setHeader('content-type', 'application/json'); res.end(JSON.stringify(result));
        } catch (error) {
          res.statusCode = 502; res.setHeader('content-type', 'application/json'); res.end(JSON.stringify({ error: error instanceof Error ? error.message : 'Token request failed' }));
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), patientAiProxyPlugin(env)],
    server: { port: 5173, strictPort: true },
    test: { include: ['src/**/*.test.ts', 'server/**/*.test.ts'] },
  };
});
