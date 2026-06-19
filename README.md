# Pomodoro

Pomodoro — a distraction-free focus timer. Expo (React Native) app built from the studio process. Source files are
**placeholder** — replace the screens, logic, and theme as you fill in the docs.

## Quick start
```bash
npm install
npx expo install --fix     # pin deps to the installed Expo SDK
cp .env.example .env       # then fill in keys
npx expo start
```

## Where things live
| Folder | What |
|--------|------|
| `context/` | The four living reference docs (see below) |
| `app/` | Expo Router screens + API routes |
| `components/ui`, `components/<feature>` | Reusable components |
| `hooks/` | Data + logic hooks (TanStack Query) |
| `stores/` | Zustand global state |
| `lib/` | Service clients: Supabase, Sentry, Vexo, RevenueCat, Stream, Query |
| `schemas/` | Zod schemas (forms + API) |
| `theme/` | Tokens + per-theme colours (Nativewind) |

## Build & deploy
`eas build --profile preview` → test · `eas build --profile production` + `eas submit` → stores ·
`eas update` → OTA hot-fix (no resubmission). Config in `eas.json`.

## The `context/` folder
`PROCESS.md`, `USER_STORIES.md`, `SPECS.md`, `ARCHITECTURE.md` are the source of truth
for this app. They are **read** when building and **updated as the process goes**
(every release — see `context/README.md`). Keep them in the repo so Claude, Replit,
and both teammates always work from the same brief.
