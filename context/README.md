# context/ — living reference docs

These four files drive this app and are kept in sync as it evolves:

1. **PROCESS.md** — the workflow, roles, and phases.
2. **USER_STORIES.md** — Phase A: who/why + monetisation.
3. **SPECS.md** — Phase B: screens, data, integrations.
4. **ARCHITECTURE.md** — Phase C: stack, data model, build/deploy.

## How they stay current
- Fill the templates at kickoff (copy the studio root templates).
- Tick the **Approval** block at the end of each file to gate the next phase.
- **Every release (Phase D):** update the relevant file(s), commit alongside the
  code change, and tag the release in Git. Claude can do this automatically from
  the release diff + the analytics/reviews/Reddit digest.

> Rule of thumb: if a code change alters behaviour, data, or stack, the matching
> doc changes in the **same pull request**.
