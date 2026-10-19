# Local development and debugging

[Handbook index](README.md) · [File map](FOLDERS_AND_FILES.md)

## 1. Start with the default mock mode

The current `package.json` requires Node.js `>=22.12.0`. Use a compatible version and the committed lockfile.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Keep `VITE_DATA_MODE=mock` for a browser-only clinical demo. Open `http://127.0.0.1:5173/app`. Search `F-DEMO-0001` for a known patient. Use the same hostname and port consistently so browser storage stays consistent.

No login is required in mock mode. AI and voice can be unavailable until their server keys are configured. Ordinary deterministic workflow actions do not require an AI provider.

## 2. Configuration map

| Variable | Used for | Where it belongs |
| --- | --- | --- |
| `VITE_DATA_MODE` | `mock` or `supabase` | Frontend build environment |
| `VITE_SUPABASE_URL` | Browser Supabase project | Frontend build environment |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Publishable browser credential | Frontend build environment |
| `VITE_AI_PROXY_URL` | Patient AI endpoint; example uses `/api/patient-ai` | Frontend build environment |
| `AI_PROVIDER`, `AI_MODEL` | Chosen chart AI adapter/model | Server environment |
| `ANTHROPIC_API_KEY`, `OPENAI_API_KEY`, `GEMINI_API_KEY` | Corresponding provider credentials | Server environment only |
| `ASSEMBLYAI_API_KEY` | Batch transcription and streaming token issuance | Server environment only |
| `VOICE_CLEANUP_MODEL` | Optional Gemini cleanup model override | Server environment |
| `SUPABASE_SERVICE_ROLE_KEY` | Hosted source-portal and insurer database access | Server environment only |

`VITE_*` values can be compiled into browser JavaScript. Do not put private credentials there. Environment examples describe variable names, not a guarantee that a particular model is available in your account. Choose a provider-supported model and verify it during integration work.

Changing environment values usually requires restarting Vite; changing frontend build values in a deployment requires a rebuild. The integration helper currently has a hardcoded Supabase URL and hospital UUID, so changing only the browser variables does not retarget every server API.

## 3. Optional shared Supabase mode

Use a disposable demo project. Inspect the [migration inventory](DATA_AND_PERSISTENCE.md), apply the missing migrations in order, and install the intended synthetic dataset. Provision an Auth user and its hospital membership. Then set the browser Supabase configuration and `VITE_DATA_MODE=supabase`.

Check the policies actually applied to that database, including the anonymous demo reads. Verify member, non-member, signed-out, cross-hospital, and concurrent-save behavior before relying on shared persistence. A local unit test is not evidence that hosted SQL or RLS is correct.

The Vite middleware supports AI, voice, and local insurer calls. To exercise `api/orders/*` and `api/patients/*`, use a deployment or a separately configured Vercel-compatible development runtime. `npm run dev` does not automatically register those files.

## 4. Commands and their meaning

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start Vite and supported local API middleware |
| `npm run typecheck` | Check TypeScript project |
| `npm run lint` | Run ESLint |
| `npm test` | Run Vitest tests under `src/` and `server/` |
| `npm run build` | TypeScript check and static production build |
| `npm run preview` | Serve the static build; does not supply API middleware |
| `npm run check` | Typecheck, lint, unit tests, build |
| `npm run test:e2e` | Separate Playwright mock-mode browser suite |
| `npm run data:export` | Validate and regenerate cohort artifacts |
| `npm run data:shifts` | Export shift demo artifacts |
| `npm run seed:shifts` | Run shift seeding script; inspect configuration and target before use |

The repository README asks that browser tests run only when explicitly requested. They are not part of `npm run check`. Playwright starts a static preview on port 5174; it does not verify the real hosted APIs or provider calls.

## 5. First feature change

Example: add a rule to referral completion.

1. Read [the referral flow](flows/REFERRALS.md) and the relevant `workflowEngine.test.ts` cases.
2. Inspect `domain/workflow.ts` and `domain/longitudinal.ts` for accepted payloads and records.
3. Change the engine rule, then add a focused case showing the intended rejection or acceptance.
4. Change `RequestDetail.tsx` if the user needs another input or explanation.
5. Check coordination too: it shares the request engine and detail component.
6. Check discharge blockers, handover sources, and doctor updates for downstream effects.
7. Run the relevant unit test file, then the normal checks required for the change.

Do not add a direct storage write to a React page to bypass the workflow engine.

## 6. Troubleshooting

| Symptom | Inspect first |
| --- | --- |
| Save says the record changed | Entity `expected_version`, snapshot revision, another tab or remote writer |
| Worklist updated but patient detail is stale | `workflow` versus `workspace`/`history` query caches and invalidation |
| State differs between two local URLs | Origin-specific browser storage |
| New seed fields do not appear remotely | Existing `demo_workflow_state` versus normalized seed tables |
| Claim disappeared on another computer | Hospital claims are still browser-local |
| Insurer inbox differs between local and hosted | Filesystem backend versus Supabase backend |
| AI returns 503 | Missing provider/model/key or wrong endpoint |
| API works in dev but not preview | Development middleware is absent from static preview |
| Order API is missing locally | Vite middleware does not mount the Vercel order/patient functions |
| Voice cannot start | Secure context, microphone permission, provider config, browser media support |
| Discharge cannot finish | Read blockers, saved readiness, and doctor summary sign-off |
| Handover cannot approve | Shift end time, stale sources, per-patient review, next actions, escalation |
| Changing login has unexpected identity | `AuthGate`, query cache, membership display name, demo `workingAs` selection |

Use the browser Network panel for request/status/payload shape and console for exceptions. Inspect server logs separately for provider or database failures. Avoid copying environment secrets, patient payloads, audio, or full charts into debugging output.

## 7. Documentation maintenance

When a route, command, storage boundary, or service deployment changes, update the corresponding flow guide and architecture diagram in the same change. Keep future proposals labelled as future. A new developer should be able to trust that a box in the current diagram exists in the repository.
