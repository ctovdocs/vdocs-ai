export interface PcmCapture { stop: () => void }

const TARGET_SAMPLE_RATE = 16000;
const BUFFER_SIZE = 4096;

function resample(input: Float32Array, fromRate: number, toRate: number): Float32Array {
  if (fromRate === toRate) return input;
  const ratio = fromRate / toRate;
  const newLength = Math.floor(input.length / ratio);
  const result = new Float32Array(newLength);
  for (let i = 0; i < newLength; i++) {
    const srcIndex = i * ratio;
    const indexFloor = Math.floor(srcIndex);
    const indexCeil = Math.min(indexFloor + 1, input.length - 1);
    const frac = srcIndex - indexFloor;
    result[i] = input[indexFloor] * (1 - frac) + input[indexCeil] * frac;
  }
  return result;
}

function floatTo16BitPCM(input: Float32Array): ArrayBuffer {
  const buffer = new ArrayBuffer(input.length * 2);
  const view = new DataView(buffer);
  for (let i = 0; i < input.length; i++) {
    const sample = Math.max(-1, Math.min(1, input[i]));
    view.setInt16(i * 2, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
  }
  return buffer;
}

/** Captures a MediaStream as 16kHz mono PCM16 chunks. Uses ScriptProcessorNode — deprecated but
 * dependency-free and universally supported, adequate for this scope over an AudioWorklet module. */
export function startPcmCapture(stream: MediaStream, onChunk: (chunk: ArrayBuffer) => void): PcmCapture {
  const audioContext = new AudioContext();
  const source = audioContext.createMediaStreamSource(stream);
  const processor = audioContext.createScriptProcessor(BUFFER_SIZE, 1, 1);
  const silentGain = audioContext.createGain();
  silentGain.gain.value = 0;

  processor.onaudioprocess = event => {
    const input = event.inputBuffer.getChannelData(0);
    const resampled = resample(input, audioContext.sampleRate, TARGET_SAMPLE_RATE);
    onChunk(floatTo16BitPCM(resampled));
  };

  source.connect(processor);
  processor.connect(silentGain);
  silentGain.connect(audioContext.destination);

  return {
    stop: () => {
      processor.disconnect();
      source.disconnect();
      silentGain.disconnect();
      void audioContext.close();
    },
  };
}
