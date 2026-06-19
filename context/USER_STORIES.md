# USER STORIES — Pomodoro

**Phase A of the [development process](./PROCESS.md).**
Owners: Denys + Michel, both acting as Business Analyst / Product Manager.
Source: `POMODORO_SPEC` (full design + strategy session) + Figma hero mockup (5 themes).

---

## 1. One-Line Pitch
A distraction-free focus timer for designers and makers who want a ritual, not a task manager.

---

## 2. Personas

**Primary — "Focus-First Knowledge Worker"**
- **Age:** 24–42
- **Role:** Designer, developer, writer, researcher, creative professional
- **Core need:** A timer that feels like a *tool*, not a distraction
- **Behaviour:** Uses Pomodoro as a ritual; 25 min focus + 5 min break (default)
- **Context:** Morning deep work, afternoon slump recovery, pre-meeting clarity — at a desk, never on commute or in meetings

**Secondary — "Minimalist Lifestyle User"**
- Aesthetic-conscious, Apple-ecosystem user
- Wants one app per job, not feature bloat
- Willing to pay for clean, purposeful design
- Offline-only; no account sync needed

---

## 3. User Behaviour
Opens app → keeps/picks theme → taps **Start** → works → break prompt → repeats. Every extra tap is a failure. Returns daily for the streak. Emotional state: wants calm and control, not gamified pressure.

---

## 4. Use Cases (User Stories)

| # | As a... | I want to... | So that... | MVP? |
|---|---------|--------------|------------|------|
| 1 | Knowledge worker | start a 25-min timer in one tap | I begin focusing immediately | ✅ |
| 2 | Knowledge worker | add +5 min mid-session | I finish a thought without resetting | ✅ |
| 3 | Knowledge worker | reset the timer | I can restart cleanly | ✅ |
| 4 | Minimalist user | pick a theme once at onboarding | the app matches my taste | ✅ |
| 5 | Knowledge worker | see my session progress (6 of 8) | I know where I am in the day | ✅ |
| 6 | Knowledge worker | see my streak | I stay motivated daily | ✅ |
| 7 | Knowledge worker | play an ambient sound (Rain/Lo-fi/Wind) | I block out noise | ✅ |
| 8 | Knowledge worker | get a break screen with Next/Skip | I rest between sessions | ✅ |
| 9 | Knowledge worker | see a daily summary | I review my focus time | Later (v1.1) |

---

## 5. Out of Scope (for now)
No accounts, no cloud sync, no task lists, no push notifications, no external analytics/telemetry, no session labels (v1.2). **Simplicity is the moat.**

---

## 6. Mindset Check

| Mindset | How Pomodoro honours it |
|---------|--------------------------|
| **Reuse** | Bento tiles are reusable components; 4 themes from one layout; sessions schema ready to become a master DB if Pro/cloud arrives. |
| **Agile but not agile** | Locked v1.0 scope (timer, sessions, audio, theme), built well. |
| **Simplicity & user-centric** | No reset during an active session (removes the mistake); UI teaches itself; unnecessary controls hidden. |
| **Continuous improvement** | Local stats today; Reddit-complaint agent watches r/productivity. *(External analytics is an open decision — see SPECS §6.)* |
| **Experimentation** | Free launch to learn; marketing via designer communities is the real lever. |

---

## 7. Monetisation

**Model:** Free core → optional theme packs → optional Pro (only if traction justifies).

**Tooling:** RevenueCat for IAP/subscriptions across iOS + Android; Stripe only if web/promo sales appear.

| Stage | Trigger | Offer | Price |
|-------|---------|-------|-------|
| Launch (v1.0) | — | All 4 themes + 3 ambient sounds, no ads, no tracking | Free |
| Theme packs (v1.1) | 1,000+ MAU | "Studio / Forest / Cosmic / Coffee Shop" (lifetime unlock via RevenueCat) | $1.99 each |
| Pro (v2.0) | 10,000+ MAU | Custom backgrounds, layout customisation, session labels & analytics, optional cloud sync | $0.99/mo or $9.99/yr |

**Never:** ads · watch-ad-to-unlock · auto-billing trials · upgrade pop-ups · selling user data.

---

## 8. Success Metrics (first 30 days)
500+ unique users · 20%+ DAU · avg 3 sessions/user/day (~75 min focus) · 40%+ enable ambient at least once · 5+ feature requests collected · zero crashes / data-loss bugs. If hit → v1.1 (theme packs) greenlit.

---

## Open items to populate (Phase A)
- [ ] **Approval sign-off + dates** (below) once both review.
- [ ] Confirm **secondary persona** stays in scope for v1.0 or is just guidance.
- [ ] Confirm monetisation **triggers** (1k / 10k MAU) are the gates we commit to.

## Approval
- [ ] Denys (Design/BA) — date:
- [ ] Michel (Dev/BA) — date:

*Next phase → [`SPECS.md`](./SPECS.md)*
