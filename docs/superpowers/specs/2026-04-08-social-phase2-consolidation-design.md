# Social Skills Phase 2 Consolidation — Design Spec
**Date:** 2026-04-08
**Status:** Approved

## Background

The social skills category had 23 activities, many overlapping in skill area with slight mechanic variations. Phase 1 added scenario selection to two activities and hid seasonal content. Phase 2 consolidates redundant activities into fewer, richer ones.

**Usage model:** All activities are clinician-controlled. The SLP opens the activity, shares their screen in a virtual session, and controls all navigation. Students respond verbally. UI controls should be prominent and easy to reach.

---

## Consolidation 1 — Conversation Initiation

### Result
**New file:** `activities/social/conversation-initiation.html`

### Replaces (removed from activity-index.json)
- `conversation-initiation-starters.html`
- `conversation-starter-practice.html`
- `initiate-conversations-predict-response.html`
- `social-thinking-starting-conversations.html`

### Layout
Sidebar + main panel.

**Sidebar (left):**
- Mode selector — 3 compact buttons: Quick / Guided / Multi-Exchange
- Scenario list — all scenarios from all 4 old activities combined, clickable buttons, active state reflects current selection

**Main panel — Quick mode:**
Scenario card → Conversation Starter textarea (with sentence starter chips) → Predicted Response textarea.
*Source: `conversation-initiation-starters.html` mechanic*

**Main panel — Guided mode:**
Scenario card → 3 step inputs (Greeting / Topic / Question) → "Build it" button that auto-combines into a full starter → Predicted Response textarea.
*Source: `conversation-starter-practice.html` mechanic*

**Main panel — Multi-Exchange mode:**
Scenario card → list of exchange rows (each row: "What I'll say" input + "Predicted response" input) → "Add another turn" button.
*Source: `initiate-conversations-predict-response.html` mechanic*

### Data Changes
Update `sourceFile` field on all scenarios from the 4 old activities in `data/social.js` and `data/social.json`:
- All scenarios currently pointing to any of the 4 old files → `activities/social/conversation-initiation.html`
- No scenario content changes.

---

## Consolidation 2 — Response Evaluation

### Result
**Updated file:** `activities/social/helpful-hurtful-response-judge.html` (expanded in place)

### Absorbs (removed from activity-index.json)
- `social-response-evaluator.html`

### Kept separate
- `helpful-hurtful-scenarios.html` (drag-drop) — distinct mechanic, stays as its own activity

### Layout
Sidebar + main panel (same pattern as Consolidation 1).

**Sidebar:**
- Mode selector — 2 buttons: Judge / Evaluator
- Scenario list — scenarios from both old activities combined

**Main panel — Judge mode:**
Existing mechanic unchanged. Scenario card → one response card → Helpful/Hurtful toggle → explain why textarea → hint chips.

**Main panel — Evaluator mode:**
Scenario card → 3 response cards stacked, each with Helpful/Not Helpful toggle + "Why?" textarea → optional "Revise it" textarea per response → reflection log at the end.

### Data Changes
Update `sourceFile` on all `social-response-evaluator.html` scenarios in `data/social.js` and `data/social.json` → `activities/social/helpful-hurtful-response-judge.html`.

---

## Consolidation 3 — Social Problem Solving

### Result
**Updated file:** `activities/social/social-problem-solving.html` (expanded in place)

### Absorbs (removed from activity-index.json)
- `social-problem-solving-identify-problem.html`

### Layout
Step bar at top + scenario/story selector + main panel.

**Step bar:**
Two steps always visible: **Step 1: Identify the Problem** / **Step 2: Solve It**. Clinician can click either step to jump directly. Active step highlighted. No forced sequence.

**Step 1 — Identify the Problem:**
- Data source: `problemStories`
- Story text card → "What's the main problem?" textarea → hint toggle → multiple choice reveal
- Scenario selector shows all problem stories

**Step 2 — Solve It:**
- Data source: `scenarios` (filtered by sourceFile)
- Existing mechanic unchanged: problem scenario card → Solution A (textarea + outcome) → Solution B (textarea + outcome) → comparison section + hint system
- Scenario selector shows problem-solving scenarios

**Note:** Step 1 and Step 2 use independent data sets. They are not linked — clinician uses whichever step fits the session goal. The step bar is navigation convenience only.

### Data Changes
None. Both `problemStories` and `scenarios` keys already exist in `data/social.js`.

---

## Activity Index Changes Summary

### Removed from activity-index.json
- `conversation-initiation-starters`
- `conversation-starter-practice`
- `initiate-conversations-predict-response`
- `social-thinking-starting-conversations`
- `social-response-evaluator`
- `social-problem-solving-identify-problem`

### Added to activity-index.json
- `conversation-initiation` → `activities/social/conversation-initiation.html`

### HTML files
Old files remain on disk (not deleted) but are removed from the index so they don't appear in the main nav.

---

## Out of Scope (Phase 3)
- Layout fixes for `understanding-both-perspectives.html` and `high-school-social-solution-repair.html`
- `labeling-emotions-speech-strategies.html` restructuring decision
- `live-question-response-practice.html` enhancements
