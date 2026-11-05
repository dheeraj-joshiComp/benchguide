# Reward funnel strategy

Goal: more people finish a valid trace (25,000+ action tokens, English, real multi-app task) and fewer bounce in the first minute.

## 1. Hook (first screen, under 15 words)
- Headline: "Earn up to ₹700 for one real task with AI".
- Three-step reward ladder: small wins (+₹50 per app) → big reward (₹500) → streak (+₹500 at 10 tasks).
- One primary button: **Start the quest**. Detail moves below the fold.

## 2. Reward ladder
| Reward | Condition | Why |
|---|---|---|
| ₹500 base | Approved task, 25,000+ action tokens | The core trace we need |
| +₹50 per bonus app | App connected **and** actually used by the AI in the same approved chat | Pushes multi-app traces (Gmail, Sheets, Docs, Notion, Slack, Calendar, Instant Tools) |
| App bonus cap ₹200 | Max 4 apps paid per task | Keeps cost bounded at ₹700/task |
| +₹500 streak | 10 approved tasks | Turns one-off users into repeat contributors |

Rules that stop gaming:
- No app bonus on rejected tasks. Under 25k tokens pays nothing.
- "Used" means the trace shows real tool calls to that app for the task. Connecting alone earns nothing.
- Padding or filler calls to unlock bonuses gets the whole task rejected.

All numbers live in `REWARDS` in `src/content.js`.

## 3. Funnel and where people drop
| Stage | Hook on the site | Metric to watch |
|---|---|---|
| Land | Ladder + "up to ₹700" | Click on Start the quest |
| Sign up | Level 1 button to BenchChat | Level 1 ticked |
| Connect apps | Clickable app chips raise the live payout total | Apps ticked per visitor |
| Task | Ready prompts to copy | Level 3 ticked |
| 25k tokens | Token tips, "keep refining" | Level 4 ticked |
| Submit | Form link only after completion | Form submissions, approval rate |

Progress is saved per browser (localStorage) only; it is never used for payment. Add Vercel Analytics custom events per level tick to measure drop-off.

## 4. Operations needed outside this repo
- **Submission form:** add a checkbox question "Which apps did the AI use?" so reviewers can verify app bonuses.
- **Validation:** extend the trace check (Jayesh's skill) to list apps with real tool calls and compute the bonus.
- **Budget sign-off:** confirm ₹50/app and the ₹200 cap before publishing.
