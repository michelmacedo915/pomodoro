# ARCHITECTURE — Pomodoro

**Phase C of the [development process](./PROCESS.md).**
Owner: Michel (builds) · Denys (QA mockups vs build).
Inputs: approved [`USER_STORIES.md`](./USER_STORIES.md) + [`SPECS.md`](./SPECS.md).

> **Platform note:** the original `POMODORO_SPEC` proposed a web-first React + Vite PWA. To follow the studio process we are building **native via Expo / React Native** (one codebase → iOS + Android) using the standard stack below. The design tokens, data shape, and core logic carry over unchanged.

---

## 1. Stack as used by Pomodoro

| Layer | Tool | Pomodoro usage |
|-------|------|----------------|
| Navigation | **Expo Router** | `app/` routes: hero (`index`), `(onboarding)`, later session/break screens |
| Styling | **Nativewind** | theme tokens → CSS vars (`global.css`) + Tailwind colours (`tailwind.config.js`) |
| Animations | **Reanimated** | progress ring, tile transitions |
| Gestures | **Gesture Handler** | swipe-down to pause |
| Local state | `useState` + props | timer seconds, transient UI |
| Global state | **Zustand** | `stores/useAppStore.js` — theme, durations, sessions, streak, ambient |
| Server cache | **TanStack Query** | not used in v1 (no backend); kept for future cloud sync |
| Forms | **React Hook Form + Zod** | settings form → `schemas/settings.schema.js` |
| Analytics | **Vexo** | ⚠️ pending the "no tracking" decision (SPECS §6) |
| Crash reporting | **Sentry** | recommended, no PII |
| Monetisation | **RevenueCat** | theme packs (v1.1), Pro (v2.0) |
| Backend | **none in v1** | on-device only; API Routes/EAS Hosting + Supabase only if cloud sync ships |
| Build/deploy | **EAS** + **EAS Update** | preview → production; OTA for JS-only fixes |

### Decision rules applied
- All Pomodoro state is **local** — `useState` for the live countdown, **Zustand** for cross-screen (theme/sessions/streak). No server data, so TanStack Query stays idle in v1.
- **Backend = none.** Storage is on-device (MMKV/AsyncStorage). This is the simplest viable path and matches the "offline-only" persona.
- **Updates:** theme/logic tweaks ship via **EAS Update**; new native modules (e.g. adding audio) need a full **EAS Build**.

---

## 2. System Diagram

```
┌──────────── Pomodoro (Expo / React Native) ────────────┐
│ Expo Router                                            │
│   app/index.js .............. Hero / bento grid        │
│   app/(onboarding)/ ......... theme picker             │
│   app/api/health+api.js ..... sample endpoint (unused) │
│                                                        │
│ Nativewind  ── theme/themes.js → CSS vars (4 themes)   │
│ Reanimated + Gesture Handler ── ring + swipe-to-pause  │
│ Zustand (useAppStore) ── theme · sessions · streak     │
│ hooks/useTimer · useSession ── countdown + persistence │
│ lib/  sentry · vexo(⚠) · revenuecat                    │
│ on-device storage (MMKV/AsyncStorage) — TODO           │
└────────────────────────────────────────────────────────┘
        no server in v1 · cloud sync deferred to v2.0
```

---

## 3. Data Model
On-device only. Shape defined in [`SPECS.md §4`](./SPECS.md) and implemented in `stores/useAppStore.js` (`preferences`, `sessions[]`, `streak`). When Pro/cloud sync arrives, these become Supabase tables `users`, `sessions`, `preferences` — same shape, now queryable for analytics (the "master database" mindset).

---

## 4. Folder Structure (actual)

```
pomodoro/
├── context/              PROCESS · USER_STORIES · SPECS · ARCHITECTURE (+ README)
├── app/
│   ├── _layout.js        providers (Query, Gesture, Keyboard, SafeArea, Sentry, Vexo, RevenueCat)
│   ├── index.js          Hero / dashboard
│   ├── (onboarding)/     welcome + theme picker
│   └── api/health+api.js sample API route (unused in v1)
├── components/
│   ├── tiles/            TimerTile · ActionTile · ProgressTile · StreakTile · AmbientTile
│   └── ui/               Button · Tile · Ring
├── hooks/                useTimer · useSession
├── stores/               useAppStore (Zustand)
├── lib/                  applyTheme · sentry · vexo · revenuecat · supabase · stream · queryClient
├── schemas/              settings.schema.js (Zod)
├── theme/                tokens.js · themes.js (4 themes)
├── utils/                time.js  (+ TODO streak.js)
├── assets/audio/         3 ambient loops — TODO
├── app.json · app.config.js · eas.json
└── babel · metro · tailwind config · global.css
```

---

## 5. Theming
Each theme is a set of RGB-triple tokens in `theme/themes.js`. `lib/applyTheme.js` maps the selected theme to the CSS variables via Nativewind `vars()` — apply at a root `<View>` so all `bg-timer`, `text-streakText`, etc. update at once. One layout, four looks; a new client/theme = one more entry.

---

## 6. Prototyping with Replit
The hero screen was designed in Figma (mockup: 5 theme variants) and can be prototyped in Replit, then reconciled into this Expo tree and pushed to GitHub. From there: GitHub + EAS only.

---

## 7. Build & Deploy
`eas.json` defines `development` / `preview` / `production`. Path: `eas build --profile preview` → TestFlight + Play internal → QA (Denys + Michel) → `eas build --profile production` + `eas submit`. Post-launch JS fixes via `eas update`.

---

## 8. Environments & Secrets
v1 needs almost none (no backend). Set as EAS secrets / `.env` (see `.env.example`): `SENTRY_DSN`, `VEXO_API_KEY` (if analytics kept), `REVENUECAT_KEY_IOS/_ANDROID` (from v1.1). No Supabase/Stream keys in v1.

---

## Open items to populate (Phase C)
- [ ] **Persistence wrapper** `lib/storage.js` (MMKV/AsyncStorage) + wire into `useAppStore`.
- [ ] **`utils/streak.js`** — port streak recalculation from spec §7.
- [ ] **`useAudio`** + 3 ambient loops in `assets/audio/`.
- [ ] **Session-in-progress** + **Break** screens (routes not yet created).
- [ ] **icon.png / splash.png** in `assets/`.
- [ ] Resolve analytics decision (carries from SPECS §6).
- [ ] Approval sign-off below.

## Approval
- [ ] Denys (Design/BA) — date:
- [ ] Michel (Dev) — date:

*Next phase → Production & Continuous Improvement (see [`PROCESS.md`](./PROCESS.md)).*

---

*Last updated: 2026-06-17*
