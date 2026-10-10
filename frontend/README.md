# Inside Out Emotion Classifier (frontend)

A static single-page app for the Inside Out Emotion Classifier. You write a short personal story, and five original characters (anger, disgust, fear, joy, sadness) change size according to the percentages returned by the FastAPI backend. The biggest emotion stands largest, on the left.

Built with Vite, React 19 and TypeScript. It has no backend of its own and builds to plain static files.

## Requirements

Node.js 20 or newer and npm.

## Install, run, test, build

```
cd frontend
npm install
npm run dev
```

| Command              | What it does                                        |
| -------------------- | --------------------------------------------------- |
| `npm run dev`        | Dev server with live reload (http://localhost:5173) |
| `npm test`           | Runs the unit tests once                            |
| `npm run test:watch` | Re-runs tests when files change                     |
| `npm run lint`       | ESLint                                              |
| `npm run format`     | Prettier (rewrites files)                           |
| `npm run typecheck`  | TypeScript check without building                   |
| `npm run build`      | Type-checks, then writes static files to `dist/`    |
| `npm run preview`    | Serves `dist/` locally to check the real build      |

## Configuration

Copy `.env.example` to `.env` (never commit `.env`) and edit as needed.

| Variable            | Purpose                                                        |
| ------------------- | -------------------------------------------------------------- |
| `VITE_API_BASE_URL` | Backend base URL. Defaults to the live Hugging Face Space.     |
| `VITE_USE_MOCK`     | `true` returns fake predictions and never touches the network. |
| `VITE_SITE_URL`     | Public site address, used only for social preview image URLs.  |

Vite reads these at build time, so restart the dev server or rebuild after changing them.

## Mock mode vs real mode

The backend does not allow cross-origin browser calls (CORS) yet, so real calls from a browser may fail until CORS is added. Mock mode lets you develop meanwhile.

- Environment: set `VITE_USE_MOCK=true`.
- URL (overrides the environment): `?mock=1` normal, `?mock=slow` (8 s delay, shows the cold-start message), `?mock=error` (server error state), `?mock=0` forces real calls.

The five example chips return fixed, believable results; other text gets a keyword-based estimate.

## Project layout

```
src/
  api/        API client (client.ts), mock (mock.ts), single entry point (analyzeStory.ts), error type
  components/ UI pieces. Stage.tsx is the right-hand column (status line, Cast, RankedList, About)
              characters/ holds the five SVG characters and their animations
  config/     Environment handling
  data/       Example stories (also mock data), emotion labels, user-facing messages
  hooks/      Request state machine (reducer) and the useAnalysis hook
  lib/        Pure logic, all unit tested: character counter, sizing (scaling.ts),
              stage layout and ordering (layout.ts), result summary (results.ts)
  styles/     Design tokens (CSS variables, light and dark) and base styles
  types/      Types matching the API contract
```

## Design notes

- Light theme by default; dark values are swapped in by `prefers-color-scheme` in `src/styles/tokens.css`.
- The five emotion colors are the only saturated colors. Everything else is neutral.
- Character diameter is `max(0.18, sqrt(percent / 100))`, so area is proportional to the percentage, with a floor that keeps tiny emotions visible. `layoutStage()` sorts characters largest first and turns diameters into positions; CSS transitions animate changes.
- Animations stop under `prefers-reduced-motion`.

## Deploy

Any static host works. Settings:

| Setting               | Value                                                               |
| --------------------- | ------------------------------------------------------------------- |
| Framework preset      | Vite                                                                |
| Root directory        | `frontend`                                                          |
| Build command         | `npm run build`                                                     |
| Output directory      | `dist`                                                              |
| Environment variables | `VITE_API_BASE_URL` (optional), `VITE_SITE_URL` (your deployed URL) |

Do not set `VITE_USE_MOCK=true` in production. For GitHub Pages, serve from a custom domain or set `base` in `vite.config.ts` to your repo path.

Before it works live, the backend must send CORS headers allowing the deployed site's origin.
