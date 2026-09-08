import { AssemblyAI, SyncTranscriptError } from 'assemblyai';

export interface TranscribeEnv { apiKey: string }

export function resolveTranscribeEnv(env: Record<string, string | undefined>): TranscribeEnv | null {
  const apiKey = env.ASSEMBLYAI_API_KEY;
  return apiKey ? { apiKey } : null;
}

export async function handleTranscribeRequest(audio: Buffer, env: TranscribeEnv): Promise<{ text: string }> {
  const client = new AssemblyAI({ apiKey: env.apiKey });
  try {
    const result = await client.sync.transcribe(audio, { model: 'universal-3-5-pro' });
    return { text: result.text.trim() };
  } catch (error) {
    if (error instanceof SyncTranscriptError) throw new Error(`AssemblyAI transcription failed (${error.errorCode ?? error.status}): ${error.message}`, { cause: error });
    throw error;
  }
}

export async function handleStreamingTokenRequest(env: TranscribeEnv): Promise<{ token: string }> {
  const client = new AssemblyAI({ apiKey: env.apiKey });
  const token = await client.streaming.createTemporaryToken({ expires_in_seconds: 60 });
  return { token };
}
