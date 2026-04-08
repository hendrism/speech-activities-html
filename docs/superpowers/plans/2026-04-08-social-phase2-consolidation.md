# Social Skills Phase 2 Consolidation — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Consolidate 6 redundant social skill activities into 3 improved ones by merging mechanics, adding mode selectors, and retiring stale entries from the activity index.

**Architecture:** Three independent consolidations — (1) new `conversation-initiation.html` replacing 4 old files, (2) `helpful-hurtful-response-judge.html` gains an Evaluator mode absorbing `social-response-evaluator.html`, (3) `social-problem-solving.html` gains a Step 1 panel absorbing `social-problem-solving-identify-problem.html`. Data layer updated via sed. Old files stay on disk but are removed from the index.

**Tech Stack:** Vanilla HTML/CSS/JS, DataLoader.filter/get from `data/social.js`, static file site.

---

## Data Schemas (reference)

**conversation-initiation-starters scenarios:** `id, sourceFile, title, text, starters[], level, tags`
**conversation-starter-practice scenarios:** `id, sourceFile, title, text, hints{solution1,solution2}, level, tags`
**initiate-conversations-predict-response scenarios:** `id, sourceFile, name, description, difficulty, level, tags` ← uses `name`/`description` not `title`/`text`
**social-thinking-starting-conversations scenarios:** `id, sourceFile, title, text, hint, mc[], level, tags`
**social-response-evaluator scenarios:** `id, sourceFile, title, tag, conflict, responses[]{text}, level, tags`
**helpful-hurtful-response-judge scenarios:** `id, sourceFile, title, scenario, response, level, tags`
**problemStories:** `id, title, text, hint, choices[]{text, correct}`

---

## Task 1: Update data layer — conversation initiation sourceFiles

**Files:**
- Modify: `data/social.js`
- Modify: `data/social.json`

- [ ] **Step 1: Replace all 4 old sourceFile values in social.js**

```bash
cd /Users/Sean-Work/Desktop/speech-activities-html
sed -i '' 's|activities/social/conversation-initiation-starters.html|activities/social/conversation-initiation.html|g' data/social.js
sed -i '' 's|activities/social/conversation-starter-practice.html|activities/social/conversation-initiation.html|g' data/social.js
sed -i '' 's|activities/social/initiate-conversations-predict-response.html|activities/social/conversation-initiation.html|g' data/social.js
sed -i '' 's|activities/social/social-thinking-starting-conversations.html|activities/social/conversation-initiation.html|g' data/social.js
```

- [ ] **Step 2: Same replacements in social.json**

```bash
sed -i '' 's|activities/social/conversation-initiation-starters.html|activities/social/conversation-initiation.html|g' data/social.json
sed -i '' 's|activities/social/conversation-starter-practice.html|activities/social/conversation-initiation.html|g' data/social.json
sed -i '' 's|activities/social/initiate-conversations-predict-response.html|activities/social/conversation-initiation.html|g' data/social.json
sed -i '' 's|activities/social/social-thinking-starting-conversations.html|activities/social/conversation-initiation.html|g' data/social.json
```

- [ ] **Step 3: Verify — should show 0 old references, nonzero new ones**

```bash
grep -c "conversation-initiation-starters\|conversation-starter-practice\|initiate-conversations-predict-response\|social-thinking-starting-conversations" data/social.js
# Expected: 0
grep -c "activities/social/conversation-initiation.html" data/social.js
# Expected: > 0 (however many scenarios existed across the 4 old files)
```

- [ ] **Step 4: Commit**

