# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install
npx expo install --fix   # pin all deps to compatible Expo SDK versions (run after install)
cp .env.example .env     # fill in keys before starting

npx expo start           # dev server (opens Expo Go / simulator picker)
npx expo start --ios     # iOS simulator directly
npx expo start --android # Android emulator directly
expo lint                # ESLint via Expo's config

# Builds & deploy (requires EAS CLI + login)
eas build --profile preview     # TestFlight + Play internal testing
eas build --profile production  # production stores
eas submit                      # submit to App Store / Play Store
eas update                      # OTA JS-only update (no resubmission)
```

## Architecture

**Expo Router** drives navigation. `app/_layout.js` is the root — it mounts all providers once (GestureHandlerRootView → SafeAreaProvider → KeyboardProvider → QueryClientProvider) and calls `initSentry()` / `initAnalytics()` / `initPurchases()` at startup. Routes: `app/index.js` (Hero/Dashboard), `app/(onboarding)/` (theme picker), `app/api/health+api.js` (unused sample).

**State split:**
- `useState` — live countdown seconds and transient UI.
- `stores/useAppStore.js` (Zustand) — cross-screen globals: `theme`, `sessionDuration`, `breakDuration`, `ambientTrack`, `onboarded`, `sessions[]`, `streak`. Persistence via `lib/storage.js` is **not yet wired** (TODO before launch).
- TanStack Query (`lib/queryClient.js`) — scaffolded for future cloud sync; idle in v1.

**Theming (Nativewind):** `theme/themes.js` defines four dark themes (`midnight`, `energy`, `sunset`, `break`) as RGB-triple token objects. `lib/applyTheme.js` calls Nativewind `vars()` to map tokens to CSS variables declared in `global.css`. Apply the returned style object to a root `<View>`. In components, use Tailwind classes like `bg-shell`, `text-timerText`, `bg-timer`, etc.

**Core hooks:**
- `hooks/useTimer.js` — `useTimer(duration, onComplete)` returns `{ secondsLeft, isRunning, start, pause, reset, addTime }`. Uses `setInterval`; clears itself on completion.
- `hooks/useSession.js` — `useSession().saveSession(duration, completed)` — persists a session to Zustand.

**Components:** `components/tiles/` contains the five bento tiles (TimerTile, ActionTile, ProgressTile, StreakTile, AmbientTile). `components/ui/` has primitives (Button, Tile, Ring).

**Services (`lib/`):** `sentry.js`, `vexo.js` (analytics — pending decision), `revenuecat.js`, `supabase.js` (v2 only), `stream.js` (not used), `queryClient.js`.

**Env vars** are exposed via `app.config.js` as `Constants.expoConfig.extra.*`. All env var names use the `EXPO_PUBLIC_` prefix so they are available client-side.

## Context docs (`context/`)

The four Markdown files are the **source of truth** for product decisions — read them before making architectural or UX choices. Update them as the app evolves.

| File | Phase | Contents |
|------|-------|----------|
| `USER_STORIES.md` | A | Personas, use cases, monetisation |
| `SPECS.md` | B | Screens, UX rules, design tokens, data model, roadmap |
| `ARCHITECTURE.md` | C | Stack decisions, system diagram, folder map |
| `PROCESS.md` | — | Two-person team workflow (Michel + Denys) |

## Key open TODOs (Phase C)

- `lib/storage.js` — MMKV or AsyncStorage persistence wrapper; wire into `useAppStore`.
- `utils/streak.js` — streak recalculation logic (spec §7).
- `useAudio` hook + 3 ambient audio loops in `assets/audio/` (`expo-audio`).
- Session-in-progress screen and Break screen (routes not yet created).
- `assets/icon.png` / `assets/splash.png`.
- Analytics decision: resolve "no tracking" policy vs. keeping Vexo (`SPECS.md §6`).
