# SPECS — Pomodoro

**Phase B of the [development process](./PROCESS.md).**
Owners: Denys (design + Figma) + Michel (technical).
Input: approved [`USER_STORIES.md`](./USER_STORIES.md). Source: `POMODORO_SPEC` + hero mockup.

---

## 1. Screens

| # | Screen | Purpose | MVP? |
|---|--------|---------|------|
| 0 | Onboarding | 1 screen, ~30s: welcome + theme pick (live preview), lands on hero | ✅ |
| 1 | Hero / Dashboard | Bento grid: Timer (25:00 + Start), +5, Reset, Progress (8 dots), Streak, Ambient | ✅ |
| 2 | Session In Progress | Fullscreen timer, animated ring, single Pause, "Session 4 of 8", swipe-down to pause | ✅ |
| 3 | Break | Softer palette (greens/blues), 5:00 countdown, "Next Focus" / "Skip Break" | ✅ |
| 4 | Daily Summary | Week calendar, "Total focus today", longest streak | Later (v1.1) |

---

## 2. UX Rules & Layout

- **Figma link:** ⚠️ TODO — only a hero screenshot was provided; paste the Figma file URL here.
- **Grid / spacing:** 8px grid throughout.
- **Font:** Inter (Bold / Extra Bold / Medium only). Timer number 96px Extra Bold; tile labels 9px Bold uppercase at 0.5 opacity; body 12–14px Medium.
- **Key sizes:** Start button 104×48; action tiles 181×176; ambient chips 48×48.
- **Radii:** tiles 24px, phone shell 52px, chips 14px.
- **Gestures:** swipe-down to pause during a session.
- **Hidden by default (reduce error):** no Reset button during an active session; no tutorial (UI teaches itself).
- **Design rules:** hero tile = brand colour full saturation; action tiles = high-contrast accents; streak mirrors hero (diagonal rhythm); progress + ambient = lifted dark tone; flat fills, **no gradients**.

---

## 3. Design Tokens & Themes
4 themes, same bento layout, only colour values swap — all WCAG AA verified, flat fills, 8px grid. Full token sets live in code at [`theme/themes.js`](../theme/themes.js) and the CSS variables in [`global.css`](../global.css).

| Theme | Mood | Shell | Hero (timer) | Accent |
|-------|------|-------|--------------|--------|
| **Midnight** | Late-night deep work | `#0F1729` | `#1C50D8` | `#FF9500` |
| **Energy** | High-contrast sprint | `#0A0A0A` | `#FFD700` | `#FF3B30` |
| **Sunset** | Reflective wind-down | `#1A0E0E` | `#FF6B35` | `#C73E1D` |
| **Break** | Calm rest mode | `#0A1F1A` | `#52B788` | `#5DADE2` |

> The "Home" (light) frame in the mockup is the design reference; the four shipped themes are the dark variants above.

---

## 4. Data

**Inputs (user → app):** session duration (default 25 min), break duration (default 5 min), theme (one-time at onboarding), ambient preference (Rain / Lo-fi / Wind / None).

**Stored — on-device only** (no accounts, no cloud, no telemetry). State shape:

```jsonc
{
  "preferences": { "theme": "midnight", "sessionDuration": 1500, "breakDuration": 300,
                   "ambientTrack": "lofi", "ambientEnabled": true, "audioOnSessionEnd": true },
  "sessions": [ { "id": "uuid", "startedAt": "ISO", "completedAt": "ISO",
                  "duration": 1500, "completed": true, "label": null } ],
  "streak": { "current": 7, "longest": 12, "lastSessionDate": "2026-05-18" }
}
```

**Persistence:** ⚠️ TODO — spec assumed LocalStorage (web). On Expo/native, use **MMKV** (or AsyncStorage) wrapper in `lib/storage.js`. Export to JSON deferred to v1.1.

---

## 5. Core Logic
- `useTimer(duration, onComplete)` — countdown ([`hooks/useTimer.js`](../hooks/useTimer.js)).
- `useSession().saveSession()` — persist a completed session ([`hooks/useSession.js`](../hooks/useSession.js)).
- `recalculateStreak(sessions)` — ⚠️ TODO, port from spec §7 into `utils/streak.js`.
- `useAudio(track)` — loop ambient (rain/lofi/wind) — ⚠️ TODO, `expo-audio`.

---

## 6. Integrations

| Concern | Tool | Needed? | Notes |
|---------|------|---------|-------|
| Analytics | Vexo | ⚠️ **DECISION** | Spec says "no tracking, ever". Process/architecture default to Vexo. Resolve: keep privacy-first (no analytics) **or** anonymous local-only events. |
| Crash reporting | Sentry | ⚠️ **DECISION** | Crash-only reporting is arguably compatible with "no tracking". Recommend keeping Sentry, no PII. |
| Chat / video | Stream | ❌ | No messaging in Pomodoro. |
| Monetisation | RevenueCat (+Stripe) | ✅ (v1.1) | Theme packs / Pro. Free under US$2.5k MTR. |
| Backend | Supabase | ❌ (v1) | On-device only; revisit if cloud sync ships in v2.0. |

---

## 7. Permissions
**None.** No camera, location, microphone, or notifications in v1.0 → smooth store review.

---

## 8. Build Roadmap
- [ ] 1 — Scaffold + 4 theme tokens + timer hook + storage wrapper
- [ ] 2 — Theming + onboarding theme picker (apply via `data-theme`/vars)
- [ ] 3 — Sessions + progress dots + streak
- [ ] 4 — Session-in-progress + break screens + nav state machine
- [ ] 5 — Ambient audio (source 3 loops, play/pause/resume)
- [ ] 6 — Polish: safe areas, haptics, accessibility (WCAG AA), lazy-load audio
- [ ] 7 — Beta (20–30 testers) → public launch

---

## 9. Risks & Mitigation

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| Pomodoro market oversaturation | High | Differentiate via ambient + minimalism; target designers, not generic productivity. |
| Users demand cloud sync | Medium | Don't add in v1; defer to v2.0. Simplicity is the moat. |
| Audio bundle bloat | Low | Compress MP3s, lazy-load on first ambient toggle. |
| Scope creep in v1.0 | Medium | Lock scope: timer, sessions, audio, theme only. |

---

## Open items to populate (Phase B)
- [ ] **Figma file URL** (§2) — only a screenshot exists.
- [ ] **Analytics decision** (§6) — reconcile "no tracking" vs Vexo/Sentry.
- [ ] **Persistence choice** (§4) — confirm MMKV vs AsyncStorage.
- [ ] **Ambient audio assets** — source 3 seamless loops (Freesound/Pixabay) → `assets/audio/`.
- [ ] Approval sign-off below.

## Approval
- [ ] Denys (Design/BA) — date:
- [ ] Michel (Dev/BA) — date:

*Next phase → [`ARCHITECTURE.md`](./ARCHITECTURE.md)*