```bash
git add data/social.js data/social.json
git commit -m "$(cat <<'EOF'
data: reroute conversation initiation scenarios to merged activity

Updates sourceFile for all 4 conversation initiation groups to point
to the new conversation-initiation.html file.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: Create activities/social/conversation-initiation.html

**Files:**
- Create: `activities/social/conversation-initiation.html`

- [ ] **Step 1: Create the file**

Write the following complete file to `activities/social/conversation-initiation.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Conversation Initiation Practice</title>
    <script src="../../data/social.js"></script>
    <script src="../../js/data-loader.js"></script>
    <style>
        :root {
            --accent: #7c3aed;
            --accent-light: #ede9fe;
            --bg: #f5f4fb;
            --card: #ffffff;
            --ink: #0f172a;
            --muted: #64748b;
            --border: #e2e8f0;
        }
        * { box-sizing: border-box; }
        body { margin: 0; font-family: "Segoe UI", system-ui, sans-serif; background: var(--bg); color: var(--ink); line-height: 1.6; }

        header { background: var(--card); border-bottom: 4px solid var(--accent); position: sticky; top: 0; z-index: 10; box-shadow: 0 2px 8px rgba(0,0,0,.08); }
        .bar { max-width: 1200px; margin: 0 auto; padding: 18px 24px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
        .bar h1 { margin: 0; font-size: 22px; color: var(--accent); }
        .tags { display: flex; gap: 8px; }
        .tag { background: var(--accent-light); color: var(--accent); padding: 5px 12px; border-radius: 999px; font-size: 14px; font-weight: 600; }

        .layout { max-width: 1200px; margin: 0 auto; padding: 0 24px 48px; display: flex; gap: 24px; align-items: flex-start; }

        .sidebar { width: 220px; flex-shrink: 0; position: sticky; top: 74px; display: flex; flex-direction: column; gap: 20px; padding-top: 28px; }
        .section-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; color: var(--muted); margin-bottom: 8px; }

        .mode-btns { display: flex; flex-direction: column; gap: 6px; }
        .mode-btn { width: 100%; text-align: left; background: #f1f5f9; color: var(--muted); border: 2px solid var(--border); border-radius: 10px; padding: 10px 14px; font-size: 14px; font-weight: 600; cursor: pointer; transition: all .15s; }
        .mode-btn.active { background: var(--accent-light); color: var(--accent); border-color: var(--accent); }
        .mode-btn:hover:not(.active) { border-color: #c4b5fd; }

        .scenario-list { display: flex; flex-direction: column; gap: 5px; max-height: 58vh; overflow-y: auto; }
        .scenario-btn { width: 100%; text-align: left; background: #f8fafc; color: var(--muted); border: 1px solid var(--border); border-radius: 8px; padding: 8px 12px; font-size: 13px; cursor: pointer; transition: all .15s; }
        .scenario-btn.active { background: var(--accent-light); color: var(--accent); border-color: var(--accent); font-weight: 600; }
        .scenario-btn:hover:not(.active) { border-color: #c4b5fd; color: var(--ink); }

        .main-panel { flex: 1; min-width: 0; padding-top: 28px; display: flex; flex-direction: column; gap: 18px; }

        .scenario-card { background: var(--accent-light); border-radius: 16px; padding: 22px; border: 1px solid #ddd6fe; }
        .scenario-card .s-title { font-weight: 700; font-size: 16px; color: var(--accent); margin-bottom: 8px; }
        .scenario-card .s-text { font-size: 16px; line-height: 1.7; color: var(--ink); margin: 0; }

        .panel-card { background: var(--card); border-radius: 16px; padding: 22px; border: 2px solid var(--border); display: flex; flex-direction: column; gap: 16px; }
        .panel-label { font-size: 12px; font-weight: 700; color: var(--muted); text-transform: uppercase; letter-spacing: .04em; margin-bottom: 4px; }

        textarea { width: 100%; min-height: 90px; border-radius: 10px; border: 2px solid var(--border); padding: 12px; font-family: inherit; font-size: 15px; resize: vertical; transition: border-color .15s; }
        textarea:focus { border-color: var(--accent); outline: none; box-shadow: 0 0 0 3px rgba(124,58,237,.15); }

        .chips-row { display: flex; flex-wrap: wrap; gap: 8px; }
        .chip { background: #f1f5f9; color: var(--ink); border: 1px solid var(--border); border-radius: 999px; padding: 6px 13px; font-size: 13px; cursor: pointer; transition: all .15s; }
        .chip:hover { background: var(--accent-light); border-color: #c4b5fd; color: var(--accent); }

        .step-inputs { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; }
        .combined-box { background: #f0fdf4; border: 2px solid #bbf7d0; border-radius: 10px; padding: 14px; font-size: 15px; line-height: 1.6; color: #166534; }

        .btn-row { display: flex; flex-wrap: wrap; gap: 10px; }
        .btn-primary { background: var(--accent); color: white; border: none; border-radius: 10px; padding: 11px 20px; font-size: 15px; font-weight: 600; cursor: pointer; transition: opacity .15s; }
        .btn-primary:hover { opacity: .88; }
        .btn-secondary { background: var(--accent-light); color: var(--accent); border: 2px solid #c4b5fd; border-radius: 10px; padding: 9px 18px; font-size: 14px; font-weight: 600; cursor: pointer; }

        .exchange-row { display: flex; gap: 12px; align-items: flex-start; }
        .exchange-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; flex: 1; }
        .remove-btn { flex-shrink: 0; background: #fee2e2; color: #dc2626; border: none; border-radius: 8px; padding: 8px 12px; font-size: 14px; font-weight: 700; cursor: pointer; margin-top: 22px; }
        .remove-btn:hover { background: #fecaca; }

        @media (max-width: 820px) {
            .layout { flex-direction: column; }
            .sidebar { width: 100%; position: static; }
            .step-inputs { grid-template-columns: 1fr; }
            .exchange-cols { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body class="category-social">
    <header>
        <div class="bar">
            <h1>Conversation Initiation Practice</h1>
            <div class="tags">
                <span class="tag">social skills</span>
                <span class="tag">conversation</span>
            </div>
        </div>
    </header>
    <div class="layout">
        <aside class="sidebar">
            <div>
                <div class="section-label">Mode</div>
                <div class="mode-btns" id="modeBtns">
                    <button class="mode-btn active" data-mode="quick">⚡ Quick</button>
                    <button class="mode-btn" data-mode="guided">🧱 Guided</button>
                    <button class="mode-btn" data-mode="multi">💬 Multi-Exchange</button>
                </div>
            </div>
            <div>
                <div class="section-label">Scenarios</div>
                <div class="scenario-list" id="scenarioList"></div>
            </div>
        </aside>
        <main class="main-panel" id="mainPanel"></main>
    </div>
    <script>
        var scenarios = DataLoader.filter('social', 'scenarios', function(s) {
            return s.sourceFile === 'activities/social/conversation-initiation.html';
        });
        var globalStarters = DataLoader.get('social', 'conversationStarters') || [];

        var currentMode = 'quick';
        var currentIndex = 0;

        function sTitle(s) { return s.title || s.name || ''; }
        function sText(s) { return s.text || s.description || ''; }

        function renderSidebar() {
            document.querySelectorAll('.mode-btn').forEach(function(btn) {
                btn.classList.toggle('active', btn.dataset.mode === currentMode);
            });
            var list = document.getElementById('scenarioList');
            list.innerHTML = '';
            scenarios.forEach(function(s, i) {
                var btn = document.createElement('button');
                btn.className = 'scenario-btn' + (i === currentIndex ? ' active' : '');
                btn.textContent = sTitle(s);
                btn.addEventListener('click', function() { currentIndex = i; renderAll(); });
                list.appendChild(btn);
            });
        }

        function renderMain() {
            var s = scenarios[currentIndex];
            var panel = document.getElementById('mainPanel');
            var scenarioHtml = '<div class="scenario-card">'
                + '<div class="s-title">' + sTitle(s) + '</div>'
                + '<p class="s-text">' + sText(s) + '</p>'
                + '</div>';
            if (currentMode === 'quick') panel.innerHTML = scenarioHtml + quickHtml(s);
            else if (currentMode === 'guided') panel.innerHTML = scenarioHtml + guidedHtml();
            else panel.innerHTML = scenarioHtml + multiHtml();
            bindEvents();
        }

        function quickHtml(s) {
            var chips = (s.starters && s.starters.length) ? s.starters : globalStarters;
            var chipHtml = chips.map(function(c) {
                return '<button class="chip">' + c + '</button>';
            }).join('');
            return '<div class="panel-card">'
                + '<div><div class="panel-label">Starter chips</div>'
                + '<div class="chips-row">' + chipHtml + '</div></div>'
                + '<div><div class="panel-label">Conversation Starter</div>'
                + '<textarea id="starterInput" placeholder="Write a conversation starter..."></textarea></div>'
                + '<div><div class="panel-label">Predicted Response</div>'
                + '<textarea placeholder="How might they respond?"></textarea></div>'
                + '</div>';
        }

        function guidedHtml() {
            return '<div class="panel-card">'
                + '<div class="step-inputs">'
                + '<div><div class="panel-label">Step 1 — Greeting</div>'
                + '<textarea id="greetInput" placeholder="e.g. Hey, Hi, Excuse me..."></textarea></div>'
                + '<div><div class="panel-label">Step 2 — Topic</div>'
                + '<textarea id="topicInput" placeholder="What do you bring up?"></textarea></div>'
                + '<div><div class="panel-label">Step 3 — Question</div>'
                + '<textarea id="questionInput" placeholder="What question keeps it going?"></textarea></div>'
                + '</div>'
                + '<div class="btn-row"><button class="btn-primary" id="buildBtn">Build it →</button></div>'
                + '<div id="combinedSection" style="display:none">'
                + '<div class="panel-label">Combined starter</div>'
                + '<div class="combined-box" id="combinedBox"></div></div>'
                + '<div><div class="panel-label">Predicted Response</div>'
                + '<textarea placeholder="How might they respond?"></textarea></div>'
                + '</div>';
        }

        function multiHtml() {
            return '<div class="panel-card">'
                + '<div id="exchangeList">' + exchangeRowHtml('Your opening...', 'How they might reply...', false) + '</div>'
                + '<div class="btn-row">'
                + '<button class="btn-secondary" id="addTurnBtn">+ Add another turn</button></div>'
                + '</div>';
        }

        function exchangeRowHtml(p1, p2, removable) {
            var removeBtn = removable
                ? '<button class="remove-btn" onclick="this.closest(\'.exchange-row\').remove()">✕</button>'
                : '';
            return '<div class="exchange-row">'
                + '<div class="exchange-cols">'
                + '<div><div class="panel-label">What I\'ll say</div>'
                + '<textarea placeholder="' + p1 + '"></textarea></div>'
                + '<div><div class="panel-label">Predicted response</div>'
                + '<textarea placeholder="' + p2 + '"></textarea></div>'
                + '</div>' + removeBtn + '</div>';
        }

        function bindEvents() {
            document.querySelectorAll('.chip').forEach(function(chip) {
                chip.addEventListener('click', function() {
                    var ta = document.getElementById('starterInput');
                    if (ta) { ta.value += (ta.value ? ' ' : '') + chip.textContent; ta.focus(); }
                });
            });
            var buildBtn = document.getElementById('buildBtn');
            if (buildBtn) {
                buildBtn.addEventListener('click', function() {
                    var g = document.getElementById('greetInput').value.trim();
                    var t = document.getElementById('topicInput').value.trim();
                    var q = document.getElementById('questionInput').value.trim();
                    var parts = [g, t, q].filter(Boolean);
                    if (parts.length) {
                        document.getElementById('combinedBox').textContent = parts.join(' ');
                        document.getElementById('combinedSection').style.display = 'block';
                    }
                });
            }
            var addBtn = document.getElementById('addTurnBtn');
            if (addBtn) {
                addBtn.addEventListener('click', function() {
                    var wrap = document.createElement('div');
                    wrap.innerHTML = exchangeRowHtml('Your next turn...', 'Their reply...', true);
                    document.getElementById('exchangeList').appendChild(wrap.firstChild);
                });
            }
        }

        function renderAll() { renderSidebar(); renderMain(); }

        document.getElementById('modeBtns').addEventListener('click', function(e) {
            var btn = e.target.closest('.mode-btn');
            if (!btn) return;
            currentMode = btn.dataset.mode;
            renderAll();
        });

        renderAll();
    </script>
</body>
</html>
```

- [ ] **Step 2: Open in browser and verify**

Open `http://localhost:8080/activities/social/conversation-initiation.html`

Check:
- Sidebar shows all scenarios (should be all scenarios from the 4 old activities combined)
- Quick mode: chips appear, starter + predicted response textareas render
- Guided mode: 3 step inputs, "Build it" button combines them
- Multi-Exchange mode: one exchange row, "Add another turn" appends new rows
- Clicking any scenario in the sidebar loads it and highlights the active button
- Switching mode preserves the current scenario

- [ ] **Step 3: Commit**

```bash
git add activities/social/conversation-initiation.html
git commit -m "$(cat <<'EOF'
feat: add merged conversation-initiation activity

Combines Quick (starter + chips), Guided (step builder), and
Multi-Exchange modes in a sidebar layout. Replaces 4 old activities.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: Update activity-index.json — conversation initiation

**Files:**
- Modify: `data/activity-index.json`

- [ ] **Step 1: Remove 4 old entries and add new one**

In `data/activity-index.json`, remove the 4 entries with ids:
- `conversation-initiation-starters`
- `conversation-starter-practice`
- `initiate-conversations-predict-response`
- `social-thinking-starting-conversations`

Add this new entry in the social section (after `communication-breakdown-practice`):

```json
{
  "id": "conversation-initiation",
  "category": "social",
  "title": "Conversation Initiation Practice",
  "sourceFile": "activities/social/conversation-initiation.html",
  "type": "content-driven"
},
```

- [ ] **Step 2: Verify JSON is valid**

```bash
node -e "require('./data/activity-index.json'); console.log('valid')"
# Expected: valid
```

- [ ] **Step 3: Commit**

```bash
git add data/activity-index.json
git commit -m "$(cat <<'EOF'
feat: add conversation-initiation to activity index, retire 4 old entries

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"
```

---

## Task 4: Update data layer — social-response-evaluator sourceFiles

**Files:**
- Modify: `data/social.js`
- Modify: `data/social.json`

- [ ] **Step 1: Replace sourceFile values**

```bash
sed -i '' 's|activities/social/social-response-evaluator.html|activities/social/helpful-hurtful-response-judge.html|g' data/social.js
sed -i '' 's|activities/social/social-response-evaluator.html|activities/social/helpful-hurtful-response-judge.html|g' data/social.json
```

- [ ] **Step 2: Verify**

```bash
grep -c "social-response-evaluator" data/social.js
# Expected: 0
grep -c "helpful-hurtful-response-judge" data/social.js
# Expected: > 0
```

- [ ] **Step 3: Commit**

```bash
git add data/social.js data/social.json
git commit -m "$(cat <<'EOF'
data: reroute social-response-evaluator scenarios to helpful-hurtful-response-judge

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"
```

---

## Task 5: Add Evaluator mode to helpful-hurtful-response-judge.html

**Files:**
- Modify: `activities/social/helpful-hurtful-response-judge.html`

The current file has Judge-mode-only logic. We add mode-awareness without breaking the existing judge flow. Evaluator scenarios have schema `{title, conflict, responses[]{text}}`. Judge scenarios have `{title, scenario, response}`.

- [ ] **Step 1: Add mode selector CSS before closing `</style>`**

Find `@media (max-width: 980px)` block. Add this CSS before it:

```css
        .mode-selector {
            display: flex;
            gap: 6px;
            margin-bottom: 12px;
        }
        .mode-tab {
            flex: 1;
            padding: 9px 14px;
            border-radius: 10px;
            border: 2px solid var(--border);
            background: #f8fafc;
            color: var(--muted);
            font-size: 14px;
            font-weight: 700;
            cursor: pointer;
            transition: all .15s;
        }
        .mode-tab.active {
            background: #dcfce7;
            color: #065f46;
            border-color: #86efac;
        }
        .eval-response-card {
            background: #fff7ed;
            border: 1px solid #fed7aa;
            border-radius: 14px;
            padding: 16px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-bottom: 12px;
        }
        .eval-response-text {
            font-size: 15px;
            line-height: 1.6;
            color: var(--ink);
        }
        .eval-response-num {
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: .04em;
            color: #c2410c;
            margin-bottom: 4px;
        }
        .revise-area { display: none; margin-top: 6px; }
        .revise-toggle { background: none; border: 1px solid var(--border); border-radius: 8px; padding: 6px 12px; font-size: 13px; cursor: pointer; color: var(--muted); }
        .revise-toggle:hover { border-color: #94a3b8; color: var(--ink); }
```

- [ ] **Step 2: Add mode selector HTML to sidebar, above `<h2>Scenarios</h2>`**

Find:
```html
                <aside class="sidebar">
                    <h2>Scenarios</h2>
```

Replace with:
```html
                <aside class="sidebar">
                    <div class="mode-selector">
                        <button class="mode-tab active" data-mode="judge" id="modeJudge">Judge</button>
                        <button class="mode-tab" data-mode="evaluator" id="modeEval">Evaluator</button>
                    </div>
                    <h2>Scenarios</h2>
```

- [ ] **Step 3: Replace the entire `<script>` block**

Find `<script>` (line 421) through `</script>` (line 581) and replace with:

```html
    <script>
        var allScenarios = DataLoader.filter('social', 'scenarios', function(s) {
            return s.sourceFile === 'activities/social/helpful-hurtful-response-judge.html';
        });
        var judgeScenarios = allScenarios.filter(function(s) { return s.response && !s.responses; });
        var evaluatorScenarios = allScenarios.filter(function(s) { return Array.isArray(s.responses); });

        var judgeResponses = judgeScenarios.map(function() { return { verdict: null, why: '' }; });
        var evalResponses = evaluatorScenarios.map(function(s) {
            return s.responses.map(function() { return { verdict: null, why: '', revision: '' }; });
        });

        var currentMode = 'judge';
        var activeIndex = 0;
        var evalActiveIndex = 0;

        var scenarioList = document.getElementById('scenarioList');
        var progressCount = document.getElementById('progressCount');
        var progressHint = document.getElementById('progressHint');
        var workspace = document.querySelector('.workspace');

        var hintOptions = [
            'Tone was respectful vs blaming',
            'Takes responsibility or offers to fix',
            'Blames or insults the other person',
            'Invites dialogue or shuts it down',
            'Clarifies intentions instead of assuming',
            'Validates feelings or dismisses them',
            'Offers a next step to solve it',
            'Escalates conflict or cools it down',
            'Acknowledges mistake/apologizes',
            'Makes assumptions without asking'
        ];

        // ── Mode switching ──────────────────────────────────────────────
        document.getElementById('modeJudge').addEventListener('click', function() { switchMode('judge'); });
        document.getElementById('modeEval').addEventListener('click', function() { switchMode('evaluator'); });

        function switchMode(mode) {
            currentMode = mode;
            document.getElementById('modeJudge').classList.toggle('active', mode === 'judge');
            document.getElementById('modeEval').classList.toggle('active', mode === 'evaluator');
            renderScenarioList();
            if (mode === 'judge') loadScenario(activeIndex);
            else loadEvalScenario(evalActiveIndex);
            updateProgress();
        }

        // ── Shared scenario list ────────────────────────────────────────
        function renderScenarioList() {
            scenarioList.innerHTML = '';
            var pool = currentMode === 'judge' ? judgeScenarios : evaluatorScenarios;
            var idx = currentMode === 'judge' ? activeIndex : evalActiveIndex;
            pool.forEach(function(scenario, index) {
                var btn = document.createElement('button');
                btn.className = 'scenario-btn' + (index === idx ? ' active' : '');
                var strong = document.createElement('strong');
                strong.textContent = (index + 1) + '. ' + scenario.title;
                var subtitle = document.createElement('span');
                subtitle.textContent = currentMode === 'judge' ? 'Helpful or hurtful? Then justify.' : 'Rate each response.';
                var status = document.createElement('span');
                status.className = 'status-pill';
                var logged = currentMode === 'judge'
                    ? judgeResponses[index].verdict !== null
                    : evalResponses[index] && evalResponses[index].some(function(r) { return r.verdict !== null; });
                status.textContent = logged ? 'Logged' : '—';
                if (logged) status.classList.add('done');
                btn.appendChild(strong);
                btn.appendChild(subtitle);
                btn.appendChild(status);
                btn.addEventListener('click', function() {
                    if (currentMode === 'judge') { activeIndex = index; loadScenario(index); }
                    else { evalActiveIndex = index; loadEvalScenario(index); }
                });
                scenarioList.appendChild(btn);
            });
        }

        function updateProgress() {
            if (currentMode === 'judge') {
                var logged = judgeResponses.filter(function(r) { return r.verdict !== null; }).length;
                progressCount.textContent = logged + '/' + judgeScenarios.length + ' logged';
                var withReasons = judgeResponses.filter(function(r) { return r.verdict && r.why.trim(); }).length;
                progressHint.textContent = withReasons ? withReasons + ' with explanations' : 'Pick helpful/hurtful to log.';
            } else {
                var rated = evalResponses.filter(function(arr) {
                    return arr.some(function(r) { return r.verdict !== null; });
                }).length;
                progressCount.textContent = rated + '/' + evaluatorScenarios.length + ' rated';
                progressHint.textContent = 'Rate each response helpful or not.';
            }
        }

        // ── Judge mode ─────────────────────────────────────────────────
        function loadScenario(index) {
            activeIndex = index;
            var scenario = judgeScenarios[index];
            var resp = judgeResponses[index];
            workspace.innerHTML = judgeWorkspaceHtml(scenario, index, resp);
            bindJudgeEvents(scenario, index, resp);
            renderScenarioList();
            updateProgress();
        }

        function judgeWorkspaceHtml(scenario, index, resp) {
            var verdict = resp.verdict;
            var helpfulActive = verdict === 'helpful' ? ' active' : '';
            var hurtfulActive = verdict === 'hurtful' ? ' active' : '';
            var placeholder = verdict === 'hurtful'
                ? 'This response might make things worse because\u2026'
                : 'This response is helpful because\u2026';
            return '<div class="scenario-top">'
                + '<span class="badge">Scenario ' + (index + 1) + '</span>'
                + '<h2 class="scenario-title">' + scenario.title + '</h2></div>'
                + '<div class="scenario-card">' + scenario.scenario + '</div>'
                + '<div class="response-card"><h3>Response to evaluate</h3>'
                + '<p style="margin:4px 0 0">' + scenario.response + '</p></div>'
                + '<div class="question-card">'
                + '<label>Was this response helpful or hurtful?</label>'
                + '<div class="toggle-row">'
                + '<button class="toggle-btn helpful' + helpfulActive + '" id="helpfulBtn">Helpful</button>'
                + '<button class="toggle-btn hurtful' + hurtfulActive + '" id="hurtfulBtn">Hurtful</button>'
                + '</div>'
                + '<div class="hint-bar"><div class="hint-header">'
                + '<button class="hint-btn" id="hintBtn">Show hints</button>'
                + '<span class="hint-text" id="hintText">Need ideas? Look at tone, accountability, and impact.</span>'
                + '</div><div class="hint-chips" id="hintChips"></div></div>'
                + '<label>Why?</label>'
                + '<textarea id="whyText" placeholder="' + placeholder + '">' + resp.why + '</textarea>'
                + '</div>'
                + '<div class="controls">'
                + '<button class="btn" id="prevBtn">Previous</button>'
                + '<button class="btn primary" id="nextBtn">Next scenario</button>'
                + '</div>';
        }

        function bindJudgeEvents(scenario, index, resp) {
            var hintsShown = false;
            document.getElementById('helpfulBtn').addEventListener('click', function() {
                judgeResponses[index].verdict = 'helpful';
                loadScenario(index);
            });
            document.getElementById('hurtfulBtn').addEventListener('click', function() {
                judgeResponses[index].verdict = 'hurtful';
                loadScenario(index);
            });
            document.getElementById('whyText').addEventListener('input', function(e) {
                judgeResponses[index].why = e.target.value;
                updateProgress();
                renderScenarioList();
            });
            document.getElementById('hintBtn').addEventListener('click', function() {
                var chips = document.getElementById('hintChips');
                var text = document.getElementById('hintText');
                if (!hintsShown) {
                    chips.innerHTML = '';
                    hintOptions.forEach(function(t) {
                        var chip = document.createElement('button');
                        chip.type = 'button';
                        chip.className = 'hint-chip';
                        chip.textContent = t;
                        chip.addEventListener('click', function() {
                            var ta = document.getElementById('whyText');
                            ta.value = ta.value.trim() ? ta.value + ' ' + t + '.' : t + '.';
                            judgeResponses[index].why = ta.value;
                            updateProgress(); renderScenarioList(); ta.focus();
                        });
                        chips.appendChild(chip);
                    });
                    chips.style.display = 'flex';
                    text.textContent = 'Pick a clue to add to your explanation.';
                    hintsShown = true;
                } else {
                    chips.style.display = chips.style.display === 'none' ? 'flex' : 'none';
                }
            });
            document.getElementById('prevBtn').addEventListener('click', function() {
                loadScenario(activeIndex === 0 ? judgeScenarios.length - 1 : activeIndex - 1);
            });
            document.getElementById('nextBtn').addEventListener('click', function() {
                loadScenario(activeIndex === judgeScenarios.length - 1 ? 0 : activeIndex + 1);
            });
        }

        // ── Evaluator mode ─────────────────────────────────────────────
        function loadEvalScenario(index) {
            evalActiveIndex = index;
            var scenario = evaluatorScenarios[index];
            var resps = evalResponses[index];
            workspace.innerHTML = evalWorkspaceHtml(scenario, index, resps);
            bindEvalEvents(scenario, index, resps);
            renderScenarioList();
            updateProgress();
        }

        function evalWorkspaceHtml(scenario, index, resps) {
            var responseCards = scenario.responses.map(function(r, ri) {
                var resp = resps[ri];
                var helpfulActive = resp.verdict === 'helpful' ? ' active' : '';
                var hurtfulActive = resp.verdict === 'not-helpful' ? ' active' : '';
                return '<div class="eval-response-card">'
                    + '<div class="eval-response-num">Response ' + (ri + 1) + '</div>'
                    + '<div class="eval-response-text">' + r.text + '</div>'
                    + '<div class="toggle-row">'
                    + '<button class="toggle-btn helpful' + helpfulActive + '" data-ri="' + ri + '" data-v="helpful">Helpful</button>'
                    + '<button class="toggle-btn hurtful' + hurtfulActive + '" data-ri="' + ri + '" data-v="not-helpful">Not Helpful</button>'
                    + '</div>'
                    + '<label>Why?</label>'
                    + '<textarea class="eval-why" data-ri="' + ri + '" placeholder="Explain your rating...">' + resp.why + '</textarea>'
                    + '<button class="revise-toggle" data-ri="' + ri + '">Revise this response ▾</button>'
                    + '<div class="revise-area" id="revise-' + ri + '">'
                    + '<textarea class="eval-revise" data-ri="' + ri + '" placeholder="How would you rewrite this response?">' + resp.revision + '</textarea>'
                    + '</div>'
                    + '</div>';
            }).join('');

            return '<div class="scenario-top">'
                + '<span class="badge">Scenario ' + (index + 1) + '</span>'
                + '<h2 class="scenario-title">' + scenario.title + '</h2></div>'
                + '<div class="scenario-card">' + scenario.conflict + '</div>'
                + responseCards
                + '<div class="controls">'
                + '<button class="btn" id="evalPrevBtn">Previous</button>'
                + '<button class="btn primary" id="evalNextBtn">Next scenario</button>'
                + '</div>';
        }

        function bindEvalEvents(scenario, index, resps) {
            workspace.querySelectorAll('.toggle-btn').forEach(function(btn) {
                btn.addEventListener('click', function() {
                    var ri = parseInt(btn.dataset.ri);
                    evalResponses[index][ri].verdict = btn.dataset.v;
                    loadEvalScenario(index);
                });
            });
            workspace.querySelectorAll('.eval-why').forEach(function(ta) {
                ta.addEventListener('input', function() {
                    evalResponses[index][parseInt(ta.dataset.ri)].why = ta.value;
                    updateProgress(); renderScenarioList();
                });
            });
            workspace.querySelectorAll('.eval-revise').forEach(function(ta) {
                ta.addEventListener('input', function() {
                    evalResponses[index][parseInt(ta.dataset.ri)].revision = ta.value;
                });
            });
            workspace.querySelectorAll('.revise-toggle').forEach(function(btn) {
                btn.addEventListener('click', function() {
                    var area = document.getElementById('revise-' + btn.dataset.ri);
                    var open = area.style.display === 'block';
                    area.style.display = open ? 'none' : 'block';
                    btn.textContent = (open ? 'Revise this response ▾' : 'Revise this response ▴');
                });
            });
            document.getElementById('evalPrevBtn').addEventListener('click', function() {
                loadEvalScenario(evalActiveIndex === 0 ? evaluatorScenarios.length - 1 : evalActiveIndex - 1);
            });
            document.getElementById('evalNextBtn').addEventListener('click', function() {
                loadEvalScenario(evalActiveIndex === evaluatorScenarios.length - 1 ? 0 : evalActiveIndex + 1);
            });
        }

        // ── Init ───────────────────────────────────────────────────────
        renderScenarioList();
        loadScenario(0);
        updateProgress();
    </script>
```

- [ ] **Step 4: Verify in browser**

Open `http://localhost:8080/activities/social/helpful-hurtful-response-judge.html`

Check:
- Judge tab active by default, existing judge scenarios load and function normally
- Clicking Evaluator tab: scenario list updates to evaluator scenarios, workspace shows conflict + 3 response cards
- Each response card: Helpful/Not Helpful toggles work, why textarea saves state, revise toggle shows/hides textarea
- Progress counter updates correctly in both modes

- [ ] **Step 5: Commit**

```bash
git add activities/social/helpful-hurtful-response-judge.html
git commit -m "$(cat <<'EOF'
feat: add Evaluator mode to helpful-hurtful-response-judge

Judge mode unchanged. New Evaluator mode shows conflict scenario with
multiple responses to rate, explain, and optionally revise.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"
```

---

## Task 6: Add step bar + Step 1 to social-problem-solving.html

**Files:**
- Modify: `activities/social/social-problem-solving.html`

Step 1 uses `problemStories` data (schema: `{id, title, text, hint, choices[]{text, correct}}`). Step 2 is the existing activity (untouched). Default is Step 1.

- [ ] **Step 1: Add step bar + Step 1 CSS before closing `</style>`**

Find `@media (max-width: 768px)` block. Add before it:

```css
  .step-bar {
    display: flex;
    gap: 0;
    margin-bottom: 24px;
    border-radius: 10px;
    overflow: hidden;
    border: 2px solid #e2e8f0;
    background: white;
  }
  .step-tab {
    flex: 1;
    padding: 13px 20px;
    border: none;
    background: white;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    color: #64748b;
    transition: all .15s;
    border-right: 1px solid #e2e8f0;
  }
  .step-tab:last-child { border-right: none; }
  .step-tab.active { background: var(--accent); color: white; }
  .step-tab:hover:not(.active) { background: #faf5ff; color: var(--accent); }

  .story-selector {
    background: white;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 24px;
  }
  .story-selector h2 { margin: 0 0 16px; color: var(--accent); font-size: 20px; }
  .story-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 10px;
  }
  .story-btn {
    background: #f8fafc;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    padding: 14px;
    text-align: left;
    cursor: pointer;
    font-size: 14px;
    transition: all .2s;
  }
  .story-btn:hover { border-color: var(--accent); background: #faf5ff; }
  .story-btn.active { border-color: var(--accent); background: #faf5ff; border-width: 3px; }

  .identify-container {
    background: white;
    border: 2px solid #e2e8f0;
    border-radius: 16px;
    padding: 32px;
    box-shadow: 0 4px 12px rgba(0,0,0,.08);
    display: none;
  }
  .story-display {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 24px;
    border-radius: 12px;
    margin-bottom: 28px;
    line-height: 1.7;
    font-size: 16px;
  }
  .story-display h3 { margin: 0 0 12px; font-size: 17px; opacity: .85; text-transform: uppercase; letter-spacing: 1px; }
  .identify-input {
    width: 100%;
    padding: 16px;
    border: 2px solid #cbd5e1;
    border-radius: 8px;
    font-size: 16px;
    font-family: inherit;
    min-height: 100px;
    resize: vertical;
    background: white;
  }
  .identify-input:focus { outline: none; border-color: var(--accent); }
  .step1-hint { background: #fef3c7; border: 2px solid #fbbf24; border-radius: 8px; padding: 16px; margin-top: 12px; display: none; }
  .step1-hint h4 { margin: 0 0 6px; color: #92400e; }
  .step1-hint p { margin: 0; color: #78350f; }
  .step1-choices { margin-top: 16px; display: none; }
  .choice-btn {
    display: block;
    width: 100%;
    text-align: left;
    padding: 12px 16px;
    margin-bottom: 8px;
    border-radius: 8px;
    border: 2px solid #e2e8f0;
    background: white;
    font-size: 15px;
    cursor: pointer;
    transition: all .15s;
  }
  .choice-btn:hover { border-color: var(--accent); background: #faf5ff; }
  .choice-btn.correct { border-color: #10b981; background: #d1fae5; color: #065f46; }
  .choice-btn.wrong { border-color: #ef4444; background: #fee2e2; color: #991b1b; }
```

- [ ] **Step 2: Add step bar + Step 1 HTML before `<div class="problem-selector">`**

Find:
```html
  <div class="problem-selector">
```

Replace with:
```html
  <div class="step-bar">
    <button class="step-tab active" id="stepTab1">Step 1: Identify the Problem</button>
    <button class="step-tab" id="stepTab2">Step 2: Solve It</button>
  </div>

  <!-- Step 1 panel -->
  <div id="step1Panel">
    <div class="story-selector">
      <h2>Choose a Story</h2>
      <div class="story-grid" id="storyGrid"></div>
    </div>
    <div class="identify-container" id="identifyContainer">
      <div class="story-display" id="storyDisplay"></div>
      <div class="input-group">
        <label>What is the main problem in this story?</label>
        <textarea class="identify-input" id="identifyInput" placeholder="Describe the main problem you noticed..."></textarea>
      </div>
      <div class="action-buttons" style="margin-top:16px">
        <button class="btn btn-secondary" id="showHintBtn">Show hint</button>
        <button class="btn btn-secondary" id="showChoicesBtn">Show choices</button>
      </div>
      <div class="step1-hint" id="step1Hint"></div>
      <div class="step1-choices" id="step1Choices"></div>
    </div>
  </div>

  <!-- Step 2 panel (existing) -->
  <div id="step2Panel" style="display:none">
  <div class="problem-selector">
```

Also close the Step 2 panel div before `</main>`. Find `</main>` and replace with:
```html
  </div><!-- end step2Panel -->
</main>
```

- [ ] **Step 3: Add Step 1 JS before `document.addEventListener('DOMContentLoaded', init)`**

Find:
```javascript
document.addEventListener('DOMContentLoaded', init);
```

Replace with:
```javascript
// ── Step 1 data ────────────────────────────────────────────────────────
var problemStories = DataLoader.get('social', 'problemStories') || [];
var currentStory = null;

function renderStoryGrid() {
    var grid = document.getElementById('storyGrid');
    grid.innerHTML = problemStories.map(function(story) {
        return '<button class="story-btn" data-id="' + story.id + '">'
            + '<strong>' + story.title + '</strong></button>';
    }).join('');
    grid.addEventListener('click', function(e) {
        var btn = e.target.closest('.story-btn');
        if (!btn) return;
        var id = btn.dataset.id;
        grid.querySelectorAll('.story-btn').forEach(function(b) {
            b.classList.toggle('active', b.dataset.id === id);
        });
        loadStory(id);
    });
}

function loadStory(id) {
    currentStory = problemStories.find(function(s) { return s.id === id; });
    if (!currentStory) return;
    var container = document.getElementById('identifyContainer');
    container.style.display = 'block';
    document.getElementById('storyDisplay').innerHTML =
        '<h3>' + currentStory.title + '</h3>' + currentStory.text;
    document.getElementById('identifyInput').value = '';
    document.getElementById('step1Hint').style.display = 'none';
    document.getElementById('step1Choices').style.display = 'none';
    document.getElementById('showHintBtn').textContent = 'Show hint';
    document.getElementById('showChoicesBtn').textContent = 'Show choices';
    container.scrollIntoView({ behavior: 'smooth' });
}

document.getElementById('showHintBtn').addEventListener('click', function() {
    if (!currentStory) return;
    var hint = document.getElementById('step1Hint');
    var open = hint.style.display === 'block';
    hint.style.display = open ? 'none' : 'block';
    hint.innerHTML = '<h4>Hint</h4><p>' + currentStory.hint + '</p>';
    this.textContent = open ? 'Show hint' : 'Hide hint';
});

document.getElementById('showChoicesBtn').addEventListener('click', function() {
    if (!currentStory) return;
    var choices = document.getElementById('step1Choices');
    var open = choices.style.display === 'block';
    if (!open) {
        choices.innerHTML = currentStory.choices.map(function(c, i) {
            return '<button class="choice-btn" data-correct="' + c.correct + '">' + c.text + '</button>';
        }).join('');
        choices.querySelectorAll('.choice-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                choices.querySelectorAll('.choice-btn').forEach(function(b) {
                    b.classList.remove('correct', 'wrong');
                });
                btn.classList.add(btn.dataset.correct === 'true' ? 'correct' : 'wrong');
            });
        });
    }
    choices.style.display = open ? 'none' : 'block';
    this.textContent = open ? 'Show choices' : 'Hide choices';
});

// ── Step tab switching ─────────────────────────────────────────────────
document.getElementById('stepTab1').addEventListener('click', function() {
    document.getElementById('step1Panel').style.display = 'block';
    document.getElementById('step2Panel').style.display = 'none';
    document.getElementById('stepTab1').classList.add('active');
    document.getElementById('stepTab2').classList.remove('active');
});
document.getElementById('stepTab2').addEventListener('click', function() {
    document.getElementById('step1Panel').style.display = 'none';
    document.getElementById('step2Panel').style.display = 'block';
    document.getElementById('stepTab1').classList.remove('active');
    document.getElementById('stepTab2').classList.add('active');
});

renderStoryGrid();

document.addEventListener('DOMContentLoaded', init);
```

- [ ] **Step 4: Verify in browser**

Open `http://localhost:8080/activities/social/social-problem-solving.html`

Check:
- Step bar visible at top. Step 1 tab active by default.
- Step 1 panel shows story grid. Clicking a story loads it and shows the identify panel.
- "Show hint" and "Show choices" toggle correctly. Clicking a choice marks it correct/wrong.
- Clicking Step 2 tab hides Step 1 and shows existing problem-solving activity — unchanged.
- Clicking Step 1 tab switches back.

- [ ] **Step 5: Commit**

```bash
git add activities/social/social-problem-solving.html
git commit -m "$(cat <<'EOF'
feat: add Step 1 (Identify the Problem) to social-problem-solving

Step bar allows jumping between Step 1 (story + identify) and
Step 2 (existing solution builder). Defaults to Step 1.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"
```

---

## Task 7: Update activity-index.json — retire social-response-evaluator and identify-problem

**Files:**
- Modify: `data/activity-index.json`

- [ ] **Step 1: Remove 2 entries**

Remove entries with ids:
- `social-response-evaluator`
- `social-problem-solving-identify-problem`

- [ ] **Step 2: Verify JSON is valid**

```bash
node -e "require('./data/activity-index.json'); console.log('valid')"
# Expected: valid
```

- [ ] **Step 3: Commit**

```bash
git add data/activity-index.json
git commit -m "$(cat <<'EOF'
feat: retire social-response-evaluator and identify-problem from index

Both activities are now absorbed into their respective merged files.
HTML files remain on disk but are removed from the main nav.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"
```
