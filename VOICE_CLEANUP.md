# English clinical dictation

AssemblyAI transcribes; Gemini conservatively cleans the complete dictation after Stop. Both push-to-talk and live input use the same cleanup endpoint, including the patient-assistant question field. Nothing is saved or submitted automatically.

## Configuration

Set these server-only variables locally and in the deployed project's environment:

```dotenv
ASSEMBLYAI_API_KEY=your-assemblyai-key
GEMINI_API_KEY=your-gemini-key
VOICE_CLEANUP_MODEL=your-enabled-stable-gemini-model-id
```

Use a stable Flash-family model supporting structured output, evaluate it with synthetic dictations, and pin its exact ID here. Restart Vite after changing environment variables; redeploy after changing deployed configuration. The cleanup model is independent of `AI_PROVIDER` and `AI_MODEL` used by patient chat. Never prefix these secrets with `VITE_`.

Missing Gemini configuration leaves dictation usable and displays an original-text fallback warning. No provider calls were made during automated validation.

## Behavior

- Streaming turns are replaced by turn order within each recording, not repeatedly appended. Stop flushes the stream; a five-second termination timeout recovers available text with an interruption warning.
- English sync transcription uses curated medical keyterms. Streaming retains medical mode and adds the same keyterms. The installed Sync API does not expose the streaming medical-domain setting; this implementation does not invent that option.
- `/api/voice-cleanup` accepts `{ transcript, purpose }` and returns `{ cleanedText, reviewWarnings }`. Limit: 20,000 transcript characters. Gemini timeout: ten seconds, with an eleven-second client fallback. The same handler serves Vite and Vercel.
- Grammar, punctuation and clear fillers may change. Summarization, translation, invented clinical content and silent resolution of ambiguous corrections are prohibited by the prompt.
- Number/unit/negation/uncertainty marker differences or model warnings retain the original. These are conservative checks, not a clinical correctness guarantee. Medication recognition and Indian English accuracy still need recorded-sample evaluation.
- Original and Undo cleanup controls apply to the latest inserted segment. Undo is disabled after subsequent field edits to avoid overwriting them. If a field changes during processing, the recovered dictation waits for manual insertion. Original text stays accessible even after edits.
- Original/cleaned text is held in component memory, not added to application logs, browser storage or the database by this feature. Navigating away cancels capture and discards recovery controls. Upstream provider retention is governed by provider terms, not by this application.

## Demo verification

Dictate a short English note in both modes; stop, inspect cleaned text and Original, then Undo. Repeat with negation, doses, decimals, medication names, hesitation and spoken corrections. Edit the field while processing and verify insertion waits. Test missing Gemini configuration and disconnected network. Save explicitly and confirm only the reviewed field text reaches the chart.

Tests cover streaming turn merging, preserved safety markers, request validation, Gemini response parsing, missing configuration and failures. Browser/microphone and live API tests remain manual; no Playwright was run.

Synthetic internal demo only. The new endpoint follows the existing demo's server-proxy access pattern; authenticated authorization, rate limits and provider privacy review are required before exposing it beyond the controlled demo or handling real clinical data.
